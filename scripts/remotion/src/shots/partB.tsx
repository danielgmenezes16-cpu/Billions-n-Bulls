import React from 'react';
import {interpolate} from 'remotion';
import {ensureFonts, LINE} from '../brand';
import {Arrow, CoinDot, DARK, GOLD, INK, Panel, Scene, SOFT, Source, Stamp, Tag, Txt, useOn} from './kit';

ensureFonts();

const lin = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// ---------- Parte 4: cada dólar fatiado ----------
export type Slice = {cents: number; label: string; at: number; highlight?: boolean};
export const DollarShot: React.FC<{id: string; start: number; titleAt: number; slices: Slice[]; source: string}> = (p) => {
	const {on, frame} = useOn(p.start);
	const W = 1400;
	const x0 = 260;
	const y0 = 330;
	const H = 420;
	let x = x0;
	return (
		<Scene id={p.id}>
			<Txt x={228} y={180} o={on(p.titleAt)} size={46}>Out of every dollar Robinhood made in Q4 2025</Txt>
			<rect x={x0} y={y0} width={W} height={H} rx={18} fill="#F4F3EE" stroke={DARK} strokeWidth={4} opacity={on(p.titleAt)} />
			<Txt x={x0 + W / 2} y={y0 + H / 2 + 60} o={on(p.titleAt) * 0.12} size={200} weight={800} anchor="middle">$1</Txt>
			{p.slices.map((s, i) => {
				const w = (W * s.cents) / 100;
				const narrow = w < 200;
				const ly = y0 + H + 60 + (narrow ? ((i % 3) + 1) * 44 : 0);
				const k = interpolate(frame, [s.at - p.start, s.at - p.start + 10], [0, 1], lin);
				const lift = -30 * k;
				const sx = x;
				x += w;
				return (
					<g key={s.label} opacity={k}>
						<rect x={sx + 3} y={y0 + lift} width={w - 6} height={H} rx={10} fill={s.highlight ? GOLD : DARK} fillOpacity={s.highlight ? 1 : 0.18 + s.cents / 60} />
						<Txt x={sx + w / 2} y={y0 + lift + H / 2 + 24} size={w > 140 ? 72 : 52} weight={800} anchor="middle" color={s.highlight ? DARK : '#F4F3EE'}>
							{s.cents}¢
						</Txt>
						{narrow ? <line x1={sx + w / 2} x2={sx + w / 2} y1={y0 + H + 8} y2={ly - 30} stroke={INK} strokeOpacity={0.4} strokeWidth={2} /> : null}
						<Tag x={sx + w / 2} y={ly} anchor="middle" size={narrow ? 22 : 28} color={INK}>
							{s.label}
						</Tag>
					</g>
				);
			})}
			<Source text={p.source} o={on(p.titleAt)} />
		</Scene>
	);
};

