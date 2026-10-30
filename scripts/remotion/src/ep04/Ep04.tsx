import React from 'react';
import {makeEpisode} from '../epkit/build';
import {DocLinesShot, RouteShot2, SplitShot, SubscribeShot2, TimelineShot} from '../epkit/shots';
import {BarsShot, StatsShot} from '../shots/partA';
import {EndShot, SisterShot} from '../shots/partC';
import credits from './creditos.json';
import timeline from './timeline.json';
import type {Timeline} from '../epkit/cues';
import type {Credit} from '../epkit/build';

// Episódio 4 — "Why Your Bank Pays You Almost Nothing"
// Cada cena começa numa frase do roteiro (roteiros/rascunhos/fonte/ep04-roteiro.txt). Parte 5 em azul-marinho.

const E = makeEpisode(timeline as Timeline, credits as Record<string, Credit>);
const {c, add, card, photo} = E;

const FED = 'Source: Federal Reserve, FOMC statements (Sept. 16 and Oct. 28, 2026)';
const FDIC = 'Source: FDIC national rates (Oct. 19, 2026)';
const NY = 'Source: New York Attorney General (May 2025)';

// ---------------- Abertura ----------------
add('Why Your Bank Pays', card({id: 'o-title', apoio: 'Why your bank pays you', hero: 'ALMOST NOTHING', textSide: 'left', object: 'coin', heroSize: 150, heroUnderline: true, objectSlide: true}));
add('Put ten thousand dollars', photo('o-piggy', {apoio: '$10,000 in a big bank savings account, one year:', hero: '~$1', zoom: [1.04, 1.14]}));
add('That same year, your bank', photo('o-fed', {apoio: 'Your bank, parking money at the Fed:', hero: '3.9% · $390', complemento: 'overnight, with zero risk'}));
add('So where do the other', card({id: 'o-gap', apoio: 'Where do the other', hero: '$389 GO?', complemento: 'And why do so few people ask?', textSide: 'center', object: 'none', heroSize: 170, heroUnderline: true}));
add('This is Billions and Bulls', card({id: 'o-brand', apoio: 'This is Billions & Bulls.', hero: "LET'S FOLLOW THE MONEY", textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true}));

// ---------------- Parte 1 — The One-Dollar Account ----------------
add('Part 1', card({id: 'p1-title', apoio: 'Part 1', hero: 'THE ONE-DOLLAR ACCOUNT', textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true}));
add('Let\'s start with the numbers', card({id: 'p1-numbers', apoio: "Let's start with the numbers.", hero: 'STRANGER THAN THEY SOUND', textSide: 'left', object: 'chart', heroSize: 100}));
add('In 2026, rate trackers', photo('p1-branch', {apoio: 'Standard savings at the biggest U.S. banks, per rate trackers:', hero: '0.01%', complemento: '10 cents a year per $1,000'}));
add('Across all American banks', card({id: 'p1-fdic', apoio: 'U.S. national average savings rate (FDIC):', hero: '0.38%', complemento: 'On $10,000: about $38 a year', textSide: 'left', object: 'chart', heroSize: 210}));
add('Now look at the rate', photo('p1-screens', {apoio: 'Fed benchmark rate, Sept. 2026 (held in Oct.):', hero: '3.75–4%', tone: 'navy'}));
add('And money market funds', card({id: 'p1-mmf', apoio: 'Money market funds hold almost', hero: '$8 TRILLION', complemento: 'paying close to the Fed rate', textSide: 'left', object: 'coin', heroSize: 150}));
add('And this isn\'t new', (s) => (
	<BarsShot id="p1-2023" start={s} title="2022–2023: the Fed's fastest climb in decades" titleAt={s + 4} source="Sources: Federal Reserve; FDIC national rates (monthly series)" note={{text: 'THE GAP', at: c.f('topped out')}}
		bars={[
			{label: 'FED RATE', value: 5.3, display: '5%+', at: c.f('above five percent'), highlight: true},
			{label: 'AVG SAVINGS', value: 0.47, display: '0.47%', at: c.f('topped out')},
		]} />
));
add('Even some banks pay a lot more', card({id: 'p1-online', apoio: 'Some online savings accounts:', hero: 'OVER 3%', complemento: 'including some from big banks', textSide: 'right', object: 'phone', heroSize: 170}));
add('So picture twenty-five thousand', (s) => (
	<BarsShot id="p1-25k" start={s} title="Interest on $25,000, one year" titleAt={s + 4} source="Our calculation · rates: FDIC national average; rate trackers (top online, ~3.75%)" note={{text: '+$840', at: c.f('eight hundred and forty')}}
		bars={[
			{label: 'NATIONAL AVG', value: 95, display: '$95', at: c.f('ninety-five dollars')},
			{label: 'TOP ONLINE', value: 938, display: '$938', at: c.f('more than nine hundred'), highlight: true},
		]} />
));
add('That gap isn\'t an accident', card({id: 'p1-business', apoio: "That gap isn't an accident.", hero: "IT'S A BUSINESS", textSide: 'center', object: 'none', heroSize: 150, heroUnderline: true}));

