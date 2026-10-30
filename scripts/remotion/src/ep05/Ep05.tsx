import React from 'react';
import {makeEpisode} from '../epkit/build';
import {CounterShot, DocLinesShot, PriceShot, RouteShot2, SplitShot, SubscribeShot2, TimelineShot} from '../epkit/shots';
import {BarsShot, StatsShot} from '../shots/partA';
import {EndShot, SisterShot} from '../shots/partC';
import credits from './creditos.json';
import timeline from './timeline.json';
import type {Timeline} from '../epkit/cues';
import type {Credit} from '../epkit/build';

// Episódio 5 — "How One Man Lost $20 Billion in Two Days"
// Cada cena começa numa frase do roteiro (roteiros/rascunhos/fonte/ep05-roteiro.txt). Partes 4 e 5 em azul-marinho.
// Pessoa real e condenada: sem foto dele; acusações sempre atribuídas na tela ("prosecutors said").

const E = makeEpisode(timeline as Timeline, credits as Record<string, Credit>);
const {c, add, card, photo} = E;

const DOJ = 'Source: U.S. Department of Justice indictment (via Institutional Investor)';
const LOSSES = 'Sources: Fortune; Irish Times (April 2021 disclosures)';

// ---------------- Abertura ----------------
add('How One Man Lost', card({id: 'o-title', apoio: 'How one man lost', hero: '$20 BILLION IN 2 DAYS', textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true}));
add('In March 2021, a man most people', photo('o-night', {apoio: 'March 2021, a man most people never heard of:', hero: '~$20 BILLION', complemento: 'reportedly, on paper'}));
add('He didn\'t run a famous company', card({id: 'o-quiet', apoio: 'No famous company. No public fund.', hero: 'HIS OWN MONEY', complemento: 'traded quietly from New York', textSide: 'left', object: 'chart', heroSize: 150}));
add('Two days later', (s) => (
	<CounterShot id="o-gone" start={s} label="Two days later" labelAt={s + 2} from={20} to={0} countAt={c.f('the fortune was gone')} countFrames={30} prefix="$" suffix="B" sub="Banks that lent him money: −$10 billion+" subAt={c.f('lost more than ten billion')} dark />
));
add('So how do you lose', card({id: 'o-q', apoio: 'How do you lose $20 billion that fast?', hero: 'WHO PAYS FOR IT?', textSide: 'center', object: 'none', heroSize: 130, heroUnderline: true}));
add('This is Billions and Bulls', card({id: 'o-brand', apoio: 'This is Billions & Bulls.', hero: "LET'S FOLLOW THE MONEY", textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true}));

// ---------------- Parte 1 — The Tiger Cub ----------------
add('Part 1', card({id: 'p1-title', apoio: 'Part 1', hero: 'THE TIGER CUB', textSide: 'center', object: 'none', heroSize: 160, heroUnderline: true}));
add('His name is Sung Kook Hwang', card({id: 'p1-name', apoio: 'Sung Kook Hwang. On Wall Street:', hero: 'BILL', textSide: 'left', object: 'none', heroSize: 240}));
add('He learned the business', photo('p1-nyse', {apoio: '1990s, Tiger Management (Julian Robertson):', hero: 'THE TIGER CUBS'}));
add('In 2001, he started', card({id: 'p1-asia', apoio: '2001, with Robertson’s backing:', hero: 'TIGER ASIA', complemento: 'China, Japan, Korea. And for years, it did very well.', textSide: 'right', object: 'chart', heroSize: 160}));
add('Then, in 2012, it ran into trouble', (s) => (
	<DocLinesShot id="p1-sec" start={s} title="2012" titleAt={s + 4} source="Sources: SEC (2012); Corporate Crime Reporter"
		lines={[
			{label: 'SEC: confidential info used to bet against 3 Chinese bank stocks', at: c.f('The SEC said')},
			{label: 'Hwang and his firms settle', value: '$44M', at: c.f('forty-four million')},
			{label: 'Tiger Asia pleads guilty to wire fraud', at: c.f('pleaded guilty'), highlight: true},
		]} />
));
add('Hong Kong went further', photo('p1-hongkong', {tone: 'navy', apoio: 'Hong Kong, 2014, reportedly:', hero: 'BARRED FOR 4 YEARS'}));
add('For most people, that would be', photo('p1-office', {apoio: 'Outside investors out. Only his own money:', hero: 'A FAMILY OFFICE'}));
add('He called it Archegos', card({id: 'p1-name2', apoio: 'From a Greek word that can mean "the one who leads the way":', hero: 'ARCHEGOS', textSide: 'center', object: 'none', heroSize: 200, heroUnderline: true}));
add('And here\'s why the structure mattered', photo('p1-sec', {apoio: 'Family office rule, SEC, 2011:', hero: 'NO REGISTRATION', complemento: 'no outside clients to report to'}));
add('For a while, that was the whole point', card({id: 'p1-grow', apoio: 'Nobody outside really watching.', hero: 'AND GROW IT DID', textSide: 'center', object: 'none', heroSize: 140}));

