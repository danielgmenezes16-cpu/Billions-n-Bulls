import React from 'react';
import {AbsoluteFill, Audio, interpolate, Sequence, staticFile} from 'remotion';
import {Card, CardProps} from './Card';
import {FlowShot} from './FlowShot';
import {atFrame, AUDIO_OFFSET} from './brand';

// Abertura do piloto "If Trading Is Free, Who Pays?", sincronizada com a narração (voz Lucan Rook).
// Tempos das palavras medidos no áudio (segundos da narração).

// Cortes (frames absolutos), sempre na pausa antes da frase seguinte
export const CUTS = [0, 105, 238, 350, 475, 590, 885, 1045];
export const OPENER_FRAMES = CUTS[CUTS.length - 1];
const NARRATION_END = 1011; // frames de áudio: corta antes de "Part 1"

type Shot = {kind: 'card'; props: CardProps} | {kind: 'flow'};

const SHOTS: Shot[] = [
	{
		kind: 'card',
		props: {id: 'a', apoio: 'If trading is free,', hero: 'WHO PAYS?', textSide: 'left', object: 'card', heroSize: 150, enter: true, exit: true, objectSlide: true, cues: [0, 0.56, 1.12, 1.36, 2.08, 2.32]},
	},
	{
		kind: 'card',
		props: {id: 'b1', apoio: 'Every day,', hero: 'MILLIONS', complemento: 'open a trading app', textSide: 'right', object: 'phone', heroSize: 150, enter: true, exit: true, cues: [3.2, 3.52, 3.92, 4.8, 5.04, 5.12, 5.52], actionAt: 5.84},
	},
	{
		kind: 'card',
		props: {id: 'b2', apoio: 'No commission. No fee.', hero: '$0', textSide: 'left', object: 'receipt', heroSize: 240, enter: true, exit: true, heroUnderline: true, cues: [7.68, 7.84, 8.56, 8.8, 9.36]},
	},
	{
		kind: 'card',
		props: {id: 'c', apoio: 'And yet, those apps are worth', hero: 'BILLIONS', textSide: 'right', object: 'chart', heroSize: 150, enter: true, exit: true, cues: [11.44, 11.6, 12.88, 13.04, 13.44, 13.6, 13.92], actionAt: 13.44},
	},
	{
		kind: 'card',
		props: {id: 'd', apoio: 'So if trading is free,', hero: "WHO'S PAYING?", textSide: 'center', object: 'none', heroSize: 150, enter: true, exit: true, heroUnderline: true, cues: [15.6, 15.84, 16.0, 16.4, 16.56, 17.28, 17.68]},
	},
	{kind: 'flow'},
	{
		kind: 'card',
		props: {id: 'f', apoio: 'This is', hero: 'BILLIONS & BULLS', complemento: "Let's follow the money.", textSide: 'left', object: 'coin', heroSize: 110, enter: true, exit: false, cues: [29.28, 29.52, 29.76, 30.32, 30.56, 31.2, 31.44, 31.76, 32.0]},
	},
];

// Efeitos sonoros: clique no herói, toque no BUY, impacto grave nos "billions", riser antes da pergunta
const tick = 'audio/sfx-tick.wav';
const SFX: {at: number; src: string; vol: number; len: number}[] = [
	{at: atFrame(2.08), src: tick, vol: 0.5, len: 6},
	{at: atFrame(3.92), src: tick, vol: 0.5, len: 6},
	{at: atFrame(5.84), src: 'audio/sfx-pop.wav', vol: 0.55, len: 6},
	{at: atFrame(9.36), src: tick, vol: 0.5, len: 6},
	{at: atFrame(13.92), src: 'audio/sfx-boom.wav', vol: 0.5, len: 40},
	{at: CUTS[4] - 39, src: 'audio/sfx-riser.wav', vol: 0.35, len: 39},
	{at: atFrame(17.28), src: tick, vol: 0.5, len: 6},
	{at: atFrame(21.52), src: tick, vol: 0.5, len: 6},
	{at: atFrame(29.76), src: 'audio/sfx-boom.wav', vol: 0.45, len: 40},
];

// `muted`: no episódio, o áudio da abertura (já mixado) vem dentro da narração completa
export const Opener: React.FC<{muted?: boolean}> = ({muted}) => (
	<AbsoluteFill style={{backgroundColor: '#E0E0D7'}}>
		{SHOTS.map((s, i) => {
			const from = CUTS[i];
			const dur = CUTS[i + 1] - from;
			return (
				<Sequence key={i} from={from} durationInFrames={dur}>
					{s.kind === 'card' ? (
						<Card {...s.props} cardStart={from} />
					) : (
						<FlowShot
							id="e"
							cardStart={from}
							cues={[20.48, 20.72, 20.88, 21.04, 21.52, 22.16]}
							followAt={21.04}
							tapAt={23.52}
							firmAt={24.64}
							unknownAt={25.28}
							wallStreetAt={27.6}
							enter
							exit
						/>
					)}
				</Sequence>
			);
		})}
		{muted ? null : (
			<>
		{/* Narração, normalizada para cerca de -15 LUFS */}
		<Sequence from={AUDIO_OFFSET}>
			<Audio
				src={staticFile('audio/narration-14lufs.wav')}
				trimAfter={NARRATION_END}
				volume={(f) => interpolate(f, [NARRATION_END - 10, NARRATION_END], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
			/>
		</Sequence>
		{SFX.map((x, i) => (
			<Sequence key={`sfx-${i}`} from={x.at} durationInFrames={x.len}>
				<Audio src={staticFile(x.src)} volume={x.vol} />
			</Sequence>
		))}
		{/* Whoosh no pico de cada zoom que atravessa o corte */}
		{CUTS.slice(1, -1).map((c) => (
			<Sequence key={c} from={c - 10} durationInFrames={20}>
				<Audio src={staticFile('audio/whoosh.wav')} volume={0.22} />
			</Sequence>
		))}
			</>
		)}
	</AbsoluteFill>
);
