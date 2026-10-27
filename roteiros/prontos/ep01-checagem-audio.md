# Ep. 1 — checagem da narração

Narração recebida em 27/10/2026 e transcrita com Parakeet (palavra por palavra), com os trechos duvidosos conferidos no Whisper small. Todos os números do roteiro foram comparados com o áudio.

| Bloco | Duração | Volume original | Situação |
| --- | --- | --- | --- |
| A (Parts 1 e 2) | 3:05,8 | -23,5 LUFS | OK |
| B (Parts 3 e 4) | 2:56,6 depois da edição | — | Corrigido em `media/ep01/ep01-B-edit.wav` |
| C (Part 5 ao fim) | 3:23,9 | — | OK |

Total dos 3 blocos: 9:25. Com a abertura de ~35 s, o vídeo fica perto de 10:00.

## Problemas no Bloco B

1. **Som extra no começo** (0,00 a 0,32 s), antes de "Part 3". Resolvido na montagem: o bloco entra a partir de 0,32 s, com fade de 20 ms.
2. **Número errado: a voz diz "401 million", o roteiro e a fonte dizem 411.** Fica em ~1:41 do bloco ("It was interest. 401 million dollars of it."). Os dois modelos ouvem 401. Precisa regerar só essa frase:
   - Texto para o ElevenLabs: `It was interest. Four hundred and eleven million dollars of it.`
   - Mesma voz e mesmos ajustes. Arquivo: `ep01-B-fix.mp3`.
   - Na montagem, a frase nova substitui o trecho antigo.

## Correção aplicada (27/10/2026)

- Frase regravada recebida (`ep01-B-fix.mp3`). Parakeet e Whisper ouvem "411 million".
- Encaixe feito por `scripts/audio/ep01_fix_b.py`: corta 0,32 s do início, troca a frase nos silêncios em volta dela e baixa a regravação em 2,6 dB.
- Volume na emenda: -24,0 LUFS antes, -23,9 na frase nova. Não dá para perceber a troca.
- Para a montagem, o Bloco B oficial é `ep01-B-edit.wav`.
