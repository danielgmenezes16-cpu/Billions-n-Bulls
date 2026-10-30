"""Da narração ao vídeo: um comando por episódio.

Uso (na raiz do repositório):
    python3 scripts/montar_episodio.py ep02 --trilha spark            # checa, sincroniza, gera trilha e legenda
    python3 scripts/montar_episodio.py ep02 --trilha spark --render   # … e renderiza em 1080p, masterizado a -14 LUFS

Entradas:
    media/ep02/ep02-A.mp3 … ep02-F.mp3   blocos do Dark Planner (também aceita .wav)
    roteiros/rascunhos/fonte/ep02-roteiro.txt

O que faz, em ordem:
    1. Transcreve cada bloco (Parakeet, scripts/sync/transcribe.py), com cache em media/ep02/*.words.json.
    2. Compara a fala com o roteiro e grava media/ep02/checagem-audio.md: trechos do roteiro que não
       aparecem na fala (frase pulada ou trocada) e trechos falados que não estão no roteiro.
    3. Junta os blocos (-15 LUFS cada, 0,4 s entre eles, 10 frames de silêncio no início) em
       scripts/remotion/public/audio/ep02-voice.wav.
    4. Gera a linha do tempo com as palavras DO ROTEIRO e os tempos DA FALA (alinhamento por difflib;
       palavra sem par ganha tempo interpolado). Assim as cenas, que apontam para frases do roteiro,
       continuam encontrando tudo. Grava scripts/remotion/src/ep02/timeline.json (provisional = false).
    5. Gera a trilha (scripts/audio/trilha_show.py) no comprimento do vídeo, a -27 LUFS.
    6. Gera a legenda roteiros/prontos/ep02.srt a partir do roteiro, com os tempos da fala.
    7. Com --render: renderiza out/ep02-final.mp4 (H.264 CRF 18, 1080p) e masteriza o áudio a -14 LUFS (TP -1,5).
"""
import argparse
import difflib
import json
import re
import subprocess
import sys
from pathlib import Path

import numpy as np
import soundfile as sf

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts/audio'))
import trilha_show  # noqa: E402

SR = 48000
FPS = 30
OFFSET = 10 / FPS  # a narração começa 10 frames depois do início do vídeo (AUDIO_OFFSET)
GAP = 0.4  # silêncio entre blocos
TAIL = 15.0  # tela final
MODEL = ROOT / 'media/modelos/parakeet'
REMOTION = ROOT / 'scripts/remotion'


def tok(s):
    return re.sub(r'[^a-z0-9%$]+', '', s.lower())


def script_words(ep):
    text = (ROOT / f'roteiros/rascunhos/fonte/{ep}-roteiro.txt').read_text()
    text = re.sub(r'<break[^>]*/>', ' ', text)
    return [w for w in text.split() if tok(w)]


def ensure_model():
    if (MODEL / 'tokens.txt').exists():
        return
    MODEL.mkdir(parents=True, exist_ok=True)
    base = 'https://huggingface.co/csukuangfj/sherpa-onnx-nemo-parakeet-tdt-0.6b-v2-int8/resolve/main/'
    for f in ['encoder.int8.onnx', 'decoder.int8.onnx', 'joiner.int8.onnx', 'tokens.txt']:
        subprocess.run(['curl', '-sSL', '-o', str(MODEL / f), base + f], check=True)


def load(path, lufs=-15):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(path), '-af', f'loudnorm=I={lufs}:TP=-1.5:LRA=11', '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).reshape(-1, 2)


def blocks_of(ep):
    out = []
    for b in 'ABCDEF':
        for ext in ('mp3', 'wav', 'm4a'):
            p = ROOT / f'media/{ep}/{ep}-{b}.{ext}'
            if p.exists():
                out.append((b, p))
                break
    if not out:
        raise SystemExit(f'Nenhum bloco encontrado em media/{ep}/ ({ep}-A.mp3 …)')
    return out


def transcribe(path):
    cache = path.with_suffix('.words.json')
    if not cache.exists():
        ensure_model()
        subprocess.run([sys.executable, str(ROOT / 'scripts/sync/transcribe.py'), str(path), str(cache), '--model', str(MODEL)], check=True)
    return json.loads(cache.read_text())['words']


