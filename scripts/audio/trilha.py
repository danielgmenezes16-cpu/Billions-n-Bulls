"""Gera trilhas ambiente originais para o canal (sem direitos de terceiros).

Uso: python trilha.py <saida.wav> <preset> <segundos>
Presets: ledger (piano + pad, Dó menor), vault (pad grave e lento, Ré menor), ticker (pulso suave de marimba, Lá menor)

Tudo é sintetizado aqui: osciladores, envelopes e uma reverb por convolução com ruído decaindo.
Fica 18 a 24 dB abaixo da voz na mixagem, então o objetivo é textura calma, não melodia chamativa.
"""
import sys
import numpy as np
import soundfile as sf

SR = 44100
rng = np.random.default_rng(7)


def note(midi: float) -> float:
    return 440.0 * 2 ** ((midi - 69) / 12)


def env(n: int, a: float, r: float) -> np.ndarray:
    t = np.arange(n) / SR
    e = np.minimum(1, t / max(a, 1e-3)) * np.exp(-t / r)
    return e


def piano(f: float, dur: float) -> np.ndarray:
    n = int(dur * SR); t = np.arange(n) / SR
    x = sum(np.sin(2 * np.pi * f * k * t) * (0.6 / k ** 1.6) * np.exp(-t * (0.7 + 0.5 * k)) for k in range(1, 7))
    return x * env(n, 0.005, dur * 0.45)


def pad(freqs: list[float], dur: float) -> np.ndarray:
    n = int(dur * SR); t = np.arange(n) / SR
    x = np.zeros(n)
    for f in freqs:
        for det in (-0.12, 0.0, 0.11):
            ff = f * 2 ** (det / 12)
            x += np.sin(2 * np.pi * ff * t + rng.uniform(0, 6)) + 0.25 * np.sin(2 * np.pi * 2 * ff * t)
    fade = np.minimum(1, np.minimum(t / 2.5, (dur - t) / 2.5))
    return x / (len(freqs) * 3) * np.clip(fade, 0, 1)


def marimba(f: float, dur: float = 1.2) -> np.ndarray:
    n = int(dur * SR); t = np.arange(n) / SR
    x = np.sin(2 * np.pi * f * t) + 0.3 * np.sin(2 * np.pi * 4 * f * t) * np.exp(-t * 18)
    return x * env(n, 0.003, 0.35)


def reverb(x: np.ndarray, secs: float = 3.5, mix: float = 0.35) -> np.ndarray:
    n = int(secs * SR)
    ir = rng.standard_normal(n) * np.exp(-np.arange(n) / SR * 6.5 / secs)
    ir /= np.sqrt(np.sum(ir ** 2))
    size = 1 << int(np.ceil(np.log2(len(x) + n)))
    wet = np.fft.irfft(np.fft.rfft(x, size) * np.fft.rfft(ir, size), size)[: len(x)]
    return (1 - mix) * x + mix * wet


def lowpass(x: np.ndarray, cutoff: float) -> np.ndarray:
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = np.empty_like(x); acc = 0.0
    for i, v in enumerate(x):
        acc = (1 - a) * v + a * acc; y[i] = acc
    return y


def place(buf: np.ndarray, sig: np.ndarray, at: float, gain: float) -> None:
    i = int(at * SR); j = min(len(buf), i + len(sig))
    if i < len(buf):
        buf[i:j] += sig[: j - i] * gain


PROGRESSIONS = {
    # acordes em MIDI (graves para o pad), 1 acorde a cada 8 s
    "ledger": [[48, 55, 63, 67], [44, 51, 60, 63], [41, 48, 56, 60], [43, 50, 58, 62]],   # Cm Ab Fm Gm
    "vault":  [[38, 45, 53, 57], [34, 41, 50, 53], [36, 43, 52, 55], [33, 40, 48, 52]],   # Dm Bb C Am
    "ticker": [[45, 52, 60, 64], [41, 48, 57, 60], [43, 50, 59, 62], [40, 47, 55, 59]],   # Am F G Em
}


def build(preset: str, total: float) -> np.ndarray:
    buf = np.zeros(int(total * SR))
    prog = PROGRESSIONS[preset]
    bar = 8.0
    k = 0
    t = 0.0
    while t < total:
        chord = prog[k % len(prog)]
        place(buf, pad([note(m) for m in chord], bar + 3), t, 0.55 if preset != "vault" else 0.8)
        if preset == "ledger":
            top = chord[1:] + [chord[1] + 12]
            for i, at in enumerate([0.0, 2.0, 4.0, 5.5]):
                place(buf, piano(note(top[(i + k) % len(top)] + 12), 4.0), t + at, 0.28)
        elif preset == "ticker":
            arp = chord[1:] + [chord[2] + 12]
            for i in range(16):
                place(buf, marimba(note(arp[i % len(arp)] + 12)), t + i * 0.5, 0.16 if i % 4 else 0.22)
        elif preset == "vault":
            place(buf, piano(note(chord[0] + 24), 6.0), t + 1.0, 0.18)
        t += bar; k += 1
    buf = lowpass(buf, 3200 if preset != "vault" else 1800)
    buf = reverb(buf)
    fade = np.ones_like(buf); n = int(3 * SR)
    fade[:n] = np.linspace(0, 1, n); fade[-n:] = np.linspace(1, 0, n)
    buf *= fade
    peak = np.max(np.abs(buf))
    return (buf / peak * 0.5).astype(np.float32)


if __name__ == "__main__":
    out, preset, secs = sys.argv[1], sys.argv[2], float(sys.argv[3])
    x = build(preset, secs)
    sf.write(out, np.stack([x, np.roll(x, int(0.012 * SR))], axis=1), SR, subtype="PCM_24")
    print(out, preset, secs)
