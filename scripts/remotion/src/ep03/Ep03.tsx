import React from 'react';
import {makeEpisode} from '../epkit/build';
import {CounterShot, DocLinesShot, SubscribeShot2, TimelineShot} from '../epkit/shots';
import {BarsShot, StatsShot} from '../shots/partA';
import {EndShot, SisterShot} from '../shots/partC';
import credits from './creditos.json';
import timeline from './timeline.json';
import type {Timeline} from '../epkit/cues';
import type {Credit} from '../epkit/build';

// Episódio 3 — "How a 167-Year-Old Bank Died in a Weekend"
// Cada cena começa numa frase do roteiro (roteiros/rascunhos/fonte/ep03-roteiro.txt).
// Partes 3 e 4 em azul-marinho (tensão), como no plano visual.

const E = makeEpisode(timeline as Timeline, credits as Record<string, Credit>);
const {c, add, card, photo} = E;

const CS = 'Source: Credit Suisse (history)';
const AB = 'Source: Credit Suisse results, via American Banker';
const FINMA = 'Source: FINMA, March 19, 2023';

// ---------------- Abertura ----------------
add('How a 167-Year-Old', card({id: 'o-title', apoio: 'How a 167-year-old bank', hero: 'DIED IN A WEEKEND', textSide: 'center', object: 'none', heroSize: 130, heroUnderline: true}));
add('Friday, March 17', photo('p4-zurichnight', {id: 'o-friday', apoio: 'Friday, March 17, 2023', hero: '167 YEARS OLD', complemento: 'One of the biggest banks in the world'}));
add('Sunday night', card({id: 'o-gone', apoio: 'Sunday night:', hero: 'GONE', complemento: 'sold to its oldest rival for ~CHF 3 billion', textSide: 'left', object: 'none', heroSize: 220, heroUnderline: true, dark: true}));
add('And sixteen billion francs', (s) => (
	<CounterShot id="o-zero" start={s} label="Its AT1 bonds" labelAt={s + 2} from={16} to={0} countAt={c.f('wiped out')} countFrames={30} prefix="CHF " suffix="B" sub="Erased." subAt={c.f('Erased')} source={FINMA} dark />
));
add('A bank that old', card({id: 'o-really', apoio: "A bank that old doesn't die in one weekend.", hero: 'NOT REALLY', textSide: 'center', object: 'none', heroSize: 150}));
add('So we\'re going to follow', photo('p3-vault', {id: 'o-door', apoio: 'Follow the money', hero: 'OUT THE DOOR', complemento: 'Where it went, who paid, who got richer'}));
add('This is Billions and Bulls', card({id: 'o-brand', apoio: 'This is Billions & Bulls.', hero: "LET'S FOLLOW THE MONEY", textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true}));

