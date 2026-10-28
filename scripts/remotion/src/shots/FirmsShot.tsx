import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Shot} from '../components/Shot';
import {DARK, ensureFonts, FONT, GOLD, INK, SOFT} from '../brand';

ensureFonts();

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const ease = {...clamp, easing: Easing.out(Easing.cubic)};

export type Firm = {name: string; share: number; at: number}; // at = frame absoluto em que o nome é dito

export type FirmsShotProps = {
	id: string;
	start: number;
	dateAt: number;
	firms: Firm[];
	paidAt: number;
	source: string;
	enter?: boolean;
	exit?: boolean;
};

// As firmas que compram as ordens: uma barra por firma, com a fatia real (relatório 606).
export const FirmsShot: React.FC<FirmsShotProps> = (p) => {
	const frame = useCurrentFrame();
	const L = (abs: number) => abs - p.start;
	const max = Math.max(...p.firms.map((f) => f.share));
	const date = interpolate(frame, [L(p.dateAt), L(p.dateAt) + 10], [0, 1], ease);
	const drift = -0.2 * frame;
	const rowH = 104;
	const top = 300;

	return (
		<Shot id={p.id} enter={p.enter} exit={p.exit}>
			<div style={{position: 'absolute', inset: 0, transform: `translateX(${drift}px)`}}>
				<svg width={1920} height={1080} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
					<g opacity={date}>
						<text x={228} y={170} fontFamily={FONT} fontWeight={400} fontSize={44} fill={INK}>Who buys Robinhood's stock orders</text>
						<g transform={`rotate(-4 1530 150)`}>
							<rect x={1380} y={95} width={300} height={100} rx={10} fill="none" stroke={DARK} strokeWidth={5} />
							<text x={1530} y={164} fontFamily={FONT} fontWeight={700} fontSize={44} letterSpacing={4} fill={DARK} textAnchor="middle">OCT 2025</text>
						</g>
					</g>
					{p.firms.map((f, i) => {
						const k = interpolate(frame, [L(f.at) - 2, L(f.at) + 12], [0, 1], ease);
						const coin = interpolate(frame, [L(p.paidAt) + i * 4, L(p.paidAt) + i * 4 + 10], [0, 1], {...clamp, easing: Easing.out(Easing.back(2))});
						const y = top + i * rowH;
						const w = 900 * (f.share / max) * k;
						return (
							<g key={f.name} opacity={Math.min(1, k * 1.5)}>
								<text x={600} y={y + 44} fontFamily={FONT} fontWeight={600} fontSize={40} fill={INK} textAnchor="end">{f.name}</text>
								<rect x={640} y={y + 8} width={w} height={52} rx={8} fill={i === 0 ? GOLD : DARK} fillOpacity={i === 0 ? 1 : 0.75} />
								<text x={660 + w} y={y + 48} fontFamily={FONT} fontWeight={700} fontSize={40} fill={INK}>{Math.round(f.share * k)}%</text>
								<g opacity={coin} transform={`translate(${1700} ${y + 34}) scale(${coin}) translate(${-1700} ${-(y + 34)})`}>
									<circle cx={1700} cy={y + 34} r={26} fill={GOLD} />
									<text x={1700} y={y + 45} fontFamily={FONT} fontWeight={700} fontSize={30} fill={DARK} textAnchor="middle">$</text>
								</g>
							</g>
						);
					})}
					<text x={228} y={top + p.firms.length * rowH + 40} opacity={date} fontFamily={FONT} fontSize={24} fill={SOFT}>
						{p.source}
					</text>
				</svg>
			</div>
		</Shot>
	);
};
