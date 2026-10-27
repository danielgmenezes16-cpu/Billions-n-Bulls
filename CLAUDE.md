# Billions & Bulls — Canal YouTube Dark

Canal dark (sem rosto), em **inglês**, de **histórias e curiosidades de dinheiro**: finanças com cara de entretenimento, como o Cargo & Capital faz com a economia física. Cada vídeo responde uma **pergunta curiosa** e segue o dinheiro até a resposta. Moldura de todo vídeo: **"follow the money"**.
Canal irmão: Cargo & Capital (economia física), com collabs.

Este repositório é independente do projeto DentalPRO — não misturar contexto, código ou decisões entre os dois.

**Fontes da verdade:**
- `docs/posicionamento.md` — o posicionamento atual (decidido em 27/10/2026). Vale por cima do resumo onde os dois divergirem.
- `docs/resumo-canal.md` — tudo o que foi definido antes (formato, visual, voz, thumbnails, monetização). Ainda vale em tudo que o posicionamento não mudou.
- `docs/dossies/` — raio-X dos canais de referência e mapa de temas. A seção "Blueprint" abaixo resume o que foi adotado deles.
- `docs/fluxo-de-producao.md` — ferramentas e passo a passo de cada vídeo, com quem faz cada etapa. Seguir esse fluxo em todo episódio.

## Acordo de trabalho
- Bastidores (conversa, docs, planejamento) em **português**: respostas diretas, informais, curtas e opinativas.
- Tudo o que vai ao ar em **inglês**: narração, título, descrição, tags, thumbnail, legenda, comentário fixado.
- Ferramentas grátis sempre que possível. Chave de API ou ferramenta paga só se indispensável, e perguntar antes.
- O ambiente do Claude lê as páginas públicas do YouTube (liberado em 27/10/2026), mas não acessa Google Trends, ElevenLabs nem o YouTube Studio: narração (MP3) e dados do Analytics vêm do Daniel.

## Estrutura
- `docs/` — estratégia e referências do canal (`resumo-canal.md`).
- `ideias/` — fila de temas de vídeo (`fila.md`).
- `roteiros/rascunhos/` e `roteiros/prontos/` — roteiros por episódio (`ep01-robinhood-who-pays.md` é cópia do doc do Episódio 1).
- `thumbnails/` — conceitos e textos de thumbnail.
- `scripts/` — automações (Remotion, áudio, sincronia, feed simulado).

## Roteiros
- Nome do arquivo: `epNN-slug-do-titulo.md` (ex.: `ep02-visa-who-gets-paid.md`).
- Vídeo longo de 14 a 18 min a partir do ep. 2 (~172 palavras/min → 2.400 a 3.100 palavras). O ep. 1 fica com ~9 min 40 s. Nunca abaixo de 8 min nem acima de ~25.
- Estrutura: linha de título falada → abertura de ~35 s (pergunta, números de impacto, promessa, "This is Billions and Bulls. Let's follow the money.") → 6 partes `[Part N – Nome]` de 80 a 95 s → fechamento (resposta, frase-síntese, teaser do próximo, menção ao Cargo & Capital, aviso, pedido de inscrição, assinatura).
- Pausas no formato ElevenLabs: `<break time="1.0s" />` entre parágrafos, `<break time="1.5s" />` antes de cada parte e no fim da abertura.
- Tom calmo, curioso, de documentário; frases curtas; mostra os dois lados; tirada leve de vez em quando.
- Todo número tem fonte e entra numa tabela de checagem no próprio arquivo. "reportedly" para dado de notícia, "says" quando é a própria empresa, "up to" quando varia.
- Encerramento fixo: "This video explains a business. It is not financial advice."

## Blueprint (adotado em 27/10/2026, a partir dos dossiês)
- **Ritmo:** 1 vídeo longo por semana, sempre no mesmo dia, ao meio-dia de Nova York (13h de Brasília até 31/10; 14h a partir de 01/11). Shorts às 18h de NY, uns 3 por semana, cortados do longo; quando um longo pegar, série de 3 a 5 Shorts dele.
- **Tema:** um fato concreto com alguém responsável (erro, golpe, paradoxo), de preferência ligado ao bolso de quem assiste ou à Europa. História entra por um evento específico com gancho no presente. Evitar panorama ("Rise and Fall of…"), série trocando só o país, remake de hit, notícia do momento como assunto e temas fora do dinheiro.
- **Título:** curto (até ~45 caracteres), uma tensão só. Parênteses e palavras como "nobody/hidden/quietly" não são alavanca. Repetir assunto pode, com dado e título novos; repetir título, não.
- **Thumbnail:** estrutura fixa com dado novo a cada vídeo: papel quadriculado, frase de 2 a 3 palavras, gráfico com dado real em dourado e o ponto dourado que segue o dinheiro como personagem recorrente. Evitar sublinhado vermelho e personagem de terno (identidade atual do Chill Financial Historian).
- **Descrição:** número-tese no primeiro parágrafo, lista "In this video", capítulos, fontes e a frase de originalidade: "All visuals in this video are original, designed and animated for Billions & Bulls."
- **Renda:** planejar patrocínio ou uma segunda fonte desde cedo; não depender só do AdSense.

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
