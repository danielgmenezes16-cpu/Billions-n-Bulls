# Estado do projeto (passagem de bastão)

Atualizado em 20/11/2026. **Ler isto primeiro ao abrir uma sessão nova.** Ele resume onde tudo está, para não depender do histórico da conversa.

## Episódios

**Ritmo novo (18/11): 3 vídeos por semana, terça, quinta e sábado, 14h de Brasília.** Em 19/11 entraram cinco episódios de assunto do momento (9 a 13); o Daniel pode antecipar e eles furam a fila dos atemporais. Ordem: 2 → **10 (GTA 6, decisão do Daniel em 19/11)** → 3 → 4 → 7 → 6 → 5 → 8 (teasers já trocados). No comentário fixado do ep. 2, trocar o anúncio do Credit Suisse por "Coming up: the money behind GTA 6, and then Credit Suisse." Calendário completo em `docs/calendario.md`.

| Ep. | Título | Roteiro | Telas (Remotion) | B-roll | Narração | Vídeo final |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Robinhood Is Free. So Who's Paying? | Pronto | Pronto | — (só animação) | Feita | **Enviado e agendado para 17/11, 14h**; faltam as thumbs (verificação) |
| 2 | Who Really Gets Paid When You Tap Your Card? | Aprovado | Pronto (`src/ep02`) | Completo (26 itens) | Feita (A–E ElevenLabs, F Dark Planner) | **Publicado em 19/11** (sem o teste interativo; dá para incluir depois). Vídeo: `out/ep02-final.mp4` (14:14, −14 LUFS; cópia menor para envio `out/ep02-final-envio.mp4`); pacote em `roteiros/prontos/ep02-upload.md` |
| 3 | How a 167-Year-Old Bank Died in a Weekend | **Aprovado** (18/11) | Pronto (`src/ep03`) | Completo (22 itens) | Feita (20/11, áudio único) | **Vídeo pronto** (20/11): `out/ep03-final.mp4` (14:01, −14 LUFS; envio `out/ep03-final-envio.mp4`); pacote em `roteiros/prontos/ep03-upload.md`. Sai **Sáb 21/11** |
| 4 | Why Your Bank Pays You Almost Nothing | **Aprovado** (18/11) | Pronto (`src/ep04`) | Completo (16 itens) | Feita (20/11, áudio único) | Na fila de render; pacote pronto |
| 5 | How One Man Lost $20 Billion in Two Days | **Aprovado** (18/11) | Pronto (`src/ep05`) | Completo (13 itens) | Feita (20/11, áudio único) | Na fila de render; pacote pronto |
| 6 | Who Pays When You Buy Now, Pay Later? | **Aprovado** (18/11) | Pronto (`src/ep06`) | Completo (16 itens) | Feita (20/11); conferir "pay in four" em ~5:48 | Na fila de render (último); pacote pronto |
| 7 | Where Did Wirecard's $2 Billion Go? | Combinado (19/11) | Pronto (`src/ep07`, 20/11) | Completo (9 itens) | Feita (20/11, áudio único) | Na fila de render; pacote pronto |
| 8 | A $100 Bill Costs Pennies. Who Keeps the Rest? | Rascunho (18/11), aguardando aprovação | Falta | Falta | **Falta** | Sai **Ter 08/12** (narração até 05/12) |
| 9 | What Is One CEO Worth? Nvidia Just Found Out | Rascunho (19/11), viral; teaser trocado em 20/11 (anuncia o ep. 11, do Google) | Pronto (`src/ep09`, 20/11; linha do tempo provisória) | Completo (8 itens) | **Falta** | Quanto antes (Daniel decide) |
| 10 | Who Gets Rich When You Buy GTA 6? | Aprovado para ir já (19/11); teaser aponta para o Credit Suisse | Pronto (`src/ep10`) | Completo (7 itens) | Feita (19/11) | **Vídeo pronto** (19/11): `out/ep10-final.mp4` (9:52, −14 LUFS; envio `out/ep10-final-envio.mp4`); pacote em `roteiros/prontos/ep10-upload.md`. Publicar já |
| 11 | Why Google Lost $500 Billion in One Day | Rascunho (19/11), viral | Falta | Falta | **Falta** | Depois do 9 (cita o ep. do Nvidia) |
| 12 | Who Gets Rich in a $1.5 Trillion IPO? | Rascunho (19/11), viral; conflito de interesse anotado | Falta | Falta | **Falta** | Quanto antes |
| 13 | Who Pays If the AI Boom Breaks? | Rascunho (19/11), viral | Falta | Falta | **Falta** | Depois do 11 e do 12 (cita os dois) |

- Roteiros completos (pacote, blocos do Dark Planner, plano visual, checagem, descrição com créditos): `roteiros/rascunhos/epNN-*.md`. Texto-fonte de cada roteiro: `roteiros/rascunhos/fonte/epNN-roteiro.txt` (é dele que as cenas leem as frases).
- Thumbnails aprovadas em 18/11. Principal de cada episódio (as outras duas entram no Test & Compare): ep. 2 **A** "SAME $100?", ep. 3 **B** "TO ZERO", ep. 4 **A** "$1 A YEAR", ep. 5 **C** "$160B HIDDEN BET", ep. 6 **C** "$20B HOLIDAY LOAN". Cópias para upload em `roteiros/prontos/thumbs/`. Fontes: `roteiros/rascunhos/thumbs/` e `scripts/remotion/src/thumbs/EpThumbs.tsx`.
- Prévias sem som: `media/previas/` (fora do git).

