import React from 'react';
import {AbsoluteFill, Audio, interpolate, Sequence, staticFile} from 'remotion';
import {Opener, OPENER_FRAMES} from '../Opener';
import {FirmsShot} from '../shots/FirmsShot';
import {LadderShot} from '../shots/LadderShot';
import {RouteShot} from '../shots/RouteShot';
import {card, SceneDef} from './helpers';
import {PARTS_2_TO_6, SFX_2_TO_6} from './scenes2to6';
import {fr, n} from './time';
import timeline from './timeline.json';

// Episódio 1 — "Robinhood Is Free. So Who's Paying?"
// Tempos em segundos do vídeo, tirados de timeline.json (palavras medidas na narração).
// Cortes sempre na pausa antes da frase seguinte.

type Scene = SceneDef;

// ---------------- Parte 1 — The Zero-Dollar Trade (0:34,8 a 2:08) ----------------
const PART1: Scene[] = [
	{
		from: 34.837, to: 37.45,
		el: card({id: 'p1-title', apoio: 'Part 1', hero: 'THE $0 TRADE', textSide: 'left', object: 'phone', heroSize: 150, enter: true, exit: true, heroUnderline: true,
			cues: [34.84, 35.24, 35.56, 35.72, 36.52]}),
	},
	{
		from: 37.45, to: 48.3,
		el: (s) => (
			<RouteShot id="p1-route" start={s} tapAt={fr(37.96)} exchangeAt={fr(40.92)} makerAt={fr(42.16)} makerNameAt={fr(43.92)} brokerAt={fr(45.2)} payAt={fr(45.6)} enter exit />
		),
	},
	{
		from: 48.3, to: 51.0,
		el: card({id: 'p1-pfof', apoio: "It's called", hero: 'PAYMENT FOR ORDER FLOW', textSide: 'center', object: 'none', heroSize: 120, enter: true, exit: true, heroUnderline: true,
			cues: [48.56, 48.96, 49.28, 49.84, 50.08, 50.4]}),
	},
	{
		from: 51.0, to: 58.7,
		el: (s) => <LadderShot id="p1-ladder-a" start={s} mode="intro" at={{spread: fr(53.8), gap: fr(54.68), buyers: fr(55.56), sellers: fr(56.92)}} enter exit />,
	},
	{
		from: 58.7, to: 63.0,
		el: card({id: 'p1-fractions', apoio: 'Fractions of a cent per share,', hero: 'MILLIONS', complemento: 'of times a day.', textSide: 'left', object: 'coin', heroSize: 170, enter: true, exit: true,
			cues: [59.16, 59.64, 59.8, 59.88, 60.2, 60.44, 60.92, 61.32, 61.48, 61.8, 61.96]}),
	},
	{
		from: 63.0, to: 81.7,
		el: (s) => (
			<LadderShot id="p1-ladder-b" start={s} mode="spread" enter exit
				at={{title: fr(63.33), bid: fr(66.21), bidPrice: fr(67.09), ask: fr(69.49), askPrice: fr(70.37), gap: fr(72.62), maker: fr(75.26), buys: fr(77.18), sells: fr(78.46), keeps: fr(79.98)}} />
		),
	},
	{
		from: 81.7, to: 98.9,
		el: (s) => <LadderShot id="p1-ladder-c" start={s} mode="improve" enter exit at={{screen: s + 4, better: fr(87.55), save: fr(91.39), rest: fr(93.48), cut: fr(96.2)}} />,
	},
	{
		from: 98.9, to: 101.6,
		el: card({id: 'p1-multiply', apoio: 'Now multiply that by', hero: 'MILLIONS', complemento: 'of orders.', textSide: 'right', object: 'receipt', heroSize: 170, enter: true, exit: true,
			cues: [99.25, 99.48, 100.12, 100.36, 100.61, 101.0, 101.17]}),
	},
	{
		from: 101.6, to: 114.9,
		el: (s) => (
			<FirmsShot id="p1-firms" start={s} dateAt={fr(102.16)} paidAt={fr(113.94)} enter exit
				source="Share of Robinhood Financial's S&P 500 stock orders, October 2025 · Source: Robinhood Rule 606 report, Q4 2025"
				firms={[
					{name: 'Virtu', share: 46, at: fr(107.12)},
					{name: 'G1', share: 15, at: fr(107.84)},
					{name: 'Jane Street', share: 13, at: fr(108.4)},
					{name: 'Citadel Securities', share: 10, at: fr(109.12)},
					{name: 'Hudson River Trading', share: 9, at: fr(110.32)},
					{name: 'Two Sigma', share: 6, at: fr(111.6)},
				]} />
		),
	},
	{
		from: 114.9, to: 119.45,
		el: card({id: 'p1-40m', apoio: 'Together, about', hero: '$40 MILLION', complemento: 'in one month.', textSide: 'left', object: 'chart', heroSize: 170, enter: true, exit: true, heroUnderline: true,
			actionAt: n(115.86), cues: [115.14, 115.62, 115.86, 116.26, 117.22, 117.46, 117.7]}),
	},
	{
		from: 119.45, to: 122.1,
		el: card({id: 'p1-smaller', apoio: 'But stocks are the', hero: 'SMALLER PART', complemento: 'of this story.', textSide: 'left', object: 'phone', heroSize: 112, enter: true, exit: true,
			cues: [119.7, 119.94, 120.42, 120.58, 120.74, 121.14, 121.3, 121.46, 121.62]}),
	},
	{
		from: 122.1, to: 127.95,
		el: card({id: 'p1-somewhere', apoio: 'The real money is', hero: 'SOMEWHERE', complemento: 'most beginners never look', textSide: 'center', object: 'none', heroSize: 170, enter: true, exit: true, heroUnderline: true,
			cues: [122.29, 122.45, 122.69, 123.01, 123.17, 123.57, 123.81, 124.37, 124.69]}),
	},
];

