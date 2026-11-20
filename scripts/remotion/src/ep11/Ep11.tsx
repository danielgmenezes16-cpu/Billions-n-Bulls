import React from 'react';
import {makeEpisode} from '../epkit/build';
import {CounterShot, DocLinesShot, RouteShot2, SubscribeShot2, TimelineShot} from '../epkit/shots';
import {BarsShot, StatsShot} from '../shots/partA';
import {EndShot, SisterShot} from '../shots/partC';
import credits from './creditos.json';
import timeline from './timeline.json';
import type {Timeline} from '../epkit/cues';
import type {Credit} from '../epkit/build';

// Episódio 11 — "Why Google Lost $500 Billion in One Day"
// Cada cena começa numa frase do roteiro (roteiros/rascunhos/fonte/ep11-roteiro.txt). Parte 3 em azul-marinho (os gastos).
// Sem logos: Google, Alphabet, Nvidia, Caterpillar e JPMorgan só em texto. Texto dos cards na ordem da narração (checar_cenas.py).

const E = makeEpisode(timeline as Timeline, credits as Record<string, Credit>);
const {c, add, card, photo} = E;

const ALPHA = 'Source: Alphabet, third-quarter 2026 results';

// ---------------- Abertura ----------------
add('Why Google Lost', card({id: 'o-title', apoio: 'Why Google lost', hero: '$500 BILLION', complemento: 'in one day', textSide: 'left', object: 'coin', heroSize: 141, heroUnderline: true, objectSlide: true}));
add('October 29, 2026', photo('o-trading', {apoio: 'October 29, 2026. Alphabet, the company behind Google and YouTube:', hero: '−12.6% IN A DAY', complemento: 'its worst day in more than 20 years as a public company'}));
add('Around five hundred billion dollars', (s) => (
	<CounterShot id="o-500" start={s} label="Alphabet market value lost on October 29, 2026" labelAt={s + 4} from={0} to={500} countAt={c.f('five hundred billion')} prefix="~$" suffix="B" sub="one of the biggest one-day losses ever" subAt={c.f('One of the biggest')} source="Sources: NBC News; Fortune/AP" />
));
add('And here\'s the strange part', card({id: 'o-strange', apoio: 'The night before, Google reported its revenue grew', hero: '25%', complemento: 'people were searching more than ever', textSide: 'center', object: 'none', heroSize: 220, heroUnderline: true}));
add('So what were investors so afraid of', card({id: 'o-question', apoio: 'What were investors so afraid of? Follow', hero: 'THE MONEY GOOGLE MAKES', complemento: "and the money it's spending", textSide: 'center', object: 'none', heroSize: 105, heroUnderline: true}));
add('This is Billions and Bulls', card({id: 'o-brand', apoio: 'This is Billions & Bulls.', hero: "LET'S FOLLOW THE MONEY", textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true}));