## Quando chegar a narração de um episódio

0. Blocos prontos para colar: `narracoes/epNN-blocos.txt` (ver `narracoes/LEIAME.md`). No Dark Planner: Lucan Rook – Energetic Male, Multilingual v2, **velocidade 1.0x** (1.1x saiu 11% rápido demais no ep. 2), legenda desligada.
1. Salvar os 6 blocos em `media/epNN/epNN-A.mp3` … `epNN-F.mp3`.
2. `python3 scripts/montar_episodio.py epNN --trilha spark` (eps. 2, 4, 6 e 8) ou `--trilha heist` (eps. 3, 5 e 7).
3. Mandar ao Daniel o resumo de `media/epNN/checagem-audio.md` (frases puladas ou trocadas).
4. `… --render` → `out/epNN-final.mp4` + `roteiros/prontos/epNN.srt`.

## Coisas que vencem (checar antes de publicar)

- Ep. 2 (sai 24/11): audiência final do acordo das taxas foi em 16/11 e o juiz Cogan **não decidiu** ainda. A frase da Parte 5 ("the deal still needed final approval") segue certa: conferido em 19/11, sem decisão depois da audiência de 16/11. Se o juiz decidir com o vídeo no ar, pôr uma linha "Update:" no comentário fixado. Narração completa (E sem o engasgo de 2:05, original em `media/ep02/ep02-E-original.mp3.bak`; F feito em 1.1x e desacelerado). Vídeo final renderizado em 18/11. Daniel apagou a conta da ElevenLabs em 18/11: conta nova, mesma voz (Lucan Rook, Multilingual v2, speed 1.06, style 40%), plano pago (o grátis não permite uso comercial).
- Ep. 3 (sai 21/11): Supremo suíço sobre os títulos AT1. Conferido em 20/11: ainda sem decisão, a frase do roteiro segue certa. Se decidir com o vídeo no ar, linha "Update:" no comentário fixado.
- Ep. 4: taxas (FDIC, grandes bancos, Capital One) e a reunião do Fed de dezembro.
- Ep. 5 (sai 05/12): recurso de Bill Hwang. Teaser já aponta para o ep. 8.
- Ep. 7 (sai 01/12): sentença de Markus Braun esperada perto do Natal, depois da publicação. Reconferir em 30/11; se sair depois, atualizar comentário fixado e descrição. Frases alternativas no doc do episódio.
- Eps. 9 a 13 (virais): reconferir tudo na véspera da narração (investigação de Huang e depoimento de 01/12; vendas oficiais do GTA 6; estreia da ação da Anthropic; ativo e garantias da Nvidia). Os eps. 11, 12 e 13 citam episódios anteriores: se a ordem mudar, ajustar as frases.
- Ep. 8 (sai 08/12): ativo diferido do Fed (relatório trimestral), pedido de impressão de 2027, remessas ao Tesouro; trocar o teaser genérico do fechamento quando o ep. 9 for escolhido.

## Pendências com o Daniel

1. Gerar as narrações no Dark Planner na ordem nova, 3 dias antes de cada publicação: ep. 3 até 23/11, ep. 4 até 25/11, ep. 7 até 28/11, ep. 6 até 30/11, ep. 5 até 02/12, ep. 8 até 05/12 (blocos em `narracoes/`).
2. Ajustes do corte final do ep. 1.
3. Configurar o canal (verificação por telefone, banner e About em `docs/canal-textos.md` e `docs/arte-canal/`). Estreia: terça, 17/11, 14h de Brasília (`docs/calendario.md`).

## Próximas tarefas do Claude (sem depender do Daniel)

- Roteiros e telas dos eps. 7 (Wirecard) e 8 (nota de US$ 100), no mesmo padrão do ep. 6.
- Media kit quando houver ~10 vídeos (`docs/renda.md`).

## Ambiente (o que se perde quando o contêiner reinicia)

- Fica no git: código, roteiros, créditos (`src/epNN/creditos.json`), linhas do tempo, docs.
- Fora do git, e refeito por script: fotos e vídeos de B-roll (`python3 scripts/imagens/escolher.py epNN --rebaixar`), fontes e texturas (`scripts/remotion/make_assets.py`), `node_modules` (`npm install` em `scripts/remotion`), modelo de transcrição (baixado sozinho pelo `montar_episodio.py`).
- Só com o Daniel: os MP3 das narrações e o vídeo de abertura aprovado do ep. 1 (`media/ep01/`).
- Chave do Pixabay: `~/.config/bnb/pixabay_key` (pedir de novo ao Daniel se o contêiner for novo; nunca no repositório).
- Dependências Python: `pip install sherpa-onnx soundfile numpy`.
