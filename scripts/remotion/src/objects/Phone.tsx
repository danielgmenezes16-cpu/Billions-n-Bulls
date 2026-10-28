import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {DARK, FONT, GOLD, INK, NAVY, SOFT} from '../brand';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Celular desenhado em SVG com uma tela genérica de corretora (sem marca real). 440×900.
// `tapFrame`: frame local em que o botão BUY é tocado (afunda e solta uma onda dourada).
// `amount`: troca o gráfico da tela por um valor grande (usado nas thumbnails).
// `buyColor`: cor do botão BUY (dourado no vídeo; verde de "comprar" nas thumbnails).
export const Phone: React.FC<{tapFrame?: number; amount?: string; buyColor?: string}> = ({tapFrame, amount, buyColor = GOLD}) => {
	const frame = useCurrentFrame();
	const has = tapFrame !== undefined;
	const press = has
		? interpolate(frame, [tapFrame, tapFrame + 3, tapFrame + 10], [1, 0.92, 1], {...clamp, easing: Easing.out(Easing.quad)})
		: 1;
	const ripple = has ? interpolate(frame, [tapFrame, tapFrame + 22], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)}) : 0;
	const label = buyColor === GOLD ? NAVY : '#FFFFFF';
	return (
		<svg width={440} height={900} viewBox="0 0 440 900" style={{overflow: 'visible'}}>
			<rect x={0} y={0} width={440} height={900} rx={64} fill="#1E1E1C" />
			<rect x={18} y={18} width={404} height={864} rx={50} fill="#F4F3EE" />
			<rect x={160} y={34} width={120} height={30} rx={15} fill="#1E1E1C" />
			{amount ? (
				<>
					<text x={220} y={250} fontFamily={FONT} fontSize={34} fill={SOFT} textAnchor="middle">
						Commission
					</text>
					<text x={220} y={420} fontFamily={FONT} fontWeight={900} fontSize={124} fill={DARK} textAnchor="middle" letterSpacing={-4}>
						{amount}
					</text>
					<line x1={60} x2={380} y1={520} y2={520} stroke={SOFT} strokeOpacity={0.35} strokeWidth={3} strokeDasharray="8 10" />
				</>
			) : (
				<>
					<text x={48} y={150} fontFamily={FONT} fontSize={28} fill={SOFT}>
						Market order
					</text>
					<text x={48} y={205} fontFamily={FONT} fontWeight={700} fontSize={54} fill={INK}>
						1 share
					</text>
					<polyline
						points="48,470 100,440 150,452 200,400 250,415 300,350 350,365 392,300"
						fill="none"
						stroke={INK}
						strokeOpacity={0.6}
						strokeWidth={6}
						strokeLinejoin="round"
					/>
					<circle cx={392} cy={300} r={12} fill={GOLD} />
					<text x={48} y={600} fontFamily={FONT} fontSize={28} fill={SOFT}>
						Commission
					</text>
					<text x={392} y={600} fontFamily={FONT} fontWeight={700} fontSize={28} fill={INK} textAnchor="end">
						$0.00
					</text>
				</>
			)}
			{has && ripple > 0 && ripple < 1 ? (
				<circle cx={220} cy={755} r={60 + ripple * 260} fill="none" stroke={GOLD} strokeWidth={6} strokeOpacity={0.7 * (1 - ripple)} />
			) : null}
			<g transform={`translate(220 755) scale(${press}) translate(-220 -755)`}>
				<rect x={48} y={700} width={344} height={110} rx={55} fill={buyColor} />
				<text x={220} y={772} fontFamily={FONT} fontWeight={700} fontSize={44} fill={label} textAnchor="middle" letterSpacing={3}>
					BUY
				</text>
			</g>
		</svg>
	);
};