// ---------------- Parte 1 — The Money Machine ----------------
add('Part 1', card({id: 'p1-title', apoio: 'Part 1', hero: 'THE MONEY MACHINE', textSide: 'center', object: 'none', heroSize: 130, heroUnderline: true}));
add('For twenty-five years, Google has run', card({id: 'p1-machine', apoio: 'For 25 years, one of the most profitable businesses', hero: 'EVER BUILT', complemento: 'and it works like this', textSide: 'center', object: 'none', heroSize: 170, heroUnderline: true}));
add('You type a question', photo('p1-typing', {apoio: 'You type a question. Next to some answers: ads. Advertisers pay', hero: 'WHEN PEOPLE CLICK', complemento: 'not when they see the ad'}));
add('In the third quarter of 2026', (s) => (
	<BarsShot id="p1-q3" start={s} horizontal title="Google's third quarter of 2026" titleAt={s + 4} source={ALPHA}
		bars={[
			{label: 'TOTAL REVENUE', value: 127.6, display: '$127.6B', at: c.f('one hundred twenty-eight billion')},
			{label: 'ADS', value: 82.0, display: '$82.0B', at: c.f('eighty-two billion'), highlight: true},
			{label: 'SEARCH ALONE', value: 63.35, display: '$63.4B', at: c.f('about sixty-three billion')},
		]} />
));
add('A year earlier, search had brought in', (s) => (
	<BarsShot id="p1-growth" start={s} title="Search revenue, third quarter" titleAt={s + 4} source={ALPHA} note={{text: '+12%', at: c.f('about twelve percent')}}
		bars={[
			{label: '2025', value: 56.57, display: '$56.6B', at: c.f('fifty-six and a half')},
			{label: '2026', value: 63.35, display: '$63.4B', at: c.f('So it was still growing'), highlight: true},
		]} />
));
add('To keep that machine running', (s) => (
	<DocLinesShot id="p1-tac" start={s} title="Paying for searches: traffic acquisition costs" titleAt={s + 4} source="Sources: Alphabet; US antitrust case documents (via Bloomberg)"
		lines={[
			{label: 'Paid to', value: 'phone makers, browsers, websites', at: c.f('Phone makers')},
			{label: 'Last quarter', value: '~$16 billion', at: c.f('about sixteen billion'), highlight: true},
			{label: 'Apple alone, 2022', value: '~$20 billion a year', at: c.f('Apple alone')},
		]} />
));
add('Think about that', card({id: 'p1-deal', apoio: '$20 billion a year to one partner, and still make', hero: 'ENORMOUS PROFITS', complemento: 'because each search was so valuable', textSide: 'center', object: 'none', heroSize: 130, heroUnderline: true}));
add('For decades, that was the deal', (s) => (
	<RouteShot2 id="p1-loop" start={s} goAt={c.f('More clicks meant')} stamp={{text: 'THE DEAL', at: c.f('more money')}}
		nodes={[
			{name: 'SEARCHES', at: c.f('More searches')},
			{name: 'CLICKS', at: c.f('meant more clicks')},
			{name: 'MONEY', at: c.f('meant more money')},
		]} />
));
add('But in October 2026, that link', card({id: 'p1-broken', apoio: 'But in October 2026, that link started to look', hero: 'BROKEN', textSide: 'center', object: 'none', heroSize: 200, heroUnderline: true}));

// ---------------- Parte 2 — The Number That Missed ----------------
add('Part 2', card({id: 'p2-title', apoio: 'Part 2', hero: 'THE NUMBER THAT MISSED', textSide: 'center', object: 'none', heroSize: 115, heroUnderline: true}));
add('On paper, the quarter looked great', (s) => (
	<DocLinesShot id="p2-paper" start={s} title="On paper, a great quarter" titleAt={s + 4} source={ALPHA}
		lines={[
			{label: 'Revenue', value: '+25%', at: c.f('Revenue up twenty-five')},
			{label: 'Number of searches', value: 'fastest growth in five years', at: c.f('number of searches')},
		]} />
));
add('But Wall Street looked at one line first', (s) => (
	<BarsShot id="p2-miss" start={s} title="Search revenue, third quarter of 2026" titleAt={s + 4} source="Sources: Alphabet; analyst estimates (Investing.com)" note={{text: '+0.1% vs. Q2', at: c.f('one tenth of one percent')}}
		bars={[
			{label: 'EXPECTED', value: 64.85, display: '$64.85B', at: c.f('Analysts had expected')},
			{label: 'ACTUAL', value: 63.35, display: '$63.35B', at: c.f('sixty-three point three five'), highlight: true},
		]} />
));
add('Why does missing an estimate', card({id: 'p2-bet', apoio: "A share price isn't a reward for what a company earned. It's", hero: 'A BET ON WHAT IT WILL EARN', textSide: 'center', object: 'none', heroSize: 90, heroUnderline: true}));
add('The estimates are what investors', card({id: 'p2-adjust', apoio: 'When the real number comes in lower,', hero: 'THE PRICE ADJUSTS', complemento: 'it adjusts a lot', textSide: 'center', object: 'none', heroSize: 130, heroUnderline: true}));
add('So, more searches', card({id: 'p2-how', apoio: 'More searches. But almost no growth in search money.', hero: 'HOW?', complemento: 'Part of the answer came from Google itself', textSide: 'center', object: 'none', heroSize: 220, heroUnderline: true}));
add('On the call with investors', card({id: 'p2-aimode', apoio: 'On the call: one reason search ad revenue lagged was', hero: "GOOGLE'S OWN AI MODE", complemento: 'it was showing fewer ads', textSide: 'center', object: 'none', heroSize: 115, heroUnderline: true}));
add('Here\'s the problem in plain terms', (s) => (
	<DocLinesShot id="p2-oldnew" start={s} title="The old Google and the new Google" titleAt={s + 4}
		lines={[
			{label: 'Old: ten links, ads next to them', value: 'every click earns money', at: c.f('ten links')},
			{label: 'New: the answer right away', value: 'less to sell', at: c.f('gives you the answer'), highlight: true},
		]} />
));
add('Analysts at JPMorgan wrote', card({id: 'p2-own', apoio: 'In other words, Google is now competing with', hero: 'ITS OWN BEST PRODUCT', complemento: 'and the old product is the one that pays the bills', textSide: 'center', object: 'none', heroSize: 115, heroUnderline: true}));

