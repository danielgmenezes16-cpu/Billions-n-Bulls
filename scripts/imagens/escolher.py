"""Escolhe um candidato de buscar.py, baixa em alta e registra o crédito.

Uso:
  python3 escolher.py ep02 p1-terminal 3        escolhe o candidato 03 da folha
  python3 escolher.py ep02 --rebaixar           baixa de novo tudo o que está no manifesto (clone novo)
  python3 escolher.py ep02 --creditos           imprime o bloco de créditos para a descrição

Arquivos:
  scripts/remotion/public/img/ep02/p1-terminal.jpg (ou .mp4)   fora do git
  scripts/remotion/src/ep02/creditos.json                      no git: fonte, autor e licença de cada item
"""
import json
import pathlib
import subprocess
import sys

from buscar import ROOT, get

PUBLIC = ROOT / 'scripts/remotion/public/img'


def manifest_path(ep):
    return ROOT / 'scripts/remotion/src' / ep / 'creditos.json'


def load(ep):
    p = manifest_path(ep)
    return json.loads(p.read_text()) if p.exists() else {}


def save(ep, m):
    p = manifest_path(ep)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(dict(sorted(m.items())), indent=1, ensure_ascii=False) + '\n')


def download(ep, slot, c):
    (PUBLIC / ep).mkdir(parents=True, exist_ok=True)
    if c['kind'] == 'video':
        out = PUBLIC / ep / f'{slot}.mp4'
        raw = out.with_suffix('.raw.mp4')
        get(c['full'], out=raw, timeout=300)
        # 1080p, 30 fps, sem áudio: o som do episódio é só narração, trilha e efeitos
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(raw), '-an', '-vf', 'scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30',
                        '-c:v', 'libx264', '-crf', '18', '-pix_fmt', 'yuv420p', str(out)], check=True)
        raw.unlink()
    else:
        out = PUBLIC / ep / f'{slot}.jpg'
        raw = out.with_suffix('.download')
        get(c['full'], out=raw, timeout=300)
        subprocess.run(['convert', 'jpg:' + str(raw) if c['full'].lower().split('?')[0].endswith(('.jpg', '.jpeg')) else str(raw) + '[0]', '-auto-orient', '-resize', '2400x2400>', '-quality', '90', str(out)], check=True)
        raw.unlink()
    return out


def size(path):
    if path.suffix == '.mp4':
        r = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', str(path)], capture_output=True, text=True)
    else:
        r = subprocess.run(['identify', '-format', '%w,%h', str(path) + '[0]'], capture_output=True, text=True)
    w, h = r.stdout.strip().split(',')[:2]
    return int(w), int(h)


def choose(ep, slot, idx):
    lst = json.loads((ROOT / 'media/imagens' / ep / 'candidatos' / slot / 'lista.json').read_text())
    c = next(x for x in lst if x['idx'] == idx)
    out = download(ep, slot, c)
    m = load(ep)
    m[slot] = {k: c[k] for k in ('kind', 'full', 'title', 'creator', 'license', 'license_url', 'page', 'provider', 'needs_credit', 'query') if k in c}
    m[slot]['file'] = f'img/{ep}/{out.name}'
    m[slot]['w'], m[slot]['h'] = size(out)
    save(ep, m)
    print(out, '←', c['license'], c['creator'])


B58 = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'


def short_url(url):
    """Link curto para caber no limite de 5.000 caracteres da descrição do YouTube."""
    import re
    m = re.match(r'https?://(?:www\.)?flickr\.com/photos/[^/]+/(\d+)', url)
    if m:  # flic.kr é o encurtador oficial do Flickr (id da foto em base 58)
        n, out = int(m.group(1)), ''
        while n:
            n, r = divmod(n, 58)
            out = B58[r] + out
        return 'https://flic.kr/p/' + out
    return url.replace('http://www.loc.gov', 'https://loc.gov').replace('https://www.loc.gov', 'https://loc.gov').rstrip('/')


def credits(ep):
    """Bloco "Photos and footage": crédito completo (título, autor, licença, link) para o que a licença exige (CC BY);
    o resto (domínio público, LOC sem restrições, Pixabay) vai agrupado, só com o link, para caber na descrição."""
    m = load(ep)
    need, free = set(), {}
    for slot, c in m.items():
        if c.get('needs_credit'):
            who = c['creator'] if c['creator'] and c['creator'] != 'unknown' else 'unknown author'
            title = c['title'] if len(c['title']) <= 40 else c['title'][:38].rstrip(' ,.-') + '…'
            need.add(f"{title} — {who}, {c['license']}: {short_url(c['page'])}")
        else:
            lic = c['license'].replace(' (Library of Congress)', '')
            group = 'Library of Congress, no known restrictions' if c['provider'] == 'Library of Congress' else \
                'Pixabay Content License' if c['provider'] == 'Pixabay' else lic
            free.setdefault(group, set()).add(short_url(c['page']))
    out = ['Photos and footage', *sorted(need)]
    for g, urls in sorted(free.items()):
        out.append(f"{g}: " + ' · '.join(sorted(urls)))
    print('\n'.join(out))

if __name__ == '__main__':
    ep = sys.argv[1]
    if sys.argv[2] == '--rebaixar':
        for slot, c in load(ep).items():
            print(download(ep, slot, c))
    elif sys.argv[2] == '--creditos':
        credits(ep)
    else:
        choose(ep, sys.argv[2], int(sys.argv[3]))
