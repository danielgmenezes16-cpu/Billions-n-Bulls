import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Arrow, clamp, CoinDot, DARK, GOLD, INK, Panel, Scene, SOFT, Source, Stamp, Tag, Txt, useOn} from '../shots/kit';
import {FONT} from '../brand';

// Telas genéricas a partir do ep. 2: recebem dados e tempos (frames absolutos), sem texto fixo de episódio.

// ---------- Linha do tempo: anos com rótulos, o ponto dourado andando ----------
export type Event = {year: string; label: string; sub?: string; at: number; gold?: boolean};
export const TimelineShot: React.FC<{id: string; start: number; title?: string; titleAt?: number; events: Event[]; dark?: boolean; source?: string}> = (p) => {
	const {on, popIn, frame} = useOn(p.start);
	const n = p.events.length;
	const x0 = 220;
	const x1 = 1700;
	const step = n > 1 ? (x1 - x0) / (n - 1) : 0;
	const y = 560;
	const light = p.dark ? '#E6EAF0' : INK;
	// o ponto vai de evento em evento
	let dotX = x0;
	p.events.forEach((e, i) => {
		const k = interpolate(frame, [e.at - p.start - 8, e.at - p.start + 6], [0, 1], clamp);
		if (k > 0) dotX = i === 0 ? x0 : x0 + step * (i - 1) + step * k;
	});
	const lineK = on(p.events[0].at, 20);
	return (
		<Scene id={p.id} dark={p.dark}>
			{p.title ? <Txt x={228} y={200} o={on(p.titleAt ?? p.events[0].at)} size={46} color={light}>{p.title}</Txt> : null}
			<line x1={x0} x2={x0 + (x1 - x0) * lineK} y1={y} y2={y} stroke={light} strokeOpacity={0.45} strokeWidth={4} />
			{p.events.map((e, i) => {
				const x = x0 + step * i;
				const k = popIn(e.at);
				const up = i % 2 === 0;
				return (
					<g key={i} opacity={Math.min(1, k)}>
						<circle cx={x} cy={y} r={14} fill={e.gold ? GOLD : light} />
						<Txt x={x} y={up ? y - 70 : y + 100} size={62} weight={800} anchor="middle" color={e.gold ? GOLD : light}>{e.year}</Txt>
						<Txt x={x} y={up ? y - 150 : y + 160} size={30} weight={600} anchor="middle" color={light}>{e.label}</Txt>
						{e.sub ? <Txt x={x} y={up ? y - 190 : y + 200} size={26} anchor="middle" color={p.dark ? '#AEB6C2' : SOFT}>{e.sub}</Txt> : null}
					</g>
				);
			})}
			<circle cx={dotX} cy={y} r={22} fill={GOLD} opacity={lineK} />
			{p.source ? <Source text={p.source} o={lineK} dark={p.dark} /> : null}
		</Scene>
	);
};

// ---------- Documento com linhas marcadas (tabela de taxas, relatório, decisão) ----------
export type DocLine = {label: string; value?: string; at: number; highlight?: boolean};
export const DocLinesShot: React.FC<{id: string; start: number; title: string; titleAt: number; header?: string; lines: DocLine[]; source?: string; stamp?: {text: string; at: number}}> = (p) => {
	const {on, frame} = useOn(p.start);
	const top = 250;
	const rowH = Math.min(96, 560 / Math.max(1, p.lines.length));
	return (
		<Scene id={p.id} drift={-0.12}>
			<Txt x={228} y={180} o={on(p.titleAt)} size={46}>{p.title}</Txt>
			<Panel x={300} y={top - 30} w={1320} h={rowH * p.lines.length + (p.header ? 130 : 70)} o={on(p.titleAt)}>
				{p.header ? <Tag x={350} y={top + 40} color={SOFT}>{p.header}</Tag> : null}
			</Panel>
			{p.lines.map((l, i) => {
				const y = top + (p.header ? 90 : 30) + i * rowH;
				const k = on(l.at, 8);
				const hl = l.highlight ? interpolate(frame, [l.at - p.start, l.at - p.start + 14], [0, 1], clamp) : 0;
				return (
					<g key={i} opacity={0.35 + 0.65 * k}>
						{hl > 0 ? <rect x={330} y={y - 4} width={1260 * hl} height={rowH - 16} rx={6} fill={GOLD} fillOpacity={0.55} /> : null}
						<Txt x={360} y={y + rowH * 0.5} size={Math.min(40, rowH * 0.45)} weight={l.highlight ? 700 : 400} color={DARK}>{l.label}</Txt>
						{l.value ? <Txt x={1560} y={y + rowH * 0.5} size={Math.min(42, rowH * 0.47)} weight={700} anchor="end" color={DARK}>{l.value}</Txt> : null}
					</g>
				);
			})}
			{p.stamp ? <Stamp x={1480} y={900} k={on(p.stamp.at, 12)} text={p.stamp.text} color={GOLD} size={60} /> : null}
			{p.source ? <Source text={p.source} o={on(p.titleAt)} /> : null}
		</Scene>
	);
};