// ---------------- Parte 2 — Where Your Deposit Goes ----------------
add('Part 2', card({id: 'p2-title', apoio: 'Part 2', hero: 'WHERE YOUR DEPOSIT GOES', textSide: 'center', object: 'none', heroSize: 115, heroUnderline: true}));
add('When you put money in the bank', card({id: 'p2-lender', apoio: 'Legally, you are', hero: 'LENDING TO THE BANK', complemento: 'It owes you the money back, whenever you ask.', textSide: 'left', object: 'receipt', heroSize: 110}));
add('Some of it becomes loans', photo('p2-house', {apoio: 'Some of it becomes loans:', hero: 'MORTGAGES, CARS, BUSINESSES'}));
add('And credit cards', card({id: 'p2-cards', apoio: 'Credit card accounts that pay interest (Fed data):', hero: '21–22%', complemento: 'On $10,000: $2,100 a year, if borrowers pay', textSide: 'right', object: 'card', heroSize: 190}));
add('Some of it goes into government bonds', (s) => (
	<RouteShot2 id="p2-route" start={s} goAt={s + 6}
		nodes={[
			{name: 'YOUR $10K', at: s + 2},
			{name: 'BONDS', sub: '≈ FED RATE', at: s + 10},
			{name: 'THE FED', sub: 'RESERVES · 3.9%', at: c.f('back to the Federal Reserve')},
		]} stamp={{text: 'SINCE 2008', at: c.f('only started doing that')}} />
));
add('The difference between what a bank earns', card({id: 'p2-nii', apoio: 'What a bank earns minus what it pays:', hero: 'NET INTEREST INCOME', complemento: 'the heart of how banks make money', textSide: 'left', object: 'chart', heroSize: 110, heroUnderline: true}));
add('In 2025, JPMorgan Chase', photo('p2-towers', {apoio: 'JPMorgan Chase, net interest income, 2025:', hero: '$95.4 BILLION', complemento: 'All FDIC-insured banks, net income: $295.6B'}));
add('So deposits are the raw material', card({id: 'p2-raw', apoio: 'Deposits are the raw material.', hero: 'CHEAPER = BIGGER MARGIN', complemento: 'So why does the bank not have to pay more?', textSide: 'center', object: 'none', heroSize: 100}));

