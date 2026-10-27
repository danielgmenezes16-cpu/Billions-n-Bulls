"""Ep. 1, Bloco B: corta o som solto do início e troca "401 million" pela frase regravada.

Entrada: media/ep01/ep01-B.mp3 e media/ep01/ep01-B-fix.mp3
Saída:   media/ep01/ep01-B-edit.wav (44,1 kHz, mono)
Pontos de corte medidos com silencedetect (-40 dB) em 27/10/2026.
"""
import subprocess
import numpy as np
import soundfile as sf

SR = 44100
SRC, FIX, OUT = "media/ep01/ep01-B.mp3", "media/ep01/ep01-B-fix.mp3", "media/ep01/ep01-B-edit.wav"

HEAD_TRIM = 0.32            # som solto antes de "Part 3"
CUT_IN, CUT_OUT = 100.40, 103.60   # meio das pausas em volta da frase errada
GAP_BEFORE = 100.606 - CUT_IN      # silêncio original antes de "It"
GAP_AFTER = CUT_OUT - 103.336      # silêncio original depois de "it."
FIX_SPEECH = (0.1065, 4.3126)      # fala dentro do arquivo regravado
FIX_GAIN_DB = -2.6                 # a regravação veio 2,6 LU mais alta


def load(path: str) -> np.ndarray:
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).copy()


def fade(x: np.ndarray, ms: float = 10) -> np.ndarray:
    n = int(SR * ms / 1000)
    x[:n] *= np.linspace(0, 1, n)
    x[-n:] *= np.linspace(1, 0, n)
    return x


def sec(t: float) -> int:
    return int(round(t * SR))


b, f = load(SRC), load(FIX)
fix = fade(f[sec(FIX_SPEECH[0]):sec(FIX_SPEECH[1])] * 10 ** (FIX_GAIN_DB / 20))
silence = lambda t: np.zeros(sec(t), dtype=np.float32)
out = np.concatenate([
    fade(b[sec(HEAD_TRIM):sec(CUT_IN)], 20),
    silence(GAP_BEFORE), fix, silence(GAP_AFTER),
    fade(b[sec(CUT_OUT):]),
])
sf.write(OUT, out, SR, subtype="PCM_24")
print(f"{OUT}: {len(out) / SR:.2f} s (original {len(b) / SR:.2f} s)")
