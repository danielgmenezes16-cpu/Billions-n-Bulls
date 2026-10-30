import React from 'react';
import {makeEpisode} from '../epkit/build';
import {CounterShot, DocLinesShot, RouteShot2, SplitShot, SubscribeShot2, TimelineShot} from '../epkit/shots';
import {BarsShot, StatsShot} from '../shots/partA';
import {EndShot, SisterShot} from '../shots/partC';
import credits from './creditos.json';
import timeline from './timeline.json';
import type {Timeline} from '../epkit/cues';
import type {Credit} from '../epkit/build';

// Episódio 2 — "Who Really Gets Paid When You Tap Your Card?"
// Cada cena começa numa frase do roteiro (roteiros/rascunhos/fonte/ep02-roteiro.txt).
// Hoje a linha do tempo é provisória (estimada); quando a narração chegar, troca-se timeline.json e tudo se realinha.

const E = makeEpisode(timeline as Timeline, credits as Record<string, Credit>);
const {c, add, card, photo} = E;

const VISA_AR = 'Source: Visa, Fiscal 2025 Annual Report';
const IFEE = 'Source: Visa USA Interchange Reimbursement Fees, effective Oct 24, 2026';
const BOS = 'Source: Federal Reserve Bank of Boston, Schuh, Shy & Stavins (2010)';

// ---------------- Abertura ----------------
add('Who Really Gets Paid', card({id: 'o-title', apoio: 'When you tap your card,', hero: 'WHO GETS PAID?', textSide: 'left', object: 'card', heroSize: 150, heroUnderline: true, objectSlide: true}));
add('You tap your card', photo('o-tap', {apoio: 'Tap. Beep.', hero: '2 SECONDS', zoom: [1.05, 1.18], focus: [55, 55]}));
add('But in those two seconds', card({id: 'o-three', apoio: 'At least', hero: '3 COMPANIES', complemento: 'and every one takes a cut.', textSide: 'right', object: 'coin', heroSize: 160}));
add('Together, those cuts', photo('o-checkout', {apoio: 'Paid by U.S. stores in 2025:', hero: '$198 BILLION', complemento: 'in card fees', zoom: [1.1, 1.02]}));
add('Some of it pays for your rewards', card({id: 'o-points', apoio: 'Some of it pays for', hero: 'YOUR POINTS', textSide: 'left', object: 'card', heroSize: 160}));
add('And some of it', photo('p4-cash', {id: 'o-cash', layout: 'print', side: 'right', apoio: 'And some is paid by people who', hero: 'NEVER TAPPED', complemento: 'a card at all.'}));
add('So we\'re going to follow', card({id: 'o-follow', apoio: 'One purchase.', hero: '$100', complemento: 'cent by cent.', textSide: 'left', object: 'receipt', heroSize: 200, heroUnderline: true}));
add('This is Billions and Bulls', card({id: 'o-brand', apoio: 'This is Billions & Bulls.', hero: "LET'S FOLLOW THE MONEY", textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true}));