// ---------------- Parte 1 — The Railway Bank ----------------
add('Part 1', card({id: 'p1-title', apoio: 'Part 1', hero: 'THE RAILWAY BANK', textSide: 'center', object: 'none', heroSize: 140, heroUnderline: true}));
add('The story starts in 1856', photo('p1-zurich1800', {apoio: 'The story starts in', hero: 'ZURICH, 1856'}));
add('Switzerland wanted railways', photo('p1-escher', {layout: 'print', side: 'right', apoio: 'Swiss money for Swiss railways:', hero: 'ALFRED ESCHER', complemento: 'politician and businessman'}));
add('So he started a bank', card({id: 'p1-ska', apoio: 'So he started a bank:', hero: 'SCHWEIZERISCHE KREDITANSTALT', complemento: 'Later, the world would call it Credit Suisse.', textSide: 'center', object: 'none', heroSize: 78}));
add('The idea was popular', (s) => (
	<BarsShot id="p1-shares" start={s} title="The first share sale, 1856 (francs)" titleAt={s + 4} source={CS} note={{text: '~70×', at: c.f('many times')}}
		bars={[
			{label: 'OFFERED', value: 3, display: '3M', at: c.f('Within days')},
			{label: 'ASKED FOR', value: 221, display: '221M', at: c.f('investors asked'), highlight: true},
		]} />
));
add('In its early years', (s) => (
	<StatsShot id="p1-quarter" start={s} title="In its early years" titleAt={s + 4} source="Source: Credit Suisse (history), via Wikipedia"
		items={[{value: '~25%', label: 'of revenue from one railway company', sub: 'run by Escher himself', at: c.f('about a quarter'), ring: 0.25}]} />
));
add('That\'s how close the bank', photo('p1-gotthard', {apoio: 'The bank and the railway, one man:', hero: 'THE GOTTHARD LINE', complemento: 'later, the railway through the Alps'}));
add('From there, the bank grew', photo('p1-paradeplatz', {apoio: 'The heart of Swiss banking:', hero: 'PARADEPLATZ', complemento: 'Zurich'}));
add('It opened an office in New York', photo('p1-newyork1870', {apoio: 'Its first office abroad:', hero: 'NEW YORK, 1870'}));
add('And over the decades', card({id: 'p1-wallst', apoio: 'Over the decades, it bought its way into', hero: 'WALL STREET', complemento: 'including First Boston.', textSide: 'left', object: 'chart', heroSize: 160}));
add('By the 2000s', (s) => (
	<DocLinesShot id="p1-two" start={s} title="By the 2000s: two banks in one" titleAt={s + 4}
		lines={[
			{label: 'A Swiss bank: safe, quiet, rich families\' money', at: c.f('A Swiss bank')},
			{label: 'An investment bank: bigger risks, bonuses, swings', at: c.f('And an investment bank'), highlight: true},
		]} />
));
add('When the financial crisis hit', photo('p1-bank2008', {apoio: '2008: UBS needed a rescue from the Swiss state.', hero: 'NOT CREDIT SUISSE', complemento: 'It raised money from private investors.'}));
add('Remember that', card({id: 'p1-flip', apoio: 'Remember that. Fifteen years later,', hero: 'THE ROLES FLIP', textSide: 'center', object: 'none', heroSize: 150, heroUnderline: true, dark: true}));
add('So what went wrong', card({id: 'p1-list', apoio: 'What went wrong? Not one thing.', hero: 'A LONG LIST', complemento: 'starting with a fishing company.', textSide: 'left', object: 'receipt', heroSize: 170}));

