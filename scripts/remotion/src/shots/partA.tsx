import React from 'react';
import {interpolate} from 'remotion';
import {ensureFonts, LINE} from '../brand';
import {Arrow, CoinDot, DARK, GOLD, INK, Panel, Scene, SOFT, Source, Stamp, Tag, Txt, useOn} from './kit';

ensureFonts();

// Telas das Partes 2 e 3 (e as genéricas de números e barras). Todos os tempos são frames absolutos.

// ---------- Números em destaque (2 a 4 por tela), com anel de proporção opcional ----------
export type Stat = {value: string; label: string; at: number; ring?: number; sub?: string};
export const StatsShot: React.FC<{id: string; start: number; title?: string; titleAt?: number; items: Stat[]; source?: string; stamp?: {text: string; at: number}}> = (p) => {
	const {on, popIn, frame} = useOn(p.start);
	const cols = p.items.length > 2 ? 2 : p.items.length;
	const rows = Math.ceil(p.items.length / cols);
	const cw = 1460 / cols;
	const top = p.title ? (rows > 1 ? 300 : 400) : 300;
	const rh = rows > 1 ? 330 : 420;
	return (
		<Scene id={p.id}>
			{p.title ? <Txt x={228} y={180} o={on(p.titleAt ?? p.start)} size={46}>{p.title}</Txt> : null}
			{p.items.map((it, i) => {
				const x = 228 + (i % cols) * cw;
				const y = top + Math.floor(i / cols) * rh;
				const k = popIn(it.at);
				const ringK = it.ring !== undefined ? interpolate(frame, [it.at - p.start, it.at - p.start + 24], [0, it.ring], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 0;
				const vx = it.ring !== undefined ? x + 230 : x;
				return (
					<g key={i} opacity={Math.min(1, k)}>
						{it.ring !== undefined ? (
							<g>
								<circle cx={x + 95} cy={y + 90} r={88} fill="none" stroke={LINE} strokeWidth={20} />
								<circle cx={x + 95} cy={y + 90} r={88} fill="none" stroke={GOLD} strokeWidth={20} strokeDasharray={`${2 * Math.PI * 88 * ringK} ${2 * Math.PI * 88}`} transform={`rotate(-90 ${x + 95} ${y + 90})`} />
							</g>
						) : null}
						<Txt x={vx} y={y + 130} size={rows > 1 ? 120 : 150} weight={800} color={INK} spacing={-3}>{it.value}</Txt>
						<Txt x={vx} y={y + 200} size={36} color={SOFT} o={on(it.at + 6)}>{it.label}</Txt>
						{it.sub ? <Txt x={vx} y={y + 248} size={28} color={SOFT} o={on(it.at + 10)}>{it.sub}</Txt> : null}
					</g>
				);
			})}
			{p.stamp ? <Stamp x={1640} y={930} k={popIn(p.stamp.at)} text={p.stamp.text} color={DARK} size={60} /> : null}
			{p.source ? <Source text={p.source} o={on(p.items[0].at)} /> : null}
		</Scene>
	);
};

// ---------- Barras verticais com dado real ----------
export type Bar = {label: string; value: number; display: string; at: number; highlight?: boolean};
export const BarsShot: React.FC<{id: string; start: number; title: string; titleAt: number; bars: Bar[]; source: string; note?: {text: string; at: number}; horizontal?: boolean}> = (p) => {
	const {on, frame} = useOn(p.start);
	const max = Math.max(...p.bars.map((b) => b.value));
	if (p.horizontal) {
		return (
			<Scene id={p.id}>
				<Txt x={228} y={180} o={on(p.titleAt)} size={46}>{p.title}</Txt>
				{p.bars.map((b, i) => {
					const k = interpolate(frame, [b.at - p.start, b.at - p.start + 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
					const y = 280 + i * 130;
					const w = 1050 * (b.value / max) * k;
					return (
						<g key={b.label} opacity={Math.min(1, k * 2)}>
							<Txt x={540} y={y + 56} size={42} weight={600} anchor="end">{b.label}</Txt>
							<rect x={580} y={y + 10} width={w} height={64} rx={8} fill={b.highlight ? GOLD : DARK} fillOpacity={b.highlight ? 1 : 0.72} />
							<Txt x={600 + w} y={y + 58} size={44} weight={700}>{b.display}</Txt>
						</g>
					);
				})}
				{p.note ? <Stamp x={1450} y={900} k={on(p.note.at, 12)} text={p.note.text} color={GOLD} size={58} /> : null}
				<Source text={p.source} o={on(p.titleAt)} />
			</Scene>
		);
	}
	const bw = 220;
	const base = 860;
	const maxH = 520;
	return (
		<Scene id={p.id}>
			<Txt x={228} y={180} o={on(p.titleAt)} size={46}>{p.title}</Txt>
			<line x1={300} x2={300 + p.bars.length * (bw + 120)} y1={base} y2={base} stroke={INK} strokeOpacity={0.5} strokeWidth={3} />
			{p.bars.map((b, i) => {
				const k = interpolate(frame, [b.at - p.start, b.at - p.start + 18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
				const h = maxH * (b.value / max) * k;
				const x = 360 + i * (bw + 120);
				return (
					<g key={b.label} opacity={Math.min(1, k * 2)}>
						<rect x={x} y={base - h} width={bw} height={h} rx={8} fill={b.highlight ? GOLD : DARK} fillOpacity={b.highlight ? 1 : 0.72} />
						<Txt x={x + bw / 2} y={base - h - 24} size={56} weight={700} anchor="middle">{b.display}</Txt>
						<Tag x={x + bw / 2} y={base + 56} anchor="middle" size={30}>{b.label}</Tag>
					</g>
				);
			})}
			{p.note ? <Stamp x={1500} y={420} k={on(p.note.at, 12)} text={p.note.text} color={GOLD} size={72} /> : null}
			<Source text={p.source} o={on(p.titleAt)} />
		</Scene>
	);
};

// ---------- Parte 2: por que a sua ordem é a mais segura ----------
export const OrderFlowShot: React.FC<{id: string; start: number; at: {safe: number; fund: number; slice: number; move: number; yours: number; small: number; random: number; know: number}}> = (p) => {
	const {on, popIn, frame} = useOn(p.start);
	const a = p.at;
	const hidden = on(a.slice, 18);
	const jump = on(a.move, 20);
	const fadeFund = interpolate(frame, [a.yours - p.start, a.yours - p.start + 12], [1, 0.35], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	return (
		<Scene id={p.id}>
			<Txt x={228} y={170} o={on(a.safe)} size={46}>Why retail orders are the safest</Txt>
			{/* Hedge fund: uma fatia de uma posição enorme; o preço vai andar contra quem vendeu */}
			<g opacity={on(a.fund) * fadeFund}>
				<Tag x={230} y={300}>A HEDGE FUND ORDER</Tag>
				<rect x={230} y={330 - 120 * hidden} width={260 + 340 * hidden} height={420 + 120 * hidden} rx={10} fill="none" stroke={INK} strokeOpacity={0.5 * hidden} strokeWidth={3} strokeDasharray="12 10" />
				<rect x={230} y={630} width={260} height={120} rx={10} fill={DARK} />
				<Txt x={360} y={704} size={30} weight={700} color="#F4F3EE" anchor="middle" spacing={3}>FIRST SLICE</Txt>
				<Txt x={560} y={500} o={hidden} size={30} color={SOFT} anchor="middle">the huge position behind it</Txt>
				<polyline points={`230,880 330,876 430,872 530,${868 - 150 * jump} 630,${862 - 230 * jump}`} fill="none" stroke={INK} strokeWidth={6} strokeLinejoin="round" opacity={jump > 0 ? 1 : 0.4} />
				<Txt x={650} y={860 - 230 * jump} o={jump} size={30} weight={700}>PRICE MOVES</Txt>
			</g>
			{/* A sua ordem: pequena, aleatória, sem informação */}
			<g opacity={on(a.yours)}>
				<Tag x={1180} y={300}>YOUR ORDER</Tag>
				<circle cx={1290} cy={560} r={34} fill={GOLD} />
				{[0, 1, 2, 3, 4, 5, 6].map((i) => (
					<circle key={i} cx={1180 + ((i * 97) % 380)} cy={420 + ((i * 61) % 300)} r={10} fill={DARK} fillOpacity={0.35} />
				))}
				<Stamp x={1560} y={470} k={popIn(a.small)} text="SMALL" size={44} rot={-5} />
				<Stamp x={1560} y={600} k={popIn(a.random)} text="RANDOM" size={44} rot={4} />
				<Stamp x={1500} y={740} k={popIn(a.know)} text="NO INSIDE INFO" size={40} rot={-3} />
			</g>
		</Scene>
	);
};

// ---------- Parte 2: seguro de carro → motoristas cuidadosos ----------
export const InsuranceShot: React.FC<{id: string; start: number; at: {car: number; careful: number; rarely: number; retail: number; drivers: number}}> = (p) => {
	const {on, popIn} = useOn(p.start);
	const a = p.at;
	return (
		<Scene id={p.id}>
			<Txt x={228} y={180} o={on(a.car)} size={46}>Think of it like car insurance</Txt>
			<g opacity={on(a.car)} transform="translate(300 420)">
				{/* carro simples */}
				<rect x={0} y={90} width={520} height={130} rx={40} fill={DARK} />
				<path d="M 90 90 L 160 10 L 360 10 L 440 90 Z" fill={DARK} />
				<path d="M 175 30 L 250 30 L 250 88 L 125 88 Z M 270 30 L 345 30 L 405 88 L 270 88 Z" fill="#F4F3EE" fillOpacity={0.85} />
				<circle cx={120} cy={225} r={52} fill="#1E1E1C" />
				<circle cx={120} cy={225} r={22} fill="#BDBDB6" />
				<circle cx={400} cy={225} r={52} fill="#1E1E1C" />
				<circle cx={400} cy={225} r={22} fill="#BDBDB6" />
			</g>
			{/* escudo dourado: o seguro adora esse motorista */}
			<g opacity={popIn(a.careful)} transform="translate(900 380)">
				<path d="M 90 0 L 180 34 L 180 120 C 180 190, 130 230, 90 250 C 50 230, 0 190, 0 120 L 0 34 Z" fill={GOLD} />
				<path d="M 50 125 L 82 158 L 135 95" fill="none" stroke={DARK} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
			</g>
			<Tag x={990} y={690} anchor="middle" o={on(a.careful)}>CAREFUL DRIVER</Tag>
			<Txt x={1320} y={500} o={on(a.rarely)} size={44} weight={700}>Rarely costs</Txt>
			<Txt x={1320} y={556} o={on(a.rarely)} size={44} weight={700}>them anything</Txt>
			<g opacity={on(a.retail)}>
				<rect x={228} y={800} width={1464} height={130} rx={20} fill="#F4F3EE" stroke={INK} strokeOpacity={0.4} strokeWidth={3} />
				<Txt x={300} y={884} size={48} weight={700}>RETAIL ORDERS</Txt>
				<Txt x={800} y={884} size={48} weight={400} color={SOFT}>=</Txt>
				<Txt x={880} y={884} size={48} weight={700} o={on(a.drivers)} color={INK}>THE CAREFUL DRIVERS OF THE MARKET</Txt>
			</g>
		</Scene>
	);
};

// ---------- Parte 2: o conflito de interesse ----------
export const ConflictShot: React.FC<{id: string; start: number; at: {title: number; broker: number; paid: number; side: number}}> = (p) => {
	const {on, popIn, frame} = useOn(p.start);
	const a = p.at;
	const coin = interpolate(frame, [a.paid - p.start, a.paid - p.start + 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	return (
		<Scene id={p.id}>
			<Stamp x={960} y={190} k={popIn(a.title)} text="THE CONFLICT" size={64} color={DARK} rot={-3} />
			{/* você e o market maker em lados opostos da mesma operação */}
			<g opacity={on(a.title)}>
				<circle cx={420} cy={720} r={110} fill="#F4F3EE" stroke={DARK} strokeWidth={4} />
				<Txt x={420} y={734} size={40} weight={700} anchor="middle" spacing={4}>YOU</Txt>
				<circle cx={1500} cy={720} r={130} fill="#F4F3EE" stroke={DARK} strokeWidth={4} />
				<Txt x={1500} y={712} size={34} weight={700} anchor="middle" spacing={3}>MARKET</Txt>
				<Txt x={1500} y={752} size={34} weight={700} anchor="middle" spacing={3}>MAKER</Txt>
			</g>
			<line x1={540} x2={1360} y1={720} y2={720} stroke={INK} strokeWidth={4} strokeDasharray="14 12" opacity={on(a.side)} />
			<Tag x={950} y={700} anchor="middle" o={on(a.side)}>OPPOSITE SIDES OF YOUR TRADE</Tag>
			<g opacity={on(a.broker)}>
				<rect x={790} y={360} width={340} height={120} rx={60} fill={DARK} />
				<Txt x={960} y={433} size={34} weight={700} color="#F4F3EE" anchor="middle" spacing={4}>YOUR BROKER</Txt>
			</g>
			<line x1={1420} y1={600} x2={1110} y2={480} stroke={GOLD} strokeWidth={5} opacity={on(a.paid)} />
			{coin > 0 && coin < 1 ? <CoinDot x={1420 - 310 * coin} y={600 - 120 * coin} r={28} /> : null}
			<Tag x={1340} y={520} o={on(a.paid)} color={INK}>PAYS</Tag>
		</Scene>
	);
};

// ---------- Parte 2: a decisão da SEC (documento recriado) ----------
export const DocShot: React.FC<{id: string; start: number; at: {misled: number; years: number; worse: number; paid: number; deny: number}}> = (p) => {
	const {on, frame} = useOn(p.start);
	const a = p.at;
	const zoom = interpolate(frame, [0, (a.deny - p.start) + 60], [1, 1.12], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const mark = (t: number, x: number, y: number, w: number) => (
		<rect x={x - 8} y={y - 44} width={w * on(t, 12)} height={58} fill={GOLD} fillOpacity={0.55} />
	);
	const filler = (y: number, w: number) => <rect x={420} y={y} width={w} height={16} rx={8} fill={LINE} />;
	return (
		<Scene id={p.id} drift={0}>
			<g transform={`translate(960 560) scale(${zoom}) translate(-960 -560)`}>
				<Panel x={380} y={110} w={1160} h={900} rx={6} fill="#FBFAF6">
					<Tag x={960} y={190} anchor="middle" color={INK}>SECURITIES AND EXCHANGE COMMISSION</Tag>
					<Txt x={960} y={250} size={34} weight={700} anchor="middle">In the Matter of Robinhood Financial LLC</Txt>
					<Txt x={960} y={296} size={28} color={SOFT} anchor="middle">December 17, 2020</Txt>
					<line x1={440} x2={1480} y1={330} y2={330} stroke={LINE} strokeWidth={3} />
					{filler(380, 980)}
					{mark(a.misled, 420, 460, 470)}
					<Txt x={420} y={460} size={40} weight={700}>Misled customers</Txt>
					<Txt x={900} y={460} size={40}>about how it made money</Txt>
					{mark(a.years, 420, 540, 330)}
					<Txt x={420} y={540} size={40} weight={700}>from 2015 to 2018</Txt>
					{filler(580, 900)}
					{mark(a.worse, 420, 660, 620)}
					<Txt x={420} y={660} size={40} weight={700}>$34.1 million in worse prices</Txt>
					<Txt x={420} y={710} size={32} color={SOFT}>even after the commissions customers saved</Txt>
					{filler(750, 940)}
					{mark(a.paid, 420, 830, 420)}
					<Txt x={420} y={830} size={40} weight={700}>$65 million penalty</Txt>
					{mark(a.deny, 420, 900, 640)}
					<Txt x={420} y={900} size={40} weight={700}>without admitting or denying</Txt>
					{filler(940, 700)}
				</Panel>
			</g>
			<Source text="Recreated summary of the SEC order, not the original document · Source: SEC via CNBC, Dec 17, 2020" y={1050} />
		</Scene>
	);
};

// ---------- Parte 3: o que é uma opção ----------
export const OptionShot: React.FC<{id: string; start: number; at: {contract: number; bet: number; date: number; complex: number; fast: number; often: number}}> = (p) => {
	const {on, popIn} = useOn(p.start);
	const a = p.at;
	return (
		<Scene id={p.id}>
			<Panel x={260} y={220} w={720} h={620} o={on(a.contract)} rx={14} fill="#FBFAF6">
				<Tag x={320} y={300} color={INK}>OPTION CONTRACT</Tag>
				<line x1={320} x2={920} y1={330} y2={330} stroke={LINE} strokeWidth={3} />
				<Txt x={320} y={420} o={on(a.bet)} size={44} weight={700}>A bet on where</Txt>
				<Txt x={320} y={476} o={on(a.bet)} size={44} weight={700}>a stock will be</Txt>
				{/* calendário */}
				<g opacity={on(a.date)} transform="translate(320 540)">
					<rect x={0} y={0} width={200} height={200} rx={16} fill="#F4F3EE" stroke={DARK} strokeWidth={4} />
					<rect x={0} y={0} width={200} height={56} rx={16} fill={DARK} />
					<Txt x={100} y={150} size={80} weight={800} anchor="middle">?</Txt>
					<Txt x={240} y={110} size={40} weight={700}>by a</Txt>
					<Txt x={240} y={160} size={40} weight={700}>certain date</Txt>
				</g>
			</Panel>
			<Stamp x={1400} y={380} k={popIn(a.complex)} text="COMPLEX" size={60} rot={-5} />
			<Stamp x={1430} y={560} k={popIn(a.fast)} text="FAST" size={60} rot={4} />
			<Stamp x={1400} y={740} k={popIn(a.often)} text="TRADED OFTEN" size={52} rot={-3} color={GOLD} />
		</Scene>
	);
};

// ---------- Parte 3: apostas em eventos ----------
export const EventShot: React.FC<{id: string; start: number; at: {bets: number; name: number; count: number; growth: number; fee: number}}> = (p) => {
	const {on, popIn, frame} = useOn(p.start);
	const a = p.at;
	const grow = interpolate(frame, [a.growth - p.start, a.growth - p.start + 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	return (
		<Scene id={p.id}>
			{/* celular com um contrato genérico de evento */}
			<g opacity={on(a.bets)} transform="translate(250 170) rotate(-5)">
				<rect x={0} y={0} width={420} height={800} rx={60} fill="#1E1E1C" />
				<rect x={16} y={16} width={388} height={768} rx={46} fill="#F4F3EE" />
				<Txt x={50} y={140} size={28} color={SOFT}>Event contract</Txt>
				<Txt x={50} y={200} size={40} weight={700}>Will it happen</Txt>
				<Txt x={50} y={248} size={40} weight={700}>by Friday?</Txt>
				<rect x={50} y={560} width={150} height={96} rx={48} fill={GOLD} />
				<Txt x={125} y={620} size={36} weight={700} anchor="middle">YES</Txt>
				<rect x={220} y={560} width={150} height={96} rx={48} fill="none" stroke={DARK} strokeWidth={4} />
				<Txt x={295} y={620} size={36} weight={700} anchor="middle">NO</Txt>
			</g>
			<Tag x={820} y={260} o={on(a.name)}>ROBINHOOD CALLS THEM</Tag>
			<Txt x={820} y={330} o={on(a.name)} size={60} weight={700}>Prediction markets</Txt>
			<g opacity={popIn(a.count)}>
				<Txt x={820} y={520} size={140} weight={800} spacing={-3}>8.5B</Txt>
				<Txt x={820} y={580} size={34} color={SOFT}>event contracts traded in Q4 2025</Txt>
			</g>
			<g opacity={on(a.growth)}>
				<Arrow x1={1500} y1={560} x2={1500 + 120 * grow} y2={560 - 240 * grow} k={grow > 0 ? 1 : 0} color={GOLD} width={10} />
				<Txt x={1460} y={660} size={72} weight={800}>+300%</Txt>
				<Txt x={1460} y={706} size={28} color={SOFT}>revenue line, in a year</Txt>
			</g>
			<Stamp x={1180} y={860} k={popIn(a.fee)} text="UP TO 1¢ PER CONTRACT" size={46} rot={-3} />
			<Source text="Source: Robinhood Q4 and full-year 2025 results · fee per contract: Covers, June 2026" />
		</Scene>
	);
};

// ---------- Parte 3: pedido de inscrição ----------
export const SubscribeShot: React.FC<{id: string; start: number; at: {ask: number; tap: number; free: number; unlike: number; actually: number}}> = (p) => {
	const {on, popIn, frame} = useOn(p.start);
	const a = p.at;
	const press = interpolate(frame, [a.tap - p.start, a.tap - p.start + 3, a.tap - p.start + 10], [1, 0.92, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const done = on(a.tap, 4);
	return (
		<Scene id={p.id}>
			<Txt x={960} y={330} o={on(a.ask)} size={52} anchor="middle">More videos that follow the money?</Txt>
			<g opacity={popIn(a.ask)} transform={`translate(960 520) scale(${press}) translate(-960 -520)`}>
				<rect x={710} y={450} width={500} height={140} rx={70} fill={done > 0.5 ? DARK : GOLD} />
				<Txt x={960} y={540} size={52} weight={800} anchor="middle" color={done > 0.5 ? '#F4F3EE' : DARK} spacing={4}>
					{done > 0.5 ? 'SUBSCRIBED' : 'SUBSCRIBE'}
				</Txt>
			</g>
			<Txt x={960} y={720} o={on(a.free)} size={56} weight={700} anchor="middle">It's free.</Txt>
			<Txt x={960} y={800} o={on(a.unlike)} size={40} anchor="middle" color={SOFT}>And unlike trading…</Txt>
			<Txt x={960} y={870} o={on(a.actually)} size={44} weight={700} anchor="middle">it actually is.</Txt>
		</Scene>
	);
};
