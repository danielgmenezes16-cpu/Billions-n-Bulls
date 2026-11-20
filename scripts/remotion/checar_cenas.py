"""Confere as cenas de um episódio sem renderizar (scripts/remotion/src/epNN/EpNN.tsx + timeline.json).

Uso: python3 scripts/remotion/checar_cenas.py ep08 [ep09 …]

Imita epkit/cues.ts e avisa quando:
- uma frase de add() ou c.f() não existe no roteiro, na ordem;
- um c.f() cai depois do fim da cena (o item nunca aparece) ou no último 1 s dela (mal aparece);
- num card(), a frase de destaque (hero) só entra no último 0,8 s da cena ou depois dela. Acontece quando o texto da tela
  tem palavras fora da ordem da narração: o sincronizador casa uma delas mais adiante e empurra o resto;
- uma cena (fora a primeira) começa dentro do título falado (a frase dela também aparece no título);
- o apoio de um card() passa de 62 caracteres (o card não quebra linha e o texto vaza pelas bordas);
- um card() usa o objeto 'receipt' ou 'phone' fora do ep. 1 (os dois têm texto fixo do ep. 1);
- num card(), o texto passa da largura que cabe na tela (ou antes do objeto ao lado);
- a última palavra de um card() entra a menos de 0,5 s do fim da cena (mal dá para ler).
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


# largura de cada caractere do destaque (Inter Bold, caixa alta), em fração do corpo; confere com os quadros renderizados (±2%)
EM = dict(zip('ABCDEFGHIJKLMNOPQRSTUVWXYZ', [.70, .66, .70, .72, .56, .54, .74, .73, .28, .50, .68, .55, .88, .74, .76, .65, .76, .66, .62, .60, .72, .70, .98, .68, .66, .60]))
EM.update({c: .64 for c in '0123456789'})
EM.update({' ': .28, '.': .27, ',': .27, ':': .30, ';': .30, "'": .25, '’': .25, '"': .42, '“': .42, '”': .42, '!': .30, '?': .55, '-': .40,
           '–': .60, '—': .90, '$': .64, '€': .66, '£': .64, '%': .85, '~': .60, '+': .62, '&': .72, '(': .36, ')': .36, '/': .40,
           '×': .55, '≈': .62, '≥': .62, '¢': .62, '#': .70, '=': .62})
em_width = lambda t: sum(EM.get(ch, .55 if ch.islower() else .62) for ch in t)


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
            elif W[j]['t'] > s['t1'] - 1.0:
                problems.append(f'cena "{s["phrase"]}": c.f("{ph}") entra só {s["t1"] - W[j]["t"]:.2f} s antes do fim da cena (mal dá para ler); '
                                'apontar para uma frase um pouco antes')
        # card(): sincronia das palavras
        cm = re.search(r'\bcard\(\{(.*?)\}\)', s['body'], re.S)
        if not cm:
            continue
        props = cm.group(1)
        get = lambda key: (lambda m: unq(m) if m else '')(re.search(key + r':\s*(?:' + STR + ')', props))
        apoio, hero, comp = get('apoio'), get('hero'), get('complemento')
        obj = re.search(r"object:\s*'(\w+)'", props)
        side = re.search(r"textSide:\s*'(\w+)'", props)
        hs = re.search(r'heroSize:\s*(\d+)', props)
        hs = int(hs.group(1)) if hs else 120
        if not obj or obj.group(1) == 'none' or (side and side.group(1) == 'center'):
            # sem objeto o card fica centralizado (Card.tsx)
            lim = 1720  # ~100 px de margem em cada lado
            for nome, w in (('destaque', em_width(hero) * hs), ('apoio', len(apoio) * 22), ('complemento', len(comp) * 22)):
                if w > lim:
                    problems.append(f'card "{s["phrase"]}": {nome} com ~{w:.0f} px (limite ~{lim}, centralizado); encurtar ou reduzir heroSize')
        if obj and side and obj.group(1) != 'none' and side.group(1) in ('left', 'right'):
            # largura estimada (Inter Bold em caixa alta ~0,6 em por letra; apoio e complemento ~22 px por letra)
            hero_w, apoio_w, comp_w = em_width(hero) * hs, len(apoio) * 22, len(comp) * 22
            if side.group(1) == 'right':
                lim = 900  # texto começa em ~900 px e deriva até ~42 px para a direita
            elif obj.group(1) == 'chart':
                lim = 1300  # as barras sobem à direita a partir de ~1.140 px; o complemento, alinhado à direita do destaque, não pode encostar nelas
            else:
                lim = 1040  # moeda ou cartão: a borda deles fica em ~1.270 px no fim da cena; o texto começa em 228 e deriva até ~42 px
            for nome, w in (('destaque', hero_w), ('apoio', apoio_w), ('complemento', comp_w)):
                if w > lim:
                    problems.append(f'card "{s["phrase"]}": {nome} com ~{w:.0f} px ao lado do objeto "{obj.group(1)}" (limite ~{lim}); encurtar, reduzir heroSize ou usar textSide center + object none')
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
        elif cues and not late and cues[-1][1] > s['t1'] - 0.5:
            # palavras que não estão na narração entram 0,18 s depois da anterior: várias no fim do card mal aparecem
            problems.append(f'card "{s["phrase"]}": a última palavra ("{words[-1][1]}") fica só {s["t1"] - cues[-1][1]:.2f} s na tela; '
                            'pôr o texto na ordem e com as palavras da narração, ou tirar as que ela não fala')
    print(f'{ep}: ' + ('ok' if not problems else f'{len(problems)} problema(s)'))
    for p in problems:
        print('  -', p)
    return not problems


if __name__ == '__main__':
    ok = all([check(e) for e in sys.argv[1:]])
    sys.exit(0 if ok else 1)