def align(script, spoken):
    """Tempo para cada palavra do roteiro, a partir das palavras faladas (com tempo)."""
    a = [tok(w) for w in script]
    b = [tok(w['w']) for w in spoken]
    sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
    t = [None] * len(script)
    gaps_script, gaps_spoken = [], []
    for op, i1, i2, j1, j2 in sm.get_opcodes():
        if op == 'equal':
            for k in range(i2 - i1):
                t[i1 + k] = (spoken[j1 + k]['start'], spoken[j1 + k]['end'])
        else:
            if i2 - i1 >= 3 or (op == 'delete' and i2 > i1):
                gaps_script.append((i1, i2, j1, j2))
            if op == 'insert' and j2 - j1 >= 3:
                gaps_spoken.append((j1, j2))
            # trecho trocado (ex.: "198" falado × "one hundred and ninety-eight" no roteiro): espalha no intervalo falado
            if op == 'replace' and j2 > j1:
                s0, s1 = spoken[j1]['start'], spoken[j2 - 1]['end']
                n = i2 - i1
                for k in range(n):
                    t[i1 + k] = (s0 + (s1 - s0) * k / n, s0 + (s1 - s0) * (k + 1) / n)
    # o que sobrou sem tempo: interpola entre os vizinhos
    known = [i for i, x in enumerate(t) if x]
    for i in range(len(t)):
        if t[i]:
            continue
        prev = max([k for k in known if k < i], default=None)
        nxt = min([k for k in known if k > i], default=None)
        p = t[prev][1] if prev is not None else 0.0
        q = t[nxt][0] if nxt is not None else p + 0.4
        span = [k for k in range(prev + 1 if prev is not None else 0, nxt if nxt is not None else len(t))]
        idx = span.index(i)
        step = (q - p) / max(1, len(span))
        t[i] = (p + step * idx, p + step * (idx + 1))
    return t, gaps_script, gaps_spoken, sm.ratio()