// ---------------- Parte 2 — The Invisible Bet ----------------
add('Part 2', card({id: 'p2-title', apoio: 'Part 2', hero: 'THE INVISIBLE BET', textSide: 'center', object: 'none', heroSize: 150, heroUnderline: true}));
add('According to prosecutors, between March 2020', (s) => (
	<BarsShot id="p2-fortune" start={s} title="Hwang's fortune, according to prosecutors" titleAt={s + 4} source={DOJ} note={{text: '20×+', at: c.f('more than twenty times')}}
		bars={[
			{label: 'MARCH 2020', value: 1.5, display: '$1.5B', at: c.f('one and a half')},
			{label: 'MARCH 2021', value: 35, display: '$35B', at: c.f('thirty-five billion'), highlight: true},
		]} />
));
add('How do you grow that fast', card({id: 'p2-borrow', apoio: 'Not just by picking good stocks.', hero: 'BY BORROWING', complemento: 'A lot.', textSide: 'left', object: 'coin', heroSize: 170}));
add('And the tool Archegos used', card({id: 'p2-swap', apoio: 'A very boring name:', hero: 'TOTAL RETURN SWAP', textSide: 'center', object: 'none', heroSize: 130, heroUnderline: true}));
add('Here\'s how it works', (s) => (
	<RouteShot2 id="p2-how" start={s} goAt={c.f('If it goes up')} backAt={c.f('If it goes down')}
		nodes={[
			{name: 'ARCHEGOS', sub: 'GAINS AND LOSSES', at: s + 4},
			{name: 'THE BANK', sub: 'OWNS THE SHARES', at: c.f('The bank owns')},
		]} stamp={{text: 'FEE + COLLATERAL', at: c.f('In return')}} />
));
add('So with one dollar of your own', card({id: 'p2-lev', apoio: 'One dollar controlling several:', hero: 'LEVERAGE', complemento: 'It works in both directions.', textSide: 'left', object: 'chart', heroSize: 200, heroUnderline: true}));
add('Here\'s a simple example', (s) => (
	<DocLinesShot id="p2-example" start={s} title="$10 million down, $50 million of stock" titleAt={s + 4} source="Illustrative example"
		lines={[
			{label: 'Stock +20%', value: '+$10M (you doubled)', at: c.f('rises twenty percent')},
			{label: 'Stock −20%', value: '−$10M (all of it)', at: c.f('falls twenty percent'), highlight: true},
			{label: 'Same move in the market', value: '5× the effect', at: c.f('Same move')},
		]} />
));
add('But swaps had another feature', card({id: 'p2-hidden', apoio: 'Above 5% of a company, investors usually must tell the public. With swaps:', hero: 'NAME NOWHERE', textSide: 'left', object: 'receipt', heroSize: 150}));
add('And it didn\'t use just one bank', (s) => (
	<SplitShot id="p2-banks" start={s} title="One bet, split across banks (illustrative)" titleAt={s + 4} total={100} totalLabel="ARCHEGOS"
		pieces={[
			{value: 22, label: 'CREDIT SUISSE', display: 'piece', at: c.f('Credit Suisse, Nomura')},
			{value: 20, label: 'NOMURA', display: 'piece', at: c.f('Nomura')},
			{value: 20, label: 'MORGAN STANLEY', display: 'piece', at: c.f('Morgan Stanley')},
			{value: 19, label: 'GOLDMAN', display: 'piece', at: c.f('Goldman Sachs')},
			{value: 19, label: 'UBS & OTHERS', display: 'piece', at: c.f('UBS and others')},
		]} source="Each bank saw only its own piece" />
));
add('Prosecutors later said that, at its peak', (s) => (
	<BarsShot id="p2-160" start={s} title="Archegos at its peak, according to prosecutors" titleAt={s + 4} source={DOJ}
		bars={[
			{label: 'FORTUNE', value: 35, display: '$35B', at: c.f('Built on top')},
			{label: 'POSITIONS', value: 160, display: '$160B', at: c.f('one hundred and sixty'), highlight: true},
		]} />
));
add('And much of it was concentrated', photo('p2-trading', {apoio: 'Concentrated in a handful of stocks:', hero: 'VIACOMCBS, BAIDU…', complemento: 'Discovery, Tencent Music'}));
add('Prosecutors said something else', card({id: 'p2-push', apoio: 'Prosecutors said: bought in a way designed to', hero: 'PUSH PRICES UP', complemento: 'and lied to its banks. Hwang denied it.', textSide: 'left', object: 'chart', heroSize: 140, dark: true}));
add('But first, a question', card({id: 'p2-why', apoio: 'Why would the biggest banks lend so much,', hero: 'TO THAT HISTORY?', textSide: 'center', object: 'none', heroSize: 130, heroUnderline: true}));

