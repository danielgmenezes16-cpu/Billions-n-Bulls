import React from 'react';
import {interpolate, random} from 'remotion';
import {ensureFonts, FONT, LINE, NAVY} from '../brand';
import {Coin} from '../objects/Coin';
import {CreditCard} from '../objects/CreditCard';
import {DARK, GOLD, INK, Panel, Scene, SOFT, Source, Stamp, Tag, Txt, useOn} from './kit';

ensureFonts();

const lin = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// ---------- Parte 6: as comissões de 2019 viram zero ----------
export type Fee = {broker: string; fee: string; at: number};
export const FeesShot: React.FC<{id: string; start: number; yearAt: number; fees: Fee[]; zeroAt: number}> = (p) => {
	const {on, popIn} = useOn(p.start);
	const z = on(p.zeroAt, 14);
	return (
		<Scene id={p.id}>
			<Stamp x={1560} y={180} k={popIn(p.yearAt)} text="2019" size={64} />
			<Txt x={228} y={180} o={on(p.yearAt)} size={46}>One online stock trade</Txt>
			{p.fees.map((f, i) => {
				const x = 228 + i * 500;
				return (
					<g key={f.broker} opacity={Math.min(1, popIn(f.at))}>
						<Panel x={x} y={280} w={440} h={520} rx={6} fill="#FBFAF6">
							<Tag x={x + 40} y={350} color={INK}>{f.broker.toUpperCase()}</Tag>
							<line x1={x + 40} x2={x + 400} y1={380} y2={380} stroke={LINE} strokeWidth={3} strokeDasharray="8 8" />
							<Txt x={x + 40} y={460} size={30} color={SOFT}>Commission</Txt>
							<Txt x={x + 40} y={580} size={110} weight={800}>{f.fee}</Txt>
							<line x1={x + 30} y1={600} x2={x + 30 + 380 * z} y2={500} stroke={GOLD} strokeWidth={14} strokeLinecap="round" opacity={z > 0 ? 1 : 0} />
							<Txt x={x + 40} y={720} size={84} weight={800} color={GOLD} o={z}>$0</Txt>
						</Panel>
					</g>
				);
			})}
			<Txt x={228} y={930} o={z} size={44} weight={700}>Today: nothing upfront.</Txt>
			<Source text="Source: NPR, Oct 1, 2019" />
		</Scene>
	);
};

// ---------- Parte 6: onde o pagamento por fluxo de ordens foi barrado ----------
export type Region = {name: string; status: string; detail: string; at: number; stamp: string; gold?: boolean};
export const RegionsShot: React.FC<{id: string; start: number; titleAt: number; regions: Region[]}> = (p) => {
	const {on, popIn} = useOn(p.start);
	return (
		<Scene id={p.id}>
			<Txt x={228} y={180} o={on(p.titleAt)} size={46}>Payment for order flow around the world</Txt>
			{p.regions.map((r, i) => {
				const x = 228 + i * 500;
				const k = popIn(r.at);
				return (
					<g key={r.name} opacity={Math.min(1, k)}>
						<Panel x={x} y={270} w={460} h={600} rx={18}>
							<Txt x={x + 40} y={360} size={56} weight={800}>{r.name}</Txt>
							<Txt x={x + 40} y={420} size={30} color={SOFT}>{r.detail}</Txt>
						</Panel>
						<Stamp x={x + 230} y={640} k={popIn(r.at + 18)} text={r.stamp} size={50} rot={-8} color={r.gold ? GOLD : DARK} />
						{r.status.split(' | ').map((line, j) => (
							<Txt key={j} x={x + 230} y={790 + j * 40} size={30} weight={700} anchor="middle" o={on(r.at + 22)}>{line}</Txt>
						))}
					</g>
				);
			})}
			<Source text="Sources: CFA Institute (UK); PayTechLaw, MiFIR art. 39a (EU); National Law Review (SEC withdrawal, June 12, 2025)" />
		</Scene>
	);
};

