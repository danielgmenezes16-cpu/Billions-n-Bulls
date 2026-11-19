# Narrações

Um arquivo por episódio com os 6 blocos prontos para colar no Dark Planner (`epNN-blocos.txt`).

**Ajustes no Dark Planner (iguais em todo episódio):**
- Voz: Lucan Rook – Energetic Male
- Modelo: Multilingual v2
- Velocidade: **1.0x** (o 1.1x saiu 11% rápido demais no ep. 2)
- Style: 40%, se aparecer a opção
- Legenda: desligada (a legenda do vídeo sai do roteiro)

## Modo rápido (19/11): o episódio inteiro num áudio só

O plano Basic aceita até 80 mil caracteres por áudio, e um episódio tem de 10 a 15 mil. Então não precisa mais gerar 6 blocos:

1. Abrir `epNN-completo.txt`, copiar tudo abaixo da linha de `=====` e colar no Dark Planner (mesmos ajustes de sempre).
2. Gerar uma vez, baixar e salvar como `epNN.mp3`.
3. Mandar aqui. O `montar_episodio.py` usa esse arquivo no lugar dos blocos.

Se uma frase sair errada: gerar só a frase num áudio curto e mandar junto. Eu emendo no lugar certo.
São 15 áudios por dia no Basic, ou seja, até 15 episódios num dia. Dá para narrar toda a fila de uma vez.

Os arquivos `epNN-blocos.txt` continuam valendo para quem preferir os 6 blocos.

**Passo a passo (6 blocos, modo antigo):**
1. Gerar cada bloco separado, de A a F. As pausas `<break time="…" />` já estão no texto.
2. Salvar como `epNN-A.mp3` … `epNN-F.mp3` e mandar ao Claude.
3. O Claude confere voz, ritmo e frases (`scripts/montar_episodio.py`) e avisa se algum trecho precisa ser regenerado. Nesse caso, regenerar só a frase indicada.

Os MP3 não entram no git: ficam em `media/epNN/`.

Ordem e prazos novos (18/11, 3 vídeos por semana): a narração chega **3 dias antes** da publicação. Pode gerar vários episódios no mesmo dia: o plano Basic faz 15 áudios por dia.

| Ep. | Arquivo | Caracteres | Sai em | Narração |
| --- | --- | --- | --- | --- |
| 2 | `ep02-blocos.txt` | 14.205 | Ter 24/11 | Feita |
| 3 | `ep03-blocos.txt` | 14.141 | Qui 26/11 | Falta (até 23/11) |
| 4 | `ep04-blocos.txt` | 13.384 | Sáb 28/11 | Falta (até 25/11) |
| 7 | `ep07-blocos.txt` | 14.628 | Ter 01/12 | Falta (até 28/11) |
| 6 | `ep06-blocos.txt` | 13.330 | Qui 03/12 | Falta (até 30/11) |
| 5 | `ep05-blocos.txt` | 13.885 | Sáb 05/12 | Falta (até 02/12) |
| 8 | `ep08-blocos.txt` | 13.086 | Ter 08/12 | Falta (até 05/12; roteiro aguardando aprovação) |