// ---------------- Parte 3 — The Money That Doesn't Move ----------------
add('Part 3', card({id: 'p3-title', apoio: 'Part 3', hero: "THE MONEY THAT DOESN'T MOVE", textSide: 'center', object: 'none', heroSize: 105, heroUnderline: true}));
add('The answer is one of the most valuable', card({id: 'p3-inertia', apoio: 'One of the most valuable things in banking:', hero: 'INERTIA', textSide: 'left', object: 'coin', heroSize: 210, heroUnderline: true}));
add('Think about your main bank account', photo('p3-paycheck', {apoio: 'Salary in, bills out, card and apps linked:', hero: 'MOVING IS A CHORE'}));
add('Economists have measured this', (s) => (
	<DocLinesShot id="p3-study" start={s} title="The Deposits Channel of Monetary Policy (QJE, 2017)" titleAt={s + 4} source="Source: Drechsler, Savov & Schnabl (NYU Stern), Quarterly Journal of Economics, 2017"
		lines={[
			{label: 'When the Fed raises rates, banks pass on only part', at: c.f('pass only part')},
			{label: 'The gap between rates widens instead', at: c.f('They widen the gap')},
			{label: 'Widest where few banks compete', at: c.f('only a few banks compete'), highlight: true},
		]} />
));
add('People in the industry have a polite name', card({id: 'p3-sticky', apoio: 'A polite name for money that stays put:', hero: 'STICKY DEPOSITS', complemento: 'cheap, stable, and they don’t run', textSide: 'right', object: 'coin', heroSize: 140, heroUnderline: true}));
add('Analysts even have a number', (s) => (
	<BarsShot id="p3-beta" start={s} horizontal title="The deposit beta: how much of a Fed rise reaches savers" titleAt={s + 4} source="Illustrative scale"
		bars={[
			{label: 'BETA = 1', value: 1, display: 'savers get it all', at: c.f('A beta of one')},
			{label: 'BETA ≈ 0', value: 0.05, display: 'almost nothing', at: c.f('Close to zero'), highlight: true},
		]} />
));
add('But inertia has limits', card({id: 'p3-limits', apoio: 'U.S. bank deposits, year to June 2023:', hero: '−4.8%', complemento: 'the first annual drop in FDIC data since the mid-1990s', textSide: 'left', object: 'chart', heroSize: 210}));
add('And when savers get scared', photo('p3-svb', {tone: 'navy', apoio: 'Scared, not just annoyed:', hero: 'MONEY MOVES IN HOURS', complemento: 'Silicon Valley Bank, March 2023'}));
add('To be fair, that low rate', (s) => (
	<DocLinesShot id="p3-fair" start={s} title="What the low rate pays for" titleAt={s + 4} source="Source: FDIC (deposit insurance)"
		lines={[
			{label: 'Branches, ATMs, debit card, app, service', at: c.f('A bank account comes with')},
			{label: 'Fraud protection', at: c.f('fraud protection')},
			{label: 'FDIC insurance: up to $250,000 per depositor, per bank, per category', at: c.f('two hundred and fifty thousand'), highlight: true},
		]} />
));
add('But the gap between one hundredth', card({id: 'p3-atms', apoio: 'But the gap between 0.01% and almost 4%', hero: 'PAYS FOR A LOT OF ATMs', textSide: 'center', object: 'none', heroSize: 110}));
add('Quick thing', (s) => (
	<SubscribeShot2 id="p3-sub" start={s} free="It costs nothing." line1="Which, for once…" line2="is roughly what your savings account pays."
		at={{ask: s + 4, tap: c.f('subscribe'), free: c.f('It costs nothing'), line1: c.f('Which, for once'), line2: c.f('is roughly')}} />
));

