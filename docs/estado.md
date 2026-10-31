# Estado do projeto (passagem de bastão)

Atualizado em 31/10/2026. **Ler isto primeiro ao abrir uma sessão nova.** Ele resume onde tudo está, para não depender do histórico da conversa.

## Episódios

| Ep. | Título | Roteiro | Telas (Remotion) | B-roll | Narração | Vídeo final |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Robinhood Is Free. So Who's Paying? | Pronto | Pronto | — (só animação) | Feita | Render entregue; **aguarda ajustes do Daniel** |
| 2 | Who Really Gets Paid When You Tap Your Card? | Aguarda aprovação | Pronto (`src/ep02`) | Completo (26 itens) | **Falta** | — |
| 3 | How a 167-Year-Old Bank Died in a Weekend | Aguarda aprovação | Pronto (`src/ep03`) | Completo (22 itens) | **Falta** | — |
| 4 | Why Your Bank Pays You Almost Nothing | Aguarda aprovação | Pronto (`src/ep04`) | Completo (16 itens) | **Falta** | — |
| 5 | How One Man Lost $20 Billion in Two Days | Aguarda aprovação | Pronto (`src/ep05`) | Completo (13 itens) | **Falta** | — |

- Roteiros completos (pacote, blocos do Dark Planner, plano visual, checagem, descrição com créditos): `roteiros/rascunhos/epNN-*.md`. Texto-fonte de cada roteiro: `roteiros/rascunhos/fonte/epNN-roteiro.txt` (é dele que as cenas leem as frases).
- Thumbnails (3 por episódio, Daniel ainda não escolheu): `roteiros/rascunhos/thumbs/` e `scripts/remotion/src/thumbs/EpThumbs.tsx`.
- Prévias sem som: `media/previas/` (fora do git).

## Quando chegar a narração de um episódio

1. Salvar os 6 blocos em `media/epNN/epNN-A.mp3` … `epNN-F.mp3`.
2. `python3 scripts/montar_episodio.py epNN --trilha spark` (eps. 2 e 4) ou `--trilha heist` (eps. 3 e 5).
3. Mandar ao Daniel o resumo de `media/epNN/checagem-audio.md` (frases puladas ou trocadas).
4. `… --render` → `out/epNN-final.mp4` + `roteiros/prontos/epNN.srt`.

## Coisas que vencem (checar antes de publicar)

- Ep. 2: decisão final do acordo das taxas de cartão (audiência em 16/11/2026).
- Ep. 3: Supremo suíço sobre os títulos AT1.
- Ep. 4: taxas (FDIC, grandes bancos, Capital One) e a reunião do Fed de dezembro.
- Ep. 5: recurso de Bill Hwang; trocar o teaser do fechamento pelo ep. 6.

## Pendências com o Daniel

1. Aprovar os roteiros dos eps. 2 a 5 e gerar as narrações no Dark Planner.
2. Escolher a thumb de cada episódio.
3. Ajustes do corte final do ep. 1.
4. Configurar o canal (verificação por telefone, banner e About em `docs/canal-textos.md` e `docs/arte-canal/`). Estreia sugerida: terça, 10/11, 14h de Brasília (`docs/calendario.md`).

## Próximas tarefas do Claude (sem depender do Daniel)

- Roteiros dos eps. 6 a 8, a partir da reserva em `ideias/fila.md` (alternar bolso e colapso). Sugestão: fazer depois que o Daniel aprovar os atuais, para não acumular texto sem revisão.
- Media kit quando houver ~10 vídeos (`docs/renda.md`).

## Ambiente (o que se perde quando o contêiner reinicia)

- Fica no git: código, roteiros, créditos (`src/epNN/creditos.json`), linhas do tempo, docs.
- Fora do git, e refeito por script: fotos e vídeos de B-roll (`python3 scripts/imagens/escolher.py epNN --rebaixar`), fontes e texturas (`scripts/remotion/make_assets.py`), `node_modules` (`npm install` em `scripts/remotion`), modelo de transcrição (baixado sozinho pelo `montar_episodio.py`).
- Só com o Daniel: os MP3 das narrações e o vídeo de abertura aprovado do ep. 1 (`media/ep01/`).
- Chave do Pixabay: `~/.config/bnb/pixabay_key` (pedir de novo ao Daniel se o contêiner for novo; nunca no repositório).
- Dependências Python: `pip install sherpa-onnx soundfile numpy`.
