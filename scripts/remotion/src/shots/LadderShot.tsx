import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Shot} from '../components/Shot';
import {DARK, ensureFonts, FONT, GOLD, INK, LINE, SOFT} from '../brand';

ensureFonts();

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const ease = {...clamp, easing: Easing.out(Easing.cubic)};

// Escada de preços: a régua vertical do spread.
// Escala fixa: 1 centavo = 115 px. $100.02 no alto (y 300), $99.98 embaixo (y 760).
const Y = (cents: number) => 760 - (cents - 98) * 115; // cents = centavos acima de $99.00 (98 → $99.98)
const X0 = 520;
const X1 = 1220;

export type LadderMode = 'intro' | 'spread' | 'improve';

export type LadderShotProps = {
	id: string;
	start: number;
	mode: LadderMode;
	// frames absolutos; cada modo usa os seus
	at: Record<string, number>;
	enter?: boolean;
	exit?: boolean;
};

const Level: React.FC<{y: number; o: number; draw: number; label: string; price?: string; priceO?: number; gold?: boolean}> = ({
	y,
	o,
	draw,
	label,
	price,
	priceO = 0,
	gold,
}) => (
	<g opacity={o}>
		<line x1={X0} x2={X0 + (X1 - X0) * draw} y1={y} y2={y} stroke={gold ? GOLD : DARK} strokeWidth={6} strokeLinecap="round" />
		<text x={X1 + 40} y={y - 14} fontFamily={FONT} fontWeight={600} fontSize={30} letterSpacing={5} fill={SOFT}>
			{label}
		</text>
		{price ? (
			<text x={X1 + 40} y={y + 44} opacity={priceO} fontFamily={FONT} fontWeight={700} fontSize={56} fill={gold ? GOLD : INK}>
				{price}
			</text>
		) : null}
	</g>
);

