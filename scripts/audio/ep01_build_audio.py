"""Ep. 1: monta a narração completa, a trilha Spark e a linha do tempo de palavras para o Remotion.

Uso (na raiz do repositório): python scripts/audio/ep01_build_audio.py
Saídas:
  scripts/remotion/public/audio/ep01-voice.wav   abertura aprovada (já com efeitos) + blocos A, B corrigido e C
  scripts/remotion/public/audio/ep01-spark.wav   trilha Spark no comprimento do vídeo
  scripts/remotion/src/ep01/timeline.json        início de cada bloco, palavras com tempo global e voz ativa por frame
"""
import json
import subprocess
import sys
from pathlib import Path

import numpy as np
import soundfile as sf

sys.path.insert(0, str(Path(__file__).parent))
import trilha_show  # noqa: E402

SR = 48000
FPS = 30
TAIL = 15.0  # tela final com música depois da última frase
M = Path("media/ep01")
OUT_AUDIO = Path("scripts/remotion/public/audio")
OUT_DATA = Path("scripts/remotion/src/ep01")

PARTS = [
    ("opener", M / "opener-aprovado.mp4", None, None),  # já mixada a -15 LUFS
    ("A", M / "ep01-A.mp3", -15, M / "ep01-A.words.json"),
    ("B", M / "ep01-B-edit.wav", -15, M / "ep01-B-edit.words.json"),
    ("C", M / "ep01-C.mp3", -15, M / "ep01-C.words.json"),
]


def load(path: Path, lufs) -> np.ndarray:
    af = ["-af", f"loudnorm=I={lufs}:TP=-1.5:LRA=11"] if lufs is not None else []
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), *af, "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).reshape(-1, 2)


def main() -> None:
    OUT_AUDIO.mkdir(parents=True, exist_ok=True)
    OUT_DATA.mkdir(parents=True, exist_ok=True)
    chunks, blocks, words, t = [], [], [], 0.0
    for name, path, lufs, wpath in PARTS:
        x = load(path, lufs)
        blocks.append({"name": name, "start": round(t, 3), "duration": round(len(x) / SR, 3)})
        if wpath:
            for w in json.loads(wpath.read_text())["words"]:
                words.append({"w": w["w"], "t": round(t + w["start"], 3), "end": round(t + w["end"], 3), "block": name})
        chunks.append(x)
        t += len(x) / SR
    voice = np.concatenate(chunks)
    total = t + TAIL
    voice = np.concatenate([voice, np.zeros((int(TAIL * SR), 2), np.float32)])
    sf.write(OUT_AUDIO / "ep01-voice.wav", voice, SR, subtype="PCM_24")

    # voz ativa por frame (0 a 1), suavizada, para baixar a trilha quando a narração fala
    mono = np.abs(voice[:, 0])
    per = SR // FPS
    nfr = int(np.ceil(total * FPS))
    rms = np.array([np.sqrt(np.mean(mono[i * per:(i + 1) * per] ** 2)) if i * per < len(mono) else 0 for i in range(nfr)])
    active = np.clip(rms / 0.02, 0, 1)
    active = np.convolve(active, np.ones(6) / 6, mode="same")

    music = trilha_show.build("spark", total)
    music = np.stack([music, np.roll(music, int(0.01 * trilha_show.SR))], axis=1)
    tmp = OUT_AUDIO / "ep01-spark-44k.wav"
    sf.write(tmp, music, trilha_show.SR, subtype="PCM_24")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(tmp), "-af", "loudnorm=I=-27:TP=-2", "-ar", str(SR),
                    str(OUT_AUDIO / "ep01-spark.wav")], check=True)
    tmp.unlink()

    timeline = {"fps": FPS, "duration": round(total, 3), "frames": nfr, "blocks": blocks, "words": words,
                "voiceActive": [round(float(v), 2) for v in active]}
    (OUT_DATA / "timeline.json").write_text(json.dumps(timeline, ensure_ascii=False))
    print(f"total {total:.2f} s · {nfr} frames · {len(words)} palavras")


if __name__ == "__main__":
    main()