// ---------------- Parte 2 — A Decade of Scandals ----------------
add('Part 2', card({id: 'p2-title', apoio: 'Part 2', hero: 'A DECADE OF SCANDALS', textSide: 'center', object: 'none', heroSize: 130, heroUnderline: true}));
add('Between 2013 and 2016', photo('p2-maputo', {apoio: 'Mozambique, 2013–2016:', hero: '~$1 BILLION', complemento: 'in loans and bonds'}));
add('On paper, a lot of it', photo('p2-tuna', {apoio: 'On paper, much of it was for', hero: 'A TUNA FLEET'}));
add('Much of the money was diverted', card({id: 'p2-kick', apoio: 'Much of the money was diverted:', hero: 'KICKBACKS', complemento: 'to Credit Suisse bankers and officials', textSide: 'left', object: 'coin', heroSize: 180, dark: true}));
add('In 2021, the bank agreed', card({id: 'p2-475', apoio: '2021, U.S. and U.K. authorities:', hero: '$475 MILLION', complemento: 'to settle', textSide: 'right', object: 'receipt', heroSize: 160}));
add('In 2019, it got stranger', photo('p2-detective', {apoio: '2019: hired to follow a former executive', hero: 'PRIVATE DETECTIVES'}));
add('The Swiss regulator later found', (s) => (
	<StatsShot id="p2-spy" start={s} title="What the Swiss regulator found" titleAt={s + 4} source="Source: FINMA, via Swissinfo"
		items={[
			{value: '7', label: 'spying operations planned, 2016–2019', at: c.f('seven spying')},
			{value: '2020', label: 'CEO Tidjane Thiam resigns', at: c.f('resigned in early')},
		]} />
));
add('Then came 2021', card({id: 'p2-2021', apoio: 'Then came', hero: '2021', complemento: 'The year it all got expensive.', textSide: 'center', object: 'none', heroSize: 240, dark: true}));
add('In March, Credit Suisse froze', card({id: 'p2-greensill', apoio: 'March 2021, Greensill-linked funds:', hero: '$10B FROZEN', complemento: '1,000+ investors stuck', textSide: 'left', object: 'none', heroSize: 160}));
add('Just weeks after that', card({id: 'p2-archegos', apoio: 'Archegos implodes. Credit Suisse books', hero: 'CHF 4.4 BILLION', complemento: 'and warns of more losses', textSide: 'right', object: 'chart', heroSize: 140}));
add('Other banks lost money', card({id: 'p2-most', apoio: 'Of all the banks hit by Archegos,', hero: 'IT LOST THE MOST', complemento: "That's its own episode.", textSide: 'center', object: 'none', heroSize: 130}));
add('In January 2022', card({id: 'p2-chair', apoio: 'January 2022:', hero: 'CHAIRMAN RESIGNS', complemento: 'reportedly after breaking COVID rules', textSide: 'left', object: 'none', heroSize: 140}));
add('And in June 2022', photo('p2-court', {apoio: 'June 2022, Bulgarian cocaine gang case:', hero: 'CONVICTED', complemento: 'reportedly a first for a major Swiss bank'}));
add('None of these alone', (s) => (
	<TimelineShot id="p2-recap" start={s} dark title="Each one sent the same message"
		events={[
			{year: '2016', label: 'Mozambique', at: s + 4},
			{year: '2019', label: 'Spying', at: s + 12},
			{year: '2021', label: 'Greensill, Archegos', at: s + 20},
			{year: '2022', label: 'Conviction', at: s + 28, gold: true},
		]} />
));
add('Something here isn\'t working', card({id: 'p2-msg', apoio: 'The message to clients:', hero: "SOMETHING ISN'T WORKING", complemento: 'In banking, the most expensive message there is.', textSide: 'center', object: 'none', heroSize: 105, heroUnderline: true, dark: true}));

