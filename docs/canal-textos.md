# Textos e artes do canal (prontos para colar)

30/10/2026. Tudo o que vai ao ar está em inglês. As artes saem do Remotion (`scripts/remotion/src/thumbs/ChannelArt.tsx`):
`node thumbs.mjs <pasta> Banner Avatar Watermark` gera os PNG.

| Peça | Arquivo | Onde entra no Studio |
| --- | --- | --- |
| Banner 2560×1440 | `Banner.png` | Personalização → Branding → Banner. O texto fica na área segura do celular (1546×423 no centro) |
| Foto de perfil 800×800 | `Avatar.png` | Personalização → Branding → Foto |
| Marca d'água 150×150 | `Watermark.png` | Personalização → Branding → Marca d'água do vídeo, "Vídeo inteiro" |

## Nome e identificador

- Nome: **Billions & Bulls**
- Identificador (handle), na ordem de preferência: `@BillionsAndBulls` · `@BillionsNBulls` · `@BillionsBullsTV`. Usar o mesmo em todo lugar (link do Cargo & Capital, e-mail).

## Descrição do canal ("About")

Limite do YouTube: 1.000 caracteres. Este texto tem uns 800.

```
Every "free" app, every collapsed bank, every strange fee has someone getting paid. We find out who.

Billions & Bulls tells money stories. Each video starts with one curious question, like "Who really gets paid when you tap your card?" or "How does a 167-year-old bank die in a weekend?", and follows the money until we reach the answer. Real numbers, real sources, both sides of the story.

New long story every Tuesday at 12 PM New York time, plus Shorts during the week.

Sources are listed in every video description. Our videos explain how businesses and markets work. They are not financial advice.

Want the other side of the economy, the ships, planes and rockets behind everything you buy? Watch our sister channel, Cargo & Capital: [link do canal]

Business inquiries: [e-mail do canal]
```

Antes de colar: trocar `[link do canal]` pelo link do Cargo & Capital e `[e-mail do canal]` por um e-mail só do canal (criar um Gmail novo, por exemplo `billionsandbulls.channel@gmail.com`, se estiver livre). Não usar e-mail pessoal: ele fica público.

## Links do canal (Personalização → Informações básicas → Links)

1. `Cargo & Capital` → link do canal irmão
2. (depois, quando existir) newsletter ou patrocinador

## Palavras-chave do canal (Configurações → Canal → Palavras-chave)

```
money stories, follow the money, finance explained, how companies make money, banking, credit cards, financial history, business documentary, economics, personal finance explained, billions and bulls
```

## Trailer do canal

Usar o vídeo mais recente para quem não é inscrito (Personalização → Layout → "Vídeo de destaque para quem não se inscreveu"). Trocar a cada estreia até haver um vídeo que se destaque em retenção.

## Playlists

Uma por pilar, mais a de começo. Ordem na página do canal: "Start Here" primeiro.

| Playlist | Descrição | Entra nela |
| --- | --- | --- |
| **Start Here: Follow the Money** | `New here? Start with these. One question per video, and we follow the money until we find the answer.` | Os 3 vídeos com melhor retenção (no começo: eps. 1, 2 e 3) |
| **Who Pays for "Free"?** | `"Free" apps, free trades, free points. Somebody is always paying. These videos find out who.` | Ep. 1 (Robinhood), ep. 2 (Visa) |
| **Scams, Collapses & Disasters** | `How banks, funds and fortunes fall apart, and where the money goes when they do.` | Ep. 3 (Credit Suisse), ep. 5 (Archegos) |
| **Hidden Businesses** | `The real money is rarely where you think. The quiet businesses behind everyday things.` | Ep. 4 (poupança) |
| **Strange Money** | `Coins, currencies and rules that sound made up, but aren't.` | (vazia por enquanto: só criar quando houver o 1º vídeo) |

Dica: não deixar playlist vazia pública.

## Comentário fixado de boas-vindas (no ep. 1)

Fixar este no lugar do comentário do pacote do ep. 1 se for o primeiro vídeo do canal:

```
Welcome to Billions & Bulls! 👋 Every Tuesday we pick one curious money question and follow the money to the answer. This first one: who pays for "free" trading? Which company should we follow the money on next? Drop it below, we read every comment.
```

## Primeiro post da aba Comunidade (quando o recurso estiver liberado no canal)

```
Quick poll for our next stories: which one do you want first?
• Where did Wirecard's missing $2 billion go?
• Who actually owns the gold in Fort Knox?
• How hedge funds get paid even when they lose
• Buy now, pay later: who pays when you don't?
```

(Os 4 temas vêm da reserva em `ideias/fila.md`; o mais votado sobe na fila.)

## Padrões de upload (Configurações → Padrões de upload)

- Categoria: Education · Idioma: English · Comentários: permitir todos, com moderação de spam
- Descrição padrão (colada em todo vídeo, depois completada):

```
This video explains a business. It is not financial advice. Billions & Bulls is not affiliated with any company mentioned.

Animations, graphics and script are original, created for Billions & Bulls. Photos and footage are used under their licenses; credits below.

The other side of the economy: Cargo & Capital [link do canal]
```
