import {AUDIO_OFFSET, FPS} from '../brand';

// Cenas que apontam para frases do roteiro, não para segundos.
// A mesma definição serve para a linha do tempo provisória e para a da narração real.

export type Word = {w: string; t: number; end: number; block: string};
export type Timeline = {fps: number; duration: number; frames: number; words: Word[]; voiceActive: number[]; provisional?: boolean};

const tok = (s: string) => s.toLowerCase().replace(/[^a-z0-9%$]+/g, '');
const words = (s: string) => s.split(/\s+/).map(tok).filter(Boolean);

export const makeCues = (tl: Timeline) => {
	const toks = tl.words.map((w) => tok(w.w));
	let cursor = 0; // as buscas andam para a frente no roteiro, na ordem das cenas

	// Índice da primeira palavra da frase, a partir do cursor (ou de "after")
	const find = (phrase: string, from = cursor): number => {
		const want = words(phrase);
		for (let i = from; i < toks.length; i++) {
			let ok = true;
			for (let j = 0; j < want.length && ok; j++) ok = toks[i + j] === want[j];
			if (ok) return i;
		}
		throw new Error(`Frase não encontrada no roteiro: "${phrase}" (a partir da palavra ${from})`);
	};

	return {
		// segundo do vídeo em que a frase começa; move o cursor
		at: (phrase: string) => {
			const i = find(phrase);
			cursor = i;
			return tl.words[i].t;
		},
		// segundo em que a frase termina (sem mover o cursor)
		endOf: (phrase: string) => {
			const i = find(phrase);
			const n = words(phrase).length;
			return tl.words[i + n - 1].end;
		},
		// corte entre a palavra anterior e a frase: no meio da pausa
		cut: (phrase: string) => {
			const i = find(phrase);
			cursor = i;
			if (i === 0) return 0;
			return (tl.words[i - 1].end + tl.words[i].t) / 2;
		},
		// frame absoluto de uma frase
		f: (phrase: string) => Math.round(tl.words[find(phrase)].t * FPS),
		// cues de palavra para o Card: cada palavra do texto na tela casa com a próxima igual na narração
		cuesFor: (display: string, fromPhrase?: string) => {
			let i = fromPhrase ? find(fromPhrase) : cursor;
			const out: number[] = [];
			for (const dw of display.split(/\s+/).filter(Boolean)) {
				const d = tok(dw);
				let j = i;
				while (j < toks.length && j < i + 25 && toks[j] !== d) j++;
				if (j < toks.length && j < i + 25) {
					out.push(tl.words[j].t - AUDIO_OFFSET / FPS);
					i = j + 1;
				} else {
					out.push((out.length ? out[out.length - 1] : tl.words[i].t - AUDIO_OFFSET / FPS) + 0.18);
				}
			}
			return out;
		},
		setCursor: (phrase: string) => {
			cursor = find(phrase, 0);
		},
	};
};