export const SCENES: Scene[] = [...PART1, ...PARTS_2_TO_6];

// Efeitos: [segundo do vídeo, arquivo, volume]
const SFX: [number, string, number][] = [
	[34.84, 'show/hit', 0.5], [35.72, 'show/ding', 0.6], [37.96, 'show/pop', 0.6], [42.32, 'show/swell', 0.5],
	[49.28, 'show/hit', 0.25], [55.56, 'sfx-tick', 0.45], [56.92, 'sfx-tick', 0.45], [59.88, 'show/ding', 0.5], [60.92, 'show/counter', 0.6],
	[67.09, 'sfx-tick', 0.5], [70.37, 'sfx-tick', 0.5], [72.62, 'show/ding', 0.6], [75.26, 'show/pop', 0.5],
	[91.39, 'show/ding', 0.6], [96.2, 'sfx-tick', 0.5], [100.61, 'show/counter', 0.6],
	[107.12, 'sfx-tick', 0.35], [107.84, 'sfx-tick', 0.35], [108.4, 'sfx-tick', 0.35], [109.12, 'sfx-tick', 0.35], [110.32, 'sfx-tick', 0.35], [111.6, 'sfx-tick', 0.35],
	[113.94, 'show/ding', 0.4], [115.86, 'show/hit', 0.5], [126.3, 'show/swell', 0.45],
	...SFX_2_TO_6,
];

// A música para nessas janelas (segundos do vídeo) para a frase seguinte cair no silêncio
const DROPS: [number, number][] = [[63.1, 65.05], [311.65, 313.15], [553.9, 557.5]];

const voiceActive: number[] = timeline.voiceActive;

const musicVolume = (f: number) => {
	const t = f / 30;
	for (const [a, b] of DROPS) {
		if (t >= a && t < b) return 0;
		if (t >= a - 0.07 && t < a) return 0.7 * ((a - t) / 0.07);
	}
	const duck = 1 - 0.45 * (voiceActive[f] ?? 0);
	const fadeOut = interpolate(f, [timeline.frames - 60, timeline.frames], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	return 0.7 * duck * fadeOut;
};

export const Ep01: React.FC = () => (
	<AbsoluteFill style={{backgroundColor: '#E0E0D7'}}>
		<Sequence from={0} durationInFrames={OPENER_FRAMES}>
			<Opener muted />
		</Sequence>
		{SCENES.map((s, i) => {
			const start = fr(s.from);
			return (
				<Sequence key={i} from={start} durationInFrames={fr(s.to) - start}>
					{s.el(start)}
				</Sequence>
			);
		})}
		<Audio src={staticFile('audio/ep01-voice.wav')} />
		<Audio src={staticFile('audio/ep01-spark.wav')} volume={musicVolume} />
		{SFX.map(([t, src, vol], i) => (
			<Sequence key={`sfx-${i}`} from={fr(t)} durationInFrames={60}>
				<Audio src={staticFile(`audio/${src}.wav`)} volume={vol} />
			</Sequence>
		))}
		{/* Whoosh no pico de cada zoom que atravessa o corte */}
		{SCENES.map((s, i) => (
			<Sequence key={`wh-${i}`} from={fr(s.to) - 10} durationInFrames={20}>
				<Audio src={staticFile('audio/whoosh.wav')} volume={0.22} />
			</Sequence>
		))}
	</AbsoluteFill>
);

export const EP01_FRAMES: number = timeline.frames;
export const EP01_TEST_FRAMES = fr(128.3); // abertura + Parte 1