// ---------------- Parte 3 — The $200 Billion Shopping List (azul-marinho) ----------------
add('Part 3', card({id: 'p3-title', apoio: 'Part 3', hero: 'THE $200 BILLION SHOPPING LIST', textSide: 'center', object: 'none', heroSize: 95, heroUnderline: true, dark: true}));
add('If the money coming in was the first worry', card({id: 'p3-out', apoio: 'If the money coming in was the first worry,', hero: 'THE MONEY GOING OUT', complemento: 'was the second', textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true, dark: true}));
add('Artificial intelligence needs data centers', photo('p3-datacenter', {tone: 'navy', apoio: 'Huge buildings full of chips, cooling systems and power lines.', hero: 'AI NEEDS DATA CENTERS'}));
add('In the third quarter alone', (s) => (
	<CounterShot id="p3-51" start={s} dark label="Alphabet spending on property and equipment, Q3 2026" labelAt={s + 4} from={0} to={51} countAt={c.f('fifty-one billion')} prefix="~$" suffix="B" sub="mostly for AI" subAt={c.f('Mostly for AI')} source={ALPHA} />
));
add('For the full year 2026', (s) => (
	<TimelineShot id="p3-capex" start={s} dark title="Alphabet's spending on buildings and chips" source="Sources: Alphabet; Investing.com"
		events={[
			{year: '2025', label: 'Less than half of 2026', at: c.f('More than double')},
			{year: '2026', label: '$195 to $205 billion', at: c.f('one hundred ninety-five'), gold: true},
			{year: '2027', label: '"Significantly" more', at: c.f('rise significantly')},
		]} />
));
add('To put that in perspective', card({id: 'p3-2019', apoio: "Two hundred billion is more than Google's entire revenue in", hero: '2019', complemento: 'about $162 billion', textSide: 'center', object: 'none', heroSize: 220, heroUnderline: true, dark: true}));
add('On top of that, it disclosed', card({id: 'p3-trillion', apoio: 'On top of that, it disclosed more than', hero: '$1 TRILLION', complemento: 'in multi-year commitments for infrastructure, energy and leases', textSide: 'center', object: 'none', heroSize: 170, heroUnderline: true, dark: true}));
add('Now look at what that does to the cash', (s) => (
	<DocLinesShot id="p3-fcf" start={s} dark title="Free cash flow: roughly, the money left over" titleAt={s + 4} source={ALPHA}
		lines={[
			{label: 'Third quarter of 2025', value: '+$24.5 billion', at: c.f('twenty-four and a half')},
			{label: 'Third quarter of 2026', value: '−$9 billion', at: c.f('Minus nine billion'), highlight: true},
			{label: 'Negative quarters in a row', value: '2', at: c.f('The second negative')},
		]} />
));
add('One of the most profitable companies in history', card({id: 'p3-spending', apoio: 'One of the most profitable companies in history was', hero: 'SPENDING MORE CASH', complemento: 'than it was bringing in', textSide: 'center', object: 'none', heroSize: 130, heroUnderline: true, dark: true}));
add('If you\'re enjoying the story so far', (s) => (
	<SubscribeShot2 id="p3-sub" start={s} dark free="It's free." line1="No data center required." line2="Just one click."
		at={{ask: s + 4, tap: c.f('subscribing helps'), free: c.f('Because next'), line1: c.f('where Google is getting'), line2: c.f('to pay for all this')}} />
));

