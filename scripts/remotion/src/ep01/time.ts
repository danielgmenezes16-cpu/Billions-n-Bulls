import {AUDIO_OFFSET, FPS} from '../brand';

// Na composição do episódio, os tempos das palavras (timeline.json) já são segundos do vídeo.
// Os componentes do template convertem "segundos da narração" com atFrame(), que soma AUDIO_OFFSET;
// n() desconta esse atraso para que os dois falem a mesma língua.
export const n = (t: number) => t - AUDIO_OFFSET / FPS;
// Segundo do vídeo → frame absoluto
export const fr = (t: number) => Math.round(t * FPS);