// ---------------- Parte 1 — The Two-Second Trip ----------------
add('Part 1', card({id: 'p1-title', apoio: 'Part 1', hero: 'THE TWO-SECOND TRIP', textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true}));
add('Say you spend', photo('p1-store', {layout: 'print', side: 'right', apoio: '$100 at a store,', hero: 'REWARDS CARD', complemento: 'paid with a rewards credit card.'}));
add('You don\'t even swipe', card({id: 'p1-tap', apoio: 'Visa says, Sept. 2025:', hero: '4 IN 5', complemento: 'in-person payments were a tap.', textSide: 'left', object: 'phone', heroSize: 190}));
add('The moment you tap', (s) => (
	<RouteShot2 id="p1-route" start={s} goAt={c.f('sends a message')}
		nodes={[
			{name: 'READER', sub: 'THE STORE', at: s + 4},
			{name: 'ACQUIRER', sub: "STORE'S BANK", at: c.f('acquirer')},
			{name: 'VISA', sub: 'THE NETWORK', at: c.f('In this case')},
			{name: 'ISSUER', sub: 'YOUR BANK', at: c.f('The issuer')},
		]} />
));
add('Your bank checks two things', card({id: 'p1-checks', apoio: 'Your bank checks:', hero: 'IS IT YOU?', complemento: 'And can you pay?', textSide: 'left', object: 'phone', heroSize: 150}));
add('If the answer is yes', (s) => (
	<RouteShot2 id="p1-approve" start={s} goAt={s - 200} backAt={c.f('races all the way back')} stamp={{text: 'APPROVED', at: c.f('Beep')}}
		nodes={[
			{name: 'READER', at: s - 10},
			{name: 'ACQUIRER', at: s - 10},
			{name: 'VISA', at: s - 10},
			{name: 'ISSUER', at: s - 10},
		]} />
));
add('Now multiply that', photo('p1-datacenter', {apoio: "Visa's own network, fiscal 2025:", hero: '258 BILLION', complemento: 'transactions', tone: 'navy'}));
add('That\'s roughly eight thousand', (s) => (
	<CounterShot id="p1-persec" start={s} label="Transactions on Visa's network" labelAt={s + 4} from={0} to={8000} countAt={c.f('eight thousand')} prefix="~" sub="every second, day and night" subAt={c.f('every single second')} source="Our calculation: 258 billion ÷ seconds in a year" dark />
));
add('But the beep is only a promise', card({id: 'p1-promise', apoio: 'The beep is only', hero: 'A PROMISE', complemento: 'No money has moved yet.', textSide: 'right', object: 'receipt', heroSize: 170}));
add('That happens later', photo('p1-night', {apoio: 'Later, usually overnight:', hero: 'CLEARING & SETTLEMENT', tone: 'navy', zoom: [1.02, 1.12]}));
add('And here\'s the thing', (s) => (
	<SplitShot id="p1-split" start={s} title="Your $100, after it reaches the store" titleAt={s + 4} total={100} totalLabel="$100"
		source="Illustrative split for a rewards credit card · varies by card, store and processor"
		pieces={[
			{value: 96, label: 'THE STORE', display: '~$97', at: c.f('the store keeps')},
			{value: 2.4, label: 'YOUR BANK', display: 'fee', at: c.f('minus a fee'), highlight: true},
			{value: 0.8, label: 'VISA', display: 'fees', at: c.f('Visa charges its own')},
			{value: 0.8, label: 'PAYMENT CO.', display: 'cut', at: c.f('payment company takes')},
		]} />
));
add('Three dollars doesn\'t sound', (s) => (
	<CounterShot id="p1-198" start={s} label="Card processing fees paid by U.S. merchants, 2025" labelAt={s + 4} from={0} to={198} countAt={c.f('more than one hundred')} prefix="$" suffix="B+" sub="a record, according to the Nilson Report" source="Source: Nilson Report (via Merchant Payments Coalition)" />
));
add('That\'s more than half a billion', card({id: 'p1-day', apoio: 'More than', hero: 'HALF A BILLION', complemento: 'every single day.', textSide: 'left', object: 'coin', heroSize: 150}));
add('So who ends up', card({id: 'p1-who', apoio: 'So who ends up with it?', hero: 'START WITH THE NAME', complemento: 'on the card.', textSide: 'right', object: 'card', heroSize: 110}));