// ---------- Parte 4: de onde vêm os juros ----------
export type Source3 = {title: string; lines: string[]; at: number; icon: 'bank' | 'loan' | 'lend'};
const Icon: React.FC<{kind: Source3['icon']; x: number; y: number}> = ({kind, x, y}) => {
	if (kind === 'bank') {
		return (
			<g transform={`translate(${x} ${y})`}>
				<path d="M -90 -20 L 0 -80 L 90 -20 Z" fill={DARK} />
				{[-60, -20, 20, 60].map((cx) => <rect key={cx} x={cx - 10} y={-10} width={20} height={80} fill={DARK} />)}
				<rect x={-100} y={74} width={200} height={20} fill={DARK} />
			</g>
		);
	}
	if (kind === 'loan') {
		return (
			<g transform={`translate(${x} ${y})`}>
				<CoinDot x={-40} y={10} r={44} />
				<Arrow x1={10} y1={10} x2={100} y2={10} k={1} color={DARK} width={8} />
				<Txt x={-40} y={110} size={30} weight={700} anchor="middle" color={SOFT}>+ interest</Txt>
			</g>
		);
	}
	return (
		<g transform={`translate(${x} ${y})`}>
			{[0, 1, 2].map((i) => <rect key={i} x={-90 + i * 24} y={-60 + i * 24} width={110} height={80} rx={8} fill="#F4F3EE" stroke={DARK} strokeWidth={4} />)}
			<Arrow x1={60} y1={40} x2={130} y2={40} k={1} color={GOLD} width={8} />
		</g>
	);
};
export const SourcesShot: React.FC<{id: string; start: number; titleAt: number; items: Source3[]}> = (p) => {
	const {on, popIn} = useOn(p.start);
	return (
		<Scene id={p.id}>
			<Txt x={228} y={180} o={on(p.titleAt)} size={46}>Where the interest comes from</Txt>
			{p.items.map((it, i) => {
				const x = 228 + i * 500;
				const k = popIn(it.at);
				return (
					<g key={it.title} opacity={Math.min(1, k)}>
						<Panel x={x} y={260} w={460} h={640} rx={18}>
							<Txt x={x + 40} y={330} size={70} weight={800} color={GOLD}>{i + 1}</Txt>
							<Icon kind={it.icon} x={x + 230} y={480} />
							<Txt x={x + 40} y={680} size={42} weight={700}>{it.title}</Txt>
							{it.lines.map((l, j) => (
								<Txt key={j} x={x + 40} y={740 + j * 44} size={30} color={SOFT} o={on(it.at + 20 + j * 12)}>{l}</Txt>
							))}
						</Panel>
					</g>
				);
			})}
		</Scene>
	);
};

// ---------- Parte 5: GameStop até o dia 28 ----------
export const GmeShot: React.FC<{id: string; start: number; at: {date: number; name: number; low: number; high: number; crowd: number}}> = (p) => {
	const {on, popIn, frame} = useOn(p.start);
	const a = p.at;
	const draw = interpolate(frame, [a.low - p.start, a.high - p.start + 10], [0, 1], lin);
	// caminho ilustrativo: quase reto até o fim de 2020, depois dispara (só os pontos marcados são dados reais)
	const pts = Array.from({length: 61}, (_, i) => {
		const t = i / 60;
		const y = 880 - 640 * Math.pow(t, 9);
		return [360 + 1180 * t, y];
	});
	const shown = pts.slice(0, Math.max(2, Math.round(61 * draw)));
	const crowd = on(a.crowd, 30);
	return (
		<Scene id={p.id}>
			<Stamp x={1560} y={170} k={popIn(a.date)} text="JAN 28, 2021" size={56} />
			<Txt x={228} y={180} o={on(a.name)} size={60} weight={700}>GameStop</Txt>
			<Txt x={228} y={232} o={on(a.name)} size={30} color={SOFT}>a struggling video game retailer</Txt>
			<line x1={340} x2={1560} y1={900} y2={900} stroke={INK} strokeOpacity={0.4} strokeWidth={3} />
			<polyline points={shown.map((q) => q.join(',')).join(' ')} fill="none" stroke={DARK} strokeWidth={7} strokeLinejoin="round" strokeDasharray="2 0" />
			<g opacity={on(a.low)}>
				<circle cx={360} cy={880} r={14} fill={DARK} />
				<Txt x={380} y={850} size={44} weight={700}>$2.57</Txt>
				<Txt x={380} y={950} size={28} color={SOFT}>April 2020</Txt>
			</g>
			<g opacity={popIn(a.high)}>
				<circle cx={1540} cy={240} r={20} fill={GOLD} />
				<Txt x={1500} y={330} size={72} weight={800} anchor="end">$483</Txt>
				<Txt x={1500} y={376} size={28} color={SOFT} anchor="end">intraday high, Jan 28, 2021</Txt>
			</g>
			{Array.from({length: 40}, (_, i) => {
				const k = Math.min(1, Math.max(0, crowd * 40 - i));
				return <circle key={i} cx={1100 + ((i * 53) % 420)} cy={520 + ((i * 37) % 300)} r={9} fill={DARK} fillOpacity={0.4 * k} />;
			})}
			<Tag x={1300} y={880} o={crowd}>MILLIONS PILING IN</Tag>
			<Source text="Line between points is illustrative. Prices before the 2022 stock split · Sources: Benzinga, Expansión" />
		</Scene>
	);
};

