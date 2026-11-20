import React from 'react';
import {makeEpisode} from '../epkit/build';
import {DocLinesShot, RouteShot2, SplitShot, SubscribeShot2, TimelineShot} from '../epkit/shots';
import {BarsShot, StatsShot} from '../shots/partA';
import {EndShot, SisterShot} from '../shots/partC';
import credits from './creditos.json';
import timeline from './timeline.json';
import type {Timeline} from '../epkit/cues';
import type {Credit} from '../epkit/build';

// Episódio 6 — "Who Pays When You Buy Now, Pay Later?"
// Cada cena começa numa frase do roteiro (roteiros/rascunhos/fonte/ep06-roteiro.txt). Parte 4 em azul-marinho.
// Sem logos de Klarna/Affirm/Afterpay: só nomes em texto.

const E = makeEpisode(timeline as Timeline, credits as Record<string, Credit>);
const {c, add, card, photo} = E;

const CFPB22 = 'Source: CFPB, BNPL market report (2022), via Atlanta Fed';
const AFFIRM = 'Source: Affirm, Form 10-K, fiscal 2025';

// ---------------- Abertura ----------------
add('Who Pays When You Buy', card({id: 'o-title', apoio: 'Buy now, pay later.', hero: 'WHO PAYS?', textSide: 'left', object: 'card', heroSize: 180, heroUnderline: true, objectSlide: true}));
add('Cyber Monday, 2025', photo('o-cyber', {apoio: 'Cyber Monday 2025, buy now, pay later in one day:', hero: '$1 BILLION+', complemento: 'a record, Adobe says'}));
add('Pay in four. No interest', photo('o-app', {apoio: 'Pay in four. No interest. No fees, if on time.', hero: 'A FREE LOAN?'}));
add('But one of these companies', card({id: 'o-15b', apoio: 'One of these companies went public in 2025 at about', hero: '$15 BILLION', complemento: 'Somebody is paying.', textSide: 'center', object: 'none', heroSize: 150}));
add('This is Billions and Bulls', card({id: 'o-brand', apoio: 'This is Billions & Bulls.', hero: "LET'S FOLLOW THE MONEY", textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true}));

// ---------------- Parte 1 — Four Little Payments ----------------
add('Part 1', card({id: 'p1-title', apoio: 'Part 1', hero: 'FOUR LITTLE PAYMENTS', textSide: 'center', object: 'none', heroSize: 125, heroUnderline: true}));
add('Say you want a four-hundred-dollar', photo('p1-jacket', {apoio: 'A $400 jacket. At checkout:', hero: 'PAY IN 4'}));
add('You pay one hundred dollars today', (s) => (
	<TimelineShot id="p1-four" start={s} title="$400, paid over six weeks"
		events={[
			{year: '$100', label: 'Today', at: c.f('one hundred dollars today')},
			{year: '$100', label: 'Week 2', at: c.f('every two weeks')},
			{year: '$100', label: 'Week 4', at: c.f('three more times')},
			{year: '$100', label: 'Week 6 · paid off', at: c.f('Six weeks later'), gold: true},
		]} />
));
add('The idea isn\'t new', photo('p1-singer', {apoio: '1850s: sewing machines for a few dollars a month', hero: 'NOT NEW'}));
add('The modern version took off', (s) => (
	<TimelineShot id="p1-modern" start={s} title="The modern version" source="Sources: company histories; Block/Afterpay deal (reportedly)"
		events={[
			{year: 'SWEDEN', label: 'Klarna', at: c.f('Klarna from Sweden')},
			{year: 'AUSTRALIA', label: 'Afterpay', at: c.f('Afterpay from Australia')},
			{year: 'U.S.', label: 'Affirm', at: c.f('Affirm from the United States')},
			{year: '2021', label: 'Block buys Afterpay', sub: '~$29B, reportedly', at: c.f('In 2021'), gold: true},
		]} />
));
add('According to the Consumer Financial', (s) => (
	<BarsShot id="p1-growth" start={s} title="Buy now, pay later loans in the U.S." titleAt={s + 4} source={CFPB22}
		bars={[
			{label: '2019', value: 2, display: '$2B', at: c.f('two billion dollars')},
			{label: '2021', value: 24, display: '$24B+', at: c.f('twenty-four billion'), highlight: true},
		]} />
));
add('And it kept growing', card({id: 'p1-20b', apoio: '2025 holiday season, Adobe says: Americans spent a record', hero: '$20 BILLION', complemento: 'online, with buy now, pay later', textSide: 'center', object: 'none', heroSize: 170, heroUnderline: true}));
add('It\'s not just a US thing', photo('p1-london', {apoio: 'UK users in 2024, the FCA says:', hero: '~11 MILLION'}));
add('And it\'s not just jackets', photo('p1-grocery', {apoio: 'Users who bought groceries with it (LendingTree, 2026):', hero: '29%'}));
add('So here\'s the puzzle', card({id: 'p1-puzzle', apoio: '$400 jacket, $400 paid. Where does the money come from?', hero: 'SOMEONE YOU NEVER SEE', complemento: 'at checkout', textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true}));

