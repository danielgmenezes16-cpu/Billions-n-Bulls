"""Trilhas com cara de entretenimento (curiosidade, tensão leve, ritmo marcado), todas sintetizadas aqui.

Uso: python trilha_show.py <saida.wav> <preset> <segundos>
Presets:
  heist  – mistério de "golpe": pizzicato em Lá menor, tic-tac de relógio, baixo pulsando, 96 BPM
  spark  – curiosidade leve: plucks sincopados em Ré maior, palmas no 2 e 4, glockenspiel, 108 BPM

As duas abrem esparsas (4 compassos) e entram no groove; a cada 16 compassos há 4 de respiro sem bateria,
e a cada 8 compassos um riser leva para a volta.
"""
import sys
import numpy as np
import soundfile as sf

SR = 44100
rng = np.random.default_rng(11)


def hz(midi: float) -> float:
    return 440.0 * 2 ** ((midi - 69) / 12)


def pluck(f: float, dur: float, bright: float = 0.5) -> np.ndarray:
    """Karplus-Strong: corda beliscada (pizzicato)."""
    n = int(dur * SR)
    p = max(2, int(SR / f))
    buf = rng.uniform(-1, 1, p)
    out = np.empty(n)
    damp = 0.996 - (1 - bright) * 0.01
    for i in range(n):
        out[i] = buf[i % p]
        buf[i % p] = damp * 0.5 * (buf[i % p] + buf[(i + 1) % p])
    return out * np.exp(-np.arange(n) / SR / (dur * 0.6))


def kick() -> np.ndarray:
    n = int(0.35 * SR); t = np.arange(n) / SR
    f = 45 + 80 * np.exp(-t / 0.03)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.12)


def hat(length: float = 0.03) -> np.ndarray:
    n = int(length * SR); t = np.arange(n) / SR
    x = np.diff(rng.standard_normal(n + 1))  # ruído "agudo" (passa-alta simples)
    return x * np.exp(-t / (length / 4))


def tick() -> np.ndarray:
    """Tic-tac de relógio: woodblock curto."""
    n = int(0.04 * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * 1900 * t) + 0.4 * np.sin(2 * np.pi * 3300 * t)) * np.exp(-t / 0.008)


def clap() -> np.ndarray:
    n = int(0.18 * SR); t = np.arange(n) / SR
    x = rng.standard_normal(n)
    x = np.convolve(x, np.ones(6) / 6, mode="same") - np.convolve(x, np.ones(40) / 40, mode="same")
    env = np.exp(-t / 0.05) * (1 + 0.6 * np.sin(2 * np.pi * 90 * t).clip(0))
    return x * env


def bass(f: float, dur: float) -> np.ndarray:
    n = int(dur * SR); t = np.arange(n) / SR
    x = np.sin(2 * np.pi * f * t) + 0.3 * np.sin(2 * np.pi * 2 * f * t) + 0.1 * np.sin(2 * np.pi * 3 * f * t)
    return x * np.minimum(1, t / 0.01) * np.exp(-t / (dur * 0.8))


def glock(f: float) -> np.ndarray:
    n = int(1.5 * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t) + 0.25 * np.sin(2 * np.pi * 2.76 * f * t) * np.exp(-t * 6)) * np.exp(-t / 0.5)


def pad(freqs: list[float], dur: float) -> np.ndarray:
    n = int(dur * SR); t = np.arange(n) / SR
    x = sum(np.sin(2 * np.pi * f * 2 ** (d / 12) * t + rng.uniform(0, 6)) for f in freqs for d in (-0.1, 0.1))
    fade = np.clip(np.minimum(t / 1.5, (dur - t) / 1.5), 0, 1)
    return x / (2 * len(freqs)) * fade


def riser(dur: float) -> np.ndarray:
    n = int(dur * SR); t = np.arange(n) / SR
    x = rng.standard_normal(n)
    out = np.empty(n); acc = 0.0
    cut = 300 * (7000 / 300) ** (t / dur)
    a = np.exp(-2 * np.pi * cut / SR)
    for i in range(n):
        acc = (1 - a[i]) * x[i] + a[i] * acc
        out[i] = acc
    return out * (t / dur) ** 2