// ---------------- Parte 3 — The Slow-Motion Run (azul-marinho) ----------------
add('Part 3', card({id: 'p3-title', apoio: 'Part 3', hero: 'THE SLOW-MOTION RUN', textSide: 'center', object: 'none', heroSize: 130, heroUnderline: true, dark: true}));
add('Here\'s the thing about a bank', photo('p3-vault', {tone: 'navy', apoio: 'Your money is', hero: 'NOT IN A VAULT'}));
add('It lends it out', card({id: 'p3-slice', apoio: 'Lent out, invested. As cash, at any moment:', hero: 'ONLY A SLICE', textSide: 'left', object: 'coin', heroSize: 160, dark: true}));
add('That works perfectly', card({id: 'p3-once', apoio: 'It works perfectly, unless', hero: 'EVERYONE ASKS AT ONCE', textSide: 'center', object: 'none', heroSize: 110, dark: true}));
add('In October 2022', (s) => (
	<DocLinesShot id="p3-plan" start={s} title="The rescue plan, October 2022" titleAt={s + 4} source="Source: Fortune, Oct 27, 2022"
		lines={[
			{label: 'Cut about 9,000 jobs', at: c.f('Cut about nine')},
			{label: 'Split off the investment bank', at: c.f('Split off')},
			{label: 'Raise ~CHF 4 billion in new capital', at: c.f('Raise around')},
			{label: 'Saudi National Bank: up to $1.5B, just under 10%', at: c.f('Its new anchor'), highlight: true},
		]} />
));
add('But clients were already leaving', (s) => (
	<CounterShot id="p3-q4" start={s} label="Clients pulled out, Oct–Dec 2022" labelAt={s + 4} from={0} to={110} countAt={c.f('one hundred and ten')} prefix="CHF " suffix="B" sub="more than a billion francs a day" subAt={c.f('more than a billion')} source={AB} dark />
));
add('For the full year', card({id: 'p3-loss', apoio: 'Full-year 2022:', hero: '−CHF 7.3 BILLION', textSide: 'left', object: 'chart', heroSize: 140, dark: true}));
add('Then came March 2023', photo('p3-svb', {tone: 'navy', apoio: 'March 10, 2023, Silicon Valley Bank:', hero: '$42B IN A DAY', complemento: 'With an app, a run takes hours.'}));
add('Suddenly, every investor', card({id: 'p3-next', apoio: 'Every investor in the world, looking for', hero: 'THE NEXT WEAK BANK', textSide: 'center', object: 'none', heroSize: 120, dark: true}));
add('On March 14', (s) => (
	<DocLinesShot id="p3-report" start={s} title="Annual report, March 14, 2023" titleAt={s + 4} source="Source: Finance Magnates"
		lines={[
			{label: 'Published late', at: c.f('delayed annual report')},
			{label: 'Internal control over financial reporting:', at: c.f('It admitted')},
			{label: '"material weaknesses"', at: c.f('material weaknesses'), highlight: true},
		]} />
));
add('The next morning, the chairman', photo('p3-riyadh', {tone: 'navy', apoio: 'Saudi National Bank chairman, asked about more money:', hero: '"ABSOLUTELY NOT."', textAt: [0, c.f('Absolutely not'), 0]}));
add('It was a technical reason', card({id: 'p3-heard', apoio: 'The reason: rules above 10%. Markets heard only', hero: '"NOT."', textSide: 'center', object: 'none', heroSize: 200, dark: true}));
add('Credit Suisse shares fell', card({id: 'p3-25', apoio: 'Shares that day, as much as', hero: '−25%', complemento: 'to a record low', textSide: 'left', object: 'chart', heroSize: 220, heroUnderline: true, dark: true}));
add('That night, the Swiss National Bank', photo('p3-snb', {tone: 'navy', apoio: 'Swiss National Bank loan, up to', hero: 'CHF 50 BILLION'}));
add('The shares bounced', (s) => (
	<BarsShot id="p3-outflows" start={s} horizontal title="Money clients pulled out (CHF)" titleAt={s + 4} source={AB}
		bars={[
			{label: 'OCT–DEC 2022', value: 110.5, display: '110.5B', at: s + 8},
			{label: 'JAN–MAR 2023', value: 61.2, display: '61.2B', at: c.f('sixty-one billion'), highlight: true},
		]} />
));
add('By Friday', card({id: 'p3-week', apoio: 'By Friday, it would not survive', hero: 'ANOTHER WEEK', textSide: 'center', object: 'none', heroSize: 160, heroUnderline: true, dark: true}));