// ---------------- Parte 2 — The Store Pays ----------------
add('Part 2', card({id: 'p2-title', apoio: 'Part 2', hero: 'THE STORE PAYS', textSide: 'center', object: 'none', heroSize: 160, heroUnderline: true}));
add('When you click pay in four', (s) => (
	<RouteShot2 id="p2-route" start={s} goAt={c.f('pays the store right away')} stamp={{text: 'MINUS A FEE', at: c.f('Minus a fee')}}
		nodes={[
			{name: 'BNPL CO.', sub: 'PAYS ALL AT ONCE', at: s + 4},
			{name: 'THE STORE', sub: 'GETS $400 TODAY', at: c.f('All at once')},
		]} />
));
add('That fee is the heart', (s) => (
	<BarsShot id="p2-fee" start={s} title="Average fee paid by the store (merchant discount)" titleAt={s + 4} source={CFPB22}
		bars={[
			{label: '2019', value: 3.39, display: '3.4%', at: c.f('three point four')},
			{label: '2021', value: 2.49, display: '~2.5%', at: c.f('two and a half percent by 2021'), highlight: true},
		]} />
));
add('On our four-hundred-dollar jacket', (s) => (
	<SplitShot id="p2-split" start={s} title="The $400 jacket, at the store" titleAt={s + 4} total={400} totalLabel="$400" source="Our calculation: ~2.5% fee"
		pieces={[
			{value: 390, label: 'THE STORE GETS', display: '$390', at: s + 6},
			{value: 10, label: 'FEE', display: '$10', at: c.f('ten dollars'), highlight: true},
		]} />
));
add('Remember our episode on credit cards', photo('p2-store', {apoio: 'Stores already pay card fees. Why pay this one too?', hero: 'BIGGER ORDERS'}));
add('Affirm tells merchants', (s) => (
	<DocLinesShot id="p2-claims" start={s} title="What the companies tell stores" titleAt={s + 4} source="Sources: Affirm (via Adyen docs); Klarna executive (sponsored Payments Dive piece)"
		lines={[
			{label: 'Affirm: "70% lift in average order value"', at: c.f('seventy percent')},
			{label: 'Klarna executive: "20% more sales at checkout"', at: c.f('A Klarna executive')},
			{label: 'Their own numbers, not independent studies', at: c.f('Those numbers come from'), highlight: true},
		]} />
));
add('For Klarna, the biggest name', (s) => (
	<SplitShot id="p2-klarna" start={s} title="Klarna's revenue, 12 months before its IPO" titleAt={s + 4} total={100} totalLabel="KLARNA" source="Source: Morningstar (Klarna filing)"
		pieces={[
			{value: 75, label: 'FEES, MOSTLY FROM STORES', display: '~75%', at: c.f('three quarters'), highlight: true},
			{value: 25, label: 'INTEREST', display: '~25%', at: c.f('most of it paid by merchants')},
		]} />
));
add('So in the classic pay in four', photo('p2-bags', {apoio: 'Shopper pays nothing extra. The store pays, and its prices carry it.', hero: 'EVERYONE CHIPS IN'}));
add('But the store\'s fee is only one part', card({id: 'p2-cash', apoio: 'Someone still has to hand over', hero: '$400 ON DAY ONE', textSide: 'center', object: 'coin', heroSize: 130}));