// ---------------- Parte 2 — The Toll Road ----------------
add('Part 2', card({id: 'p2-title', apoio: 'Part 2', hero: 'THE TOLL ROAD', textSide: 'center', object: 'none', heroSize: 150, heroUnderline: true}));
add('The story starts in 1958', photo('p2-fresno', {layout: 'print', side: 'left', apoio: 'The story starts in', hero: 'FRESNO, 1958', complemento: 'California'}));
add('Bank of America mailed', photo('p2-mail', {apoio: 'Mailed to people who never asked:', hero: '60,000 CARDS', zoom: [1.12, 1.03]}));
add('It was called the BankAmericard', card({id: 'p2-6pct', apoio: 'Stores reportedly paid a fee of', hero: '~6%', complemento: 'per purchase.', textSide: 'left', object: 'receipt', heroSize: 220}));
add('The launch was messy', (s) => (
	<TimelineShot id="p2-time" start={s} title="From one city to the world"
		events={[
			{year: '1958', label: 'Fresno launch', sub: 'fraud and unpaid bills', at: s + 6},
			{year: '1976', label: 'New name: Visa', at: c.f('1976')},
			{year: '2008', label: 'IPO: ~$17.9B', sub: 'reportedly the biggest U.S. IPO at the time', at: c.f('in 2008'), gold: true},
		]} />
));
add('And here\'s what most people', card({id: 'p2-notbank', apoio: 'What most people get wrong:', hero: 'VISA IS NOT A BANK', textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true}));
add('Visa doesn\'t give you', (s) => (
	<DocLinesShot id="p2-doesnt" start={s} title="What Visa doesn't do" titleAt={s + 4}
		lines={[
			{label: '✕  Give you a credit card', at: c.f('give you a credit card')},
			{label: '✕  Lend you money', at: c.f('lend you money')},
			{label: '✕  Set your interest rate', at: c.f('set your interest rate')},
			{label: "✕  Lose a cent if you don't pay", at: c.f('lose a cent'), highlight: true},
		]} />
));
add('Visa says so itself', (s) => (
	<DocLinesShot id="p2-ar" start={s} title="In its own words" titleAt={s + 4} header="VISA · FISCAL 2025 ANNUAL REPORT" source={VISA_AR}
		lines={[
			{label: '"Visa is not a financial institution.', at: c.f('It is not a financial'), highlight: true},
			{label: 'We do not issue cards, extend credit or set', at: c.f('It does not issue')},
			{label: 'rates and fees for account holders…"', at: c.f('does not extend credit')},
		]} />
));
add('So what is it', photo('p2-tollbooth', {layout: 'print', side: 'right', apoio: 'Think of Visa as', hero: 'A TOLL ROAD', complemento: 'for money.'}));
add('Banks own the cars', photo('p2-highway', {zoom: [1.03, 1.12], tone: 'navy', allowLowRes: true,
	marks: [
		{kind: 'label', x: 140, y: 160, text: 'CARS = BANKS', at: c.f('Banks own the cars')},
		{kind: 'label', x: 140, y: 250, text: 'ROAD = VISA', at: c.f('Visa owns the road')},
		{kind: 'dot', path: [[200, 760], [900, 640], [1700, 560]], at: c.f('every time money'), dur: 50},
		{kind: 'label', x: 1300, y: 380, text: 'TOLL', at: c.f('charges a small toll')},
	]}));
add('The tolls are tiny', card({id: 'p2-traffic', apoio: 'The tolls are tiny.', hero: 'THE TRAFFIC IS ENORMOUS', textSide: 'center', object: 'none', heroSize: 105}));
add('In the twelve months', (s) => (
	<StatsShot id="p2-volume" start={s} title="Visa's network, 12 months to September 2025" titleAt={s + 4} source={VISA_AR}
		items={[
			{value: '$14.2T', label: 'in payments volume', at: c.f('fourteen point two')},
			{value: '~5B', label: 'cards and payment credentials', at: c.f('nearly five billion')},
		]} />
));
add('Visa charges banks for the volume', (s) => (
	<BarsShot id="p2-lines" start={s} horizontal title="Visa's revenue lines, fiscal 2025 (before incentives)" titleAt={s + 4} source={VISA_AR}
		bars={[
			{label: 'VOLUME', value: 17.5, display: '$17.5B', at: c.f('for the volume')},
			{label: 'PROCESSING', value: 20.0, display: '$20.0B', at: c.f('every message')},
			{label: 'CROSS-BORDER', value: 14.2, display: '$14.2B', at: c.f('cross-border payments'), highlight: true},
			{label: 'OTHER', value: 4.1, display: '$4.1B', at: c.f('That line alone')},
		]} />
));
add('But there\'s a twist', photo('p2-airport', {id: 'p2-twist', apoio: 'The twist: Visa also pays banks', hero: '$15.8 BILLION', complemento: '"client incentives," fiscal 2025', tone: 'navy'}));
add('Add it all up', (s) => (
	<StatsShot id="p2-profit" start={s} title="Visa, fiscal 2025" titleAt={s + 4} source={VISA_AR} stamp={{text: '≈ HALF', at: c.f('roughly half')}}
		items={[
			{value: '$40.0B', label: 'net revenue', at: c.f('forty billion')},
			{value: '$20.1B', label: 'net income', at: c.f('net income was'), ring: 0.5},
		]} />
));
add('Spread across all those payments', card({id: 'p2-28c', apoio: 'For every $100 on its network:', hero: '~28¢', complemento: 'Our calculation: $40.0B ÷ $14.2T', textSide: 'left', object: 'coin', heroSize: 230, heroUnderline: true}));
add('So if the store loses', card({id: 'p2-rest', apoio: 'The store loses ~$3. Visa takes a fraction.', hero: 'WHERE DOES THE REST GO?', textSide: 'center', object: 'none', heroSize: 100}));

