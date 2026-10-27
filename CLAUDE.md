# Billions & Bulls — Canal YouTube Dark

Canal dark (sem rosto), em **inglês**, que explica **como o setor financeiro ganha dinheiro** (bancos, bandeiras, gestoras, corretoras, market makers). Empresas-âncora: Visa, BlackRock, Citadel. Moldura de todo vídeo: **"follow the money"**.
Canal irmão: Cargo & Capital (economia física), com collabs.

Este repositório é independente do projeto DentalPRO — não misturar contexto, código ou decisões entre os dois.

**Fonte da verdade:** `docs/resumo-canal.md` (tudo o que foi definido até 27/10/2026). Consultar antes de decidir qualquer coisa sobre formato, visual, voz, thumbnails ou monetização.

## Acordo de trabalho
- Bastidores (conversa, docs, planejamento) em **português**: respostas diretas, informais, curtas e opinativas.
- Tudo o que vai ao ar em **inglês**: narração, título, descrição, tags, thumbnail, legenda, comentário fixado.
- Ferramentas grátis sempre que possível. Chave de API ou ferramenta paga só se indispensável, e perguntar antes.
- O ambiente do Claude não acessa YouTube, Google Trends nem ElevenLabs: narração (MP3) e dados do Analytics vêm do Daniel.

## Estrutura
- `docs/` — estratégia e referências do canal (`resumo-canal.md`).
- `ideias/` — fila de temas de vídeo (`fila.md`).
- `roteiros/rascunhos/` e `roteiros/prontos/` — roteiros por episódio.
- `thumbnails/` — conceitos e textos de thumbnail.
- `scripts/` — automações (Remotion, áudio, sincronia, feed simulado).

## Roteiros
- Nome do arquivo: `epNN-slug-do-titulo.md` (ex.: `ep02-visa-who-gets-paid.md`).
- Vídeo longo de 9 a 12 min, sempre acima de 8 (~172 palavras/min → 1.500 a 2.000 palavras).
- Estrutura: linha de título falada → abertura de ~35 s (pergunta, números de impacto, promessa, "This is Billions and Bulls. Let's follow the money.") → 6 partes `[Part N – Nome]` de 80 a 95 s → fechamento (resposta, frase-síntese, teaser do próximo, menção ao Cargo & Capital, aviso, pedido de inscrição, assinatura).
- Pausas no formato ElevenLabs: `<break time="1.0s" />` entre parágrafos, `<break time="1.5s" />` antes de cada parte e no fim da abertura.
- Tom calmo, curioso, de documentário; frases curtas; mostra os dois lados; tirada leve de vez em quando.
- Todo número tem fonte e entra numa tabela de checagem no próprio arquivo. "reportedly" para dado de notícia, "says" quando é a própria empresa, "up to" quando varia.
- Encerramento fixo: "This video explains a business. It is not financial advice."

## Regras que não podem ser quebradas
- Nada de recomendação de investimento, título de medo ou manipulação emocional.
- Nada de persona de IA: o narrador nunca é apresentado como pessoa real.
- Sem logos de empresas (nomes só em texto); objetos genéricos (app inventado, cartão "B&B PLATINUM").
- Cada vídeo com roteiro, pesquisa e telas próprias — nunca template repetido (política de "conteúdo inautêntico").
- Nada sobre a Ford nem informação interna dela.
- Licença de toda imagem e música conferida item a item; fontes sempre na descrição.

## Identidade visual (resumo)
- Papel `#E0E0D7`, grade `#BDBDB6`, texto `#585652`, apoio `#7B7A73`, objetos `#2E2D2B`, destaque dourado `#D4AF37` (uma cor de destaque por quadro), tensão em azul-marinho `#0B1A2E`.
- Fonte Inter (Black só em thumbnails). Thumbnails 1280×720, até 3 palavras, canto inferior direito livre, 3 variantes por vídeo.
- Edição no Remotion 4.0.539 (React + TypeScript), render H.264 CRF 18, 1080p, 30 fps.
