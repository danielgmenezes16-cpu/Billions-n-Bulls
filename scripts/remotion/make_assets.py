"""Gera os recursos do template que não vão para o git: fontes, efeitos sonoros e grão.

Uso (dentro de scripts/remotion, depois do npm install):
    python make_assets.py

Especificações do template (README do Project "Yt Dark"):
- sfx-tick:  ruído 1,8–7 kHz, 35 ms, decaimento 6 ms, pico -16 dB
- sfx-pop:   seno varrendo de 1000 para 420 Hz, 100 ms, pico -12 dB
- sfx-boom:  seno 50 Hz + 100 Hz, decaimento 0,35 s, mais ruído abaixo de 220 Hz, pico -8 dB
- sfx-riser: ruído com passa-baixa abrindo de 300 Hz a 8 kHz em 1,3 s, volume crescendo, pico -14 dB
- whoosh:    ruído rosa de 0,6 s, passa-faixa 300–6000 Hz, fade exponencial (ffmpeg)
- grain.png: 2400×1440, ruído normal (desvio 38) + manchas suaves ampliadas 8×, centrado em 128
"""
import shutil
import subprocess
from pathlib import Path

import numpy as np
import soundfile as sf
from PIL import Image

SR = 48000
ROOT = Path(__file__).parent
AUDIO = ROOT / "public/audio"
rng = np.random.default_rng(42)


def peak(x: np.ndarray, db: float) -> np.ndarray:
    return x / np.max(np.abs(x)) * 10 ** (db / 20)


def bandpass(x: np.ndarray, lo: float, hi: float) -> np.ndarray:
    f = np.fft.rfftfreq(len(x), 1 / SR)
    X = np.fft.rfft(x)
    X[(f < lo) | (f > hi)] = 0
    return np.fft.irfft(X, len(x))


def onepole_lp(x: np.ndarray, cutoff: np.ndarray) -> np.ndarray:
    y = np.empty_like(x)
    acc = 0.0
    a = np.exp(-2 * np.pi * cutoff / SR)
    for i, v in enumerate(x):
        acc = (1 - a[i]) * v + a[i] * acc
        y[i] = acc
    return y


def write(name: str, x: np.ndarray) -> None:
    sf.write(AUDIO / name, x.astype(np.float32), SR, subtype="PCM_16")


def main() -> None:
    AUDIO.mkdir(parents=True, exist_ok=True)
    (ROOT / "public/textures").mkdir(parents=True, exist_ok=True)
    (ROOT / "public/fonts").mkdir(parents=True, exist_ok=True)

    src = ROOT / "node_modules/@fontsource/inter/files"
    for w, name in [(400, "Regular"), (600, "SemiBold"), (700, "Bold"), (900, "Black")]:
        shutil.copy(src / f"inter-latin-{w}-normal.woff2", ROOT / f"public/fonts/Inter-{name}.woff2")

    n = int(0.035 * SR); t = np.arange(n) / SR
    write("sfx-tick.wav", peak(bandpass(rng.standard_normal(n), 1800, 7000) * np.exp(-t / 0.006), -16))

    n = int(0.100 * SR); t = np.arange(n) / SR
    f = np.linspace(1000, 420, n)
    write("sfx-pop.wav", peak(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.03), -12))

    n = int(1.2 * SR); t = np.arange(n) / SR
    tone = (np.sin(2 * np.pi * 50 * t) + 0.5 * np.sin(2 * np.pi * 100 * t)) * np.exp(-t / 0.35)
    rumble = bandpass(rng.standard_normal(n), 20, 220) * np.exp(-t / 0.2) * 0.3
    write("sfx-boom.wav", peak(tone + rumble, -8))

    n = int(1.3 * SR); t = np.arange(n) / SR
    cutoff = 300 * (8000 / 300) ** (t / t[-1])
    write("sfx-riser.wav", peak(onepole_lp(rng.standard_normal(n), cutoff) * (t / t[-1]) ** 2, -14))

    subprocess.run([
        "ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", "anoisesrc=color=pink:duration=0.6:sample_rate=48000",
        "-af", "bandpass=f=1340:width_type=q:w=0.5,afade=t=in:d=0.25:curve=exp,afade=t=out:st=0.3:d=0.3:curve=exp,volume=-6dB",
        str(AUDIO / "whoosh.wav"),
    ], check=True)

    h, w = 1440, 2400
    fine = rng.normal(0, 38, (h, w))
    blobs = Image.fromarray(np.clip(128 + rng.normal(0, 22, (h // 8, w // 8)), 0, 255).astype(np.uint8)).resize((w, h), Image.BICUBIC)
    g = np.clip(fine + (np.asarray(blobs, dtype=np.float32) - 128) + 128, 0, 255).astype(np.uint8)
    Image.fromarray(g, "L").save(ROOT / "public/textures/grain.png")
    print("ok: fontes, efeitos e grão")


if __name__ == "__main__":
    main()