// ---------------- Parte 3 — The Fee Visa Sets, but Doesn't Keep ----------------
add('Part 3', card({id: 'p3-title', apoio: 'Part 3', hero: "THE FEE VISA SETS, BUT DOESN'T KEEP", textSide: 'center', object: 'none', heroSize: 92, heroUnderline: true}));
add('It\'s called the interchange fee', card({id: 'p3-ic', apoio: "It's called the", hero: 'INTERCHANGE FEE', textSide: 'left', object: 'card', heroSize: 140, heroUnderline: true}));
add("When you pay with a card, the store's", (s) => (
	<RouteShot2 id="p3-route" start={s} goAt={c.f('pays a fee to your bank')} stamp={{text: 'YOUR BANK KEEPS IT', at: c.f('Your bank does')}}
		nodes={[
			{name: "STORE'S BANK", at: s + 4},
			{name: 'YOUR BANK', sub: 'RATE SET BY VISA', at: c.f('Visa sets the default')},
		]} />
));
add('Why does it exist at all', (s) => (
	<DocLinesShot id="p3-why" start={s} title="Visa's argument for the fee" titleAt={s + 4}
		lines={[
			{label: "Your bank takes the risk you won't pay", at: c.f('takes the risk')},
			{label: 'It fights fraud', at: c.f('It fights fraud')},
			{label: 'It gives you time to pay', at: c.f('time to pay')},
			{label: 'The store gets a customer who can spend more', at: c.f('the store gets'), highlight: true},
		]} />
));
add('But the rate depends', (s) => (
	<DocLinesShot id="p3-table" start={s} title="Same $100, regular store" titleAt={s + 4} header="VISA U.S. CREDIT INTERCHANGE · EFFECTIVE OCT 24, 2026" source={IFEE}
		lines={[
			{label: 'Basic credit card, retail', value: '1.43% + $0.10', at: c.f('a basic credit card')},
			{label: 'Visa Infinite, retail', value: '2.30% + $0.10', at: c.f('A premium card like'), highlight: true},
		]} />
));
add('Buy the same thing online', (s) => (
	<BarsShot id="p3-bars" start={s} title="Interchange on the same $100" titleAt={s + 2} source={IFEE}
		bars={[
			{label: 'BASIC', value: 1.53, display: '$1.53', at: s + 4},
			{label: 'PREMIUM', value: 2.4, display: '$2.40', at: s + 10, highlight: true},
			{label: 'PREMIUM ONLINE', value: 2.7, display: '$2.70', at: c.f('Two dollars and seventy')},
		]} />
));
add('Now pay with a debit card', card({id: 'p3-debit', apoio: 'Big-bank debit, capped by law:', hero: '21¢ + 0.05% + 1¢', complemento: 'about 27 cents on $100.', textSide: 'left', object: 'card', heroSize: 120}));
add('Same store. Same hundred dollars', (s) => (
	<BarsShot id="p3-9x" start={s} title="Same store, same $100: what your bank collects" titleAt={s + 2} source={`${IFEE} · Federal Reserve, Regulation II`} note={{text: '~9×', at: c.f('About nine times')}}
		bars={[
			{label: 'BIG-BANK DEBIT', value: 0.27, display: '$0.27', at: s + 4},
			{label: 'PREMIUM CREDIT', value: 2.4, display: '$2.40', at: s + 12, highlight: true},
		]} />
));
add('So why would a bank', photo('p3-lounge', {apoio: 'Points. Cash back. Miles. Lounges.', hero: 'WHO PAYS FOR PERKS?', zoom: [1.04, 1.14]}));
add('Your bank collects more', (s) => (
	<RouteShot2 id="p3-perks" start={s} goAt={c.f('collects more')} stamp={{text: 'REWARDS', at: c.f('hands some of it back')}}
		nodes={[
			{name: 'STORE', at: s + 4},
			{name: 'YOUR BANK', at: c.f('Your bank collects')},
			{name: 'YOU', sub: 'POINTS', at: c.f('back to you')},
		]} />
));
add('That\'s why the cards with the best', photo('p3-online', {layout: 'print', side: 'left', apoio: 'Best rewards =', hero: 'PRICIEST FOR STORES', complemento: "And the store can't see it coming."}));
add('Quick thing', (s) => (
	<SubscribeShot2 id="p3-sub" start={s} free="It costs nothing." line1="And unlike your rewards points…" line2="nobody else is paying for it."
		at={{ask: s + 4, tap: c.f('subscribe'), free: c.f('It costs nothing'), line1: c.f('And unlike'), line2: c.f('nobody else')}} />
));