// ---------- Parte 5: BUY travado, SELL liberado ----------
export const LockShot: React.FC<{id: string; start: number; at: {stop: number; sell: number; cant: number}}> = (p) => {
	const {on, popIn} = useOn(p.start);
	const a = p.at;
	const lock = popIn(a.stop);
	return (
		<Scene id={p.id}>
			<g transform="translate(700 120)">
				<rect x={0} y={0} width={520} height={880} rx={70} fill="#1E1E1C" />
				<rect x={20} y={20} width={480} height={840} rx={54} fill="#F4F3EE" />
				<Txt x={60} y={150} size={30} color={SOFT}>GME</Txt>
				<Txt x={60} y={210} size={56} weight={800}>GameStop</Txt>
				<rect x={60} y={560} width={400} height={110} rx={55} fill={LINE} />
				<Txt x={260} y={632} size={44} weight={800} anchor="middle" color="#9A9891" spacing={4}>BUY</Txt>
				<rect x={60} y={700} width={400} height={110} rx={55} fill={GOLD} opacity={0.4 + 0.6 * on(a.sell)} />
				<Txt x={260} y={772} size={44} weight={800} anchor="middle" spacing={4}>SELL</Txt>
				{/* cadeado sobre o BUY */}
				<g opacity={Math.min(1, lock)} transform={`translate(430 600) scale(${lock})`}>
					<rect x={-40} y={-10} width={80} height={64} rx={10} fill={DARK} />
					<path d="M -24 -10 L -24 -34 C -24 -62, 24 -62, 24 -34 L 24 -10" fill="none" stroke={DARK} strokeWidth={12} />
				</g>
			</g>
			<Stamp x={1500} y={520} k={popIn(a.cant)} text="YOU CAN'T BUY" size={60} rot={-8} color={DARK} />
			<Txt x={380} y={540} o={on(a.sell)} size={44} weight={700} anchor="middle">You could sell.</Txt>
		</Scene>
	);
};

