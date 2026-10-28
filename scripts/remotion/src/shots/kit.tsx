import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Shot} from '../components/Shot';
import {DARK, FONT, GOLD, INK, PAPER, SOFT} from '../brand';

// Peças comuns das telas do episódio (diagramas desenhados em SVG 1920×1080).

export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const ease = {...clamp, easing: Easing.out(Easing.cubic)};
export const pop = {...clamp, easing: Easing.out(Easing.back(1.8))};

// on(t): 0 → 1 a partir do frame absoluto t, em d frames
export const useOn = (start: number) => {
	const frame = useCurrentFrame();
	return {
		frame,
		on: (t: number | undefined, d = 10) => (t === undefined ? 0 : interpolate(frame, [t - start, t - start + d], [0, 1], ease)),
		popIn: (t: number | undefined, d = 12) => (t === undefined ? 0 : interpolate(frame, [t - start, t - start + d], [0, 1], pop)),
		off: (t: number | undefined, d = 10) => (t === undefined ? 1 : interpolate(frame, [t - start, t - start + d], [1, 0], ease)),
	};
};

// Cena padrão: papel, câmera com zoom no corte e uma deriva lateral lenta
export const Scene: React.FC<{id: string; enter?: boolean; exit?: boolean; drift?: number; dark?: boolean; children: React.ReactNode}> = ({
	id,
	enter = true,
	exit = true,
	drift = -0.2,
	dark,
	children,
}) => {
	const frame = useCurrentFrame();
	return (
		<Shot id={id} enter={enter} exit={exit} dark={dark}>
			<div style={{position: 'absolute', inset: 0, transform: `translateX(${drift * 150 * Math.sin(frame / 150)}px)`}}>
				<svg width={1920} height={1080} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
					{children}
				</svg>
			</div>
		</Shot>
	);
};

type TxtProps = {
	x: number;
	y: number;
	o?: number;
	size?: number;
	weight?: number;
	color?: string;
	anchor?: 'start' | 'middle' | 'end';
	spacing?: number;
	children: React.ReactNode;
};
export const Txt: React.FC<TxtProps> = ({x, y, o = 1, size = 40, weight = 400, color = INK, anchor = 'start', spacing = 0, children}) => (
	<text x={x} y={y} opacity={o} fontFamily={FONT} fontWeight={weight} fontSize={size} fill={color} textAnchor={anchor} letterSpacing={spacing}>
		{children}
	</text>
);

// Rótulo pequeno em caixa alta, espaçado (estilo "SELLERS ASK")
export const Tag: React.FC<Omit<TxtProps, 'size' | 'weight' | 'spacing'> & {size?: number}> = ({size = 28, color = SOFT, ...p}) => (
	<Txt {...p} size={size} weight={600} spacing={5} color={color} />
);

// Carimbo inclinado que entra com um "pop"
export const Stamp: React.FC<{x: number; y: number; k: number; text: string; color?: string; size?: number; rot?: number}> = ({
	x,
	y,
	k,
	text,
	color = DARK,
	size = 48,
	rot = -6,
}) => {
	if (k <= 0) return null;
	const w = text.length * size * 0.68 + 60;
	const h = size * 1.6;
	return (
		<g opacity={Math.min(1, k)} transform={`translate(${x} ${y}) rotate(${rot}) scale(${0.6 + 0.4 * k})`}>
			<rect x={-w / 2} y={-h / 2} width={w} height={h} rx={10} fill="none" stroke={color} strokeWidth={6} />
			<text x={0} y={size * 0.36} fontFamily={FONT} fontWeight={800} fontSize={size} letterSpacing={4} fill={color} textAnchor="middle">
				{text}
			</text>
		</g>
	);
};

// Moeda pequena com "$"
export const CoinDot: React.FC<{x: number; y: number; r?: number; o?: number}> = ({x, y, r = 26, o = 1}) => (
	<g opacity={o}>
		<circle cx={x} cy={y} r={r} fill={GOLD} />
		<text x={x} y={y + r * 0.42} fontFamily={FONT} fontWeight={700} fontSize={r * 1.15} fill={DARK} textAnchor="middle">
			$
		</text>
	</g>
);

// Cartão claro com borda (painéis, documentos, comprovantes)
export const Panel: React.FC<{x: number; y: number; w: number; h: number; o?: number; rx?: number; fill?: string; stroke?: string; dashed?: boolean; children?: React.ReactNode}> = ({
	x,
	y,
	w,
	h,
	o = 1,
	rx = 20,
	fill = '#F4F3EE',
	stroke = INK,
	dashed,
	children,
}) => (
	<g opacity={o}>
		<rect x={x + 10} y={y + 14} width={w} height={h} rx={rx} fill="rgba(40,38,34,0.10)" />
		<rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={stroke} strokeOpacity={0.45} strokeWidth={3} strokeDasharray={dashed ? '10 10' : undefined} />
		{children}
	</g>
);

// Seta reta com ponta
export const Arrow: React.FC<{x1: number; y1: number; x2: number; y2: number; k: number; color?: string; width?: number}> = ({
	x1,
	y1,
	x2,
	y2,
	k,
	color = INK,
	width = 6,
}) => {
	if (k <= 0) return null;
	const x = x1 + (x2 - x1) * k;
	const y = y1 + (y2 - y1) * k;
	const a = Math.atan2(y2 - y1, x2 - x1);
	const s = 18;
	return (
		<g>
			<line x1={x1} y1={y1} x2={x} y2={y} stroke={color} strokeWidth={width} strokeLinecap="round" />
			<path
				d={`M ${x} ${y} L ${x - s * Math.cos(a - 0.5)} ${y - s * Math.sin(a - 0.5)} L ${x - s * Math.cos(a + 0.5)} ${y - s * Math.sin(a + 0.5)} Z`}
				fill={color}
			/>
		</g>
	);
};

// Nota de rodapé com a fonte do dado
export const Source: React.FC<{text: string; o?: number; y?: number; dark?: boolean}> = ({text, o = 1, y = 1010, dark}) => (
	<Txt x={228} y={y} o={o} size={22} color={dark ? '#AEB6C2' : SOFT}>
		{text}
	</Txt>
);

export {DARK, GOLD, INK, PAPER, SOFT};
