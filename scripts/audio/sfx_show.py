"""Efeitos sonoros de entretenimento para marcar os momentos-chave da narração.

Uso: python sfx_show.py <pasta de saída>
Gera: hit.wav (impacto de título), ding.wav (moeda), counter.wav (contador girando),
      swell.wav (subida de tensão), pop.wav (toque em botão)
"""
import sys
from pathlib import Path
import numpy as np
import soundfile as sf

SR = 44100
rng = np.random.default_rng(5)


def norm(x: np.ndarray, db: float) -> np.ndarray:
    return (x / np.max(np.abs(x)) * 10 ** (db / 20)).astype(np.float32)


def hit() -> np.ndarray:
    n = int(1.4 * SR); t = np.arange(n) / SR
    f = 40 + 70 * np.exp(-t / 0.05)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.4)
    crack = rng.standard_normal(n) * np.exp(-t / 0.02) * 0.5
    tail = np.convolve(rng.standard_normal(n) * np.exp(-t / 0.5), np.ones(30) / 30, mode="same") * 0.15
    return norm(body + crack + tail, -6)


def ding() -> np.ndarray:
    n = int(1.2 * SR); t = np.arange(n) / SR
    x = sum(a * np.sin(2 * np.pi * 1320 * r * t) * np.exp(-t / d) for r, a, d in [(1, 1, 0.5), (2.4, 0.5, 0.25), (3.9, 0.3, 0.12)])
    return norm(x, -10)


def counter() -> np.ndarray:
    """Contador girando: cliques acelerando, como um placar de números rolando."""
    total = 1.3
    out = np.zeros(int(total * SR))
    t = 0.0
    gap = 0.11
    while t < total - 0.05:
        n = int(0.012 * SR); tt = np.arange(n) / SR
        c = np.sin(2 * np.pi * 2600 * tt) * np.exp(-tt / 0.003)
        i = int(t * SR); out[i:i + n] += c
        t += gap
        gap = max(0.028, gap * 0.86)
    return norm(out, -14)


def swell() -> np.ndarray:
    n = int(1.6 * SR); t = np.arange(n) / SR
    tone = sum(np.sin(2 * np.pi * f * (1 + 0.5 * t / 1.6) * t) for f in (110, 165, 220))
    noise = rng.standard_normal(n) * 0.2
    return norm((tone + noise) * (t / 1.6) ** 3, -14)


def pop() -> np.ndarray:
    n = int(0.1 * SR); t = np.arange(n) / SR
    f = np.linspace(1100, 450, n)
    return norm(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.03), -12)


if __name__ == "__main__":
    out = Path(sys.argv[1]); out.mkdir(parents=True, exist_ok=True)
    for name, fn in [("hit", hit), ("ding", ding), ("counter", counter), ("swell", swell), ("pop", pop)]:
        sf.write(out / f"{name}.wav", fn(), SR, subtype="PCM_16")
    print("ok", out)