// ---------- Parte 6: o confete ----------
export const ConfettiShot: React.FC<{id: string; start: number; at: {state: number; game: number; confetti: number; dropped: number; paid: number}}> = (p) => {
	const {on, popIn, frame} = useOn(p.start);
	const a = p.at;
	const rain = interpolate(frame, [a.confetti - p.start, a.confetti - p.start + 90], [0, 1], lin);
	const freeze = on(a.dropped, 8);
	const t = Math.min(frame, a.dropped - p.start);
	return (
		<Scene id={p.id}>
			<Tag x={228} y={180} o={on(a.state)} color={INK}>MASSACHUSETTS REGULATORS, 2020</Tag>
			<Txt x={228} y={250} o={on(a.game)} size={56} weight={700}>"Treating trading like a game"</Txt>
			<g transform="translate(760 300) rotate(-4)">
				<rect x={0} y={0} width={420} height={760} rx={60} fill="#1E1E1C" />
				<rect x={16} y={16} width={388} height={728} rx={46} fill="#F4F3EE" />
				<Txt x={210} y={330} size={40} weight={700} anchor="middle">Order filled!</Txt>
				<g opacity={1 - 0.6 * freeze}>
					{Array.from({length: 60}, (_, i) => {
						const x0 = 40 + random(`cx${i}`) * 340;
						const sp = 2 + random(`cs${i}`) * 3;
						const y = 30 + ((random(`cy${i}`) * 700 + t * sp * rain * 2) % 700);
						const c = [GOLD, DARK, '#BDBDB6', NAVY][i % 4];
						return <rect key={i} x={x0} y={y} width={14} height={8} fill={c} opacity={rain} transform={`rotate(${(random(`cr${i}`) * 360 + t * 6) % 360} ${x0} ${y})`} />;
					})}
				</g>
			</g>
			<Stamp x={1560} y={520} k={popIn(a.dropped)} text="DROPPED IN 2021" size={40} rot={-6} />
			<Stamp x={1560} y={720} k={popIn(a.paid)} text="$7.5M SETTLEMENT" size={40} rot={4} color={GOLD} />
			<Txt x={1560} y={810} o={on(a.paid)} size={30} color={SOFT} anchor="middle">in 2024</Txt>
			<Source text="Source: Insurance Journal" />
		</Scene>
	);
};

// ---------- Parte 6: quem paga, afinal ----------
export const AnswerShot: React.FC<{id: string; start: number; at: {makers: number; you: number; spread: number; interest: number; extra: number}}> = (p) => {
	const {on, popIn} = useOn(p.start);
	const a = p.at;
	const item = (t: number, y: number, text: string) => (
		<g opacity={Math.min(1, popIn(t))}>
			<circle cx={1080} cy={y - 14} r={14} fill={GOLD} />
			<Txt x={1116} y={y} size={44} weight={700}>{text}</Txt>
		</g>
	);
	return (
		<Scene id={p.id}>
			<Tag x={228} y={180} color={INK} o={on(a.makers)}>WHO'S PAYING</Tag>
			<g opacity={on(a.makers)}>
				<Txt x={228} y={300} size={40} color={SOFT}>Partly</Txt>
				<Txt x={228} y={380} size={72} weight={800}>The market makers</Txt>
				<Txt x={228} y={440} size={32} color={SOFT}>they pay for your orders because they profit from them</Txt>
			</g>
			<g opacity={on(a.you)}>
				<Txt x={228} y={620} size={40} color={SOFT}>And partly</Txt>
				<Txt x={228} y={720} size={120} weight={800}>You</Txt>
			</g>
			{item(a.spread, 640, 'through the spread')}
			{item(a.interest, 740, 'through interest on idle cash')}
			{item(a.extra, 840, 'through every extra trade')}
		</Scene>
	);
};

// ---------- Parte 6: o comprovante revela o que não estava nele ----------
export const ReceiptRevealShot: React.FC<{id: string; start: number; at: {price: number; zero: number; receipt: number}}> = (p) => {
	const {on, popIn} = useOn(p.start);
	const a = p.at;
	const rev = on(a.receipt, 18);
	const row = (y: number, l: string, v: string, k: number, gold?: boolean) => (
		<g opacity={k}>
			<Txt x={330} y={y} size={34} color={gold ? INK : SOFT} weight={gold ? 700 : 400}>{l}</Txt>
			<Txt x={830} y={y} size={34} weight={700} anchor="end" color={gold ? GOLD : INK}>{v}</Txt>
		</g>
	);
	return (
		<Scene id={p.id}>
			<g transform="translate(0 0) rotate(-3 580 560)">
				<rect x={280} y={130} width={600} height={880} fill="#FBFAF6" />
				<Txt x={330} y={210} size={26} weight={600} spacing={4} color={SOFT}>TRADE CONFIRMATION</Txt>
				<line x1={330} x2={830} y1={250} y2={250} stroke={LINE} strokeWidth={3} strokeDasharray="8 8" />
				{row(330, 'Commission', '$0.00', 1)}
				{row(400, 'You paid', '$0.00', 1, true)}
				<line x1={330} x2={830} y1={450} y2={450} stroke={LINE} strokeWidth={3} strokeDasharray="8 8" opacity={rev} />
				{row(530, 'Spread', 'paid', rev)}
				{row(600, 'Interest on idle cash', 'kept', on(a.receipt + 8))}
				{row(670, 'Extra trades', 'many', on(a.receipt + 16))}
				<rect x={310} y={480} width={540 * rev} height={230} fill={GOLD} fillOpacity={0.18} />
			</g>
			<Txt x={1000} y={420} size={46} o={on(a.price)}>The price isn't zero.</Txt>
			<Txt x={1000} y={540} size={44} o={on(a.zero)} color={SOFT}>It's just</Txt>
			<g opacity={popIn(a.receipt)}>
				<Txt x={1000} y={660} size={92} weight={800}>NOT ON THE</Txt>
				<Txt x={1000} y={770} size={92} weight={800}>RECEIPT</Txt>
				<rect x={1000} y={790} width={520} height={10} rx={5} fill={GOLD} />
			</g>
		</Scene>
	);
};

