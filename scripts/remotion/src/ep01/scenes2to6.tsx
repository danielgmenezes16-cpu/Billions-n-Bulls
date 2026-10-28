import React from 'react';
import {BarsShot, ConflictShot, DocShot, EventShot, InsuranceShot, OptionShot, OrderFlowShot, StatsShot, SubscribeShot} from '../shots/partA';
import {CapitolShot, DollarShot, GmeShot, LockShot, PlumbingShot, SourcesShot} from '../shots/partB';
import {AnswerShot, ConfettiShot, EndShot, FeesShot, NextShot, ReceiptRevealShot, RegionsShot, SisterShot} from '../shots/partC';
import {card, SceneDef} from './helpers';
import {fr} from './time';

// Partes 2 a 6 e encerramento do ep. 1. Tempos em segundos do vídeo (timeline.json).

const Q4 = 'Source: Robinhood Q4 and full-year 2025 results';

const PART2: SceneDef[] = [
	{from: 127.95, to: 130.35, el: card({id: 'p2-title', apoio: 'Part 2', hero: 'THE FIRM IN THE MIDDLE', textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true, enter: true, exit: true,
		cues: [128.05, 128.45, 128.77, 128.93, 129.25, 129.41, 129.49]})},
	{from: 130.35, to: 142.7, el: (s) => (
		<StatsShot id="p2-citadel" start={s} title="Citadel Securities says it handles" titleAt={fr(132.64)} source="Source: Citadel Securities (company figures)"
			items={[
				{value: '35%+', label: 'of all US retail trading volume', at: fr(135.12), ring: 0.35},
				{value: '~30%', label: 'of all US-listed options trading', at: fr(139.36), ring: 0.3},
			]} />
	)},
	{from: 142.7, to: 150.9, el: card({id: 'p2-34b', apoio: 'In the first three months of 2025,', hero: '$3.4 BILLION', complemento: 'in trading revenue (reportedly)', textSide: 'left', object: 'chart', heroSize: 160, heroUnderline: true, enter: true, exit: true,
		actionAt: 147.49 - 1 / 3, cues: [142.93, 143.41, 143.57, 143.89, 144.05, 144.37, 144.45, 147.49, 148.37, 149.17, 149.33, 149.65, 149.9]})},
	{from: 150.9, to: 156.9, el: card({id: 'p2-why', apoio: 'Why pay for orders', hero: '3 SHARES', complemento: 'at a time?', textSide: 'left', object: 'phone', heroSize: 180, enter: true, exit: true,
		cues: [151.57, 152.93, 153.17, 153.33, 154.61, 154.85, 155.33, 155.57, 156.13]})},
	{from: 156.9, to: 174.9, el: (s) => (
		<OrderFlowShot id="p2-flow" start={s} at={{safe: fr(158.37), fund: fr(160.43), slice: fr(162.83), move: fr(165.87), yours: fr(167.71), small: fr(170.51), random: fr(171.07), know: fr(172.51)}} />
	)},
	{from: 174.9, to: 185.8, el: (s) => (
		<InsuranceShot id="p2-insurance" start={s} at={{car: fr(175.07), careful: fr(177.95), rarely: fr(179.63), retail: fr(182.6), drivers: fr(183.81)}} />
	)},
	{from: 185.8, to: 190.7, el: card({id: 'p2-against', apoio: 'So it pays for the right to', hero: 'TRADE AGAINST IT', textSide: 'right', object: 'coin', heroSize: 120, enter: true, exit: true,
		cues: [187.65, 187.97, 188.12, 188.44, 188.53, 188.69, 188.93, 189.09, 189.41, 189.72]})},
	{from: 190.7, to: 198.4, el: (s) => <ConflictShot id="p2-conflict" start={s} at={{title: fr(192.21), broker: fr(194.05), paid: fr(195.34), side: fr(196.53)}} />},
	{from: 198.4, to: 220.45, el: (s) => <DocShot id="p2-sec" start={s} at={{misled: fr(201.66), years: fr(204.31), worse: fr(208.71), paid: fr(214.71), deny: fr(216.86)}} />},
];

