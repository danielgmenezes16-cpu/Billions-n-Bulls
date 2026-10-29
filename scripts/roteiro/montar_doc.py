"""Monta o doc do episódio a partir do roteiro (.txt) e de um modelo (.md).

Uso: python3 montar_doc.py roteiro.txt modelo.md saida.md epNN capitulos.txt fontes.tsv

- Corta o roteiro em blocos para o Dark Planner: abertura + Parte 1, uma parte
  por bloco, Parte 6 + fechamento.
- Estima os capítulos pelo ritmo real do ep. 1 (601 s para 1.580 palavras).
- Placeholders no modelo: {NB} {CHARS} {DUR} {BLOCKS} {CHAPTERS} {SOURCES_DESC} {SOURCES_LIST}
- capitulos.txt: um nome por linha (abertura, 6 partes, próximo episódio).
- fontes.tsv: "nome<TAB>url" por linha.
"""
import re
import sys

SEC_PER_WORD = 601 / 1580


def wc(s):
    return len(re.sub(r'<break[^>]*/>', '', s).split())


def main(script, template, out, ep, chapters_file, sources_file):
    t = open(script).read().strip()
    title, rest = t.split('\n', 1)
    parts = re.split(r'\n(?=\[Part \d)', rest)
    opening, ps = parts[0], parts[1:]
    last = ps[-1]
    i = last.rfind('<break time="1.5s" />')
    ps[-1], close = last[:i].rstrip(), last[i:].strip()

    blocks = [('A', 'Abertura e Parte 1', title + '\n' + opening.rstrip() + '\n\n' + ps[0].rstrip())]
    for k, (letter, p) in enumerate(zip('BCDE', ps[1:5])):
        blocks.append((letter, f'Parte {k + 2}', p.rstrip()))
    blocks.append(('F', 'Parte 6 e fechamento', ps[5] + '\n\n' + close))

    fmt = lambda n: f'{n:,}'.replace(',', '.')
    text = [f'Bloco {l}: {n} ({fmt(len(b))} caracteres) → `{ep}-{l}.mp3`\n\n```\n{b}\n```' for l, n, b in blocks]
    total = sum(wc(b) for *_, b in blocks) * SEC_PER_WORD
    chars = sum(len(b) for *_, b in blocks)

    names = [l.strip() for l in open(chapters_file) if l.strip()]
    starts, cum = [0.0], wc(title + opening) * SEC_PER_WORD
    for p in ps:
        starts.append(cum)
        cum += wc(p) * SEC_PER_WORD
    starts.append(cum + wc(close.split('Next time')[0]) * SEC_PER_WORD)
    chapters = '\n'.join('%d:%02d %s' % (*divmod(int(s), 60), n) for s, n in zip(starts, names))

    src = [l.rstrip('\n').split('\t') for l in open(sources_file) if l.strip()]
    doc = open(template).read()
    for k, v in {
        '{NB}': str(len(blocks)),
        '{CHARS}': fmt(chars),
        '{DUR}': '%d min %02d s' % divmod(int(total), 60),
        '{BLOCKS}': '\n\n'.join(text),
        '{CHAPTERS}': chapters,
        '{SOURCES_DESC}': '\n'.join(f'{n}: {u}' for n, u in src),
        '{SOURCES_LIST}': '\n'.join(f'- [{n}]({u})' for n, u in src),
    }.items():
        doc = doc.replace(k, v)
    open(out, 'w').write(doc)
    print(chapters)
    print('total', '%d:%02d' % divmod(int(total), 60), 'chars', chars, [len(b) for *_, b in blocks])


if __name__ == '__main__':
    main(*sys.argv[1:])
