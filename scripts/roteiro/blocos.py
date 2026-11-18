"""Gera narracoes/epNN-blocos.txt a partir do doc do episódio (roteiros/rascunhos/epNN-*.md).

Uso: python3 scripts/roteiro/blocos.py epNN
"""
import glob
import re
import sys

ep = sys.argv[1]
doc = glob.glob(f'roteiros/rascunhos/{ep}-*.md')[0]
s = open(doc).read()
title = re.search(r'^# Episódio \d+ — (.+)$', s, re.M).group(1)
n = int(ep[2:])
fmt = lambda k: f'{k:,}'.replace(',', '.')
out = [f'EP. {n} — {title}',
       'Dark Planner: voz Lucan Rook – Energetic Male · Multilingual v2 · velocidade 1.0x · style 40% · legenda desligada',
       f'Gerar cada bloco separado e salvar como {ep}-A.mp3 … {ep}-F.mp3', '']
for l, name, b in re.findall(r'Bloco ([A-F]): ([^(]+?) \([\d.]+ caracteres\) → `[^`]+`\n\n```\n(.*?)\n```', s, re.S):
    bar = '=' * 70
    out += [bar, f'BLOCO {l} — {name} ({fmt(len(b))} caracteres) → salvar como {ep}-{l}.mp3', bar, '', b, '']
open(f'narracoes/{ep}-blocos.txt', 'w').write('\n'.join(out))
print(doc, '→', f'narracoes/{ep}-blocos.txt')