// ---------------- Parte 4 — Borrowing to Build ----------------
add('Part 4', card({id: 'p4-title', apoio: 'Part 4', hero: 'BORROWING TO BUILD', textSide: 'center', object: 'none', heroSize: 130, heroUnderline: true}));
add('When a company spends more cash than it makes', card({id: 'p4-where', apoio: 'Spending more cash than it makes? The money has to come', hero: 'FROM SOMEWHERE', textSide: 'center', object: 'none', heroSize: 150, heroUnderline: true}));
add('In the third quarter, Alphabet sold bonds', (s) => (
	<StatsShot id="p4-raise" start={s} title="Where the money came from, third quarter" titleAt={s + 4} source={ALPHA}
		items={[
			{value: '$28.7B', label: 'in bonds: borrowing', at: c.f('twenty-eight point seven')},
			{value: '~$12B', label: 'in new shares, sold gradually', at: c.f('About twelve billion')},
		]} />
));
add('For years, Google did the opposite', (s) => (
	<BarsShot id="p4-buyback" start={s} horizontal title="Buying back shares, then selling new ones" titleAt={s + 4} source="Sources: Alphabet 2025 annual report; third-quarter 2026 results"
		bars={[
			{label: 'BUYBACKS, 2025', value: 45.4, display: '~$45B', at: c.f('forty-five billion')},
			{label: 'NEW SHARES, Q3', value: 12.4, display: '~$12B', at: c.f('Selling new shares'), highlight: true},
		]} />
));
add('So in about a year', card({id: 'p4-flip', apoio: 'In about a year: from handing cash back to shareholders, to', hero: 'ASKING FOR MORE', textSide: 'center', object: 'none', heroSize: 150, heroUnderline: true}));
add('None of this is illegal or unusual', (s) => (
	<DocLinesShot id="p4-rates" start={s} title="Borrowing isn't free" titleAt={s + 4} source="Source: Fortune/AP"
		lines={[
			{label: 'Illegal or unusual?', value: 'no', at: c.f('illegal or unusual')},
			{label: 'Bonds', value: 'paid back, with interest', at: c.f('Bonds have to be paid')},
			{label: '10-year Treasury', value: 'above 5%, highest since 2002', at: c.f('above five percent'), highlight: true},
		]} />
));
add('So the question investors ask has changed', card({id: 'p4-question', apoio: "No longer, how much cash will Google return? It's", hero: 'WHEN WILL ALL THIS PAY OFF?', textSide: 'center', object: 'none', heroSize: 95, heroUnderline: true}));

// ---------------- Parte 5 — Who Fell With It ----------------
add('Part 5', card({id: 'p5-title', apoio: 'Part 5', hero: 'WHO FELL WITH IT', textSide: 'center', object: 'none', heroSize: 140, heroUnderline: true}));
add('When Alphabet fell, it didn\'t fall alone', card({id: 'p5-alone', apoio: 'When Alphabet fell,', hero: "IT DIDN'T FALL ALONE", textSide: 'center', object: 'none', heroSize: 130, heroUnderline: true}));
add('Companies that sell equipment for data centers', photo('p5-wafer', {apoio: 'Data center suppliers dropped too. Caterpillar fell about 9% in early trading, and', hero: 'CHIP STOCKS SLID'}));
add('Because if the biggest buyer', card({id: 'p5-nervous', apoio: 'If the biggest buyer looks nervous about spending,', hero: 'EVERYONE WHO SELLS TO IT', complemento: 'gets nervous too', textSide: 'center', object: 'none', heroSize: 100, heroUnderline: true}));
add('Only one company had ever lost more value', (s) => (
	<BarsShot id="p5-record" start={s} horizontal title="Biggest one-day losses of market value" titleAt={s + 4} source="Sources: Bloomberg; NBC News" note={{text: 'SAME QUESTION', at: c.f('the same question')}}
		bars={[
			{label: 'NVIDIA, JAN 2025', value: 589, display: '~$589B', at: c.f('five hundred eighty-nine')},
			{label: 'ALPHABET, OCT 2026', value: 500, display: '~$500B', at: c.f('The two biggest'), highlight: true},
		]} />
));
add('And here\'s a detail that shows how big', card({id: 'p5-index', apoio: '4 out of 5 S&P 500 stocks went up. The index still', hero: 'CLOSED LOWER', complemento: 'mostly because of one company', textSide: 'center', object: 'none', heroSize: 150, heroUnderline: true}));
add('But there\'s another side, and it\'s important', (s) => (
	<StatsShot id="p5-other" start={s} title="The other side" titleAt={s + 4} source="Sources: Alphabet; NBC News"
		items={[
			{value: '$3T+', label: 'still worth, after the fall', at: c.f('more than three trillion')},
			{value: '$30.7B', label: 'cloud revenue, more than doubled', at: c.f('thirty point seven')},
			{value: '1B', label: 'users of its Gemini AI app', at: c.f('one billion users')},
		]} />
));
add('So the AI money is real', card({id: 'p5-door', apoio: 'So the AI money is real. Some is already coming in,', hero: 'THROUGH A DIFFERENT DOOR', complemento: 'than search ads', textSide: 'center', object: 'none', heroSize: 100, heroUnderline: true}));
add('And it was also part of a bigger pattern', card({id: 'p5-pattern', apoio: 'Same day: the first New York Times report about', hero: "NVIDIA'S CHIEF EXECUTIVE", complemento: 'the story of a recent episode', textSide: 'center', object: 'none', heroSize: 100, heroUnderline: true}));