// ---------- Rota do pagamento: nós em linha, o ponto vai e a aprovação volta ----------
export type Node = {name: string; sub?: string; at: number};
export const RouteShot2: React.FC<{id: string; start: number; nodes: Node[]; goAt: number; backAt?: number; stamp?: {text: string; at: number}; title?: string; titleAt?: number}> = (p) => {
	const {on, popIn, frame} = useOn(p.start);
	const n = p.nodes.length;
	const xs = p.nodes.map((_, i) => 260 + (i * 1400) / (n - 1));
	const y = 540;
	// o ponto sai do 1º nó em goAt e chega a cada nó quando ele aparece; na volta, corre direto ao início
	const go = frame >= p.goAt - p.start ? 1 : 0;
	let pos = 0;
	p.nodes.forEach((nd, i) => {
		if (i > 0) pos += interpolate(frame, [nd.at - p.start - 6, nd.at - p.start + 10], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
	});
	const back = p.backAt ? interpolate(frame, [p.backAt - p.start, p.backAt - p.start + 24], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)}) : 0;
	const dotX = xs[0] + ((xs[n - 1] - xs[0]) * (pos / (n - 1))) * (1 - back);
	return (
		<Scene id={p.id}>
			{p.title ? <Txt x={228} y={200} o={on(p.titleAt)} size={46}>{p.title}</Txt> : null}
			{xs.slice(1).map((x, i) => (
				<Arrow key={i} x1={xs[i] + 120} y1={y} x2={x - 120} y2={y} k={on(p.nodes[i + 1].at, 12)} color={INK} width={5} />
			))}
			{p.nodes.map((nd, i) => (
				<g key={i} opacity={Math.min(1, popIn(nd.at))}>
					<Panel x={xs[i] - 115} y={y - 85} w={230} h={170} rx={22}>
						<Txt x={xs[i]} y={y + 14} size={34} weight={700} anchor="middle" color={DARK}>{nd.name}</Txt>
					</Panel>
					{nd.sub ? <Tag x={xs[i]} y={y + 150} anchor="middle" size={24}>{nd.sub}</Tag> : null}
				</g>
			))}
			{go > 0 ? <CoinDot x={dotX} y={y - 130} r={30} /> : null}
			{p.stamp ? <Stamp x={960} y={860} k={on(p.stamp.at, 10)} text={p.stamp.text} color={GOLD} size={64} /> : null}
		</Scene>
	);
};