// ---------------- Parte 3 — The Banks That Said Yes ----------------
add('Part 3', card({id: 'p3-title', apoio: 'Part 3', hero: 'THE BANKS THAT SAID YES', textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true}));
add('The answer, as usual', photo('p2-midtown', {id: 'p3-prime', apoio: 'Prime brokers: they lend, hold trades, earn fees.', hero: 'A VALUABLE CLIENT'}));
add('So how much did Credit Suisse', (s) => (
	<BarsShot id="p3-fees" start={s} title="Credit Suisse and Archegos" titleAt={s + 4} source="Sources: Swissinfo (FT); Paul Weiss report; WSJ (exposure, reportedly)" note={{text: '300×+', at: c.f('three hundred times')}}
		bars={[
			{label: 'FEES, 2020', value: 17.5, display: '$17.5M', at: c.f('seventeen and a half million dollars')},
			{label: 'LOSS, 2021', value: 5500, display: '$5.5B', at: c.f('five and a half billion'), highlight: true},
		]} />
));
add('Quick thing', (s) => (
	<SubscribeShot2 id="p3-sub" start={s} free="It's free." line1="And it comes with…" line2="zero leverage."
		at={{ask: s + 4, tap: c.f('subscribe'), free: c.f("It's free"), line1: c.f('And it comes'), line2: c.f('zero leverage')}} />
));
add('After the collapse, Credit Suisse hired', (s) => (
	<DocLinesShot id="p3-report" start={s} title="The bank's own investigation (Paul Weiss, 2021)" titleAt={s + 4} source="Source: Paul Weiss report (via Global Restructuring Review)"
		lines={[
			{label: '"fundamental failure of management and controls"', at: c.f('fundamental failure'), highlight: true},
			{label: 'Risk limits broken again and again', at: c.f('broken its risk limits')},
			{label: 'Alarms raised inside. Lending continued.', at: c.f('kept lending anyway')},
		]} />
));
add('To be fair to the banks', card({id: 'p3-fair', apoio: 'The other side, according to prosecutors:', hero: 'MISLED ON PURPOSE', complemento: 'And regulators had no full view.', textSide: 'left', object: 'receipt', heroSize: 140}));
add('Still, it\'s hard to ignore the math', card({id: 'p3-math', apoio: 'Risk measured in billions. Fees measured in millions.', hero: 'LOOKED LIKE FREE MONEY', textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true}));