// ---------------- Parte 4 — The Weekend (azul-marinho) ----------------
add('Part 4', card({id: 'p4-title', apoio: 'Part 4', hero: 'THE WEEKEND', textSide: 'center', object: 'none', heroSize: 170, heroUnderline: true, dark: true}));
add('Why a weekend', photo('p4-tokyo', {tone: 'navy', apoio: 'Deadline: Monday morning,', hero: 'BEFORE ASIA OPENS'}));
add('So, over the weekend', (s) => (
	<DocLinesShot id="p4-table" start={s} title="Around the table, March 18–19" titleAt={s + 4}
		lines={[
			{label: 'The Swiss government', at: c.f('the Swiss government')},
			{label: 'The Swiss National Bank', at: c.f('the central bank')},
			{label: 'FINMA, the regulator', at: c.f('the financial regulator')},
			{label: 'UBS', at: c.f('and UBS'), highlight: true},
		]} />
));
add('At Friday\'s close', card({id: 'p4-8b', apoio: "Market value at Friday's close:", hero: '~$8 BILLION', complemento: 'according to news reports', textSide: 'left', object: 'chart', heroSize: 160, dark: true}));
add('On Sunday evening', photo('p6-swissflag', {tone: 'navy', apoio: 'Sunday evening, March 19:', hero: 'THE ANNOUNCEMENT'}));
add('UBS would take over', (s) => (
	<StatsShot id="p4-price" start={s} title="UBS takes over Credit Suisse" titleAt={s + 4} source={FINMA}
		items={[
			{value: 'CHF 3B', label: 'paid in UBS shares', at: c.f('three billion Swiss')},
			{value: 'CHF 0.76', label: 'per Credit Suisse share', at: c.f('seventy-six centimes')},
		]} />
));
add('To make it work', card({id: 'p4-vote', apoio: 'Emergency powers:', hero: 'NO VOTE', complemento: "Shareholders of both banks didn't get a say.", textSide: 'left', object: 'none', heroSize: 200, dark: true}));
add('The Swiss state also offered', (s) => (
	<BarsShot id="p4-net" start={s} horizontal title="Safety net for the riskiest assets (CHF)" titleAt={s + 4} source={FINMA}
		bars={[
			{label: 'UBS, FIRST LOSSES', value: 5, display: '5B', at: c.f('first five billion')},
			{label: 'GOVERNMENT, NEXT', value: 9, display: '9B', at: c.f('next nine billion'), highlight: true},
		]} />
));
add('And the Swiss National Bank promised', card({id: 'p4-100', apoio: 'Extra loans, backed by the government:', hero: 'CHF 100 BILLION', textSide: 'left', object: 'coin', heroSize: 150, dark: true}));
add('There were other options', photo('p1-bank2008', {id: 'p4-options', tone: 'navy', apoio: 'Reportedly considered:', hero: 'NATIONALIZE IT?', complemento: 'All the risk on taxpayers. UBS looked safer.'}));
add('Remember 2008', (s) => (
	<TimelineShot id="p4-flip" start={s} dark title="The roles flip"
		events={[
			{year: '2008', label: 'UBS rescued by the state', at: s + 4},
			{year: '2023', label: 'UBS rescues Credit Suisse', sub: 'or rather, swallows it', at: c.f('UBS was the rescuer'), gold: true},
		]} />
));
add('But the biggest shock', card({id: 'p4-shock', apoio: 'The biggest shock of the weekend', hero: "WASN'T THE PRICE", textSide: 'center', object: 'none', heroSize: 130, heroUnderline: true, dark: true}));
add('Quick thing', (s) => (
	<SubscribeShot2 id="p4-sub" start={s} dark free="It's free." line1="And unlike some bonds in this story…" line2="it won't go to zero."
		at={{ask: s + 4, tap: c.f('subscribe'), free: c.f("It's free"), line1: c.f('And unlike'), line2: c.f("it won't go")}} />
));

