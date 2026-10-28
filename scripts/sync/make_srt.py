"""Gera a legenda .srt em inglês a partir das palavras com tempo (transcrição corrigida).

Uso (na raiz do repositório): python scripts/sync/make_srt.py
Entrada: media/ep01/opener.words.json (abertura) + scripts/remotion/src/ep01/timeline.json (resto)
Saída:   roteiros/prontos/ep01.srt
Cada legenda tem até 2 linhas de ~42 caracteres e quebra em pontuação ou em pausas acima de 0,45 s.
"""
import json
import re
from pathlib import Path

FIXES = [
    (r"\bRobin Hood('s)?\b", r"Robinhood\1"), (r"\bVirtue\b", "Virtu"), (r"\bidle cache\b", "idle cash"),
    (r"\bMarket Makers\b", "market makers"), (r"\bPayment for Order Flow\b", "payment for order flow"),
    (r"\bper cent\b", "percent"), (r"\bbillions and bulls\b", "Billions and Bulls"),
    (r"\bPart two\b", "Part 2"), (r"\bpart four\b", "Part 4"), (r"\bon Part 4", "Part 4"), (r"\bthe public, quote\b", "the public quote"),
]
MAXC = 42


def words():
    op = json.loads(Path("media/ep01/opener.words.json").read_text())["words"]
    tl = json.loads(Path("scripts/remotion/src/ep01/timeline.json").read_text())["words"]
    return [{"w": w["w"], "t": w["start"], "end": w["end"]} for w in op] + [{"w": w["w"], "t": w["t"], "end": w["end"]} for w in tl]


def ts(s: float) -> str:
    ms = int(round(s * 1000))
    return f"{ms // 3600000:02}:{ms // 60000 % 60:02}:{ms // 1000 % 60:02},{ms % 1000:03}"


def main() -> None:
    W = words()
    cues, cur = [], []
    for i, w in enumerate(W):
        cur.append(w)
        text = " ".join(x["w"] for x in cur)
        nxt = W[i + 1] if i + 1 < len(W) else None
        gap = (nxt["t"] - w["t"]) if nxt else 9
        end_sentence = w["w"][-1:] in ".?!"
        if nxt is None or len(text) > 2 * MAXC - 10 or (end_sentence and len(text) > 20) or gap > 1.2 or (w["w"][-1:] in ",:" and len(text) > 50):
            cues.append(cur)
            cur = []
    out = []
    for n, c in enumerate(cues, 1):
        text = " ".join(x["w"] for x in c)
        for a, b in FIXES:
            text = re.sub(a, b, text)
        if len(text) > MAXC:  # quebra em 2 linhas perto do meio
            mid = len(text) // 2
            cut = min((abs(m.start() - mid), m.start()) for m in re.finditer(" ", text))[1]
            text = text[:cut] + "\n" + text[cut + 1:]
        start = c[0]["t"]
        end = min(c[-1]["t"] + max(0.4, c[-1]["end"] - c[-1]["t"]) + 0.25, cues[n][0]["t"] - 0.05 if n < len(cues) else 1e9)
        out.append(f"{n}\n{ts(start)} --> {ts(end)}\n{text}\n")
    Path("roteiros/prontos/ep01.srt").write_text("\n".join(out), encoding="utf-8")
    print(len(out), "legendas")


if __name__ == "__main__":
    main()