// ---------------- Parte 4 — The People Who Pay Without Swiping ----------------
add('Part 4', card({id: 'p4-title', apoio: 'Part 4', hero: 'THE PEOPLE WHO PAY WITHOUT SWIPING', textSide: 'center', object: 'none', heroSize: 92, heroUnderline: true}));
add('So the store pays the fee', card({id: 'p4-who', apoio: 'The store pays the fee.', hero: 'WHO PAYS THE STORE?', textSide: 'left', object: 'receipt', heroSize: 130}));
add('Stores have a few options', photo('p4-gas', {apoio: "Credit surcharge, under Visa's rules:", hero: 'UP TO 3%', complemento: 'banned in some states', zoom: [1.06, 1.15]}));
add('But most stores don\'t', card({id: 'p4-prices', apoio: 'Instead, prices go up', hero: 'FOR EVERYONE', textSide: 'right', object: 'chart', heroSize: 150}));
add('And everyone includes', photo('p4-cash', {apoio: 'Cash and debit: same higher price,', hero: 'NO POINTS', zoom: [1.12, 1.03]}));
add('In 2010, economists', photo('p4-bostonfed', {layout: 'print', side: 'right', apoio: 'Federal Reserve Bank of Boston', hero: '2010 STUDY', complemento: 'How big is the hidden transfer?'}));
add('They estimated that, on average', (s) => (
	<BarsShot id="p4-transfer" start={s} horizontal title="Estimated yearly transfer per household (2010)" titleAt={s + 4} source={BOS}
		bars={[
			{label: 'CASH PAYERS', value: 149, display: '−$149', at: c.f('one hundred and forty-nine')},
			{label: 'CARD USERS', value: 1133, display: '+$1,133', at: c.f('one thousand'), highlight: true},
		]} />
));
add('They also estimated', (s) => (
	<StatsShot id="p4-79" start={s} title="Banks' credit-card merchant-fee revenue" titleAt={s + 4} source={BOS}
		items={[{value: '79%', label: 'came, indirectly, from cash payers', at: c.f('seventy-nine percent'), ring: 0.79}]} />
));
add('And the money flowed', (s) => (
	<BarsShot id="p4-income" start={s} horizontal title="Per household, per year (2010 estimate)" titleAt={s + 4} source={BOS}
		bars={[
			{label: 'LOWEST INCOME', value: 21, display: 'pays $21', at: c.f('twenty-one dollars')},
			{label: 'HIGHEST INCOME', value: 750, display: 'gets $750', at: c.f('seven hundred and fifty'), highlight: true},
		]} />
));
add('That study is from 2010', photo('p4-eccles', {layout: 'print', side: 'left', apoio: 'Federal Reserve study, 2023:', hero: '$15B A YEAR', complemento: 'redistributed by rewards cards'}));
add('There\'s a second split', card({id: 'p4-split2', apoio: 'Pay in full:', hero: 'POINTS, NO INTEREST', complemento: 'Carry a balance: more interest than rewards.', textSide: 'left', object: 'card', heroSize: 110}));
add('To be fair', (s) => (
	<DocLinesShot id="p4-fair" start={s} title="The other side" titleAt={s + 4}
		lines={[
			{label: 'Cards protect you from fraud', at: c.f('protect you from fraud')},
			{label: 'Stores skip the risk of handling cash', at: c.f('skip the risk')},
			{label: 'Industry: cards help stores sell more', at: c.f('the industry argues'), highlight: true},
		]} />
));
add('But the points', card({id: 'p4-never', apoio: 'But the points?', hero: 'NEVER FREE', textSide: 'center', object: 'none', heroSize: 170, heroUnderline: true, dark: true}));