// ---------------- Parte 5 — The Bonds That Went to Zero ----------------
add('Part 5', card({id: 'p5-title', apoio: 'Part 5', hero: 'THE BONDS THAT WENT TO ZERO', textSide: 'center', object: 'none', heroSize: 105, heroUnderline: true}));
add('After the 2008 crisis', photo('p5-bond', {apoio: 'After 2008, regulators wanted', hero: 'A CUSHION', complemento: 'to absorb losses before taxpayers'}));
add('One answer was a special kind', card({id: 'p5-at1', apoio: 'A special kind of bond:', hero: 'AT1', complemento: 'Additional Tier 1', textSide: 'left', object: 'receipt', heroSize: 260, heroUnderline: true}));
add('Here\'s how it works', (s) => (
	<DocLinesShot id="p5-how" start={s} title="How an AT1 bond works" titleAt={s + 4}
		lines={[
			{label: 'Investors lend the bank money', at: c.f('Investors lend')},
			{label: 'They get a higher interest rate', at: c.f('higher interest rate')},
			{label: 'Deep trouble: converted to shares, or written off', at: c.f('converted into shares'), highlight: true},
		]} />
));
add('That\'s why people in the market', card({id: 'p5-coco', apoio: 'Contingent convertibles:', hero: 'COCOS', complemento: 'bonds that can stop being bonds', textSide: 'right', object: 'receipt', heroSize: 220}));
add('Credit Suisse\'s AT1 bonds had a clause', (s) => (
	<DocLinesShot id="p5-clause" start={s} title="The clause" titleAt={s + 4}
		lines={[
			{label: 'If the bank receives extraordinary', at: c.f('extraordinary support')},
			{label: 'support from the government…', at: c.f('from the government')},
			{label: '…the bonds can be wiped out', at: c.f('could be wiped out'), highlight: true},
		]} />
));
add('That\'s exactly what happened', (s) => (
	<CounterShot id="p5-zero" start={s} label="Credit Suisse AT1 bonds, ordered written down" labelAt={s + 4} from={16} to={0} countAt={c.f('written down to zero')} countFrames={30} prefix="CHF " suffix="B" sub="Not a discount. Zero." subAt={c.f('Not a discount')} source={FINMA} dark />
));
add('But here\'s why investors were furious', (s) => (
	<DocLinesShot id="p5-order" start={s} title="Who normally loses first" titleAt={s + 4}
		lines={[
			{label: '1.  Shareholders: they own the company', at: c.f('shareholders are first')},
			{label: '2.  Bondholders: only after shareholders are wiped out', at: c.f('Bondholders lose only'), highlight: true},
		]} />
));
add('At Credit Suisse, it was the other way', (s) => (
	<StatsShot id="p5-flip" start={s} title="At Credit Suisse, the other way around" titleAt={s + 4} source={FINMA}
		items={[
			{value: 'CHF 3B', label: 'shareholders still got, in UBS shares', at: c.f('Shareholders still got')},
			{value: 'CHF 0', label: 'AT1 bondholders got', at: c.f('got nothing')},
		]} />
));
add('The Swiss said the bonds', card({id: 'p5-panic', apoio: "The Swiss: the bonds' terms allowed it. Monday:", hero: 'AT1 BONDS FALL', complemento: 'at other banks, around the world', textSide: 'left', object: 'chart', heroSize: 130, dark: true}));
add('But the very next day', photo('p5-ecb', {apoio: 'EU regulators, the next day:', hero: 'SHAREHOLDERS FIRST', complemento: 'The Bank of England said much the same.'}));
add('Around three thousand bondholders', (s) => (
	<StatsShot id="p5-court" start={s} title="The bondholders went to court" titleAt={s + 4} source="Sources: Legal500; FINMA"
		items={[
			{value: '~3,000', label: 'bondholders', at: c.f('three thousand')},
			{value: '360+', label: 'complaints', at: c.f('three hundred and sixty')},
		]} />
));
add('And in October 2025', (s) => (
	<DocLinesShot id="p5-ruling" start={s} title="Federal Administrative Court, October 2025" titleAt={s + 4} source="Sources: FINMA; DLA Piper"
		lines={[{label: 'The write-down "lacked a sufficient legal basis"', at: c.f('lacked a sufficient'), highlight: true}]} />
));
add('But that wasn\'t the end', photo('p5-supremecourt', {apoio: 'Appealed by the regulator and UBS:', hero: 'SUPREME COURT', complemento: 'The bonds are still worth zero, for now.'}));