const PART3: SceneDef[] = [
	{from: 220.45, to: 223.6, el: card({id: 'p3-title', apoio: 'Part 3', hero: 'WHERE THE REAL MONEY IS', textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true, enter: true, exit: true,
		cues: [220.6, 220.9, 221.4, 221.6, 221.8, 222.0, 222.6]})},
	{from: 223.6, to: 239.6, el: (s) => (
		<BarsShot id="p3-bars" start={s} title="Robinhood's own numbers: revenue, Q4 2025" titleAt={fr(227.3)} source={Q4} note={{text: '3× MORE', at: fr(237.7)}}
			bars={[
				{label: 'STOCKS', value: 94, display: '$94M', at: fr(232.5)},
				{label: 'OPTIONS', value: 314, display: '$314M', at: fr(235.4), highlight: true},
			]} />
	)},
	{from: 239.6, to: 248.2, el: (s) => <OptionShot id="p3-option" start={s} at={{contract: fr(239.9), bet: fr(241.9), date: fr(243.6), complex: fr(244.9), fast: fr(246.1), often: fr(247.7)}} />},
	{from: 248.2, to: 255.1, el: card({id: 'p3-100', apoio: 'Each contract usually covers', hero: '100 SHARES', complemento: 'and market makers pay for every contract.', textSide: 'left', object: 'receipt', heroSize: 140, enter: true, exit: true,
		cues: [248.4, 248.6, 249.2, 249.6, 250.0, 250.4, 251.2, 251.5, 251.8, 252.3, 253.1, 253.2, 253.6]})},
	{from: 255.1, to: 268.6, el: (s) => (
		<StatsShot id="p3-options-pfof" start={s} title="October 2025, options orders alone" titleAt={fr(255.6)}
			source="Source: Robinhood Rule 606 report, Q4 2025 (market and marketable limit orders)"
			items={[
				{value: '$50M+', label: 'paid to Robinhood by market makers', at: fr(259.5)},
				{value: '4 in 10', label: 'of those orders went to one firm', sub: 'Citadel Securities', at: fr(263.2), ring: 0.4},
			]} />
	)},
	{from: 268.6, to: 272.95, el: card({id: 'p3-crypto', apoio: 'Crypto added another', hero: '$221 MILLION', complemento: 'in that same quarter.', textSide: 'right', object: 'coin', heroSize: 150, enter: true, exit: true,
		cues: [268.9, 269.5, 269.8, 270.1, 271.0, 271.9, 272.1, 272.2, 272.5]})},
	{from: 272.95, to: 292.8, el: (s) => <EventShot id="p3-events" start={s} at={{bets: fr(275.4), name: fr(277.9), count: fr(280.6), growth: fr(285.5), fee: fr(290.3)}} />},
	{from: 292.8, to: 300.4, el: card({id: 'p3-pattern', apoio: 'The more complex the product,', hero: 'THE MORE MONEY', complemento: 'someone makes from your order.', textSide: 'center', object: 'none', heroSize: 140, heroUnderline: true, enter: true, exit: true,
		cues: [294.6, 294.7, 295.0, 295.5, 295.6, 297.5, 297.6, 297.9, 298.2, 298.6, 298.8, 299.1, 299.2]})},
	{from: 300.4, to: 308.7, el: (s) => <SubscribeShot id="p3-subscribe" start={s} at={{ask: fr(301.6), tap: fr(303.6), free: fr(304.7), unlike: fr(305.3), actually: fr(306.6)}} />},
];