// ---------------- Parte 5 — The Twenty-Year Fight ----------------
add('Part 5', card({id: 'p5-title', apoio: 'Part 5', hero: 'THE TWENTY-YEAR FIGHT', textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true}));
add('Stores have been fighting', photo('p5-courthouse', {apoio: 'Merchants vs. Visa, Mastercard and the big banks', hero: 'SINCE 2005', tone: 'navy'}));
add('In 2012, the two sides', (s) => (
	<TimelineShot id="p5-time1" start={s} title="The merchants' class action" source="Sources: NACS; Davis Wright Tremaine"
		events={[
			{year: '2005', label: 'Class action filed', at: s + 4},
			{year: '2012', label: '~$7B settlement', at: c.f('In 2012')},
			{year: '2016', label: 'Thrown out on appeal', at: c.f('2016')},
			{year: '2019', label: '$5.5B+ approved', sub: 'the money, not the rules', at: c.f('2019'), gold: true},
		]} />
));
add('Meanwhile, in 2010', photo('p5-capitol', {apoio: '2010: Congress caps fees on', hero: 'DEBIT ONLY', complemento: 'Credit cards were left alone.'}));
add('And here\'s where the money', card({id: 'p5-door', apoio: 'Where the money found', hero: 'A SIDE DOOR', textSide: 'left', object: 'phone', heroSize: 160, heroUnderline: true}));
add('The cap only applies', photo('p5-smallbank', {layout: 'print', side: 'right', apoio: 'Banks under $10 billion in assets:', hero: 'NO CAP', complemento: 'They can charge the old, higher rates.'}));
add('So a whole new kind', photo('p5-phone', {apoio: 'Chime, 2025 IPO filing: debit interchange was', hero: '~HALF', complemento: 'of its revenue'}));
add('In 2024, the U.S. Justice', photo('p5-doj', {apoio: "U.S. debit on Visa's network, the government says:", hero: '60%+', complemento: '$7B+ a year in fees, per the lawsuit', tone: 'navy'}));
add('Visa denies it', card({id: 'p5-denies', apoio: 'Visa denies it.', hero: 'CASE CONTINUES', complemento: '2025: a judge refused to throw it out.', textSide: 'right', object: 'none', heroSize: 140}));
add('Back in the big merchant case', (s) => (
	<TimelineShot id="p5-time2" start={s} dark title="The latest round"
		events={[
			{year: '2024', label: 'Settlement rejected', at: s + 4},
			{year: '2025', label: 'New deal', at: c.f('So they tried again')},
			{year: '2026', label: 'Preliminary approval', sub: 'final approval pending', at: c.f('In June 2026'), gold: true},
		]} />
));
add('It would cut credit card', (s) => (
	<DocLinesShot id="p5-deal" start={s} title="The proposed deal" titleAt={s + 4} source="Sources: Payments Dive; American Banker"
		lines={[
			{label: 'Credit interchange cut by 0.1 point', value: '5 years', at: c.f('a tenth of a percentage point, for five')},
			{label: 'Standard credit cards capped at 1.25%', value: '8 years', at: c.f('cap the rate')},
			{label: 'Stores may refuse some premium cards', at: c.f('refuse some premium'), highlight: true},
		]} />
));
add('A tenth of a percentage point. On our', (s) => (
	<BarsShot id="p5-10c" start={s} title="Premium card, $100 purchase" titleAt={s + 4} source={IFEE} note={{text: '−10¢', at: c.f('ten cents')}}
		bars={[
			{label: 'TODAY', value: 2.4, display: '$2.40', at: s + 6},
			{label: 'WITH THE DEAL', value: 2.3, display: '$2.30', at: c.f('two dollars thirty'), highlight: true},
		]} />
));
add('Some of the biggest retailers', card({id: 'p5-pending', apoio: 'Big retailers: "far too little."', hero: 'FINAL APPROVAL?', complemento: 'Still pending as this video was made.', textSide: 'center', object: 'none', heroSize: 130, dark: true}));