// ---------------- Parte 4 — Two Days in March (azul-marinho) ----------------
add('Part 4', card({id: 'p4-title', apoio: 'Part 4', hero: 'TWO DAYS IN MARCH', textSide: 'center', object: 'none', heroSize: 150, heroUnderline: true, dark: true}));
add('On Monday, March 22, 2021', photo('p4-tv', {tone: 'navy', apoio: 'ViacomCBS, Monday, March 22, 2021:', hero: 'RECORD HIGH', complemento: 'streaming hype, and Archegos buying'}));
add('That evening, ViacomCBS announced', (s) => (
	<PriceShot id="p4-price" start={s} dark title="ViacomCBS share price, March 2021" titleAt={s + 4} source="Sources: Bloomberg; The Motley Fool"
		points={[
			{label: 'MON 22', value: 100.34, display: '$100', at: s + 6},
			{label: 'WED 24 (OFFER)', value: 85, display: '$85', at: c.f('eighty-five dollars')},
		]} />
));
add('For a normal investor', photo('p4-phone', {tone: 'navy', apoio: 'For Archegos, a disaster:', hero: 'MARGIN CALL', complemento: 'and no cash to meet it'}));
add('On Thursday, the banks reportedly met', card({id: 'p4-meet', apoio: 'Thursday, reportedly: sell slowly, together?', hero: 'NO DEAL', textSide: 'center', object: 'none', heroSize: 220, heroUnderline: true, dark: true}));
add('It\'s a classic trap', (s) => (
	<RouteShot2 id="p4-race" start={s} goAt={c.f('sells first')} stamp={{text: 'FIRST GETS THE BEST PRICE', at: c.f('best prices')}}
		nodes={[
			{name: 'BANK 1', sub: 'SELLS FIRST', at: s + 4},
			{name: 'BANK 2', at: s + 8},
			{name: 'BANK 3', sub: 'WHAT IS LEFT', at: c.f('everyone else')},
		]} />
));
add('So, on Friday, it became a race', photo('p4-red', {tone: 'navy', apoio: 'Friday: huge blocks hit the market at once.', hero: 'THE FIRE SALE'}));
add('By the end of that Friday', (s) => (
	<PriceShot id="p4-price2" start={s} dark title="ViacomCBS, the week of March 22, 2021" titleAt={s + 2} source="Sources: Bloomberg; The Motley Fool" stamp={{text: 'LESS THAN HALF', at: c.f('Less than half')}}
		points={[
			{label: 'MON 22', value: 100.34, display: '$100', at: s + 4},
			{label: 'WED 24', value: 85, display: '$85', at: s + 10},
			{label: 'FRI 26', value: 48, display: '~$48', at: c.f('forty-eight dollars')},
		]} />
));
add('Prosecutors later said that more', (s) => (
	<CounterShot id="p4-100b" start={s} label="Market value gone, nearly a dozen companies, within days" labelAt={s + 4} from={0} to={100} countAt={c.f('one hundred billion')} prefix="$" suffix="B+" sub="Hwang's fortune: gone in about two days" subAt={c.f('own fortune')} source={DOJ} dark />
));
add('But here\'s the thing about a race', card({id: 'p4-last', apoio: 'The thing about a race:', hero: 'SOMEBODY FINISHES LAST', textSide: 'center', object: 'none', heroSize: 115, heroUnderline: true, dark: true}));

// ---------------- Parte 5 — Who Paid (azul-marinho) ----------------
add('Part 5', card({id: 'p5-title', apoio: 'Part 5', hero: 'WHO PAID', textSide: 'center', object: 'none', heroSize: 200, heroUnderline: true, dark: true}));
add('The banks that sold first', card({id: 'p5-first', apoio: 'Sold first: Goldman Sachs, reportedly', hero: 'ALMOST UNSCATHED', complemento: 'The ones that hesitated got stuck.', textSide: 'left', object: 'chart', heroSize: 140, dark: true}));
add('Credit Suisse lost about five', (s) => (
	<BarsShot id="p5-losses" start={s} horizontal title="Archegos losses, bank by bank (USD)" titleAt={s + 4} source={LOSSES} note={{text: '$10B+', at: c.f('Add it up')}}
		bars={[
			{label: 'CREDIT SUISSE', value: 5.5, display: '$5.5B', at: s + 6, highlight: true},
			{label: 'NOMURA', value: 2.9, display: '$2.9B', at: c.f('Nomura')},
			{label: 'MORGAN STANLEY', value: 0.911, display: '$911M', at: c.f('Morgan Stanley')},
			{label: 'UBS', value: 0.861, display: '$861M', at: c.f('UBS, about')},
			{label: 'MUFG', value: 0.27, display: '$270M', at: c.f('Mitsubishi')},
		]} />
));
add('At Credit Suisse, the damage', photo('p3-zurich', {tone: 'navy', apoio: 'Executives out, dividend cut, new capital (reportedly).', hero: 'ONE MORE CRACK', complemento: 'Two years later: Credit Suisse collapsed'}));
add('Not everyone lost, though', card({id: 'p5-viac', apoio: 'ViacomCBS sold its new shares at $85:', hero: 'BILLIONS RAISED', complemento: 'days before the crash', textSide: 'right', object: 'coin', heroSize: 140}));
add('But there were other people', (s) => (
	<DocLinesShot id="p5-others" start={s} title="Also on the losing side" titleAt={s + 4}
		lines={[
			{label: 'Investors who bought near the top', at: c.f('Investors who bought')},
			{label: "Archegos's own employees", at: c.f('own employees'), highlight: true},
		]} />
));
add('So who paid for Bill', card({id: 'p5-borrowed', apoio: 'The money was never really there.', hero: 'IT WAS BORROWED', complemento: 'The lenders paid the bill, and their shareholders.', textSide: 'center', object: 'none', heroSize: 130, heroUnderline: true}));