def reverb(x: np.ndarray, secs: float = 1.6, mix: float = 0.22) -> np.ndarray:
    n = int(secs * SR)
    ir = rng.standard_normal(n) * np.exp(-np.arange(n) / SR * 6.5 / secs)
    ir /= np.sqrt(np.sum(ir ** 2))
    size = 1 << int(np.ceil(np.log2(len(x) + n)))
    wet = np.fft.irfft(np.fft.rfft(x, size) * np.fft.rfft(ir, size), size)[: len(x)]
    return (1 - mix) * x + mix * wet


def place(buf: np.ndarray, sig: np.ndarray, at: float, gain: float) -> None:
    i = int(at * SR)
    if i >= len(buf):
        return
    j = min(len(buf), i + len(sig))
    buf[i:j] += sig[: j - i] * gain


PRESETS = {
    "heist": {
        "bpm": 96,
        # (raiz do baixo, notas do ostinato) por compasso: Am F Dm E
        "bars": [(45, [69, 72, 76, 72]), (41, [69, 72, 77, 72]), (38, [69, 74, 77, 74]), (40, [68, 71, 76, 71])],
        "pad": [[57, 60, 64], [53, 57, 60], [50, 53, 57], [52, 56, 59]],
    },
    "spark": {
        "bpm": 108,
        # D G Bm A
        "bars": [(38, [74, 78, 81, 78]), (43, [74, 79, 83, 79]), (35, [74, 78, 83, 78]), (45, [73, 76, 81, 76])],
        "pad": [[62, 66, 69], [59, 62, 67], [59, 62, 66], [57, 61, 64]],
    },
}


def build(name: str, total: float) -> np.ndarray:
    cfg = PRESETS[name]
    beat = 60 / cfg["bpm"]
    bar = 4 * beat
    music = np.zeros(int((total + 3) * SR))
    drums = np.zeros_like(music)
    k = 0
    t = 0.0
    while t < total:
        root, notes = cfg["bars"][k % 4]
        # intro sem bateria; depois, a cada 16 compassos, 4 de respiro sem bateria para não cansar
        intro = k < 4 or (k >= 16 and k % 16 >= 12)
        place(music, pad([hz(m) for m in cfg["pad"][k % 4]], bar + 1.0), t, 0.18)
        if name == "heist":
            for i in range(8):  # pizzicato em colcheias
                if intro and i % 2:
                    continue
                place(music, pluck(hz(notes[i % 4]), 0.5, 0.35), t + i * beat / 2, 0.42 if i % 4 == 0 else 0.3)
            for i in range(16):  # tic-tac em semicolcheias
                place(drums, tick(), t + i * beat / 4, 0.16 if i % 4 == 0 else 0.07)
            if not intro:
                for b in (0, 2.5):
                    place(drums, kick(), t + b * beat, 0.55)
                for b in (0, 1.5, 2, 3.5):
                    place(music, bass(hz(root), beat * 0.9), t + b * beat, 0.32)
        else:
            pattern = [0, 0.75, 1.5, 2, 2.75, 3.5]  # síncope
            for j, b in enumerate(pattern):
                place(music, pluck(hz(notes[j % 4]), 0.45, 0.6), t + b * beat, 0.34)
            if k % 2 == 1:
                place(music, glock(hz(notes[2] + 12)), t + 3 * beat, 0.12)
            if not intro:
                for b in range(4):
                    place(drums, kick(), t + b * beat, 0.4)
                for b in (1, 3):
                    place(drums, clap(), t + b * beat, 0.25)
                for i in range(8):
                    place(drums, hat(), t + i * beat / 2 + beat / 4, 0.06)
                for b in (0, 2, 2.75):
                    place(music, bass(hz(root), beat * 0.7), t + b * beat, 0.3)
        if k % 8 == 7:  # riser chegando na volta
            place(music, riser(bar), t, 0.08)
        t += bar
        k += 1
    out = reverb(music) + drums
    out = out[: int(total * SR)]
    n = int(2.0 * SR)
    out[-n:] *= np.linspace(1, 0, n)
    return (out / np.max(np.abs(out)) * 0.5).astype(np.float32)


if __name__ == "__main__":
    path, preset, secs = sys.argv[1], sys.argv[2], float(sys.argv[3])
    x = build(preset, secs)
    sf.write(path, np.stack([x, np.roll(x, int(0.01 * SR))], axis=1), SR, subtype="PCM_24")
    print(path, preset, secs)
