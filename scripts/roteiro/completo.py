"""Gera narracoes/epNN-completo.txt: o roteiro inteiro num bloco só, para gerar o episódio num áudio único.

O Dark Planner Basic aceita até 80 mil caracteres por áudio (15 áudios por dia); um episódio tem 10 a 15 mil.
Uso: python3 scripts/roteiro/completo.py ep03 [ep04 …]
Depois de gerar no Dark Planner, salvar como media/epNN/epNN.mp3 (o montar_episodio.py usa esse arquivo no lugar dos blocos).
"""
import glob
import re
import sys

for ep in sys.argv[1:]:
    text = open(f'roteiros/rascunhos/fonte/{ep}-roteiro.txt').read().strip()
    doc = (glob.glob(f'roteiros/rascunhos/{ep}-*.md') or [None])[0]
    pron = ''
    if doc:
        m = re.search(r'^Pronúncia: .*$', open(doc).read(), re.M)
        pron = m.group(0).replace('*', '') if m else ''
    title = text.split('\n', 1)[0]
    head = [f'EP. {int(ep[2:])} — {title}',
            'Dark Planner: voz Lucan Rook – Energetic Male · Multilingual v2 · velocidade 1.0x · style 40% · legenda desligada',
            f'Colar TUDO abaixo da linha num áudio só ({len(text):,} caracteres; limite do plano: 80.000) e salvar como {ep}.mp3'.replace(',', '.')]
    if pron:
        head.append(pron)
    out = '\n'.join(head) + '\n\n' + '=' * 70 + '\n\n' + text + '\n'
    open(f'narracoes/{ep}-completo.txt', 'w').write(out)
    print(ep, len(text), 'caracteres')