// ---------- Uma quantia dividida em fatias (US$ 100 → loja, banco, rede…) ----------
export type Piece = {value: number; label: string; display: string; at: number; highlight?: boolean};
export const SplitShot: React.FC<{id: string; start: number; title: string; titleAt: number; total: number; totalLabel: string; pieces: Piece[]; source?: string; zoomSmall?: boolean}> = (p) => {
	const {on, frame} = useOn(p.start);
	const W = 1400;
	const x0 = 260;
	const y0 = 330;
	const H = 360;
	let x = x0;
	return (
		<Scene id={p.id}>
			<Txt x={228} y={180} o={on(p.titleAt)} size={46}>{p.title}</Txt>
			<rect x={x0} y={y0} width={W} height={H} rx={18} fill="#F4F3EE" stroke={DARK} strokeWidth={4} opacity={on(p.titleAt)} />
			<Txt x={x0 + W / 2} y={y0 + H / 2 + 60} o={on(p.titleAt) * 0.12} size={180} weight={800} anchor="middle">{p.totalLabel}</Txt>
			{p.pieces.map((s, i) => {
				const w = Math.max(14, (W * s.value) / p.total);
				const narrow = w < 220;
				const ly = y0 + H + 64 + (narrow ? (i % 3) * 52 : 0);
				const k = interpolate(frame, [s.at - p.start, s.at - p.start + 10], [0, 1], clamp);
				const sx = x;
				x += w;
				return (
					<g key={i} opacity={k}>
						<rect x={sx + 3} y={y0 - 26 * k} width={w - 6} height={H} rx={10} fill={s.highlight ? GOLD : DARK} fillOpacity={s.highlight ? 1 : 0.6} />
						{!narrow ? (
							<Txt x={sx + w / 2} y={y0 - 26 * k + H / 2 + 24} size={72} weight={800} anchor="middle" color={s.highlight ? DARK : '#F4F3EE'}>{s.display}</Txt>
						) : null}
						{narrow ? <line x1={sx + w / 2} x2={sx + w / 2} y1={y0 + H + 6} y2={ly - 34} stroke={INK} strokeOpacity={0.45} strokeWidth={2} /> : null}
						<Tag x={sx + w / 2} y={ly} anchor="middle" size={26} color={INK}>{narrow ? `${s.label} · ${s.display}` : s.label}</Tag>
					</g>
				);
			})}
			{p.source ? <Source text={p.source} o={on(p.titleAt)} /> : null}
		</Scene>
	);
};

// ---------- Inscrição com a tirada do episódio ----------
export const SubscribeShot2: React.FC<{id: string; start: number; at: {ask: number; tap: number; free: number; line1: number; line2: number}; free: string; line1: string; line2: string; dark?: boolean}> = (p) => {
	const {on, popIn, frame} = useOn(p.start);
	const a = p.at;
	const press = interpolate(frame, [a.tap - p.start, a.tap - p.start + 3, a.tap - p.start + 10], [1, 0.92, 1], clamp);
	const done = on(a.tap, 4);
	const light = p.dark ? '#E6EAF0' : INK;
	return (
		<Scene id={p.id} dark={p.dark}>
			<Txt x={960} y={330} o={on(a.ask)} size={52} anchor="middle" color={light}>More videos that follow the money?</Txt>
			<g opacity={popIn(a.ask)} transform={`translate(960 520) scale(${press}) translate(-960 -520)`}>
				<rect x={710} y={450} width={500} height={140} rx={70} fill={done > 0.5 ? DARK : GOLD} stroke={p.dark ? '#E6EAF0' : 'none'} strokeWidth={done > 0.5 ? 3 : 0} />
				<Txt x={960} y={540} size={52} weight={800} anchor="middle" color={done > 0.5 ? '#F4F3EE' : DARK} spacing={4}>
					{done > 0.5 ? 'SUBSCRIBED' : 'SUBSCRIBE'}
				</Txt>
			</g>
			<Txt x={960} y={720} o={on(a.free)} size={56} weight={700} anchor="middle" color={light}>{p.free}</Txt>
			<Txt x={960} y={800} o={on(a.line1)} size={40} anchor="middle" color={p.dark ? '#AEB6C2' : SOFT}>{p.line1}</Txt>
			<Txt x={960} y={870} o={on(a.line2)} size={44} weight={700} anchor="middle" color={light}>{p.line2}</Txt>
		</Scene>
	);
};

