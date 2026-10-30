"""Busca imagens e vídeos com licença livre para B-roll e monta uma folha de contato.

Uso:
  python3 buscar.py ep02 p1-terminal "contactless payment terminal" [--fonte openverse|loc|pixabay|pixabay-video] [--n 12]

Saída (media/ fica fora do git):
  media/imagens/ep02/candidatos/p1-terminal/NN.jpg   miniaturas numeradas
  media/imagens/ep02/candidatos/p1-terminal/lista.json  metadados de cada candidato
  media/imagens/ep02/candidatos/p1-terminal-folha.jpg   folha de contato para revisar de uma vez

Depois de revisar, escolha com escolher.py (baixa em alta e registra o crédito).

Licenças aceitas (o resto é descartado na busca):
  - Openverse (Wikimedia Commons, Flickr…): CC0, Public Domain Mark, CC BY. Nada de BY-SA, NC ou ND.
  - Library of Congress: só itens com "No known restrictions".
  - Pixabay: Pixabay Content License (uso comercial sem atribuição; mesmo assim registramos o crédito).
Chave do Pixabay: variável PIXABAY_KEY ou o arquivo ~/.config/bnb/pixabay_key (nunca no repositório).
"""
import argparse
import json
import os
import pathlib
import subprocess
import urllib.parse

ROOT = pathlib.Path(__file__).resolve().parents[2]
OK_LICENSES = {'cc0', 'pdm', 'by'}


def get(url, out=None, timeout=60):
    cmd = ['curl', '-sS', '-L', '--max-time', str(timeout), '-A', 'BillionsAndBulls-research/0.1 (github.com/danielgmenezes16-cpu/Billions-n-Bulls)']
    if out:
        cmd += ['-o', str(out)]
    r = subprocess.run(cmd + [url], capture_output=True, text=not out)
    if r.returncode != 0:
        raise RuntimeError(f'curl falhou ({r.returncode}) em {url[:80]}: {r.stderr}')
    return r.stdout


def get_json(url, tries=4):
    import time
    for i in range(tries):
        try:
            return json.loads(get(url))
        except (ValueError, RuntimeError):
            if i == tries - 1:
                raise
            time.sleep(3 * (i + 1))


def pixabay_key():
    k = os.environ.get('PIXABAY_KEY')
    f = pathlib.Path.home() / '.config/bnb/pixabay_key'
    if not k and f.exists():
        k = f.read_text().strip()
    if not k:
        raise SystemExit('Sem chave do Pixabay: defina PIXABAY_KEY ou crie ~/.config/bnb/pixabay_key')
    return k


def openverse(q, n):
    url = 'https://api.openverse.org/v1/images/?' + urllib.parse.urlencode(
        {'q': q, 'license': ','.join(sorted(OK_LICENSES)), 'aspect_ratio': 'wide', 'page_size': min(n, 20), 'mature': 'false'})
    d = get_json(url)
    out = []
    for r in d.get('results', []):
        if r['license'] not in OK_LICENSES:
            continue
        lic = {'cc0': 'CC0', 'pdm': 'Public domain', 'by': f"CC BY {r.get('license_version', '')}".strip()}[r['license']]
        full = r['url']
        thumb = full
        if 'upload.wikimedia.org/wikipedia/commons/' in full and '/thumb/' not in full:
            # miniatura do próprio Commons: bem mais rápida que a do Openverse
            rest = full.split('/wikipedia/commons/')[1]
            name = rest.split('/')[-1]
            thumb = f'https://upload.wikimedia.org/wikipedia/commons/thumb/{rest}/640px-{name}' + ('.jpg' if name.lower().endswith(('.tif', '.tiff')) else '')
        out.append({
            'kind': 'image', 'thumb': thumb, 'full': full, 'w': r.get('width'), 'h': r.get('height'),
            'title': r.get('title', ''), 'creator': r.get('creator') or 'unknown', 'license': lic, 'license_url': r.get('license_url', ''),
            'page': r.get('foreign_landing_url', ''), 'provider': r.get('source', 'openverse'),
            'needs_credit': r['license'] == 'by',
        })
    return out


