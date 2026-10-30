"""Linha do tempo provisória a partir do roteiro, para montar o episódio antes da narração chegar.

Uso: python3 timeline_provisoria.py roteiro.txt saida/timeline.json

Gera o mesmo formato do ep01_build_audio.py (fps, duration, frames, blocks, words, voiceActive) com
"provisional": true. Cada palavra ganha uma duração estimada pelo tamanho, as pontuações e os
<break> viram pausas, e o total é calibrado pelo ritmo real do ep. 1 (601 s para 1.580 palavras).
As cenas do episódio apontam para frases, não para segundos: quando a narração real chegar, basta
trocar este arquivo pelo da transcrição e tudo se realinha.
"""
import json
import re
import sys

FPS = 30
AUDIO_OFFSET = 10 / FPS  # a narração começa 10 frames depois do início do vídeo
SEC_PER_WORD = 601 / 1580
TAIL = 15.0  # tela final


def main(script, out):
    text = open(script).read().strip()
    # blocos do Dark Planner: abertura + Parte 1 = A, Partes 2–5 = B–E, Parte 6 + fechamento = F
    tokens = []  # (palavra, bloco) ou ('<pause>', segundos)
    block = 'A'
    part = 0
    for line in text.split('\n'):
        m = re.match(r'\[Part (\d)', line.strip())
        if m:
            part = int(m.group(1))
            block = 'A' if part == 1 else 'BCDEF'[min(part, 6) - 2]
        for piece in re.split(r'(<break time="[\d.]+s" />)', line):
            b = re.match(r'<break time="([\d.]+)s" />', piece)
            if b:
                tokens.append(('<pause>', float(b.group(1))))
                continue
            for w in piece.split():
                tokens.append((w, block))
        tokens.append(('<pause>', 0.15))

    raw = []
    for w, x in tokens:
        if w == '<pause>':
            raw.append(('<pause>', x, None))
            continue
        letters = len(re.sub(r'[^A-Za-z0-9]', '', w))
        d = 0.14 + 0.055 * letters
        pause = 0.0
        if w.endswith('...'):
            pause = 0.45
        elif w[-1] in '.?!:':
            pause = 0.32
        elif w[-1] in ',;':
            pause = 0.14
        raw.append((w, d, x))
        if pause:
            raw.append(('<pause>', pause, None))

    n_words = sum(1 for w, _, _ in raw if w != '<pause>')
    target = n_words * SEC_PER_WORD
    scale = target / sum(d for _, d, _ in raw)

    t = AUDIO_OFFSET
    words = []
    for w, d, b in raw:
        d *= scale
        if w != '<pause>':
            words.append({'w': w, 't': round(t, 3), 'end': round(t + d * 0.92, 3), 'block': b})
        t += d
    speech_end = t
    duration = round(speech_end + TAIL, 3)
    frames = int(round(duration * FPS))

    blocks = []
    for b in 'ABCDEF':
        ws = [w for w in words if w['block'] == b]
        if ws:
            blocks.append({'name': b, 'start': ws[0]['t'], 'duration': round(ws[-1]['end'] - ws[0]['t'], 3)})

    active = [0.0] * frames
    for w in words:
        for f in range(int(w['t'] * FPS), min(frames, int(w['end'] * FPS) + 1)):
            active[f] = 1.0

    json.dump({'fps': FPS, 'duration': duration, 'frames': frames, 'blocks': blocks, 'words': words, 'voiceActive': active, 'provisional': True},
              open(out, 'w'))
    print(f'{n_words} palavras, fala até {speech_end:.1f} s, vídeo {duration:.1f} s ({frames} frames)')


if __name__ == '__main__':
    main(*sys.argv[1:])
