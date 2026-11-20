"""Monta roteiros/prontos/epNN-upload.md a partir do doc do episódio e da linha do tempo real (depois da narração).

Uso: python3 scripts/roteiro/pacote.py ep03 [ep04 …]

- Capítulos com a minutagem real (início de cada "[Part N" e do teaser "Next time").
- Créditos de B-roll atualizados (scripts/imagens/escolher.py epNN --creditos).
- Cards (pedido de inscrição e menção ao Cargo & Capital), tela final e teste interativo com os tempos reais.
- Avisa se a descrição passar de 5.000 caracteres (limite do YouTube).
"""
import glob
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

# Thumb principal escolhida pelo Daniel (as outras duas entram no Test & Compare)
MAIN_THUMB = {'ep03': 'B', 'ep04': 'A', 'ep05': 'C', 'ep06': 'C', 'ep07': 'A', 'ep08': 'B', 'ep09': 'A', 'ep10': 'A', 'ep11': 'A', 'ep12': 'A', 'ep13': 'A'}

# Teste interativo: pergunta, opções (a correta marcada com *), explicação e a frase do roteiro depois da qual ele entra
QUIZ = {
    'ep03': ("What happened to Credit Suisse's AT1 bonds in March 2023?",
             ['They were paid in full', 'They became UBS shares', '*They were written down to zero', 'The Swiss government bought them'],
             'The Swiss regulator ordered about 16 billion francs of AT1 bonds written down to zero, even though shareholders still got something.',
             'written down to zero'),
    'ep04': ('In 2026, about how much did standard savings accounts at the biggest US banks pay?',
             ['*About 0.01% a year', 'About 0.5% a year', 'About 2% a year', 'About 3.9% a year'],
             'Rate trackers listed them at about one hundredth of one percent, while banks could earn about 3.9% at the Fed.',
             'One hundredth of one percent'),
    'ep05': ('How much did Credit Suisse lose on Archegos?',
             ['About $550 million', 'About $1.5 billion', '*About $5.5 billion', 'About $20 billion'],
             'Credit Suisse lost about $5.5 billion, the biggest loss of any bank, after earning about $17.5 million in fees.',
             'five and a half billion'),
    'ep06': ('When you use "pay in four", who usually pays the fee?',
             ['You do', '*The store', 'Your bank', 'Nobody'],
             'The store pays a fee, around 2.5% on average in 2021, so you can split the payment for free.',
             'That fee is the heart'),
    'ep07': ("Where was Wirecard's missing €1.9 billion supposedly held?",
             ['In Germany', 'In Dubai', '*In the Philippines', 'In Singapore'],
             'Wirecard said it was in two Philippine banks. Both said the documents were fake, and the money never entered the country.',
             'One point nine billion euros. That number'),
}


# Fontes tiradas da descrição quando ela passa de 5.000 caracteres (repetem o mesmo fato; a lista completa fica no doc do roteiro)
DROP = {
    'ep03': ['lawyer-monthly', 'credit-suisse-punished', 'news.yahoo.com', 'publiceye', '9000-headcount', 'financemagnates', 'investmentnews',
             'mfsa.mt', 'dlapiper', 'en-20260923-banking', 'business-standard', 'dfpi.ca.gov', 'al-monitor', 'finanzen.at', 'legal500', 'erih.net',
             'alfred-escher.html', 'ubs-voluntarily-terminates'],
    'ep04': ['wealthvieu', 'cranedata', 'wikipedia.org/wiki/Regulation_Q', 'nbcsandiego', 'pymnts.com/legal/2025/capital-ones', 'bloomberglaw',
             'mahoningmatters'],
    'ep05': ['corporatecrimereporter', 'fool.com/investing/2021/04/02', 'federalregister.gov'],
    'ep07': ['history, financial data', 'wiki/Jan_Marsalek', 'eqs-news', 'philstar', 'wiki/Markus_Braun'],
}


def trim_sources(ep, desc):
    if len(desc) <= 5000 or ep not in DROP:
        return desc
    head, rest = desc.split('Sources\n', 1)
    src, tail = rest.split('\n\n', 1)
    keep = []
    for line in src.split('\n'):
        if any(d in line for d in DROP[ep]):
            continue
        name, _, url = line.partition(': http')
        name = re.sub(r'\s*\([^)]*\)', '', name).strip()  # sem os parênteses explicativos
        keep.append(f'{name}: http{url}')
    return head + 'Sources\n' + '\n'.join(keep) + '\n\n' + tail


def tok(s):
    return re.sub(r'[^a-z0-9%$]+', '', s.lower())


def mmss(t):
    return '%d:%02d' % divmod(int(t), 60)


def card_time(t):
    m, s = divmod(int(t), 60)
    return f'{m:02d}:{s:02d}:00'