// ---------------- Parte 6 — So, Why Did Google Lose $500 Billion? ----------------
add('Part 6', card({id: 'p6-title', apoio: 'Part 6', hero: 'WHY DID GOOGLE LOSE $500B?', textSide: 'center', object: 'none', heroSize: 95, heroUnderline: true}));
add('So let\'s put it together', (s) => (
	<DocLinesShot id="p6-score" start={s} title="Google, October 2026" titleAt={s + 4} source={ALPHA}
		lines={[
			{label: 'Revenue', value: '+25%', at: c.f('Revenue grew twenty-five')},
			{label: 'Profit in three months', value: '~$26 billion', at: c.f('twenty-six billion')},
			{label: 'What changed', value: 'the guess about the future', at: c.f('changed their guess'), highlight: true},
		]} />
));
add('On one side, the old money machine', (s) => (
	<DocLinesShot id="p6-machines" start={s} title="The old machine and the new one" titleAt={s + 4}
		lines={[
			{label: 'Search ads', value: 'stopped growing', at: c.f('stopped growing')},
			{label: 'Partly because', value: 'AI answers without a click', at: c.f('without the need to click')},
			{label: 'The new machine', value: '~$200 billion a year to build', at: c.f('two hundred billion dollars a year'), highlight: true},
			{label: 'Paid with', value: 'borrowing and new shares', at: c.f('borrowing and selling shares')},
		]} />
));
add('Maybe it works', card({id: 'p6-maybe', apoio: 'Maybe it works. Maybe AI earns more than search ever did.', hero: 'INVESTORS WANTED PROOF', complemento: 'and took half a trillion off the table', textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true}));
add('For twenty-five years, Google got paid', card({id: 'p6-final', apoio: 'For 25 years, Google got paid every time you kept looking.', hero: "ITS NEW AI: YOU DON'T HAVE TO", textSide: 'center', object: 'none', heroSize: 90, heroUnderline: true, dark: true}));

// ---------------- Fechamento ----------------
add('Next time', photo('p6-night', {id: 'c-next', tone: 'navy', apoio: 'Next: one of the biggest stock market debuts ever.', hero: 'WHO GETS RICH?'}));
add('And if you want the other side', (s) => (
	<SisterShot id="c-sister" start={s} at={{ships: c.f('the ships'), planes: c.f('planes'), rockets: c.f('rockets'), name: c.f('Cargo and Capital')}} />
));
add('This is Billions and Bulls. This video', (s) => (
	<EndShot id="c-end" start={s} at={{sign: s + 4, disclaimer: c.f('This video explains'), subscribe: c.f('Subscribe'), endscreen: c.f('following the money') + 40}} />
));

export const Ep11 = () => <E.Episode voice="audio/ep11-voice.wav" music={(timeline as Timeline).provisional ? undefined : 'audio/ep11-heist.wav'} />;
export const EP11_FRAMES = E.frames;
