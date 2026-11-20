"""Confere as cenas de um episódio sem renderizar (scripts/remotion/src/epNN/EpNN.tsx + timeline.json).

Uso: python3 scripts/remotion/checar_cenas.py ep08 [ep09 …]

Imita epkit/cues.ts e avisa quando:
- uma frase de add() ou c.f() não existe no roteiro, na ordem;
- um c.f() cai depois do fim da cena (o item nunca aparece);
- num card(), a frase de destaque (hero) só entra no último 0,8 s da cena ou depois dela. Acontece quando o texto da tela
  tem palavras fora da ordem da narração: o sincronizador casa uma delas mais adiante e empurra o resto;
- uma cena (fora a primeira) começa dentro do título falado (a frase dela também aparece no título);
- o apoio de um card() passa de 62 caracteres (o card não quebra linha e o texto vaza pelas bordas);
- um card() usa o objeto 'receipt' ou 'phone' fora do ep. 1 (os dois têm texto fixo do ep. 1).
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent / 'src'
FPS = 30
AUDIO_OFFSET = 10 / FPS
STR = r"""'((?:\\.|[^'\\])*)'|"((?:\\.|[^"\\])*)\""""
tok = lambda s: re.sub(r'[^a-z0-9%$]+', '', s.lower())


def unq(m, a=1):
    v = m.group(a) if m.group(a) is not None else m.group(a + 1)
    return v.replace("\\'", "'").replace('\\"', '"')


def check(ep):
    d = ROOT / ep
    src = (d / f'{ep.capitalize()}.tsx').read_text()
    tl = json.loads((d / 'timeline.json').read_text())
    W = tl['words']
    toks = [tok(w['w']) for w in W]
    problems = []

    def find(phrase, frm):
        want = [tok(x) for x in phrase.split() if tok(x)]
        for i in range(frm, len(toks)):
            if toks[i:i + len(want)] == want:
                return i
        return None

    # cenas: texto de cada add(...) até o próximo
    adds = [(m.start(), unq(m)) for m in re.finditer(r'\badd\(\s*(?:' + STR + ')', src)]
    scenes = []
    cur = 0
    for k, (pos, phrase) in enumerate(adds):
        i = find(phrase, cur)
        if i is None:
            problems.append(f'cena "{phrase}": frase não encontrada')
            continue
        cur = i
        body = src[pos:adds[k + 1][0] if k + 1 < len(adds) else len(src)]
        scenes.append({'phrase': phrase, 'i': i, 'body': body})
    for k, s in enumerate(scenes):
        s['t0'] = W[s['i']]['t']
        s['t1'] = (W[scenes[k + 1]['i'] - 1]['end'] + W[scenes[k + 1]['i']]['t']) / 2 if k + 1 < len(scenes) else tl['duration']

    # título falado: nenhuma cena além da primeira pode começar dentro dele
    fonte = ROOT.parent.parent.parent / f'roteiros/rascunhos/fonte/{ep}-roteiro.txt'
    n_title = len([w for w in fonte.read_text().split('\n', 1)[0].split() if tok(w)]) if fonte.exists() else 0
    for k, s in enumerate(scenes):
        if k > 0 and s['i'] < n_title:
            problems.append(f'cena "{s["phrase"]}": começa dentro do título falado (a frase também aparece no título; alongar a frase)')
    for s in scenes:
        # c.f() dentro da cena
        for m in re.finditer(r'\bc\.f\(\s*(?:' + STR + ')', s['body']):
            ph = unq(m)
            j = find(ph, s['i'])
            if j is None:
                problems.append(f'cena "{s["phrase"]}": c.f("{ph}") não encontrada depois do início da cena')
            elif W[j]['t'] > s['t1']:
                problems.append(f'cena "{s["phrase"]}": c.f("{ph}") cai {W[j]["t"] - s["t1"]:.1f} s depois do fim da cena')
        # card(): sincronia das palavras
        cm = re.search(r'\bcard\(\{(.*?)\}\)', s['body'], re.S)
        if not cm:
            continue
        props = cm.group(1)
        get = lambda key: (lambda m: unq(m) if m else '')(re.search(key + r':\s*(?:' + STR + ')', props))
        apoio, hero, comp = get('apoio'), get('hero'), get('complemento')
        obj = re.search(r"object:\s*'(\w+)'", props)
        if obj and obj.group(1) in ('receipt', 'phone') and ep != 'ep01':
            problems.append(f'card "{s["phrase"]}": objeto "{obj.group(1)}" tem texto fixo do ep. 1 (TRADE CONFIRMATION / Market order); usar coin, chart, card ou none')
        if len(apoio) > 62:
            problems.append(f'card "{s["phrase"]}": apoio com {len(apoio)} caracteres (máx. ~62): "{apoio}"')
        words = [('a', w) for w in apoio.split()] + [('h', w) for w in hero.split()] + [('c', w) for w in comp.split()]
        i = s['i']
        cues = []
        for part, dw in words:
            dt = tok(dw)
            prev = cues[-1][1] if cues else W[i]['t'] - AUDIO_OFFSET
            if not dt:
                cues.append((part, prev + 0.18))
                continue
            j = i
            while j < len(toks) and j < i + 25 and toks[j] != dt:
                j += 1
            if j < len(toks) and j < i + 25:
                cues.append((part, W[j]['t'] - AUDIO_OFFSET))
                i = j + 1
            else:
                cues.append((part, prev + 0.18))
        hero_t = next((t for p, t in cues if p == 'h'), None)
        if hero_t is not None and hero_t > s['t1'] - 0.8:
            problems.append(f'card "{s["phrase"]}": o destaque "{hero}" entra {hero_t - s["t1"]:+.1f} s em relação ao fim da cena')
        late = [w for (p, t), (_, w) in zip(cues, words) if t > s['t1']]
        if late and not (hero_t is not None and hero_t > s['t1'] - 0.8):
            problems.append(f'card "{s["phrase"]}": palavras depois do fim da cena: {" ".join(late)}')
    print(f'{ep}: ' + ('ok' if not problems else f'{len(problems)} problema(s)'))
    for p in problems:
        print('  -', p)
    return not problems


if __name__ == '__main__':
    ok = all([check(e) for e in sys.argv[1:]])
    sys.exit(0 if ok else 1)