// ---------------- Parte 3 — Where the Money Really Comes From ----------------
add('Part 3', card({id: 'p3-title', apoio: 'Part 3', hero: 'WHERE THE MONEY REALLY COMES FROM', textSide: 'center', object: 'none', heroSize: 89, heroUnderline: true}));
add('Here\'s the thing about pay in four', (s) => (
	<RouteShot2 id="p3-funding" start={s} goAt={s + 6}
		nodes={[
			{name: 'BANKS', sub: 'CREDIT LINES', at: c.f('Lines of credit')},
			{name: 'INVESTORS', sub: 'BUY LOAN BUNDLES', at: c.f('Or investors')},
			{name: 'THE APP', at: c.f('partner banks')},
			{name: 'THE STORE', sub: 'PAID TODAY', at: s + 4},
		]} />
));
add('That\'s why interest rates matter', photo('p3-bank', {apoio: 'Rates near zero: the cash in the middle was cheap. Then rates went up.', hero: 'SQUEEZED'}));
add('Klarna went a step further', card({id: 'p3-deposits', apoio: 'Klarna has a banking license in Sweden:', hero: 'SAVERS FUND IT', complemento: 'deposits help pay for checkout loans', textSide: 'center', object: 'none', heroSize: 140}));
add('And then there\'s the other half', photo('p3-laptop', {apoio: 'Longer plans: 12, 24 months. Affirm says rates go up to', hero: '36% A YEAR'}));
add('Here\'s what that can look like', (s) => (
	<SplitShot id="p3-laptop-math" start={s} title="$1,200 laptop, 12 months at 30% a year" titleAt={s + 4} total={1404} totalLabel="$1,404" source="Our calculation: fixed monthly payments"
		pieces={[
			{value: 1200, label: 'THE LAPTOP', display: '$1,200', at: s + 6},
			{value: 204, label: 'INTEREST', display: '~$200', at: c.f('two hundred dollars'), highlight: true},
		]} />
));
add('For Affirm, this is now the biggest', (s) => (
	<BarsShot id="p3-affirm" start={s} horizontal title="Affirm's main revenue lines, fiscal 2025" titleAt={s + 4} source={AFFIRM}
		bars={[
			{label: 'INTEREST', value: 1.61, display: '$1.6B', at: c.f('one point six billion'), highlight: true},
			{label: 'MERCHANT FEES', value: 0.88, display: '$0.9B', at: c.f('eight hundred and eighty')},
			{label: 'SELLING LOANS', value: 0.38, display: '$0.4B', at: c.f('three hundred and eighty')},
		]} />
));
add('So there are really two businesses', card({id: 'p3-two', apoio: 'The free one, paid by stores. The paid one, paid by borrowers.', hero: 'TWO BUSINESSES', textSide: 'center', object: 'none', heroSize: 140, heroUnderline: true}));
add('Quick thing', (s) => (
	<SubscribeShot2 id="p3-sub" start={s} free="It's free." line1="And you can pay for it in four installments…" line2="of zero."
		at={{ask: s + 4, tap: c.f('subscribe'), free: c.f("It's free"), line1: c.f('And you can pay'), line2: c.f('of zero')}} />
));

// ---------------- Parte 4 — The People Who Pay Late (azul-marinho) ----------------
add('Part 4', card({id: 'p4-title', apoio: 'Part 4', hero: 'THE PEOPLE WHO PAY LATE', textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true, dark: true}));
add('Now, the obvious suspect', card({id: 'p4-suspect', apoio: 'The obvious suspect. Typical late fees in 2021:', hero: '$7–8', complemento: 'some companies charge none', textSide: 'left', object: 'none', heroSize: 200, dark: true}));
add('You might think late fees', (s) => (
	<StatsShot id="p4-late" start={s} title="Late fees, six big providers, 2023 (CFPB)" titleAt={s + 4} source="Source: CFPB data spotlight (2025), via JD Supra"
		items={[
			{value: '~4%', label: 'of loans charged a late fee', at: c.f('four percent')},
			{value: '0.18%', label: 'of the money that went through them', at: c.f('one fifth of one percent')},
		]} />
));
add('So late fees aren\'t where the money is', photo('p4-bills', {tone: 'navy', apoio: 'Paid late at least once in the past year (LendingTree, 2026):', hero: '47%', complemento: 'most only a few days behind'}));
add('The bigger worry is something critics', photo('p4-apps', {tone: 'navy', apoio: 'Several small plans, different apps, invisible to lenders:', hero: 'PHANTOM DEBT'}));
add('That\'s starting to change', card({id: 'p4-fico', apoio: '2025: FICO launches scores that include', hero: 'BNPL DATA', complemento: 'on time can help; late can hurt', textSide: 'right', object: 'chart', heroSize: 160, dark: true}));
add('To be fair, there\'s another side', card({id: 'p4-fair', apoio: 'Paid on time, pay in four can cost nothing. The risk:', hero: 'HOW EASY IT IS TO SAY YES', textSide: 'center', object: 'none', heroSize: 100, heroUnderline: true}));

