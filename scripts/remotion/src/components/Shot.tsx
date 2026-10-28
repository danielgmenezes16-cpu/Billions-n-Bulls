import React from 'react';
import {AbsoluteFill, Easing, interpolate, random, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background} from './Background';
import {PAPER, TIMING} from '../brand';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const easeOutStrong = Easing.bezier(0.16, 1, 0.3, 1);

// Escala da câmera no tempo t (frames locais, aceita fração e valores fora da cena).
// Fora da cena, o movimento continua em linha reta: é o que deixa o borrão existir já no 1º frame depois do corte.
const cameraScale = (t: number, dur: number, enter?: boolean, exit?: boolean) => {
	let e = 1;
	if (enter) {
		const f = (u: number) => interpolate(u, [0, TIMING.enterFrames], [TIMING.enterScale, 1], {...clamp, easing: easeOutStrong});
		e = t >= 0 ? f(t) : f(0) + (f(0) - f(1)) * -t;
	}
	let x = 1;
	if (exit) {
		const g = (u: number) =>
			interpolate(u, [dur - TIMING.exitFrames, dur - 1], [1, TIMING.exitScale], {...clamp, easing: Easing.in(Easing.cubic)});
		x = t <= dur - 1 ? g(t) : g(dur - 1) + (g(dur - 1) - g(dur - 2)) * (t - (dur - 1));
	}
	return e * x;
};

const SAMPLES = 8; // amostras do motion blur nos zooms
const SHUTTER = 1; // abertura de 1 frame (360°)

// Câmera de cada cena: entra ainda afastando, sai com zoom-out acelerando até o corte.
// Nos trechos rápidos, desenha várias cópias em escalas vizinhas (motion blur de câmera).
// Por cima de tudo: grão de papel animado e vinheta leve.
export const Shot: React.FC<{id: string; enter?: boolean; exit?: boolean; children: React.ReactNode}> = ({
	id,
	enter,
	exit,
	children,
}) => {
	const frame = useCurrentFrame();
	const {durationInFrames: dur} = useVideoConfig();
	const s = (t: number) => cameraScale(t, dur, enter, exit);
	const speed = Math.abs(s(frame) - s(frame - 1));
	const n = speed > 0.003 ? SAMPLES : 1;
	const content = (
		<>
			<Background id={id} />
			{children}
		</>
	);
	const g = Math.floor(frame / 2);
	const gx = -random(`gx-${id}-${g}`) * 440;
	const gy = -random(`gy-${id}-${g}`) * 330;
	return (
		<AbsoluteFill style={{backgroundColor: n > 1 ? '#000' : PAPER, isolation: 'isolate'}}>
			{n === 1 ? (
				<AbsoluteFill style={{transform: `scale(${s(frame)})`}}>{content}</AbsoluteFill>
			) : (
				Array.from({length: n}, (_, k) => (
					<AbsoluteFill
						key={k}
						style={{
							transform: `scale(${s(frame - (SHUTTER * k) / n)})`,
							mixBlendMode: 'plus-lighter',
							filter: `opacity(${1 / n})`,
						}}
					>
						{content}
					</AbsoluteFill>
				))
			)}
			<AbsoluteFill
				style={{
					backgroundImage: `url(${staticFile('textures/grain.png')})`,
					backgroundSize: '2400px 1440px',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: `${gx}px ${gy}px`,
					mixBlendMode: 'overlay',
					opacity: 0.1,
				}}
			/>
			<AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, rgba(46,45,43,0) 58%, rgba(46,45,43,0.14) 100%)'}} />
		</AbsoluteFill>
	);
};