const PART4: SceneDef[] = [
	{from: 308.7, to: 311.6, el: card({id: 'p4-title', apoio: 'Part 4', hero: 'THE MONEY YOU FORGOT ABOUT', textSide: 'center', object: 'none', heroSize: 100, heroUnderline: true, enter: true, exit: true,
		cues: [309.4, 309.6, 310.0, 310.2, 310.5, 310.7, 311.0]})},
	{from: 311.6, to: 326.0, el: (s) => (
		<BarsShot id="p4-ranking" start={s} horizontal title="Robinhood's biggest revenue line, Q4 2025" titleAt={fr(313.2)} source={Q4}
			bars={[
				{label: 'Interest', value: 411, display: '$411M', at: fr(322.4), highlight: true},
				{label: 'Options', value: 314, display: '$314M', at: fr(318.1)},
				{label: 'Crypto', value: 221, display: '$221M', at: fr(319.0)},
				{label: 'Stocks', value: 94, display: '$94M', at: fr(320.0)},
			]} />
	)},
	{from: 326.0, to: 340.6, el: (s) => (
		<DollarShot id="p4-dollar" start={s} titleAt={fr(326.5)} source="Source: Robinhood Q4 2025 results; our calculation on $1,283M of revenue, rounded"
			slices={[
				{cents: 32, label: 'INTEREST', at: fr(329.5), highlight: true},
				{cents: 25, label: 'OPTIONS', at: fr(331.5)},
				{cents: 17, label: 'CRYPTO', at: fr(332.9)},
				{cents: 11, label: 'OTHER TRADING', at: fr(334.4)},
				{cents: 7, label: 'STOCKS', at: fr(337.4)},
				{cents: 8, label: 'THE REST', at: fr(339.0)},
			]} />
	)},
	{from: 340.6, to: 363.8, el: (s) => (
		<SourcesShot id="p4-sources" start={s} titleAt={fr(341.2)}
			items={[
				{title: 'Idle cash', lines: ['swept to partner banks;', 'only part of the interest', 'is passed on'], at: fr(343.7), icon: 'bank'},
				{title: 'Margin', lines: ['customers borrow to trade', 'and pay interest'], at: fr(352.6), icon: 'loan'},
				{title: 'Securities lending', lines: ['shares lent to traders', 'betting against a stock'], at: fr(357.4), icon: 'lend'},
			]} />
	)},
	{from: 363.8, to: 369.6, el: card({id: 'p4-idle', apoio: 'Your idle cash', hero: "ISN'T IDLE", complemento: "It's working, just not entirely for you.", textSide: 'left', object: 'coin', heroSize: 170, enter: true, exit: true,
		cues: [364.0, 364.4, 364.8, 365.2, 365.6, 366.2, 366.5, 367.2, 367.5, 367.6, 368.2, 368.5]})},
	{from: 369.6, to: 389.9, el: (s) => (
		<StatsShot id="p4-year" start={s} title="Robinhood in 2025" titleAt={fr(370.3)} stamp={{text: 'FREE?', at: fr(388.1)}}
			source="Source: Robinhood Q4 and full-year 2025 results ($191 = Q4 revenue per funded customer, annualized)"
			items={[
				{value: '$4.5B', label: 'revenue', at: fr(373.0)},
				{value: '$1.9B', label: 'kept as profit', at: fr(376.0)},
				{value: '27M', label: 'funded customers', at: fr(379.1)},
				{value: '$191', label: 'a year from the average one', at: fr(384.4)},
			]} />
	)},
	{from: 389.9, to: 397.1, el: card({id: 'p4-gold', apoio: 'And', hero: '4.2 MILLION', complemento: 'now pay for Robinhood Gold', textSide: 'left', object: 'card', heroSize: 130, enter: true, exit: true,
		cues: [390.4, 390.7, 391.5, 392.8, 393.0, 393.3, 394.4, 395.1]})},
];

const PART5: SceneDef[] = [
	{from: 397.1, to: 399.25, el: card({id: 'p5-title', apoio: 'Part 5', hero: 'THE DAY IT BROKE', textSide: 'center', object: 'none', heroSize: 140, dark: true, enter: true, exit: true,
		cues: [397.4, 397.8, 398.3, 398.4, 398.6, 398.8]})},
	{from: 399.25, to: 404.4, el: card({id: 'p5-everyone', apoio: 'Free trading works beautifully until', hero: 'EVERYONE', complemento: 'trades at once.', textSide: 'center', object: 'none', heroSize: 180, enter: true, exit: true,
		cues: [399.4, 399.8, 400.2, 400.5, 401.2, 401.7, 402.4, 402.8, 403.2]})},
	{from: 404.4, to: 420.7, el: (s) => <GmeShot id="p5-gme" start={s} at={{date: fr(404.7), name: fr(407.1), low: fr(410.3), high: fr(414.4), crowd: fr(416.7)}} />},
	{from: 420.7, to: 428.4, el: (s) => <LockShot id="p5-lock" start={s} at={{stop: fr(424.3), sell: fr(425.9), cant: fr(427.3)}} />},
	{from: 428.4, to: 432.3, el: card({id: 'p5-44', apoio: 'That day, GameStop fell', hero: '44%', textSide: 'center', object: 'none', heroSize: 240, dark: true, enter: true, exit: true,
		cues: [428.6, 428.9, 429.3, 430.1, 430.4]})},
	{from: 432.3, to: 441.1, el: card({id: 'p5-boring', apoio: 'The explanation was more', hero: 'BORING', complemento: 'and more revealing.', textSide: 'center', object: 'none', heroSize: 200, enter: true, exit: true,
		cues: [435.1, 435.3, 438.2, 438.3, 438.5, 439.1, 439.4, 439.6]})},
	{from: 441.1, to: 469.25, el: (s) => <PlumbingShot id="p5-plumbing" start={s} at={{t2: fr(443.4), nscc: fr(446.3), demand: fr(452.5), restrict: fr(459.5), cut: fr(461.3), raised: fr(464.8)}} />},
	{from: 469.25, to: 477.1, el: (s) => <CapitolShot id="p5-capitol" start={s} at={{weeks: fr(469.4), ceo: fr(470.7), griffin: fr(474.2)}} />},
	{from: 477.1, to: 484.8, el: card({id: 'p5-plumbing-card', apoio: 'Millions of people saw the', hero: 'PLUMBING', complemento: 'behind the free button.', textSide: 'left', object: 'phone', heroSize: 150, enter: true, exit: true,
		cues: [478.3, 478.7, 478.9, 479.1, 479.3, 479.5, 479.9, 480.2, 480.3, 480.6]})},
];

