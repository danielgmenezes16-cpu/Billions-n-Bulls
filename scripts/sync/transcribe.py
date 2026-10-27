"""Transcreve uma narração e mede o tempo de cada palavra (sherpa-onnx + Parakeet TDT 0.6B v2).

Uso:
    python transcribe.py <audio> <saida.json> --model <pasta do modelo parakeet>

O áudio é cortado nas pausas (silencedetect do ffmpeg) em trechos de até ~12 s,
para o modelo não receber arquivos longos demais. Os tempos voltam somados ao
início de cada trecho.

Saída: {"duration": s, "words": [{"w": "When", "start": 0.12, "end": 0.31}, ...]}

Instalação (uma vez por ambiente):
    pip install sherpa-onnx soundfile numpy
    Modelo: https://huggingface.co/csukuangfj/sherpa-onnx-nemo-parakeet-tdt-0.6b-v2-int8
    (encoder.int8.onnx, decoder.int8.onnx, joiner.int8.onnx, tokens.txt numa pasta só)

Trechos maiores que ~12 s fazem o modelo pular frases inteiras. Para conferir um
número suspeito, transcrever o mesmo trecho também com o Whisper small
(csukuangfj/sherpa-onnx-whisper-small) e comparar.
"""
import argparse
import json
import re
import subprocess
import tempfile
from pathlib import Path

import numpy as np
import sherpa_onnx
import soundfile as sf

SR = 16000
MAX_CHUNK = 12.0


def to_wav(src: Path, dst: Path) -> None:
    subprocess.run(
        ["ffmpeg", "-v", "error", "-y", "-i", str(src), "-ac", "1", "-ar", str(SR), str(dst)],
        check=True,
    )


def silence_midpoints(wav: Path) -> list[float]:
    out = subprocess.run(
        ["ffmpeg", "-hide_banner", "-i", str(wav), "-af", "silencedetect=n=-35dB:d=0.35", "-f", "null", "-"],
        capture_output=True, text=True,
    ).stderr
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", out)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", out)]
    return [(s + e) / 2 for s, e in zip(starts, ends)]


def chunk_bounds(duration: float, cuts: list[float]) -> list[tuple[float, float]]:
    bounds, start = [], 0.0
    while duration - start > MAX_CHUNK:
        candidates = [c for c in cuts if start + 3 < c <= start + MAX_CHUNK]
        cut = candidates[-1] if candidates else start + MAX_CHUNK
        bounds.append((start, cut))
        start = cut
    bounds.append((start, duration))
    return bounds


def recognizer(model: Path) -> sherpa_onnx.OfflineRecognizer:
    return sherpa_onnx.OfflineRecognizer.from_transducer(
        encoder=str(model / "encoder.int8.onnx"),
        decoder=str(model / "decoder.int8.onnx"),
        joiner=str(model / "joiner.int8.onnx"),
        tokens=str(model / "tokens.txt"),
        model_type="nemo_transducer",
        num_threads=4,
    )


def words_from(result, offset: float, chunk_end: float) -> list[dict]:
    words: list[dict] = []
    for tok, t in zip(result.tokens, result.timestamps):
        t = offset + float(t)
        if tok.startswith(" ") or not words:
            words.append({"w": tok.strip(), "start": round(t, 3)})
        else:
            words[-1]["w"] += tok
    for i, w in enumerate(words):
        nxt = words[i + 1]["start"] if i + 1 < len(words) else chunk_end
        w["end"] = round(min(nxt, w["start"] + 1.2), 3)
    return [w for w in words if w["w"]]


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("audio", type=Path)
    ap.add_argument("out", type=Path)
    ap.add_argument("--model", type=Path, required=True)
    args = ap.parse_args()

    with tempfile.TemporaryDirectory() as tmp:
        wav = Path(tmp) / "a.wav"
        to_wav(args.audio, wav)
        samples, _ = sf.read(wav, dtype="float32")
        duration = len(samples) / SR
        rec = recognizer(args.model)
        words = []
        for start, end in chunk_bounds(duration, silence_midpoints(wav)):
            stream = rec.create_stream()
            stream.accept_waveform(SR, np.ascontiguousarray(samples[int(start * SR):int(end * SR)]))
            rec.decode_stream(stream)
            words += words_from(stream.result, start, end)

    args.out.write_text(json.dumps({"duration": round(duration, 3), "words": words}, ensure_ascii=False, indent=1))
    print(f"{len(words)} palavras · {duration:.1f} s → {args.out}")


if __name__ == "__main__":
    main()
