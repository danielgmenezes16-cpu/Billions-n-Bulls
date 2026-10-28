"""Mixa uma prévia de 30 s: narração do Bloco A do ep. 1 + trilha + efeitos sincronizados nas palavras.

Uso (na raiz do repositório): python scripts/audio/mix_preview.py <trilha.wav> <saida.mp3>
Precisa de media/sfx/ (gerado por sfx_show.py) e media/ep01/ep01-A.mp3.
"""
import subprocess, sys, numpy as np, soundfile as sf
SR = 44100
def load(path, lufs=None, t=None):
    af = []
    if lufs is not None: af.append(f"loudnorm=I={lufs}:TP=-1.5")
    cmd = ["ffmpeg", "-v", "error"] + (["-t", str(t)] if t else []) + ["-i", path] + (["-af", ",".join(af)] if af else []) + ["-ac", "2", "-ar", str(SR), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, dtype=np.float32).reshape(-1, 2).copy()
music_path, out = sys.argv[1], sys.argv[2]
VOFF = 0.3
total = 32.0
voice = load("media/ep01/ep01-A.mp3", -15, 31)
music = load(music_path, -29)
mix = np.zeros((int(total * SR), 2), np.float32)
v0 = int(VOFF * SR); mix[v0:v0 + len(voice)] += voice[: len(mix) - v0]
# ducking: música baixa ~4 dB quando a voz fala
env = np.zeros(len(mix)); vv = np.abs(voice[:, 0]); w = int(0.05 * SR)
sm = np.convolve(vv, np.ones(w) / w, mode="same"); env[v0:v0 + len(sm)] = sm[: len(env) - v0]
active = np.clip(env / 0.02, 0, 1)
active = np.convolve(active, np.ones(int(0.2 * SR)) / int(0.2 * SR), mode="same")
gain = 10 ** (-4 * active / 20)
# a música para antes de "Here's what that looks like" (28.49) e volta no "Imagine" (30.25)
t = np.arange(len(mix)) / SR
drop = np.ones(len(mix))
a, b = VOFF + 28.20, VOFF + 30.15
drop[(t >= a) & (t < b)] = 0
fade = int(0.06 * SR); i0 = int(a * SR); drop[i0 - fade:i0] = np.linspace(1, 0, fade)
m = music[: len(mix)]
mix[: len(m)] += m * (gain[: len(m)] * drop[: len(m)])[:, None]
def sfx(name, at, db=0):
    x, sr = sf.read(f"media/sfx/{name}.wav", dtype="float32")
    x = np.stack([x, x], 1) * 10 ** (db / 20); i = int((at + VOFF) * SR); j = min(len(mix), i + len(x)); mix[i:j] += x[: j - i]
sfx("hit", 0.0, -2); sfx("ding", 0.88); sfx("pop", 3.30); sfx("swell", 9.09 - 1.6); sfx("hit", 14.45, -8)
sfx("ding", 25.04, -3); sfx("counter", 26.08); sfx("hit", 30.25, -10)
mix[-int(1.5 * SR):] *= np.linspace(1, 0, int(1.5 * SR))[:, None]
mix = np.clip(mix / max(1, np.max(np.abs(mix)) / 0.89), -1, 1)
p = subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", "-c:a", "libmp3lame", "-b:a", "192k", out], input=mix.tobytes(), check=True)
print(out)