def srt(words, path):
    def ts(s):
        ms = int(round(s * 1000))
        return f'{ms // 3600000:02}:{ms // 60000 % 60:02}:{ms // 1000 % 60:02},{ms % 1000:03}'
    cues, cur = [], []
    for i, w in enumerate(words):
        cur.append(w)
        text = ' '.join(x['w'] for x in cur)
        nxt = words[i + 1] if i + 1 < len(words) else None
        pause = nxt and nxt['t'] - w['end'] > 0.45
        if len(text) > 70 or w['w'][-1] in '.?!]' or pause or not nxt or (nxt and nxt['w'].startswith('[')):
            cues.append(cur)
            cur = []
    lines = []
    for n, c in enumerate(cues, 1):
        text = ' '.join(x['w'] for x in c).replace('[', '').replace(']', '')
        if len(text) > 42:  # duas linhas, quebrando perto do meio
            cut = text.rfind(' ', 0, len(text) // 2 + 6)
            text = text[:cut] + '\n' + text[cut + 1:]
        lines.append(f"{n}\n{ts(c[0]['t'])} --> {ts(max(c[-1]['end'], c[0]['t'] + 1.0))}\n{text}\n")
    path.write_text('\n'.join(lines))
    return len(cues)


def master(src, dst):
    probe = subprocess.run(['ffmpeg', '-hide_banner', '-i', str(src), '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json', '-f', 'null', '-'],
                           capture_output=True, text=True).stderr
    m = json.loads(probe[probe.rindex('{'):probe.rindex('}') + 1])
    af = (f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}"
          f":measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true")
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(src), '-c:v', 'copy', '-af', af, '-ar', '48000', '-c:a', 'aac', '-b:a', '320k', str(dst)], check=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('ep')
    ap.add_argument('--trilha', default='spark', choices=list(trilha_show.PRESETS))
    ap.add_argument('--render', action='store_true')
    a = ap.parse_args()
    ep = a.ep
    audio_dir = REMOTION / 'public/audio'
    audio_dir.mkdir(parents=True, exist_ok=True)

    # 1–3: transcrição, junção dos blocos
    chunks = [np.zeros((int(OFFSET * SR), 2), np.float32)]
    t = OFFSET
    spoken, block_of = [], []
    for name, path in blocks_of(ep):
        x = load(path)
        for w in transcribe(path):
            spoken.append({'w': w['w'], 'start': round(t + w['start'], 3), 'end': round(t + w['end'], 3)})
            block_of.append(name)
        chunks += [x, np.zeros((int(GAP * SR), 2), np.float32)]
        t += len(x) / SR + GAP
        print(f'bloco {name}: {len(x) / SR:.1f} s')
    speech_end = t
    total = speech_end + TAIL
    voice = np.concatenate(chunks + [np.zeros((int(TAIL * SR), 2), np.float32)])
    sf.write(audio_dir / f'{ep}-voice.wav', voice, SR, subtype='PCM_24')

    # 2 e 4: alinhamento com o roteiro
    script = script_words(ep)
    times, gaps_script, gaps_spoken, ratio = align(script, spoken)
    report = [f'# Checagem do áudio — {ep}', '', f'Coincidência roteiro × fala: **{ratio:.1%}** ({len(script)} palavras no roteiro, {len(spoken)} faladas).', '']
    report.append('## Trechos do roteiro que não aparecem iguais na fala')
    report.append('Números falados por extenso costumem aparecer aqui sem problema (o reconhecedor escreve "198"). Conferir o resto.\n')
    for i1, i2, j1, j2 in gaps_script:
        ctx = ' '.join(script[max(0, i1 - 4):i1])
        heard = ' '.join(w['w'] for w in spoken[j1:j2]) or '(nada)'
        report.append(f'- …{ctx} **[{" ".join(script[i1:i2])}]** → ouvido: _{heard}_ ({times[i1][0] - OFFSET:.1f} s)')
    report.append('\n## Trechos falados que não estão no roteiro')
    for j1, j2 in gaps_spoken:
        report.append(f'- _{" ".join(w["w"] for w in spoken[j1:j2])}_ ({spoken[j1]["start"] - OFFSET:.1f} s)')
    (ROOT / f'media/{ep}/checagem-audio.md').write_text('\n'.join(report) + '\n')

    # bloco de cada palavra do roteiro, pelo tempo
    bounds = []
    for name in dict.fromkeys(block_of):
        ts_ = [w['start'] for w, b in zip(spoken, block_of) if b == name]
        bounds.append((name, ts_[0]))
    def block_at(s):
        name = bounds[0][0]
        for n, s0 in bounds:
            if s >= s0 - 0.2:
                name = n
        return name
    words = [{'w': w, 't': round(s, 3), 'end': round(e, 3), 'block': block_at(s)} for w, (s, e) in zip(script, times)]

    mono = np.abs(voice[:, 0])
    per = SR // FPS
    nfr = int(np.ceil(total * FPS))
    rms = np.array([np.sqrt(np.mean(mono[i * per:(i + 1) * per] ** 2)) if i * per < len(mono) else 0 for i in range(nfr)])
    active = np.convolve(np.clip(rms / 0.02, 0, 1), np.ones(6) / 6, mode='same')
    blocks = [{'name': n, 'start': round(s0, 3)} for n, s0 in bounds]
    timeline = {'fps': FPS, 'duration': round(total, 3), 'frames': nfr, 'blocks': blocks, 'words': words,
                'voiceActive': [round(float(v), 2) for v in active], 'provisional': False}
    (REMOTION / f'src/{ep}/timeline.json').write_text(json.dumps(timeline, ensure_ascii=False))

    # 5: trilha
    music = trilha_show.build(a.trilha, total)
    music = np.stack([music, np.roll(music, int(0.01 * trilha_show.SR))], axis=1)
    tmp = audio_dir / f'{ep}-{a.trilha}-44k.wav'
    sf.write(tmp, music, trilha_show.SR, subtype='PCM_24')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(tmp), '-af', 'loudnorm=I=-27:TP=-2', '-ar', str(SR), str(audio_dir / f'{ep}-{a.trilha}.wav')], check=True)
    tmp.unlink()

    # 6: legenda
    (ROOT / 'roteiros/prontos').mkdir(parents=True, exist_ok=True)
    n = srt([{'w': w['w'], 't': w['t'], 'end': w['end']} for w in words], ROOT / f'roteiros/prontos/{ep}.srt')

    print(f'fala {speech_end - OFFSET:.1f} s · vídeo {total:.1f} s ({nfr} frames) · coincidência {ratio:.1%} · {n} legendas')
    print(f'checagem: media/{ep}/checagem-audio.md ({len(gaps_script)} trechos do roteiro, {len(gaps_spoken)} falados fora do roteiro)')

    # 7: render e master
    if a.render:
        (ROOT / 'out').mkdir(exist_ok=True)
        raw = ROOT / f'out/{ep}-render.mp4'
        comp = 'Ep' + ep[2:]
        subprocess.run([str(REMOTION / 'node_modules/.bin/remotion'), 'render', comp, str(raw), '--crf', '18', '--concurrency', '4',
                        '--browser-executable', '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome', '--chrome-mode', 'chrome-for-testing'],
                       cwd=REMOTION, check=True)
        master(raw, ROOT / f'out/{ep}-final.mp4')
        raw.unlink()
        print(f'out/{ep}-final.mp4 pronto')


if __name__ == '__main__':
    main()
