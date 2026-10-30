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


def credits(ep):
    m = load(ep)
    lines = []
    for slot, c in m.items():
        who = c['creator'] if c['creator'] and c['creator'] != 'unknown' else 'unknown author'
        lines.append(f"{c['title'][:70]} — {who}, {c['license']} ({c['provider']}): {c['page']}")
    print('Photos and footage\n' + '\n'.join(sorted(set(lines))))


if __name__ == '__main__':
    ep = sys.argv[1]
    if sys.argv[2] == '--rebaixar':
        for slot, c in load(ep).items():
            print(download(ep, slot, c))
    elif sys.argv[2] == '--creditos':
        credits(ep)
    else:
        choose(ep, sys.argv[2], int(sys.argv[3]))