// ---------- Fim: canal irmão ----------
export const SisterShot: React.FC<{id: string; start: number; at: {ships: number; planes: number; rockets: number; name: number}}> = (p) => {
	const {on, popIn} = useOn(p.start);
	const a = p.at;
	return (
		<Scene id={p.id}>
			<Txt x={228} y={200} size={46} o={on(a.ships)}>The other side of the economy</Txt>
			<g opacity={popIn(a.ships)} transform="translate(420 520)">
				<path d="M -160 0 L 160 0 L 120 70 L -120 70 Z" fill={DARK} />
				<rect x={-110} y={-70} width={60} height={70} fill={GOLD} />
				<rect x={-40} y={-70} width={60} height={70} fill={DARK} fillOpacity={0.6} />
				<rect x={30} y={-70} width={60} height={70} fill={GOLD} fillOpacity={0.7} />
				<Tag x={0} y={150} anchor="middle" color={INK}>SHIPS</Tag>
			</g>
			<g opacity={popIn(a.planes)} transform="translate(960 520)">
				<path d="M -170 0 L 150 -10 C 190 -10, 190 10, 150 10 L -170 0 Z M -20 -5 L -90 -120 L -50 -120 L 60 -5 Z M -20 5 L -90 120 L -50 120 L 60 5 Z M -150 0 L -190 -60 L -160 -60 L -110 0 Z" fill={DARK} />
				<Tag x={0} y={150} anchor="middle" color={INK}>PLANES</Tag>
			</g>
			<g opacity={popIn(a.rockets)} transform="translate(1500 520)">
				<path d="M 0 -170 C 50 -110, 50 -10, 40 70 L -40 70 C -50 -10, -50 -110, 0 -170 Z" fill={DARK} />
				<path d="M -40 30 L -80 90 L -40 70 Z M 40 30 L 80 90 L 40 70 Z" fill={DARK} />
				<path d="M -25 75 L 0 140 L 25 75 Z" fill={GOLD} />
				<Tag x={0} y={190} anchor="middle" color={INK}>ROCKETS</Tag>
			</g>
			<g opacity={popIn(a.name)}>
				<Tag x={960} y={840} anchor="middle" color={SOFT}>OUR SISTER CHANNEL</Tag>
				<text x={960} y={940} fontFamily={FONT} fontWeight={800} fontSize={96} fill={INK} textAnchor="middle" letterSpacing={-1}>CARGO &amp; CAPITAL</text>
			</g>
		</Scene>
	);
};

// ---------- Fim: assinatura e tela final ----------
export const EndShot: React.FC<{id: string; start: number; at: {sign: number; disclaimer: number; subscribe: number; endscreen: number}}> = (p) => {
	const {on, popIn, off} = useOn(p.start);
	const a = p.at;
	const es = on(a.endscreen, 20);
	return (
		<Scene id={p.id} exit={false} drift={-0.05}>
			<g transform={`translate(${-180 * es} ${-60 * es}) translate(300 540) scale(${1 - 0.25 * es}) translate(-300 -540)`}>
				<g opacity={popIn(a.sign)} transform="translate(180 260) scale(0.9)">
					<Coin />
				</g>
			</g>
			<g opacity={off(a.endscreen)}>
				<Txt x={820} y={420} size={46} o={on(a.sign)}>This is</Txt>
				<Txt x={820} y={530} size={110} weight={800} o={on(a.sign + 10)}>BILLIONS &amp; BULLS</Txt>
				<Txt x={820} y={620} size={32} color={SOFT} o={on(a.disclaimer)}>This video explains a business. It is not financial advice.</Txt>
				<Txt x={820} y={740} size={52} weight={700} o={on(a.subscribe)}>Subscribe, and let's keep</Txt>
				<Txt x={820} y={806} size={52} weight={700} o={on(a.subscribe)}>following the money.</Txt>
			</g>
			{/* tela final: o lado direito fica livre para os elementos do YouTube */}
			<g opacity={es}>
				<Txt x={228} y={800} size={56} weight={800}>Keep following</Txt>
				<Txt x={228} y={870} size={56} weight={800}>the money</Txt>
				<rect x={228} y={892} width={420} height={10} rx={5} fill={GOLD} />
			</g>
		</Scene>
	);
};

// ---------- Próximo episódio: o cartão ----------
export const NextShot: React.FC<{id: string; start: number; at: {next: number; card: number; who: number; tap: number}}> = (p) => {
	const {on, popIn} = useOn(p.start);
	const a = p.at;
	return (
		<Scene id={p.id}>
			<Tag x={228} y={200} color={INK} o={on(a.next)}>NEXT EPISODE</Tag>
			<g opacity={popIn(a.card)} transform="translate(1000 260) rotate(-10) scale(0.9)">
				<CreditCard />
			</g>
			<Txt x={228} y={480} size={96} weight={800} o={on(a.who)}>WHO GETS PAID</Txt>
			<Txt x={228} y={570} size={52} o={on(a.tap)} color={SOFT}>every time you tap to pay?</Txt>
			<rect x={228} y={600} width={760 * on(a.tap, 14)} height={10} rx={5} fill={GOLD} />
		</Scene>
	);
};