// ---------------- Parte 6 — Who Paid, and Who Profited ----------------
add('Part 6', card({id: 'p6-title', apoio: 'Part 6', hero: 'WHO PAID, AND WHO PROFITED', textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true}));
add('So let\'s add it up', (s) => (
	<DocLinesShot id="p6-paid" start={s} title="Who paid" titleAt={s + 4} source="Sources: FINMA; Bloomberg via Swissinfo (job cuts, reportedly)"
		lines={[
			{label: 'Shareholders', value: 'almost everything', at: c.f('shareholders lost')},
			{label: 'AT1 bondholders', value: '~CHF 16B, for now', at: c.f('AT1 bondholders lost'), highlight: true},
			{label: 'Employees', value: '~17,500 positions', at: c.f('thousands of employees')},
		]} />
));
add('The name went too', photo('p6-office', {apoio: 'May 31, 2024: merged into UBS', hero: '1856 – 2024', complemento: 'On a Friday, with no drama at all'}));
add('What about Swiss taxpayers', card({id: 'p6-tax', apoio: 'Guarantee ended in August 2023. The government says it collected', hero: '~CHF 200 MILLION', complemento: 'in fees, and lost nothing.', textSide: 'left', object: 'coin', heroSize: 130}));
add('And UBS?', (s) => (
	<BarsShot id="p6-ubs" start={s} horizontal title="UBS profit, Q2 2023 (USD)" titleAt={s + 4} source="Source: UBS, second-quarter 2023 results" note={{text: '~$29B', at: c.f('twenty-nine billion')}}
		bars={[
			{label: 'NEGATIVE GOODWILL', value: 28.9, display: '$28.9B', at: c.f('negative goodwill'), highlight: true},
			{label: 'UNDERLYING (PRE-TAX)', value: 1.1, display: '$1.1B', at: c.f('In plain English')},
		]} />
));
add('But the story isn\'t over', photo('p6-swissflag', {id: 'p6-giant', apoio: 'Switzerland now has', hero: 'ONE GIANT BANK', complemento: 'and no rival left to rescue it'}));
add('So lawmakers want UBS', photo('p6-parliament', {apoio: 'Extra capital UBS says the plan could cost:', hero: '~$16 BILLION', complemento: 'Upper house vote, September 2026'}));
add('A Swiss parliamentary inquiry', (s) => (
	<DocLinesShot id="p6-inquiry" start={s} title="Parliamentary inquiry, December 2024" titleAt={s + 4} source="Source: Swissinfo"
		lines={[
			{label: "Main blame: Credit Suisse's managers, over many years", at: c.f('main blame'), highlight: true},
			{label: "Also criticized: the regulator's 2017 capital relief", at: c.f('It also criticized')},
		]} />
));
add('So, how does a one hundred', card({id: 'p6-q', apoio: 'So, how does a 167-year-old bank', hero: 'DIE IN A WEEKEND?', textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true}));
add('It doesn\'t', card({id: 'p6-funeral', apoio: "It doesn't. The weekend was", hero: 'ONLY THE FUNERAL', textSide: 'center', object: 'none', heroSize: 130, dark: true}));
add('The money left over years', card({id: 'p6-years', apoio: 'The money left over years.', hero: 'ONE CLIENT AT A TIME', textSide: 'left', object: 'coin', heroSize: 120}));
add('A bank runs on money', card({id: 'p6-trust', apoio: 'A bank runs on money. Money runs on trust.', hero: 'TRUST LEAVES, MONEY FOLLOWS', textSide: 'center', object: 'none', heroSize: 100, heroUnderline: true, dark: true}));

// ---------------- Fechamento ----------------
add('Next time', photo('c-savings', {apoio: 'Next: your savings account', hero: 'WHY SO LITTLE?'}));
add('And if you want the other side', (s) => (
	<SisterShot id="c-sister" start={s} at={{ships: c.f('the ships'), planes: c.f('planes'), rockets: c.f('rockets'), name: c.f('Cargo and Capital')}} />
));
add('This is Billions and Bulls. This video', (s) => (
	<EndShot id="c-end" start={s} at={{sign: s + 4, disclaimer: c.f('This video explains'), subscribe: c.f('Subscribe'), endscreen: c.f('following the money') + 40}} />
));

export const Ep03 = () => <E.Episode voice="audio/ep03-voice.wav" music={(timeline as Timeline).provisional ? undefined : 'audio/ep03-heist.wav'} />;
export const EP03_FRAMES = E.frames;
