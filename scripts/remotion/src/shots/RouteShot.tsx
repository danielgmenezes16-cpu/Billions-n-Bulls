import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {getLength, getPointAtLength} from '@remotion/paths';
import {Shot} from '../components/Shot';
import {DARK, ensureFonts, FONT, GOLD, INK, LINE, SOFT} from '../brand';

ensureFonts();

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export type RouteShotProps = {
	id: string;
	start: number; // frame absoluto em que a cena começa
	tapAt: number; // frames absolutos de cada momento
	exchangeAt: number;
	makerAt: number;
	makerNameAt: number;
	brokerAt: number;
	payAt: number;
	enter?: boolean;
	exit?: boolean;
};

const PHONE = {x: 330, y: 640};
const EXCHANGE = {x: 1480, y: 300};
const MAKER = {x: 1440, y: 780};
const BROKER = {x: 360, y: 250};

const TO_EXCHANGE = `M ${PHONE.x + 60} ${PHONE.y - 40} C 760 420, 1050 320, ${EXCHANGE.x - 240} ${EXCHANGE.y}`;
const TO_MAKER = `M ${PHONE.x + 60} ${PHONE.y + 20} C 760 760, 1050 820, ${MAKER.x - 130} ${MAKER.y}`;
const TO_BROKER = `M ${MAKER.x - 90} ${MAKER.y - 110} C 1150 520, 760 300, ${BROKER.x + 180} ${BROKER.y + 10}`;

const Label: React.FC<{x: number; y: number; text: string; o: number; size?: number; color?: string; weight?: number}> = ({
	x,
	y,
	text,
	o,
	size = 30,
	color = INK,
	weight = 700,
}) => (
	<text x={x} y={y} opacity={o} fontFamily={FONT} fontWeight={weight} fontSize={size} letterSpacing={size > 28 ? 4 : 1} fill={color} textAnchor="middle">
		{text}
	</text>
);

