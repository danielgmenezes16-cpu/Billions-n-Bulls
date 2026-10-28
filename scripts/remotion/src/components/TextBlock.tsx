import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {atFrame, FONT, GOLD, INK, SOFT, TIMING} from '../brand';

export type TextLines = {
	apoio: string; // linha de apoio: Regular, frase normal
	hero: string; // herói: Bold, CAIXA ALTA
	complemento?: string; // complemento: Regular, mais claro, alinhado à direita do herói
};

type Word = {text: string; start: number; fade: number};

const split = (s?: string) => (s ? s.split(/\s+/).filter(Boolean) : []);

// Quando cada palavra começa (em frames locais da cena).
// Com `cues` (segundos da narração, uma por palavra), a palavra aparece junto com a fala.
// Sem `cues`, segue o ritmo da decupagem: apoio palavra a palavra, pausa curta, herói, complemento.
export const scheduleWords = (lines: TextLines, cues?: number[], cardStart = 0) => {
	const a = split(lines.apoio);
	const h = split(lines.hero.toUpperCase());
	const c = split(lines.complemento);
	const total = a.length + h.length + c.length;
	let apoio: Word[];
	let hero: Word[];
	let comp: Word[];
	if (cues && cues.length === total) {
		const f = cues.map((s) => Math.max(0, atFrame(s) - cardStart - 1));
		apoio = a.map((w, i) => ({text: w, start: f[i], fade: TIMING.wordFade}));
		hero = h.map((w, i) => ({text: w, start: f[a.length + i], fade: TIMING.heroFade}));
		comp = c.map((w, i) => ({text: w, start: f[a.length + h.length + i], fade: TIMING.wordFade}));
	} else {
		let t = TIMING.firstWord;
		apoio = a.map((w) => {
			const x = {text: w, start: t, fade: TIMING.wordFade};
			t += TIMING.wordStagger;
			return x;
		});
		t += TIMING.pauseBeforeHero;
		hero = h.map((w) => {
			const x = {text: w, start: t, fade: TIMING.heroFade};
			t += TIMING.heroStagger;
			return x;
		});
		t += 2;
		comp = c.map((w) => {
			const x = {text: w, start: t, fade: TIMING.wordFade};
			t += TIMING.wordStagger;
			return x;
		});
	}
	const all = [...apoio, ...hero, ...comp];
	const doneAt = Math.max(...all.map((w) => w.start + w.fade));
	return {apoio, hero, comp, doneAt};
};

const RevealWord: React.FC<{w: Word; isLast: boolean}> = ({w, isLast}) => {
	const frame = useCurrentFrame();
	const t = interpolate(frame, [w.start, w.start + w.fade], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.quad),
	});
	return (
		<span
			style={{
				display: 'inline-block',
				opacity: t,
				filter: `blur(${(1 - t) * 8}px)`,
				marginRight: isLast ? 0 : '0.26em',
				whiteSpace: 'pre',
			}}
		>
			{w.text}
		</span>
	);
};

// Sublinhado dourado que se desenha da esquerda para a direita embaixo do herói
const Underline: React.FC<{start: number}> = ({start}) => {
	const frame = useCurrentFrame();
	const p = interpolate(frame, [start, start + 10], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	return <div style={{height: 8, background: GOLD, borderRadius: 4, marginTop: 6, transform: `scaleX(${p})`, transformOrigin: 'left center'}} />;
};

export const TextBlock: React.FC<{
	lines: TextLines;
	x: number;
	y: number;
	heroSize?: number;
	apoioSize?: number;
	center?: boolean;
	cues?: number[];
	cardStart?: number;
	heroUnderline?: boolean;
}> = ({lines, x, y, heroSize = 150, apoioSize = 46, center = false, cues, cardStart = 0, heroUnderline = false}) => {
	const s = scheduleWords(lines, cues, cardStart);
	const row = (words: Word[]) => words.map((w, i) => <RevealWord key={i} w={w} isLast={i === words.length - 1} />);
	const block = (
		<div style={{display: 'inline-flex', flexDirection: 'column', fontFamily: FONT, color: INK}}>
			<div style={{fontSize: apoioSize, fontWeight: 400, alignSelf: 'flex-start', marginLeft: 8}}>{row(s.apoio)}</div>
			<div style={{display: 'inline-flex', flexDirection: 'column', alignSelf: 'flex-start'}}>
				<div style={{fontSize: heroSize, fontWeight: 700, letterSpacing: -0.02 * heroSize, lineHeight: 1.02, marginTop: 4}}>
					{row(s.hero)}
				</div>
				{heroUnderline && s.hero.length > 0 ? <Underline start={s.hero[s.hero.length - 1].start + s.hero[s.hero.length - 1].fade + 2} /> : null}
			</div>
			{s.comp.length > 0 ? (
				<div style={{fontSize: apoioSize, fontWeight: 400, color: SOFT, alignSelf: 'flex-end', marginTop: 18}}>{row(s.comp)}</div>
			) : null}
		</div>
	);
	if (center) {
		return <div style={{position: 'absolute', left: 0, right: 0, top: y, display: 'flex', justifyContent: 'center'}}>{block}</div>;
	}
	return <div style={{position: 'absolute', left: x, top: y}}>{block}</div>;
};
