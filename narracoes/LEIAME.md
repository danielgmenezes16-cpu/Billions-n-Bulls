# Narrações

Um arquivo por episódio com os 6 blocos prontos para colar no Dark Planner (`epNN-blocos.txt`).

**Ajustes no Dark Planner (iguais em todo episódio):**
- Voz: Lucan Rook – Energetic Male
- Modelo: Multilingual v2
- Velocidade: **1.0x** (o 1.1x saiu 11% rápido demais no ep. 2)
- Style: 40%, se aparecer a opção
- Legenda: desligada (a legenda do vídeo sai do roteiro)

**Passo a passo:**
1. Gerar cada bloco separado, de A a F. As pausas `<break time="…" />` já estão no texto.
2. Salvar como `epNN-A.mp3` … `epNN-F.mp3` e mandar ao Claude.
3. O Claude confere voz, ritmo e frases (`scripts/montar_episodio.py`) e avisa se algum trecho precisa ser regenerado. Nesse caso, regenerar só a frase indicada.

Os MP3 não entram no git: ficam em `media/epNN/`.

| Ep. | Arquivo | Caracteres | Sai em | Narração |
| --- | --- | --- | --- | --- |
| 2 | `ep02-blocos.txt` | 14.205 | 24/11 | Feita (A–E na ElevenLabs, F no Dark Planner) |
| 3 | `ep03-blocos.txt` | 14.141 | 01/12 | Falta (até 21/11) |
| 4 | `ep04-blocos.txt` | 13.395 | 08/12 | Falta (até 28/11) |
| 5 | `ep05-blocos.txt` | 13.863 | 15/12 | Falta (até 05/12) |
| 6 | `ep06-blocos.txt` | 13.319 | 22/12 | Falta (até 12/12) |