export const LadderShot: React.FC<LadderShotProps> = (p) => {
	const frame = useCurrentFrame();
	const L = (k: string) => (p.at[k] ?? 1e9) - p.start;
	const on = (k: string, d = 10) => interpolate(frame, [L(k), L(k) + d], [0, 1], ease);
	const drift = -0.2 * frame;

	const top = Y(102);
	const bottom = Y(98);
	let body: React.ReactNode = null;

	if (p.mode === 'intro') {
		// "a tiny slice of the spread, the gap between what buyers pay and what sellers receive"
		const gap = on('spread', 14);
		body = (
			<>
				<rect x={X0} y={top} width={(X1 - X0)} height={bottom - top} fill={GOLD} fillOpacity={0.28 * gap} />
				<text x={(X0 + X1) / 2} y={(top + bottom) / 2 + 26} opacity={on('gap')} fontFamily={FONT} fontWeight={700} fontSize={72} letterSpacing={10} fill={INK} textAnchor="middle">
					THE SPREAD
				</text>
				<Level y={top} o={on('buyers')} draw={on('buyers', 14)} label="WHAT BUYERS PAY" />
				<Level y={bottom} o={on('sellers')} draw={on('sellers', 14)} label="WHAT SELLERS RECEIVE" />
			</>
		);
	}

	if (p.mode === 'spread') {
		// bid $99.98, ask $100.02, o vão de 4¢, o market maker no meio e a diferença que ele guarda
		const gap = on('gap', 14);
		const mm = interpolate(frame, [L('maker'), L('maker') + 12], [0, 1], {...clamp, easing: Easing.out(Easing.back(1.6))});
		const buy = on('buys', 16);
		const sell = on('sells', 16);
		const keep = on('keeps', 18);
		const cy = (top + bottom) / 2;
		body = (
			<>
				<rect x={X0} y={top} width={X1 - X0} height={(bottom - top) * (1 - 0.85 * keep)} fill={GOLD} fillOpacity={0.3 * gap} />
				<text x={X0 - 40} y={cy + 30} opacity={gap * (1 - keep)} fontFamily={FONT} fontWeight={700} fontSize={110} fill={GOLD} textAnchor="end">
					4¢
				</text>
				<Level y={bottom} o={on('bid')} draw={on('bid', 14)} label="BUYERS BID" price="$99.98" priceO={on('bidPrice')} />
				<Level y={top} o={on('ask')} draw={on('ask', 14)} label="SELLERS ASK" price="$100.02" priceO={on('askPrice')} />
				<g opacity={Math.min(1, mm)} transform={`translate(870 ${cy}) scale(${0.6 + 0.4 * mm}) translate(-870 ${-cy})`}>
					<circle cx={870} cy={cy} r={86} fill="#F4F3EE" stroke={DARK} strokeWidth={4} />
					<text x={870} y={cy - 2} fontFamily={FONT} fontWeight={700} fontSize={26} letterSpacing={3} fill={INK} textAnchor="middle">MARKET</text>
					<text x={870} y={cy + 30} fontFamily={FONT} fontWeight={700} fontSize={26} letterSpacing={3} fill={INK} textAnchor="middle">MAKER</text>
				</g>
				<path d={`M 700 ${top + 20} L ${700 + 0 * buy} ${top + 20 + (cy - 100 - top - 20) * buy}`} stroke={INK} strokeWidth={5} opacity={buy > 0 ? 1 : 0} markerEnd="url(#arrow)" />
				<path d={`M 1040 ${cy + 100} L 1040 ${cy + 100 + (bottom - 20 - cy - 100) * sell}`} stroke={INK} strokeWidth={5} opacity={sell > 0 ? 1 : 0} markerEnd="url(#arrow)" />
				<g opacity={keep}>
					<circle cx={870} cy={cy - 150} r={40} fill={GOLD} />
					<text x={870} y={cy - 138} fontFamily={FONT} fontWeight={700} fontSize={34} fill={DARK} textAnchor="middle">$</text>
					<text x={870} y={cy - 210} fontFamily={FONT} fontWeight={600} fontSize={28} letterSpacing={5} fill={SOFT} textAnchor="middle">KEEPS THE DIFFERENCE</text>
				</g>
			</>
		);
	}

	if (p.mode === 'improve') {
		// preço da tela $100.02 → preço que você recebe $100.01; 1¢ para você, o resto para o market maker, uma lasca para a corretora
		const yours = Y(101);
		const better = on('better', 14);
		const save = on('save', 14);
		const rest = on('rest', 14);
		const cut = on('cut', 14);
		body = (
			<>
				<Level y={top} o={on('screen')} draw={on('screen', 14)} label="PRICE ON YOUR SCREEN" price="$100.02" priceO={on('screen')} />
				<Level y={yours} o={better} draw={better} label="YOUR PRICE" price="$100.01" priceO={better} gold />
				<Level y={bottom} o={1} draw={1} label="BUYERS BID" price="$99.98" priceO={1} />
				{/* 1¢ que você economiza: sai pela esquerda */}
				<g transform={`translate(${-260 * save} 0)`} opacity={save}>
					<rect x={X0} y={top} width={X1 - X0} height={yours - top} fill={GOLD} fillOpacity={0.55} />
					<text x={X0 + 40} y={top + 80} fontFamily={FONT} fontWeight={700} fontSize={48} fill={DARK}>YOU SAVE 1¢</text>
				</g>
				{/* o resto (3¢) fica com o market maker */}
				<rect x={X0} y={yours} width={X1 - X0} height={bottom - yours} fill={GOLD} fillOpacity={0.25 * rest} />
				<text x={(X0 + X1) / 2} y={(yours + bottom) / 2 + 20} opacity={rest} fontFamily={FONT} fontWeight={700} fontSize={50} letterSpacing={4} fill={INK} textAnchor="middle">
					MARKET MAKER KEEPS THE REST
				</text>
				{/* uma lasca vai para a corretora */}
				<g opacity={cut} transform={`translate(0 ${60 * cut})`}>
					<rect x={X1 - 120} y={bottom - 34} width={120} height={34} fill={GOLD} />
					<text x={X1 - 120} y={bottom + 90} fontFamily={FONT} fontWeight={700} fontSize={30} letterSpacing={3} fill={INK}>A SLIVER TO YOUR BROKER</text>
				</g>
			</>
		);
	}

	return (
		<Shot id={p.id} enter={p.enter} exit={p.exit}>
			<div style={{position: 'absolute', inset: 0, transform: `translateX(${drift}px)`}}>
				<svg width={1920} height={1080} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
					<defs>
						<marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
							<path d="M 0 0 L 10 5 L 0 10 z" fill={INK} />
						</marker>
					</defs>
					<line x1={X0 - 2} x2={X0 - 2} y1={200} y2={860} stroke={LINE} strokeWidth={3} />
					{p.at.title !== undefined ? (
						<text x={960} y={560} opacity={on('title', 8) * (1 - on('bid', 8))} fontFamily={FONT} fontWeight={700} fontSize={84} letterSpacing={2} fill={INK} textAnchor="middle">
							Here's what that looks like.
						</text>
					) : null}
					{body}
				</svg>
			</div>
		</Shot>
	);
};