const PART6: SceneDef[] = [
	{from: 484.8, to: 487.8, el: card({id: 'p6-title', apoio: 'Part 6', hero: 'IS FREE TRADING A SCAM?', textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true, enter: true, exit: true,
		cues: [485.0, 485.5, 486.3, 486.4, 486.8, 487.2, 487.25]})},
	{from: 487.8, to: 490.15, el: card({id: 'p6-no', apoio: 'No,', hero: 'NOT EXACTLY.', textSide: 'center', object: 'none', heroSize: 170, enter: true, exit: true,
		cues: [488.0, 488.5, 488.8]})},
	{from: 490.15, to: 505.95, el: (s) => (
		<FeesShot id="p6-fees" start={s} yearAt={fr(490.7)} zeroAt={fr(504.4)}
			fees={[
				{broker: 'Schwab', fee: '$4.95', at: fr(493.9)},
				{broker: 'TD Ameritrade', fee: '$6.95', at: fr(498.4)},
				{broker: 'E*Trade', fee: '$6.95', at: fr(499.7)},
			]} />
	)},
	{from: 505.95, to: 513.7, el: card({id: 'p6-better', apoio: 'The industry argues', hero: 'A BETTER PRICE', complemento: 'than the public quote.', textSide: 'right', object: 'receipt', heroSize: 120, enter: true, exit: true,
		cues: [506.3, 506.5, 507.0, 509.0, 509.2, 509.4, 509.8, 509.9, 510.1, 510.6]})},
	{from: 513.7, to: 534.0, el: (s) => (
		<RegionsShot id="p6-regions" start={s} titleAt={fr(513.9)}
			regions={[
				{name: 'UK', detail: 'United Kingdom', stamp: 'BANNED', status: 'effectively | since 2012', at: fr(514.2)},
				{name: 'EU', detail: 'European Union', stamp: 'BANNED', status: 'last exemption | ended June 2026', at: fr(519.1)},
				{name: 'US', detail: 'United States', stamp: 'WITHDRAWN', status: 'SEC auction proposal | withdrawn June 2025', at: fr(525.6), gold: true},
			]} />
	)},
	{from: 534.0, to: 553.95, el: (s) => <ConfettiShot id="p6-confetti" start={s} at={{state: fr(536.5), game: fr(540.6), confetti: fr(542.6), dropped: fr(546.2), paid: fr(549.8)}} />},
	{from: 553.95, to: 557.45, el: card({id: 'p6-who', apoio: 'So, if trading is free,', hero: "WHO'S PAYING?", textSide: 'center', object: 'none', heroSize: 170, heroUnderline: true, enter: true, exit: true,
		cues: [554.4, 554.7, 554.9, 555.2, 555.4, 555.9, 556.2]})},
	{from: 557.45, to: 571.8, el: (s) => <AnswerShot id="p6-answer" start={s} at={{makers: fr(557.6), you: fr(562.0), spread: fr(563.4), interest: fr(564.5), extra: fr(567.3)}} />},
	{from: 571.8, to: 576.3, el: (s) => <ReceiptRevealShot id="p6-receipt" start={s} at={{price: fr(572.1), zero: fr(573.6), receipt: fr(574.1)}} />},
	{from: 576.3, to: 583.4, el: (s) => <NextShot id="end-next" start={s} at={{next: fr(576.6), card: fr(578.6), who: fr(580.3), tap: fr(581.6)}} />},
	{from: 583.4, to: 592.6, el: (s) => <SisterShot id="end-sister" start={s} at={{ships: fr(585.9), planes: fr(586.4), rockets: fr(587.2), name: fr(590.5)}} />},
	{from: 592.6, to: 616.186, el: (s) => <EndShot id="end-sign" start={s} at={{sign: fr(592.8), disclaimer: fr(594.5), subscribe: fr(598.5), endscreen: fr(601.5)}} />},
];

export const PARTS_2_TO_6: SceneDef[] = [...PART2, ...PART3, ...PART4, ...PART5, ...PART6];