// ---------------- Parte 6 — The Verdict, and the Rule That Never Came ----------------
add('Part 6', card({id: 'p6-title', apoio: 'Part 6', hero: 'THE VERDICT, AND THE RULE THAT NEVER CAME', textSide: 'center', object: 'none', heroSize: 88, heroUnderline: true}));
add('In April 2022, Bill Hwang was arrested', (s) => (
	<TimelineShot id="p6-time" start={s} title="The case" source="Sources: DOJ; Morrison Foerster; AP; Reuters"
		events={[
			{year: 'APR 2022', label: 'Arrested and charged', sub: 'DOJ, SEC and CFTC', at: s + 4},
			{year: 'JUL 2024', label: 'Convicted on 10 counts', sub: 'CFO convicted too: 8 years', at: c.f('In July 2024')},
			{year: 'NOV 2024', label: '18 years in prison', sub: '$9B+ restitution · appeal planned', at: c.f('In November 2024'), gold: true},
		]} />
));
add('But what about the hidden part', photo('p6-court', {apoio: 'And the hidden part, the swaps?', hero: '$160B, UNSEEN'}));
add('In December 2021, the SEC proposed', (s) => (
	<TimelineShot id="p6-rule" start={s} dark title="The rule to make big swap bets public" source="Sources: SEC; Federal Register"
		events={[
			{year: 'DEC 2021', label: 'SEC proposes the rule', at: s + 4},
			{year: '2022–24', label: 'Industry pushes back', at: c.f('The industry pushed back')},
			{year: 'JUN 2025', label: 'Proposal withdrawn', at: c.f('In June 2025'), gold: true},
		]} />
));
add('So, today, regulators do see', photo('p6-capitol', {apoio: 'Regulators see more swap data. The public?', hero: "STILL CAN'T SEE IT"}));
add('So, how does one man lose', card({id: 'p6-how', apoio: 'Borrow most of it. Hide it in swaps. Put it in a few stocks.', hero: 'LEVERAGE', textSide: 'center', object: 'none', heroSize: 200, heroUnderline: true}));
add('Leverage doesn\'t create money', card({id: 'p6-future', apoio: "Leverage doesn't create money.", hero: 'IT BORROWS FROM THE FUTURE', textSide: 'center', object: 'none', heroSize: 100, heroUnderline: true, dark: true}));
add('Remember the name', card({id: 'p6-name', apoio: 'Archegos: the one who leads the way.', hero: 'IT DID', complemento: 'into one of the biggest bank losses in years', textSide: 'left', object: 'none', heroSize: 200}));

// ---------------- Fechamento ----------------
add('Next time', card({id: 'c-next', apoio: 'Next time:', hero: 'WHERE DID THE BILLIONS GO?', textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true}));
add('And if you want the other side', (s) => (
	<SisterShot id="c-sister" start={s} at={{ships: c.f('the ships'), planes: c.f('planes'), rockets: c.f('rockets'), name: c.f('Cargo and Capital')}} />
));
add('This is Billions and Bulls. This video', (s) => (
	<EndShot id="c-end" start={s} at={{sign: s + 4, disclaimer: c.f('This video explains'), subscribe: c.f('Subscribe'), endscreen: c.f('following the money') + 40}} />
));

export const Ep05 = () => <E.Episode voice="audio/ep05-voice.wav" music={(timeline as Timeline).provisional ? undefined : 'audio/ep05-heist.wav'} />;
export const EP05_FRAMES = E.frames;