// ---------------- Parte 4 — When Saving Paid Less by Law ----------------
add('Part 4', card({id: 'p4-title', apoio: 'Part 4', hero: 'WHEN SAVING PAID LESS BY LAW', textSide: 'center', object: 'none', heroSize: 100, heroUnderline: true}));
add('In 1933, in the middle', photo('p4-1933', {apoio: '1933, the Great Depression:', hero: 'THOUSANDS OF BANKS FAILED'}));
add('So the Federal Reserve created', (s) => (
	<DocLinesShot id="p4-regq" start={s} title="Regulation Q (1933)" titleAt={s + 4} source="Sources: Federal Reserve History; Regulation Q"
		lines={[
			{label: 'No interest on checking accounts', at: c.f('banned interest')},
			{label: 'A ceiling on savings rates', at: c.f('set a ceiling'), highlight: true},
		]} />
));
add('For decades, nobody minded', photo('p4-inflation', {apoio: '1979 and 1980: prices up more than 12% a year.', hero: 'SAVINGS CAPPED ~5%'}));
add('Banks couldn\'t compete on rates', photo('p4-toaster', {apoio: "Couldn't compete on rates, so:", hero: 'A FREE TOASTER'}));
add('Savers were losing money', card({id: 'p4-way', apoio: 'Savers were losing money, so the money found', hero: 'A WAY OUT', complemento: 'the money market fund, early 1970s', textSide: 'left', object: 'coin', heroSize: 170}));
add('Banks lost deposits', (s) => (
	<TimelineShot id="p4-time" start={s} title="How the ceilings ended" source="Sources: Federal Reserve History; Regulation Q"
		events={[
			{year: '1980', label: 'Law to phase out the ceilings', at: c.f('In 1980')},
			{year: '1986', label: 'Last savings ceiling gone', at: c.f('1986')},
			{year: '2011', label: 'Interest on checking allowed', at: c.f('July 2011'), gold: true},
		]} />
));
add('By then, it barely mattered', (s) => (
	<TimelineShot id="p4-zero" start={s} dark title="Years the Fed kept its rate near zero"
		events={[
			{year: '2008', label: 'Near zero…', at: c.f('From late 2008')},
			{year: '2015', label: '…until December', at: c.f('end of 2015')},
			{year: '2020', label: 'Near zero again', at: c.f('again from 2020')},
			{year: '2022', label: 'Rates came back. Savings rates didn’t.', at: c.f('rates came back'), gold: true},
		]} />
));
add('So today, no law stops', card({id: 'p4-noLaw', apoio: 'Today, no law stops your bank from paying more.', hero: "IT JUST DOESN'T HAVE TO", textSide: 'center', object: 'none', heroSize: 105, heroUnderline: true}));

// ---------------- Parte 5 — The Account That Got Left Behind (azul-marinho) ----------------
add('Part 5', card({id: 'p5-title', apoio: 'Part 5', hero: 'THE ACCOUNT THAT GOT LEFT BEHIND', textSide: 'center', object: 'none', heroSize: 100, heroUnderline: true, dark: true}));
add('Capital One had a popular', photo('p5-app', {tone: 'navy', apoio: 'Capital One, 360 Savings, from 2022:', hero: 'FROZEN AT 0.3%', complemento: 'according to the New York Attorney General'}));
add('It also had a newer account', (s) => (
	<BarsShot id="p5-two" start={s} title="Same bank, same app: two savings accounts" titleAt={s + 4} source={NY} note={{text: '14×+', at: c.f('fourteen times')}}
		bars={[
			{label: '360 SAVINGS', value: 1, display: '0.3%', at: s + 6},
			{label: 'PERFORMANCE', value: 14, display: '14× more', at: c.f('much higher rate'), highlight: true},
		]} />
));
add('According to the lawsuits', card({id: 'p5-mention', apoio: 'Employees were told, according to New York:', hero: "DON'T MENTION IT", complemento: 'unless the customer asked', textSide: 'left', object: 'phone', heroSize: 140, dark: true}));
add('In January 2025, the federal', (s) => (
	<TimelineShot id="p5-legal" start={s} dark title="The legal fight"
		events={[
			{year: 'JAN 2025', label: 'CFPB sues (claims $2B+)', at: c.f('In January 2025')},
			{year: 'FEB 2025', label: 'CFPB drops the case', at: c.f('dropped the case')},
			{year: 'MAY 2025', label: 'New York sues', at: c.f('in May 2025'), gold: true},
		]} />
));
add('Meanwhile, customers had filed', photo('p5-court', {tone: 'navy', apoio: 'November 2025, a federal judge rejects a $425M deal:', hero: 'LESS THAN 10%', complemento: 'of the interest customers actually lost'}));
add('He also pointed to an email', photo('p5-email', {tone: 'navy', apoio: 'The email about the better account: fewer than half opened it.', hero: 'ONLY ~1% ACTED'}));
add('One percent. That\'s inertia', card({id: 'p5-1pct', apoio: 'Inertia, in a single number:', hero: '1%', textSide: 'center', object: 'none', heroSize: 300, heroUnderline: true, dark: true}));
add('In January 2026, a new deal', (s) => (
	<DocLinesShot id="p5-deal" start={s} title="The new deal" titleAt={s + 4} source="Sources: New York Attorney General; Virginia Lawyers Weekly; Money.com"
		lines={[
			{label: '$425 million in restitution', at: c.f('Four hundred and twenty-five')},
			{label: 'Old 360 Savings gets the newer rate', at: c.f('the same rate')},
			{label: 'Approved in April 2026; payments delayed by an appeal', at: c.f('The judge approved'), highlight: true},
		]} />
));
add('In early October 2026', card({id: 'p5-310', apoio: 'Performance Savings, early October 2026:', hero: '3.1%', complemento: 'ten times the old 0.3%', textSide: 'left', object: 'chart', heroSize: 220}));
add('And Capital One isn\'t the only case', card({id: 'p5-sweep', apoio: 'SEC, January 2025, cash sweep programs:', hero: '$60 MILLION', complemento: 'Wells Fargo and Merrill Lynch (no admission)', textSide: 'right', object: 'receipt', heroSize: 150, dark: true}));

