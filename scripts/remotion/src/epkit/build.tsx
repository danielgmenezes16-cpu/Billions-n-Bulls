import React from 'react';
import {AbsoluteFill, Audio, interpolate, Sequence, staticFile} from 'remotion';
import {Card, CardProps} from '../Card';
import {PhotoProps, PhotoShot} from '../components/PhotoShot';
import {Shot} from '../components/Shot';
import {FONT, FPS, PAPER, SOFT} from '../brand';
import {makeCues, Timeline} from './cues';

// Montagem de episódio a partir de frases do roteiro.
// Cada add() corta na pausa antes da frase e monta a cena na hora, com o cursor parado nela,
// então c.f('…') dentro da cena procura a partir do começo da própria cena.

export type Credit = {file: string; creator: string; provider: string; license: string; needs_credit?: boolean; w?: number; h?: number};
type Built = {from: number; to: number; node: React.ReactNode};

const fr = (t: number) => Math.round(t * FPS);

const prettyCreator = (s: string) => {
	if (!s || s === 'unknown') return '';
	// "rothstein, arthur" (catálogo da LoC) → "Arthur Rothstein"
	const m = s.match(/^([a-z' -]+), ([a-z' .-]+?)(,.*)?$/i);
	const name = m ? `${m[2]} ${m[1]}` : s;
	return name.replace(/\b\w/g, (ch) => ch.toUpperCase());
};

export const creditLine = (c: Credit) => {
	const who = prettyCreator(c.creator.replace(/[^\p{L}\p{N} .,'&()-]/gu, '').trim());
	const kind = c.file.endsWith('.mp4') ? 'Footage' : 'Photo';
	const prov = ({flickr: 'Flickr', wikimedia: 'Wikimedia Commons'} as Record<string, string>)[c.provider] ?? c.provider;
	const lic = prov === 'Pixabay' ? 'Pixabay' : c.license.startsWith('No known') ? prov : `${prov}, ${c.license}`;
	const by = who && who.toLowerCase() !== prov.toLowerCase() ? who + ' / ' : '';
	return `${kind}: ${by}${lic}`;
};

// Tela de espera para B-roll que ainda não foi escolhido
const Pending: React.FC<{id: string; slot: string; hero?: string}> = ({id, slot, hero}) => (
	<Shot id={id} enter exit>
		<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', fontFamily: FONT}}>
			<div style={{border: `6px dashed ${SOFT}`, borderRadius: 24, padding: '60px 90px', textAlign: 'center', background: 'rgba(255,255,255,0.25)'}}>
				<div style={{fontSize: 34, letterSpacing: 6, color: SOFT, fontWeight: 600}}>B-ROLL PENDENTE</div>
				<div style={{fontSize: 64, fontWeight: 700, color: '#2E2D2B', marginTop: 12}}>{slot}</div>
				{hero ? <div style={{fontSize: 44, color: '#585652', marginTop: 16}}>{hero}</div> : null}
			</div>
		</AbsoluteFill>
	</Shot>
);

export const makeEpisode = (tl: Timeline, credits: Record<string, Credit>) => {
	const c = makeCues(tl);
	const scenes: Built[] = [];

	const add = (phrase: string, build: (start: number) => React.ReactNode) => {
		const from = scenes.length === 0 ? 0 : c.cut(phrase);
		if (scenes.length === 0) c.at(phrase);
		if (scenes.length) scenes[scenes.length - 1].to = from;
		const start = fr(from);
		scenes.push({from, to: tl.duration, node: build(start)});
	};

	// Card do template com as palavras na tela sincronizadas com a narração
	const card = (p: Omit<CardProps, 'cues' | 'cardStart'>) => (start: number) => {
		const display = [p.apoio, p.hero, p.complemento].filter(Boolean).join(' ');
		return <Card enter exit {...p} cues={c.cuesFor(display)} cardStart={start} />;
	};

	// Foto ou vídeo do manifesto de créditos; sem o arquivo, uma tela de espera
	let prints = 0;
	const photo = (slot: string, p: Omit<PhotoProps, 'id' | 'src' | 'start' | 'credit'> & {id?: string; allowLowRes?: boolean}) => (start: number) => {
		const cr = credits[slot];
		const id = p.id ?? slot;
		if (!cr) return <Pending id={id} slot={slot} hero={p.hero} />;
		// foto pequena (até ~1.500 px) não aguenta tela cheia: vira foto impressa, alternando o lado
		const small = (cr.w ?? 9999) < 1500 && !p.allowLowRes;
		const layout = small ? 'print' : p.layout;
		const side = p.side ?? (small ? (prints++ % 2 === 0 ? 'right' : 'left') : undefined);
		return <PhotoShot {...p} layout={layout} side={side} id={id} src={cr.file} credit={creditLine(cr)} start={start} />;
	};

	const Episode: React.FC<{music?: string; voice?: string; sfx?: [number, string, number][]}> = ({music, voice, sfx = []}) => {
		const musicVolume = (f: number) => {
			const duck = 1 - 0.45 * (tl.voiceActive[f] ?? 0);
			const fadeOut = interpolate(f, [tl.frames - 60, tl.frames], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
			return 0.7 * duck * fadeOut;
		};
		return (
			<AbsoluteFill style={{backgroundColor: PAPER}}>
				{scenes.map((s, i) => {
					const start = fr(s.from);
					return (
						<Sequence key={i} from={start} durationInFrames={Math.max(1, fr(s.to) - start)}>
							{s.node}
						</Sequence>
					);
				})}
				{voice && !tl.provisional ? <Audio src={staticFile(voice)} /> : null}
				{music ? <Audio src={staticFile(music)} volume={musicVolume} /> : null}
				{sfx.map(([t, src, vol], i) => (
					<Sequence key={`sfx-${i}`} from={fr(t)} durationInFrames={60}>
						<Audio src={staticFile(`audio/${src}.wav`)} volume={vol} />
					</Sequence>
				))}
				{scenes.slice(0, -1).map((s, i) => (
					<Sequence key={`wh-${i}`} from={fr(s.to) - 10} durationInFrames={20}>
						<Audio src={staticFile('audio/whoosh.wav')} volume={0.22} />
					</Sequence>
				))}
			</AbsoluteFill>
		);
	};

	return {c, add, card, photo, scenes, Episode, frames: tl.frames};
};