// ---------- Número grande com contador (ex.: 8,000 por segundo) ----------
export const CounterShot: React.FC<{id: string; start: number; label: string; labelAt: number; from: number; to: number; countAt: number; countFrames?: number; prefix?: string; suffix?: string; sub?: string; subAt?: number; source?: string; dark?: boolean}> = (p) => {
	const {on, frame} = useOn(p.start);
	const k = interpolate(frame, [p.countAt - p.start, p.countAt - p.start + (p.countFrames ?? 45)], [0, 1], {...clamp});
	const v = Math.round(p.from + (p.to - p.from) * (1 - Math.pow(1 - k, 3)));
	const light = p.dark ? '#E6EAF0' : INK;
	return (
		<Scene id={p.id} dark={p.dark} drift={-0.1}>
			<Txt x={960} y={330} o={on(p.labelAt)} size={48} anchor="middle" color={light}>{p.label}</Txt>
			<text x={960} y={610} opacity={on(p.countAt)} fontFamily={FONT} fontWeight={800} fontSize={230} fill={GOLD} textAnchor="middle" letterSpacing={-4}>
				{(p.prefix ?? '') + v.toLocaleString('en-US') + (p.suffix ?? '')}
			</text>
			{p.sub ? <Txt x={960} y={720} o={on(p.subAt ?? p.countAt + 30)} size={44} anchor="middle" color={light}>{p.sub}</Txt> : null}
			{p.source ? <Source text={p.source} o={on(p.labelAt)} dark={p.dark} /> : null}
		</Scene>
	);
};

// ---------- Gráfico de linha de preço: os pontos entram um a um, o último em dourado ----------
export type PricePoint = {label: string; value: number; display: string; at: number};
export const PriceShot: React.FC<{id: string; start: number; title: string; titleAt: number; points: PricePoint[]; source?: string; dark?: boolean; stamp?: {text: string; at: number}}> = (p) => {
	const {on, popIn, frame} = useOn(p.start);
	const max = Math.max(...p.points.map((x) => x.value)) * 1.1;
	const x0 = 260;
	const x1 = 1660;
	const base = 860;
	const h = 560;
	const xs = p.points.map((_, i) => x0 + ((x1 - x0) * i) / Math.max(1, p.points.length - 1));
	const ys = p.points.map((x) => base - (h * x.value) / max);
	const light = p.dark ? '#E6EAF0' : INK;
	let d = '';
	p.points.forEach((pt, i) => {
		if (i === 0) {
			d = `M ${xs[0]} ${ys[0]}`;
			return;
		}
		const k = interpolate(frame, [pt.at - p.start - 10, pt.at - p.start + 8], [0, 1], clamp);
		if (k <= 0) return;
		d += ` L ${xs[i - 1] + (xs[i] - xs[i - 1]) * k} ${ys[i - 1] + (ys[i] - ys[i - 1]) * k}`;
	});
	return (
		<Scene id={p.id} dark={p.dark} drift={-0.1}>
			<Txt x={228} y={180} o={on(p.titleAt)} size={46} color={light}>{p.title}</Txt>
			<line x1={x0 - 40} x2={x1 + 40} y1={base} y2={base} stroke={light} strokeOpacity={0.45} strokeWidth={3} />
			<path d={d} fill="none" stroke={light} strokeWidth={8} strokeLinejoin="round" strokeLinecap="round" opacity={on(p.points[0].at)} />
			{p.points.map((pt, i) => {
				const last = i === p.points.length - 1;
				const k = popIn(pt.at);
				return (
					<g key={i} opacity={Math.min(1, k)}>
						<circle cx={xs[i]} cy={ys[i]} r={last ? 22 : 14} fill={last ? GOLD : light} />
						<Txt x={xs[i]} y={ys[i] - 40} size={50} weight={800} anchor="middle" color={last ? GOLD : light}>{pt.display}</Txt>
						<Tag x={xs[i]} y={base + 56} anchor="middle" size={26} color={p.dark ? '#AEB6C2' : SOFT}>{pt.label}</Tag>
					</g>
				);
			})}
			{p.stamp ? <Stamp x={1420} y={300} k={on(p.stamp.at, 12)} text={p.stamp.text} color={GOLD} size={64} /> : null}
			{p.source ? <Source text={p.source} o={on(p.titleAt)} dark={p.dark} /> : null}
		</Scene>
	);
};