// A rota da ordem: o toque no BUY não vai para a bolsa; vai para um market maker, que paga a corretora.
export const RouteShot: React.FC<RouteShotProps> = (p) => {
	const frame = useCurrentFrame();
	const L = (abs: number) => abs - p.start;
	const ease = {...clamp, easing: Easing.out(Easing.cubic)};

	const phoneIn = interpolate(frame, [0, 10], [0, 1], ease);
	const ripple = interpolate(frame, [L(p.tapAt), L(p.tapAt) + 20], [0, 1], ease);
	const exIn = interpolate(frame, [L(p.exchangeAt) - 4, L(p.exchangeAt) + 8], [0, 1], ease);
	const exDraw = interpolate(frame, [L(p.exchangeAt) - 12, L(p.exchangeAt) + 10], [0, 1], ease);
	const exFade = interpolate(frame, [L(p.makerAt), L(p.makerAt) + 12], [1, 0.35], clamp);
	const mkIn = interpolate(frame, [L(p.makerAt) + 18, L(p.makerAt) + 30], [0, 1], {...clamp, easing: Easing.out(Easing.back(1.6))});
	const mkLen = getLength(TO_MAKER);
	const travel = interpolate(frame, [L(p.makerAt), L(p.makerAt) + 30], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
	const dot = getPointAtLength(TO_MAKER, mkLen * travel) ?? {x: PHONE.x, y: PHONE.y};
	const name = interpolate(frame, [L(p.makerNameAt), L(p.makerNameAt) + 8], [0, 1], clamp);
	const brIn = interpolate(frame, [L(p.brokerAt), L(p.brokerAt) + 10], [0, 1], ease);
	const brLen = getLength(TO_BROKER);
	const brDraw = interpolate(frame, [L(p.payAt) - 6, L(p.payAt) + 14], [0, 1], ease);
	const coins = [0, 7, 14].map((d) => {
		const k = interpolate(frame, [L(p.payAt) + d, L(p.payAt) + d + 26], [0, 1], {...clamp, easing: Easing.inOut(Easing.quad)});
		return {k, pt: getPointAtLength(TO_BROKER, brLen * k) ?? {x: MAKER.x, y: MAKER.y}};
	});
	const drift = -0.25 * frame;

	return (
		<Shot id={p.id} enter={p.enter} exit={p.exit}>
			<div style={{position: 'absolute', inset: 0, transform: `translateX(${drift}px)`}}>
				<svg width={1920} height={1080} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
					{/* Caminho esperado: até a bolsa (fica fantasma) */}
					<path d={TO_EXCHANGE} fill="none" stroke={INK} strokeOpacity={0.4 * exFade * exDraw} strokeWidth={3} strokeDasharray="12 12" />
					<g opacity={exIn * exFade}>
						<rect x={EXCHANGE.x - 240} y={EXCHANGE.y - 70} width={480} height={140} rx={18} fill="#F4F3EE" stroke={INK} strokeOpacity={0.5} strokeWidth={3} />
						<Label x={EXCHANGE.x} y={EXCHANGE.y + 12} text="STOCK EXCHANGE" o={1} size={32} />
					</g>
					{/* Caminho real: até o market maker */}
					<path d={TO_MAKER} fill="none" stroke={GOLD} strokeWidth={6} strokeLinecap="round" strokeDasharray={mkLen} strokeDashoffset={mkLen * (1 - travel)} opacity={travel > 0 ? 1 : 0} />
					<g opacity={Math.min(1, mkIn)} transform={`translate(${MAKER.x} ${MAKER.y}) scale(${0.7 + 0.3 * mkIn}) translate(${-MAKER.x} ${-MAKER.y})`}>
						<circle cx={MAKER.x} cy={MAKER.y} r={120} fill="#F4F3EE" stroke={DARK} strokeWidth={4} />
						<Label x={MAKER.x} y={MAKER.y - 4} text="MARKET" o={1} size={32} />
						<Label x={MAKER.x} y={MAKER.y + 36} text="MAKER" o={1} size={32} />
					</g>
					<Label x={MAKER.x} y={MAKER.y + 180} text="e.g. Citadel Securities" o={name} size={30} color={SOFT} weight={400} />
					{/* Corretora recebe */}
					<path d={TO_BROKER} fill="none" stroke={LINE} strokeWidth={3} strokeDasharray={brLen} strokeDashoffset={brLen * (1 - brDraw)} />
					<g opacity={brIn}>
						<rect x={BROKER.x - 170} y={BROKER.y - 60} width={340} height={120} rx={60} fill={DARK} />
						<Label x={BROKER.x} y={BROKER.y + 11} text="YOUR BROKER" o={1} size={30} color="#F4F3EE" />
					</g>
					{coins.map((c, i) =>
						c.k > 0 && c.k < 1 ? (
							<g key={i}>
								<circle cx={c.pt.x} cy={c.pt.y} r={24} fill={GOLD} />
								<text x={c.pt.x} y={c.pt.y + 10} fontFamily={FONT} fontWeight={700} fontSize={28} fill={DARK} textAnchor="middle">
									$
								</text>
							</g>
						) : null,
					)}
					{/* Seu toque */}
					<g opacity={phoneIn}>
						{ripple > 0 && ripple < 1 ? (
							<circle cx={PHONE.x} cy={PHONE.y} r={80 + 160 * ripple} fill="none" stroke={GOLD} strokeWidth={5} strokeOpacity={0.7 * (1 - ripple)} />
						) : null}
						<rect x={PHONE.x - 60} y={PHONE.y - 110} width={120} height={220} rx={22} fill={DARK} />
						<rect x={PHONE.x - 50} y={PHONE.y - 100} width={100} height={200} rx={16} fill="#F4F3EE" />
						<rect x={PHONE.x - 34} y={PHONE.y + 52} width={68} height={24} rx={12} fill={GOLD} />
						<Label x={PHONE.x} y={PHONE.y + 170} text="YOUR TAP" o={1} size={30} color={SOFT} />
					</g>
					{travel > 0 && travel < 1 ? (
						<g>
							<circle cx={dot.x} cy={dot.y} r={30} fill={GOLD} fillOpacity={0.25} />
							<circle cx={dot.x} cy={dot.y} r={14} fill={GOLD} />
						</g>
					) : null}
				</svg>
			</div>
		</Shot>
	);
};