// ---------------- Parte 6 — So, Who Pays for Your Points? ----------------
add('Part 6', card({id: 'p6-title', apoio: 'Part 6', hero: 'SO, WHO PAYS FOR YOUR POINTS?', textSide: 'center', object: 'none', heroSize: 100, heroUnderline: true}));
add('For a very different answer', photo('p6-eu', {apoio: 'Across the Atlantic,', hero: 'EUROPE CAPPED IT', complemento: '2015 · credit 0.3% · debit 0.2%'}));
add('On a hundred-euro purchase', (s) => (
	<BarsShot id="p6-compare" start={s} title="Interchange on a 100 purchase" titleAt={s + 2} source="Sources: Visa USA interchange table (Oct 2026); Regulation (EU) 2015/751"
		bars={[
			{label: 'U.S. PREMIUM', value: 2.4, display: '$2.40', at: c.f('Not two dollars')},
			{label: 'EU CREDIT', value: 0.3, display: '€0.30', at: s + 4, highlight: true},
		]} />
));
add('A study commissioned', photo('p6-euro', {layout: 'print', side: 'right', apoio: 'EU consumer-card interchange:', hero: '−35%', complemento: '€2B+ a year stayed with stores'}));
add('And with fees capped that low', photo('p6-london', {apoio: 'Less fee money, so', hero: 'FEWER POINTS', complemento: 'UK banks reportedly dropped reward cards'}));
add('So Europe made a trade', card({id: 'p6-trade', apoio: 'Cheaper fees for stores, fewer perks:', hero: 'THE TRADE', complemento: 'America made the opposite one.', textSide: 'left', object: 'chart', heroSize: 170}));
add('So, when you tap your card', card({id: 'p6-q', apoio: 'So, when you tap your card,', hero: 'WHO REALLY GETS PAID?', textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true}));
add('Visa takes a toll', (s) => (
	<SplitShot id="p6-recap" start={s} title="Who gets paid when you tap" titleAt={s + 4} total={100} totalLabel="$100" source="Illustrative · varies by card, store and processor"
		pieces={[
			{value: 0.8, label: 'VISA', display: 'toll', at: c.f('Visa takes a toll')},
			{value: 0.8, label: 'PAYMENT CO.', display: 'cut', at: c.f('payment company takes')},
			{value: 2.4, label: 'YOUR BANK', display: 'biggest slice', at: c.f('Your bank takes'), highlight: true},
			{value: 96, label: 'THE STORE', display: '~$97', at: c.f('hands some of it back')},
		]} />
));
add('And the bill is split', photo('p3-grocery', {apoio: 'The bill is split between the store, its customers…', hero: 'AND NON-CARD USERS', zoom: [1.03, 1.13]}));
add('Your points aren\'t free', card({id: 'p6-final', apoio: "Your points aren't free.", hero: 'EVERYONE CHIPS IN', textSide: 'center', object: 'none', heroSize: 130, heroUnderline: true, dark: true}));

// ---------------- Fechamento ----------------
add('Next time', photo('c-zurich', {apoio: 'Next: Credit Suisse', hero: '167 YEARS → 1 WEEKEND', tone: 'navy'}));
add('And if you want the other side', (s) => (
	<SisterShot id="c-sister" start={s} at={{ships: c.f('the ships'), planes: c.f('planes'), rockets: c.f('rockets'), name: c.f('Cargo and Capital')}} />
));
add('This is Billions and Bulls. This video', (s) => (
	<EndShot id="c-end" start={s} at={{sign: s + 4, disclaimer: c.f('This video explains'), subscribe: c.f('Subscribe'), endscreen: c.f('following the money') + 40}} />
));

export const Ep02 = () => <E.Episode voice="audio/ep02-voice.wav" music={(timeline as Timeline).provisional ? undefined : 'audio/ep02-spark.wav'} />;
export const EP02_FRAMES = E.frames;
export const EP02_SCENES = E.scenes;