// ---------------- Parte 5 — Rules That Came and Went ----------------
add('Part 5', card({id: 'p5-title', apoio: 'Part 5', hero: 'RULES THAT CAME AND WENT', textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true}));
add('For years, buy now, pay later lived', (s) => (
	<TimelineShot id="p5-rules" start={s} title="The rules" source="Sources: CFPB; Orrick; FCA (via Finance Magnates)"
		events={[
			{year: 'MAY 2024', label: 'U.S.: CFPB treats it like a credit card', at: c.f('In May 2024')},
			{year: 'MAY 2025', label: 'U.S.: rule withdrawn', at: c.f('A year later')},
			{year: 'JUL 2026', label: 'UK: FCA regulation, affordability checks', at: c.f('July 15, 2026'), gold: true},
		]} />
));
add('They also have to give clearer information', photo('p5-capitol', {apoio: 'Same button, different protections:', hero: 'LONDON ≠ NEW YORK', complemento: 'UK market: ~£13 billion in 2024'}));
add('Meanwhile, the business kept changing', card({id: 'p5-apple', apoio: 'Even Apple tried it: Apple Pay Later, 2023.', hero: 'SHUT DOWN', complemento: 'about a year later', textSide: 'left', object: 'none', heroSize: 170}));
add('In 2021, at the height of the boom', (s) => (
	<BarsShot id="p5-klarna" start={s} title="Klarna's valuation" titleAt={s + 4} source="Sources: Morningstar; AP"
		bars={[
			{label: '2021 PEAK', value: 45, display: '$45B+', at: c.f('forty-five billion')},
			{label: 'IPO, SEPT. 2025', value: 15, display: '~$15B', at: c.f('about fifteen billion'), highlight: true},
		]} />
));
add('Investors had learned something', photo('p5-nyse', {apoio: 'Free lending is great at zero rates. When rates rise,', hero: 'THE FEE MUST COVER MORE'}));

// ---------------- Parte 6 — So, Who Pays? ----------------
add('Part 6', card({id: 'p6-title', apoio: 'Part 6', hero: 'SO, WHO PAYS?', textSide: 'center', object: 'none', heroSize: 170, heroUnderline: true}));
add('Let\'s go back to our four-hundred-dollar', (s) => (
	<DocLinesShot id="p6-who" start={s} title="The $400 jacket: who pays" titleAt={s + 4}
		lines={[
			{label: 'You', value: '$400, if on time', at: c.f('Not a cent more')},
			{label: 'The store (and its prices)', value: '~$10 fee', at: c.f('The store pays a fee'), highlight: true},
			{label: 'Banks, investors, savers', value: 'paid back with interest', at: c.f('Banks, investors')},
			{label: 'Late payers', value: 'less than you think', at: c.f('some shoppers pay late')},
		]} />
));
add('The real money is on the other side', photo('p6-mall', {apoio: 'The longer loans, and the next "yes".', hero: 'THE REAL MONEY'}));
add('So, who pays when you buy now', card({id: 'p6-answer', apoio: 'Mostly, the store. And through the store,', hero: 'EVERYONE WHO SHOPS THERE', textSide: 'center', object: 'none', heroSize: 105, heroUnderline: true}));
add('Is that a bad deal', card({id: 'p6-deal', apoio: 'For a careful shopper: a free short loan. The trouble:', hero: '12 PAYMENTS, 5 APPS', complemento: 'and nobody keeping count', textSide: 'left', object: 'none', heroSize: 120}));
add('Buy now, pay later doesn\'t make things cheaper', card({id: 'p6-final', apoio: "It doesn't make things cheaper.", hero: 'IT MAKES THEM EASIER TO BUY', textSide: 'center', object: 'none', heroSize: 100, heroUnderline: true, dark: true}));

// ---------------- Fechamento ----------------
add('Next time', photo('c-munich', {tone: 'navy', apoio: 'Next: a fortune of ~$20 billion', hero: 'GONE IN 2 DAYS'}));
add('And if you want the other side', (s) => (
	<SisterShot id="c-sister" start={s} at={{ships: c.f('the ships'), planes: c.f('planes'), rockets: c.f('rockets'), name: c.f('Cargo and Capital')}} />
));
add('This is Billions and Bulls. This video', (s) => (
	<EndShot id="c-end" start={s} at={{sign: s + 4, disclaimer: c.f('This video explains'), subscribe: c.f('Subscribe'), endscreen: c.f('following the money') + 40}} />
));

export const Ep06 = () => <E.Episode voice="audio/ep06-voice.wav" music={(timeline as Timeline).provisional ? undefined : 'audio/ep06-spark.wav'} />;
export const EP06_FRAMES = E.frames;