// Efeitos: [segundo do vídeo, arquivo, volume]
export const SFX_2_TO_6: [number, string, number][] = [
	// Parte 2
	[128.05, 'show/hit', 0.5], [135.12, 'sfx-tick', 0.5], [139.36, 'sfx-tick', 0.5], [147.49, 'show/hit', 0.4], [154.61, 'show/pop', 0.5],
	[160.9, 'show/swell', 0.4], [165.87, 'sfx-tick', 0.5], [170.51, 'show/pop', 0.4], [171.07, 'show/pop', 0.4], [172.51, 'show/pop', 0.4],
	[177.95, 'show/ding', 0.4], [183.81, 'sfx-tick', 0.5], [189.09, 'show/hit', 0.3], [192.21, 'show/hit', 0.35], [195.34, 'show/ding', 0.45],
	[201.66, 'sfx-tick', 0.45], [208.71, 'sfx-tick', 0.45], [210.23, 'show/ding', 0.4], [214.71, 'show/hit', 0.4],
	// Parte 3
	[220.6, 'show/hit', 0.5], [232.5, 'sfx-tick', 0.5], [235.4, 'sfx-tick', 0.5], [237.7, 'show/ding', 0.6], [244.9, 'show/pop', 0.4],
	[246.1, 'show/pop', 0.4], [247.7, 'show/pop', 0.4], [250.0, 'sfx-tick', 0.5], [259.5, 'show/ding', 0.5], [263.2, 'sfx-tick', 0.5],
	[270.1, 'show/ding', 0.5], [280.6, 'show/counter', 0.55], [283.9, 'show/swell', 0.4], [290.3, 'show/pop', 0.45], [297.5, 'show/hit', 0.3],
	[303.6, 'show/pop', 0.6], [306.6, 'show/ding', 0.35],
	// Parte 4
	[309.4, 'show/hit', 0.5], [320.8, 'show/swell', 0.45], [322.4, 'show/hit', 0.5], [329.5, 'show/ding', 0.5], [331.5, 'sfx-tick', 0.4],
	[332.9, 'sfx-tick', 0.4], [334.4, 'sfx-tick', 0.4], [337.4, 'sfx-tick', 0.4], [339.0, 'sfx-tick', 0.4], [343.7, 'show/pop', 0.4],
	[352.6, 'show/pop', 0.4], [357.4, 'show/pop', 0.4], [365.2, 'sfx-tick', 0.5], [373.0, 'show/ding', 0.45], [376.0, 'show/ding', 0.45],
	[379.1, 'sfx-tick', 0.45], [384.4, 'show/counter', 0.5], [388.1, 'show/pop', 0.55], [390.7, 'show/ding', 0.45],
	// Parte 5
	[397.4, 'show/hit', 0.55], [401.7, 'sfx-tick', 0.5], [404.7, 'show/pop', 0.45], [410.3, 'sfx-tick', 0.4], [412.9, 'show/swell', 0.45],
	[414.4, 'show/hit', 0.35], [416.7, 'show/counter', 0.45], [424.3, 'show/pop', 0.55], [427.3, 'show/hit', 0.4], [430.4, 'show/hit', 0.55],
	[438.5, 'sfx-tick', 0.45], [443.4, 'show/pop', 0.4], [452.5, 'show/counter', 0.45], [459.5, 'show/pop', 0.45], [461.3, 'sfx-tick', 0.45],
	[464.8, 'show/ding', 0.45], [469.4, 'show/pop', 0.45], [479.5, 'show/hit', 0.3],
	// Parte 6 e fim
	[485.0, 'show/hit', 0.5], [488.5, 'sfx-tick', 0.5], [490.7, 'show/pop', 0.45], [493.9, 'sfx-tick', 0.4], [498.4, 'sfx-tick', 0.4],
	[499.7, 'sfx-tick', 0.4], [504.4, 'show/hit', 0.4], [509.0, 'show/ding', 0.4], [514.8, 'show/pop', 0.45], [519.7, 'show/pop', 0.45],
	[526.2, 'show/pop', 0.45], [542.6, 'show/ding', 0.4], [546.2, 'show/pop', 0.45], [550.2, 'show/ding', 0.45], [555.9, 'show/hit', 0.4],
	[558.2, 'sfx-tick', 0.4], [562.4, 'show/hit', 0.35], [563.4, 'sfx-tick', 0.4], [564.5, 'sfx-tick', 0.4], [567.3, 'sfx-tick', 0.4],
	[574.2, 'show/hit', 0.45], [578.6, 'show/pop', 0.4], [590.5, 'show/ding', 0.45], [593.2, 'show/hit', 0.45],
];