// ---------------- Parte 6 — So, Why Does Your Bank Pay You Almost Nothing? ----------------
add('Part 6', card({id: 'p6-title', apoio: 'Part 6', hero: 'SO, WHY SO LITTLE?', textSide: 'center', object: 'none', heroSize: 140, heroUnderline: true}));
add('Let\'s go back to our ten thousand', (s) => (
	<SplitShot id="p6-gap" start={s} title="Your $10,000 for a year, at the bank" titleAt={s + 4} total={400} totalLabel="~$400" source="Our calculation: 3.9% on reserves vs. 0.01% savings"
		pieces={[
			{value: 6, label: 'YOU', display: '$1', at: c.f('a dollar a year')},
			{value: 394, label: 'THE BANK KEEPS THE GAP', display: '~$389', at: c.f('The bank keeps the gap'), highlight: true},
		]} />
));
add('Part of that gap pays for branches', card({id: 'p6-costs', apoio: 'Part of the gap pays for the bank. Part of it is', hero: 'PROFIT', complemento: 'Branchless banks often pay more.', textSide: 'left', object: 'chart', heroSize: 210}));
add('Not because your money', card({id: 'p6-why', apoio: 'Not because your money is worth nothing.', hero: 'MOST MONEY DOESN’T MOVE', textSide: 'center', object: 'none', heroSize: 105, heroUnderline: true}));
add('The rate on your savings account isn\'t', card({id: 'p6-price', apoio: 'The rate on your savings account is', hero: 'A PRICE', complemento: 'set by what people accept', textSide: 'right', object: 'receipt', heroSize: 200}));
add('This isn\'t a recommendation', photo('p6-coins', {apoio: 'Not a recommendation of any bank or account. But:', hero: 'A SAVINGS ACCOUNT IS A LOAN', complemento: 'The only question is the rate.'}));

// ---------------- Fechamento ----------------
add('Next time', photo('c-wallst', {tone: 'navy', apoio: 'Next: a fortune of ~$20 billion', hero: 'GONE IN 2 DAYS'}));
add('And if you want the other side', (s) => (
	<SisterShot id="c-sister" start={s} at={{ships: c.f('the ships'), planes: c.f('planes'), rockets: c.f('rockets'), name: c.f('Cargo and Capital')}} />
));
add('This is Billions and Bulls. This video', (s) => (
	<EndShot id="c-end" start={s} at={{sign: s + 4, disclaimer: c.f('This video explains'), subscribe: c.f('Subscribe'), endscreen: c.f('following the money') + 40}} />
));

export const Ep04 = () => <E.Episode voice="audio/ep04-voice.wav" music={(timeline as Timeline).provisional ? undefined : 'audio/ep04-spark.wav'} />;
export const EP04_FRAMES = E.frames;
