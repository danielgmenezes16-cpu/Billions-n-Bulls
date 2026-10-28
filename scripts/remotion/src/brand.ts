import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

// Paleta medida na referência (Guia de Edição) + cores da marca
export const PAPER = '#E0E0D7';
export const LINE = '#BDBDB6';
export const INK = '#585652';
export const SOFT = '#7B7A73';
export const DARK = '#2E2D2B';
export const GOLD = '#D4AF37';
export const NAVY = '#0B1A2E';

export const FONT = 'Inter';
export const FPS = 30;

// Atraso (em frames) entre o início do vídeo e o início da narração
export const AUDIO_OFFSET = 10;
// Converte um tempo da narração (s) para o frame absoluto do vídeo
export const atFrame = (sec: number) => Math.round(sec * FPS) + AUDIO_OFFSET;

// Tempos em frames (30 fps), tirados da decupagem da referência
export const TIMING = {
	enterFrames: 12, // cena nova chega ainda afastando e freia em ~0,4 s
	enterScale: 1.28, // escala inicial da entrada (a referência cai 21% em 4 frames)
	exitFrames: 20, // zoom-out começa ~0,7 s antes do corte
	exitScale: 0.88,
	firstWord: 8,
	wordFade: 6, // 3 a 7 frames na referência, 6 na mediana
	heroFade: 7,
	wordStagger: 6,
	heroStagger: 8,
	pauseBeforeHero: 4,
	objectEnter: 18, // maços entram em ~0,6 s
};

let fontsLoaded = false;
export const ensureFonts = () => {
	if (fontsLoaded) return;
	fontsLoaded = true;
	// Inter vem do pacote @fontsource/inter (npm), em woff2
	loadFont({family: FONT, url: staticFile('fonts/Inter-Regular.woff2'), weight: '400'});
	loadFont({family: FONT, url: staticFile('fonts/Inter-SemiBold.woff2'), weight: '600'});
	loadFont({family: FONT, url: staticFile('fonts/Inter-Bold.woff2'), weight: '700'});
	loadFont({family: FONT, url: staticFile('fonts/Inter-Black.woff2'), weight: '900'}); // só nas thumbnails
};