// ---------- Parte 5: o encanamento por trás do botão ----------
export const PlumbingShot: React.FC<{id: string; start: number; at: {t2: number; nscc: number; demand: number; restrict: number; cut: number; raised: number}}> = (p) => {
	const {on, popIn, frame} = useOn(p.start);
	const a = p.at;
	const fill = interpolate(frame, [a.demand - p.start, a.demand - p.start + 24, a.cut - p.start, a.cut - p.start + 24], [0, 1, 1, 1.4 / 3.7], lin);
	const val = frame < a.cut - p.start ? 3.7 * Math.min(1, fill) : 1.4 + (3.7 - 1.4) * Math.max(0, (fill - 1.4 / 3.7) / (1 - 1.4 / 3.7));
	const flow = (frame % 30) / 30;
	const raised = interpolate(frame, [a.raised - p.start, a.raised - p.start + 30], [0, 1], lin);
	return (
		<Scene id={p.id}>
			{/* T+2 */}
			<g opacity={popIn(a.t2)} transform="translate(250 170)">
				<rect x={0} y={0} width={220} height={200} rx={16} fill="#F4F3EE" stroke={DARK} strokeWidth={4} />
				<rect x={0} y={0} width={220} height={54} rx={16} fill={DARK} />
				<Txt x={110} y={150} size={84} weight={800} anchor="middle">T+2</Txt>
				<Txt x={250} y={90} size={36} weight={700}>Two days</Txt>
				<Txt x={250} y={136} size={36} weight={700}>to settle</Txt>
			</g>
			{/* corretora → câmara de compensação */}
			<g opacity={on(a.nscc)}>
				<rect x={250} y={560} width={360} height={150} rx={75} fill={DARK} />
				<Txt x={430} y={648} size={36} weight={700} color="#F4F3EE" anchor="middle" spacing={4}>ROBINHOOD</Txt>
				<rect x={610} y={615} width={480} height={40} fill={LINE} />
				{[0, 1, 2, 3].map((i) => <CoinDot key={i} x={630 + ((flow + i / 4) % 1) * 440} y={635} r={16} />)}
				<rect x={1090} y={380} width={420} height={520} rx={30} fill="#F4F3EE" stroke={DARK} strokeWidth={5} />
				<rect x={1110} y={880 - 480 * Math.min(1, fill)} width={380} height={480 * Math.min(1, fill)} rx={16} fill={GOLD} />
				<Txt x={1300} y={440} size={36} weight={700} anchor="middle" spacing={4}>NSCC</Txt>
				<Txt x={1300} y={480} size={26} color={SOFT} anchor="middle">clearinghouse</Txt>
				<Tag x={1300} y={950} anchor="middle" color={INK}>COLLATERAL DEMANDED</Tag>
			</g>
			<Txt x={1560} y={700} o={on(a.demand)} size={110} weight={800}>${val.toFixed(1)}B</Txt>
			<Stamp x={430} y={830} k={popIn(a.restrict)} text="BUYING RESTRICTED: 13 STOCKS" size={34} rot={-4} />
			{/* captação com investidores */}
			<g opacity={on(a.raised)}>
				<Tag x={430} y={420} anchor="middle" color={INK}>INVESTORS</Tag>
				{[0, 1, 2].map((i) => <CoinDot key={i} x={360 + i * 70} y={460 + 90 * ((raised + i * 0.3) % 1)} r={22} />)}
				<Txt x={700} y={470} size={52} weight={800}>+$3.4B raised</Txt>
			</g>
			<Source text="Source: US House Financial Services Committee report on the meme stock episode (2022); CNBC; FinTech Futures" />
		</Scene>
	);
};

// ---------- Parte 5: depoimento no Congresso ----------
export const CapitolShot: React.FC<{id: string; start: number; at: {weeks: number; ceo: number; griffin: number}}> = (p) => {
	const {on, popIn} = useOn(p.start);
	const a = p.at;
	return (
		<Scene id={p.id}>
			<g opacity={on(a.weeks, 14)} transform="translate(960 640)">
				{/* silhueta do Capitólio */}
				<rect x={-520} y={120} width={1040} height={60} fill={DARK} />
				<rect x={-460} y={10} width={920} height={110} fill={DARK} />
				{Array.from({length: 13}, (_, i) => <rect key={i} x={-440 + i * 70} y={20} width={22} height={100} fill="#E0E0D7" fillOpacity={0.35} />)}
				<rect x={-150} y={-70} width={300} height={80} fill={DARK} />
				<path d="M -140 -70 C -140 -250, 140 -250, 140 -70 Z" fill={DARK} />
				<rect x={-12} y={-300} width={24} height={70} fill={DARK} />
			</g>
			<Stamp x={960} y={180} k={popIn(a.weeks)} text="FEB 18, 2021" size={56} />
			<g opacity={popIn(a.ceo)}>
				<rect x={228} y={260} width={420} height={110} rx={55} fill="#F4F3EE" stroke={DARK} strokeWidth={4} />
				<Txt x={438} y={328} size={34} weight={700} anchor="middle">Robinhood's CEO</Txt>
			</g>
			<g opacity={popIn(a.griffin)}>
				<rect x={1272} y={260} width={420} height={110} rx={55} fill="#F4F3EE" stroke={DARK} strokeWidth={4} />
				<Txt x={1482} y={312} size={32} weight={700} anchor="middle">Ken Griffin</Txt>
				<Txt x={1482} y={350} size={26} anchor="middle" color={SOFT}>head of Citadel</Txt>
			</g>
			<Tag x={960} y={1000} anchor="middle" o={on(a.weeks)} color={INK}>TESTIFYING BEFORE CONGRESS</Tag>
		</Scene>
	);
};