def main(ep):
    doc = Path(glob.glob(str(ROOT / f'roteiros/rascunhos/{ep}-*.md'))[0]).read_text()
    tl = json.loads((ROOT / f'scripts/remotion/src/{ep}/timeline.json').read_text())
    if tl.get('provisional'):
        raise SystemExit(f'{ep}: linha do tempo ainda é provisória (falta a narração)')
    words = tl['words']
    toks = [tok(w['w']) for w in words]

    def at(phrase, start=0):
        want = [tok(x) for x in phrase.split() if tok(x)]
        for i in range(start, len(toks)):
            if toks[i:i + len(want)] == want:
                return i
        raise SystemExit(f'{ep}: frase não encontrada: {phrase}')

    title = doc.split('\n', 1)[0].split(' — ', 1)[1].strip()
    desc = doc.split('Descrição\n\n```\n', 1)[1].split('\n```', 1)[0]

    # capítulos reais
    names = [re.sub(r'^\d+:\d\d\s+', '', l) for l in desc.split('Chapters\n', 1)[1].split('\n\n', 1)[0].split('\n')]
    starts = [0.0] + [words[at(f'part {n}')]['t'] for n in range(1, 7)] + [words[at('next time')]['t']]
    chapters = '\n'.join(f'{mmss(t)} {n}' for t, n in zip(starts, names))
    desc = re.sub(r'Chapters\n.*?\n\n', 'Chapters\n' + chapters + '\n\n', desc, count=1, flags=re.S)

    # créditos atualizados
    cred = subprocess.run([sys.executable, str(ROOT / 'scripts/imagens/escolher.py'), ep, '--creditos'], capture_output=True, text=True, cwd=ROOT / 'scripts/imagens').stdout.strip()
    if re.search(r'\[créditos:[^\]]*\]', desc):
        desc = re.sub(r'\[créditos:[^\]]*\]', cred, desc)
    elif 'Photos and footage' in desc:
        desc = re.sub(r'Photos and footage\n.*?\n\n(?=This video)', cred + '\n\n', desc, flags=re.S)
    desc = desc.replace(' [ou o bloco de créditos, se entrar B-roll de terceiros]', '')

    desc = trim_sources(ep, desc)

    tags = re.search(r'Tags(?::\s*`([^`]*)`|\n\n```\n(.*?)\n```)', doc, re.S)
    tags = (tags.group(1) or tags.group(2)).strip()
    pin = re.search(r'Comentário fixado(?::\s*`([^`]*)`|\n\n```\n(.*?)\n```)', doc, re.S)
    pin = (pin.group(1) or pin.group(2)).strip()

    total = tl['duration']
    try:
        sub_t = words[at('subscribing helps')]['t']
    except SystemExit:
        sub_t = words[at('videos that follow the money')]['t']
    sister_t = words[at('sister channel')]['t']
    end_t = total - 15

    # thumbs
    thumbs = []
    n = int(ep[2:])
    for v in 'ABC':
        src = ROOT / f'roteiros/rascunhos/thumbs/Thumb{n}{v}.png'
        dst = ROOT / f'roteiros/prontos/thumbs/{ep}-thumb-{v}.png'
        if src.exists() and not dst.exists():
            shutil.copy(src, dst)
        thumbs.append(v)
    main_v = MAIN_THUMB.get(ep, 'A')
    order = [main_v] + [v for v in 'ABC' if v != main_v]

    quiz = ''
    if ep in QUIZ:
        q, opts, why, phrase = QUIZ[ep]
        qt = words[at(phrase)]['end'] + 8
        lines = '\n'.join(f'- {o[1:]} ← correta' if o.startswith('*') else f'- {o}' for o in opts)
        quiz = f'\n## Teste interativo (opcional)\n\nPergunta: {q}\n{lines}\n\nExplicação: {why}\n\nMomento: ~{mmss(qt)}\n'

    warn = '' if len(desc) <= 5000 else f'\n**ATENÇÃO: {len(desc)} caracteres, acima do limite de 5.000. Encurtar as fontes antes de colar.**\n'
    md = f'''# Ep. {n} — pacote de upload

Tudo pronto para colar no YouTube Studio. Capítulos com a minutagem real da narração.
Vídeo: `out/{ep}-final.mp4` (cópia menor para envio: `out/{ep}-final-envio.mp4`) · {mmss(total)} · 1920×1080 · 30 fps · −14 LUFS. Legenda: `{ep}.srt` (nesta pasta).
{warn}
## Título

{title}

## Thumbnails (Test & Compare, "Somente miniatura")

Ordem: {", ".join(f"**{v}**" if v == main_v else v for v in order)} (a primeira é a principal). Arquivos: `thumbs/{ep}-thumb-A.png`, `-B.png`, `-C.png`.

## Descrição

Trocar `[link do canal]` pelo link do Cargo & Capital. Tamanho: {len(desc)} caracteres (limite 5.000).

```
{desc}
```

## Tags

```
{tags}
```

## Comentário fixado

```
{pin}
```
{quiz}
## Configurações no Studio

| Campo | O que marcar |
| --- | --- |
| Categoria | Education |
| Idioma do vídeo e do título | English |
| Legendas | Enviar `{ep}.srt` (inglês) |
| Público | Não é conteúdo para crianças |
| Conteúdo alterado ou sintético | Não |
| Promoção paga | Não |
| Tela final | De {mmss(end_t)} até o fim: inscrição + o episódio anterior |
| Cards (formato MM:SS:QQ) | {card_time(sub_t + 2)} → o episódio anterior; {card_time(sister_t)} → canal Cargo & Capital |
'''
    (ROOT / f'roteiros/prontos/{ep}-upload.md').write_text(md)
    print(ep, 'ok', len(desc), 'caracteres', '· capítulos:', ' / '.join(mmss(t) for t in starts))


if __name__ == '__main__':
    for e in sys.argv[1:]:
        main(e)