def loc(q, n):
    url = 'https://www.loc.gov/photos/?' + urllib.parse.urlencode({'q': q, 'fo': 'json', 'c': n * 2, 'fa': 'online-format:image'})
    d = get_json(url)
    out = []
    for r in d.get('results', []):
        if len(out) >= n or not r.get('image_url'):
            continue
        try:
            item = get_json(r['id'].replace('http://', 'https://') + '?fo=json', tries=2).get('item', {})
        except Exception:
            continue
        ra = item.get('rights_advisory') or ''
        rights = ra if isinstance(ra, str) else ' '.join(ra)
        if 'no known restrictions' not in rights.lower():
            continue
        imgs = [u.split('#')[0] for u in r['image_url']]
        out.append({
            'kind': 'image', 'thumb': imgs[0], 'full': imgs[-1], 'w': None, 'h': None,
            'title': r.get('title', ''), 'creator': ', '.join(r.get('contributor') or []) or 'Library of Congress',
            'license': 'No known restrictions (Library of Congress)', 'license_url': 'https://www.loc.gov/legal/understanding-copyright/',
            'page': r['id'], 'provider': 'Library of Congress', 'needs_credit': False,
        })
    return out


def pixabay(q, n, video=False):
    base = 'https://pixabay.com/api/videos/?' if video else 'https://pixabay.com/api/?'
    params = {'key': pixabay_key(), 'q': q[:100], 'per_page': max(3, min(n, 50)), 'safesearch': 'true'}
    if not video:
        params.update({'image_type': 'photo', 'orientation': 'horizontal', 'min_width': 1280})
    d = get_json(base + urllib.parse.urlencode(params))
    out = []
    for h in d.get('hits', []):
        if video:
            v = h['videos'].get('large') or h['videos'].get('medium')
            thumb = v.get('thumbnail') or h['videos']['tiny'].get('thumbnail')
            out.append({'kind': 'video', 'thumb': thumb, 'full': v['url'], 'w': v.get('width'), 'h': v.get('height'), 'duration': h.get('duration'),
                        'title': h.get('tags', ''), 'creator': h.get('user', ''), 'license': 'Pixabay Content License',
                        'license_url': 'https://pixabay.com/service/license-summary/', 'page': h['pageURL'], 'provider': 'Pixabay', 'needs_credit': False})
        else:
            out.append({'kind': 'image', 'thumb': h['webformatURL'], 'full': h['largeImageURL'], 'w': h.get('imageWidth'), 'h': h.get('imageHeight'),
                        'title': h.get('tags', ''), 'creator': h.get('user', ''), 'license': 'Pixabay Content License',
                        'license_url': 'https://pixabay.com/service/license-summary/', 'page': h['pageURL'], 'provider': 'Pixabay', 'needs_credit': False})
    return out[:n]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('ep')
    ap.add_argument('slot')
    ap.add_argument('query')
    ap.add_argument('--fonte', default='openverse', choices=['openverse', 'loc', 'pixabay', 'pixabay-video'])
    ap.add_argument('--n', type=int, default=12)
    a = ap.parse_args()

    found = {'openverse': lambda: openverse(a.query, a.n), 'loc': lambda: loc(a.query, a.n),
             'pixabay': lambda: pixabay(a.query, a.n), 'pixabay-video': lambda: pixabay(a.query, a.n, video=True)}[a.fonte]()
    d = ROOT / 'media/imagens' / a.ep / 'candidatos' / a.slot
    d.mkdir(parents=True, exist_ok=True)
    for old in d.glob('*.jpg'):
        old.unlink()
    keep = []
    for i, c in enumerate(found):
        p = d / f'{i:02d}.jpg'
        try:
            get(c['thumb'], out=p)
            subprocess.run(['convert', str(p) + '[0]', '-resize', '480x270^', '-gravity', 'center', '-extent', '480x270', str(p)], check=True, capture_output=True)
        except Exception as e:
            print('  falhou', i, e)
            continue
        c['query'] = a.query
        c['fonte'] = a.fonte
        c['idx'] = i
        keep.append(c)
    (d / 'lista.json').write_text(json.dumps(keep, indent=1, ensure_ascii=False))
    if keep:
        sheet = d.parent / f'{a.slot}-folha.jpg'
        subprocess.run(['montage', '-label', '%t', *[str(d / f"{c['idx']:02d}.jpg") for c in keep], '-tile', '4x', '-geometry', '480x270+6+6',
                        '-pointsize', '22', '-background', '#E0E0D7', str(sheet)], check=True)
        print(sheet)
    for c in keep:
        extra = f" {c.get('duration')}s" if c['kind'] == 'video' else ''
        print(f"{c['idx']:02d} [{c['license']}] {c['w']}x{c['h']}{extra} {c['title'][:60]} — {c['creator'][:30]}")


if __name__ == '__main__':
    main()
