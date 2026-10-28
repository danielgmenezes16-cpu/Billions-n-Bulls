import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {getLength, getPointAtLength} from '@remotion/paths';
import {Shot} from './components/Shot';
import {TextBlock} from './components/TextBlock';
import {atFrame, DARK, ensureFonts, FONT, GOLD, INK, SOFT} from './brand';

ensureFonts();

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export type FlowShotProps = {
	id: string;
	cardStart: number;
	cues: number[]; // "We're going to follow" + "ONE TRADE"
	followAt: number; // o caminho se desenha
	tapAt: number; // o ponto dourado (a ordem) sai do celular
	firmAt: number; // aparece a empresa misteriosa
	unknownAt: number; // legenda "a firm you've probably never heard of"
	wallStreetAt: number; // a zona "Wall Street" se revela em volta da empresa
	enter?: boolean;
	exit?: boolean;
};

// Tela de "caminho do dinheiro": a ordem sai do seu toque e chega a uma empresa no meio de Wall Street.
export const FlowShot: React.FC<FlowShotProps> = (p) => {
	const frame = useCurrentFrame();
	const L = (sec: number) => atFrame(sec) - p.cardStart;
	const P = 'M 380 760 C 620 770, 800 650, 1000 650';
	const len = getLength(P);

	const drawn = interpolate(frame, [L(p.followAt), L(p.followAt) + 27], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
	const node1 = interpolate(frame, [L(p.followAt) - 6, L(p.followAt) + 6], [0, 1], clamp);
	const travel = interpolate(frame, [L(p.tapAt), L(p.tapAt) + 39], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
	const dot = getPointAtLength(P, len * travel) ?? {x: 380, y: 760};
	const arrived = L(p.tapAt) + 39;
	const pulse = interpolate(frame, [arrived, arrived + 20], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
	const firm = interpolate(frame, [L(p.firmAt), L(p.firmAt) + 10], [0, 1], {...clamp, easing: Easing.out(Easing.back(1.6))});
	const unknown = interpolate(frame, [L(p.unknownAt), L(p.unknownAt) + 8], [0, 1], clamp);
	const ws = interpolate(frame, [L(p.wallStreetAt), L(p.wallStreetAt) + 10], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
	const drift = -0.3 * frame;

	return (
		<Shot id={p.id} enter={p.enter} exit={p.exit}>
			<div style={{position: 'absolute', inset: 0, transform: `translateX(${drift}px)`}}>
				<svg width={1920} height={1080} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
					{/* Zona "Wall Street" em volta da empresa */}
					<g opacity={ws} transform={`translate(1080 660) scale(${1.04 - 0.04 * ws}) translate(-1080 -660)`}>
						<rect x={760} y={470} width={640} height={390} rx={28} fill="#BDBDB6" fillOpacity={0.14} stroke={INK} strokeOpacity={0.45} strokeWidth={2.5} strokeDasharray="10 10" />
						<text x={792} y={526} fontFamily={FONT} fontWeight={700} fontSize={36} letterSpacing={8} fill={INK}>
							WALL STREET
						</text>
					</g>
					{/* Caminho da ordem */}
					<path d={P} fill="none" stroke={INK} strokeOpacity={0.35} strokeWidth={3} strokeDasharray={len} strokeDashoffset={len * (1 - drawn)} />
					<path d={P} fill="none" stroke={GOLD} strokeWidth={6} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - travel)} opacity={travel > 0 ? 1 : 0} />
					{/* Seu toque: mini celular */}
					<g opacity={node1}>
						<rect x={293} y={692} width={74} height={136} rx={14} fill={DARK} />
						<rect x={299} y={698} width={62} height={124} rx={10} fill="#F4F3EE" />
						<rect x={309} y={796} width={42} height={14} rx={7} fill={GOLD} />
						<text x={330} y={884} fontFamily={FONT} fontWeight={600} fontSize={28} letterSpacing={4} fill={SOFT} textAnchor="middle">
							YOUR TAP
						</text>
					</g>
					{/* A empresa misteriosa */}
					<g opacity={Math.min(1, firm)} transform={`translate(1080 650) scale(${0.7 + 0.3 * firm}) translate(-1080 -650)`}>
						<circle cx={1080} cy={650} r={78} fill="#F4F3EE" stroke={INK} strokeOpacity={0.6} strokeWidth={3} strokeDasharray="8 7" />
						<text x={1080} y={683} fontFamily={FONT} fontWeight={700} fontSize={92} fill={INK} textAnchor="middle">
							?
						</text>
					</g>
					{pulse > 0 && pulse < 1 ? (
						<circle cx={1080} cy={650} r={78 + 100 * pulse} fill="none" stroke={GOLD} strokeWidth={5} strokeOpacity={0.6 * (1 - pulse)} />
					) : null}
					<text x={1080} y={782} opacity={unknown} fontFamily={FONT} fontSize={31} fill={SOFT} textAnchor="middle">
						a firm you've probably never heard of
					</text>
					{/* A ordem (ponto dourado) */}
					{travel > 0 && travel < 1 ? (
						<g>
							<circle cx={dot.x} cy={dot.y} r={28} fill={GOLD} fillOpacity={0.25} />
							<circle cx={dot.x} cy={dot.y} r={13} fill={GOLD} />
						</g>
					) : null}
				</svg>
				<TextBlock lines={{apoio: "We're going to follow", hero: 'ONE TRADE'}} x={228} y={150} heroSize={120} cues={p.cues} cardStart={p.cardStart} />
			</div>
		</Shot>
	);
};
