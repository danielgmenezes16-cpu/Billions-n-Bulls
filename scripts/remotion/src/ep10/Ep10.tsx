import React from 'react';
import {makeEpisode} from '../epkit/build';
import {CounterShot, DocLinesShot, RouteShot2, SplitShot, SubscribeShot2, TimelineShot} from '../epkit/shots';
import {BarsShot, StatsShot} from '../shots/partA';
import {EndShot, SisterShot} from '../shots/partC';
import credits from './creditos.json';
import timeline from './timeline.json';
import type {Timeline} from '../epkit/cues';
import type {Credit} from '../epkit/build';

// Episódio 10 — "Who Gets Rich When You Buy GTA 6?"
// Cada cena começa numa frase do roteiro (roteiros/rascunhos/fonte/ep10-roteiro.txt). Parte 5 em azul-marinho.
// Nada de arte, logo, trailer ou captura do jogo (Content ID e regra de logos): o jogo só aparece como nome em texto.

const E = makeEpisode(timeline as Timeline, credits as Record<string, Credit>);
const {c, add, card, photo} = E;

const TOTO = 'Typical split: Serkan Toto (industry consultant). Our calculation on $80.';
const TT = 'Source: Take-Two (proxy statement, earnings releases)';

// ---------------- Abertura ----------------
add('Who Gets Rich When You', card({id: 'o-title', apoio: 'When you buy GTA 6,', hero: 'WHO GETS RICH?', textSide: 'left', object: 'coin', heroSize: 121, heroUnderline: true, objectSlide: true}));
add('November 19, 2026', photo('o-controller', {apoio: 'November 19, 2026. After 13 years and two delays:', hero: 'GTA 6 IS OUT'}));
add('The standard edition costs', card({id: 'o-price', apoio: 'Standard edition:', hero: '$79.99', complemento: '$10 above the usual big-game price', textSide: 'right', object: 'coin', heroSize: 200}));
add('The last one in the series', card({id: 'o-gta5', apoio: 'GTA V, first day, 2013:', hero: '$815.7 MILLION', complemento: 'a record', textSide: 'left', object: 'chart', heroSize: 140}));
add('So this time, millions', (s) => (
	<DocLinesShot id="o-who" start={s} title="Millions of people, $80 each. Who ends up with it?" titleAt={s + 4}
		lines={[
			{label: 'The company that made the game?', at: c.f('The company that made the game')},
			{label: 'The console in your living room?', at: c.f('The console in your living room')},
			{label: 'The store?', at: c.f('The store')},
			{label: "Someone you'd never expect?", at: c.f("someone you'd never expect"), highlight: true},
		]} />
));
add('This is Billions and Bulls', card({id: 'o-brand', apoio: 'This is Billions & Bulls.', hero: "LET'S FOLLOW THE MONEY", textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true}));

// ---------------- Parte 1 — Thirteen Years and Eighty Dollars ----------------
add('Part 1', card({id: 'p1-title', apoio: 'Part 1', hero: 'THIRTEEN YEARS AND EIGHTY DOLLARS', textSide: 'center', object: 'none', heroSize: 100, heroUnderline: true}));
add('To understand the money in this game', card({id: 'p1-last', apoio: 'To understand this game,', hero: 'START WITH THE LAST ONE', textSide: 'center', object: 'none', heroSize: 110}));
add('Grand Theft Auto Five came out', (s) => (
	<CounterShot id="p1-units" start={s} label="GTA V copies sold to date (shipped + digital)" labelAt={s + 4} from={0} to={230} countAt={c.f('two hundred thirty million')} suffix="M" sub="Across three console generations and PC" subAt={c.f('across three generations')} source={TT} />
));
add('It also set records nobody', (s) => (
	<StatsShot id="p1-records" start={s} title="GTA V's launch records" titleAt={s + 4} source="Source: Guinness World Records (2013)"
		items={[
			{value: '$815.7M', label: 'first 24 hours', at: c.f('Eight hundred fifteen point seven')},
			{value: '$1B', label: 'in three days: faster than any movie, album or game', at: c.f('One billion dollars in three days')},
		]} />
));
add('So expectations for the sequel', (s) => (
	<DocLinesShot id="p1-expect" start={s} title="Expectations for the sequel" titleAt={s + 4} source="Sources: Take-Two (Nov. 2026); Wells Fargo estimate, as reported"
		lines={[
			{label: 'Pre-orders', value: '"far in excess" of expectations', at: c.f('far in excess')},
			{label: 'Take-Two sales, fiscal year', value: '~$8 billion', at: c.f('eight billion dollars'), highlight: true},
			{label: 'Wells Fargo estimate, same year', value: '~65 million copies', at: c.f('sixty-five million copies')},
		]} />
));
add('And then there\'s the price', (s) => (
	<BarsShot id="p1-price" start={s} title="Price of a big new console game" titleAt={s + 4} source="Sources: Take-Two; industry pricing"
		bars={[
			{label: 'THE OLD CEILING', value: 70, display: '$70', at: c.f('seventy dollars was the ceiling')},
			{label: 'GTA 6', value: 80, display: '$80', at: c.f('starts at eighty'), highlight: true},
			{label: 'ULTIMATE', value: 100, display: '$100', at: c.f('costs one hundred')},
		]} />
));
add('It\'s also a test for the whole industry', card({id: 'p1-test', apoio: 'A price ceiling, once broken,', hero: 'RARELY GOES BACK DOWN', textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true}));
add('Now, let\'s take one of those', card({id: 'p1-follow', apoio: 'One $80 copy. The moment you click buy,', hero: 'THAT MONEY SPLITS UP', textSide: 'center', object: 'none', heroSize: 110}));

// ---------------- Parte 2 — The Console's Cut ----------------
add('Part 2', card({id: 'p2-title', apoio: 'Part 2', hero: "THE CONSOLE'S CUT", textSide: 'center', object: 'none', heroSize: 150, heroUnderline: true}));
add('Let\'s say you buy the game digitally', card({id: 'p2-digital', apoio: 'You buy the game digitally, from the store on your', hero: 'PLAYSTATION OR XBOX', textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true}));
add('The first slice goes to the company', (s) => (
	<SplitShot id="p2-cut" start={s} title="One digital copy, $80" titleAt={s + 4} total={80} totalLabel="$80" source={TOTO}
		pieces={[
			{value: 24, label: 'CONSOLE STORE (~30%)', display: '$24', at: c.f('about twenty-four dollars'), highlight: true},
			{value: 56, label: 'PUBLISHER', display: '$56', at: c.f('Before the publisher')},
		]} />
));
add('Why so much', card({id: 'p2-printer', apoio: 'Consoles work like printers: the machine is sold near cost.', hero: 'THE GAMES PAY THE TOLL', textSide: 'center', object: 'none', heroSize: 110}));
add('The cut also pays for the store itself', photo('p2-servers', {apoio: 'The cut also pays for servers, payments, refunds and fraud checks:', hero: 'THE STORE ITSELF'}));
add('Microsoft has looked at lowering', (s) => (
	<TimelineShot id="p2-ms" start={s} title="Lowering the toll?" source="Source: Windows Central (internal documents)"
		events={[
			{year: '30%', label: 'Standard console store cut', at: s + 4},
			{year: '12%', label: 'Microsoft once considered it', at: c.f('twelve percent')},
			{year: 'XBOX', label: "Spokesperson: won't happen on console", at: c.f('A spokesperson later said'), gold: true},
		]} />
));
add('And since Grand Theft Auto Six is only on consoles', card({id: 'p2-only', apoio: 'No PC version at launch. Every digital copy goes through', hero: 'ONE OF TWO STORES', textSide: 'center', object: 'none', heroSize: 120}));
add('So for each digital copy', card({id: 'p2-billions', apoio: 'If tens of millions buy digitally, the console makers earn', hero: 'BILLIONS', complemento: "from a game they didn't make", textSide: 'center', object: 'none', heroSize: 170, heroUnderline: true}));

// ---------------- Parte 3 — The Box on the Shelf ----------------
add('Part 3', card({id: 'p3-title', apoio: 'Part 3', hero: 'THE BOX ON THE SHELF', textSide: 'center', object: 'none', heroSize: 140, heroUnderline: true}));
add('Now let\'s say you buy a physical copy', photo('p3-shop', {apoio: 'A physical copy, at a store. Nobody publishes the split, but', hero: 'A TYPICAL EXAMPLE'}));
add('The store keeps around thirty percent', (s) => (
	<SplitShot id="p3-split" start={s} title="One physical copy, $80 (typical split)" titleAt={s + 4} total={80} totalLabel="$80" source={TOTO}
		pieces={[
			{value: 24, label: 'STORE (~30%)', display: '$24', at: c.f('The store keeps')},
			{value: 12, label: 'CONSOLE LICENSE (~15%)', display: '$12', at: c.f('Around fifteen percent')},
			{value: 4, label: 'THE BOX (~5%)', display: '$4', at: c.f('about five percent')},
			{value: 40, label: 'PUBLISHER', display: '~$40', at: c.f('keeps around forty dollars'), highlight: true},
		]} />
));
add('That gap helps explain', (s) => (
	<BarsShot id="p3-gap" start={s} title="What the publisher keeps from $80" titleAt={s + 4} source={TOTO}
		bars={[
			{label: 'PHYSICAL', value: 40, display: '~$40', at: s + 6},
			{label: 'DIGITAL', value: 56, display: '~$56', at: c.f('love digital sales'), highlight: true},
		]} />
));
add('And on top of the eighty dollars', card({id: 'p3-tax', apoio: 'On top of the $80: sales tax, or VAT in Europe.', hero: 'THE GOVERNMENT, FIRST', textSide: 'center', object: 'none', heroSize: 130}));
add('If you\'re enjoying the story so far', (s) => (
	<SubscribeShot2 id="p3-sub" start={s} free="It's free." line1="No pre-order needed." line2="No $80 edition."
		at={{ask: s + 4, tap: c.f('subscribing helps'), free: c.f('Because next'), line1: c.f('into Take-Two'), line2: c.f('The British tax system')}} />
));

// ---------------- Parte 4 — Inside Take-Two ----------------
add('Part 4', card({id: 'p4-title', apoio: 'Part 4', hero: 'INSIDE TAKE-TWO', textSide: 'center', object: 'none', heroSize: 160, heroUnderline: true}));
add('So Take-Two ends up with', card({id: 'p4-profit', apoio: 'Take-Two ends up with $40–$56 per copy. Is that profit?', hero: 'NOT EVEN CLOSE', textSide: 'center', object: 'none', heroSize: 140, heroUnderline: true}));
add('First, that money has to pay for the game itself', photo('p4-devs', {apoio: 'Years of development, in studios across several countries. Cost of GTA 6:', hero: 'NEVER DISCLOSED'}));
add('For comparison, Grand Theft Auto Five', card({id: 'p4-cost', apoio: 'GTA V development cost, reportedly:', hero: '~$137 MILLION', complemento: 'GTA 6: widely expected to cost far more', textSide: 'center', object: 'none', heroSize: 140}));
add('Then there\'s marketing', (s) => (
	<DocLinesShot id="p4-costs" start={s} title="What the publisher's share still has to pay for" titleAt={s + 4}
		lines={[
			{label: 'Years of development', at: s + 4},
			{label: 'Marketing', at: c.f('marketing')},
			{label: 'Servers and customer support', at: c.f('servers')},
			{label: 'Years of updates', at: c.f('keep updating'), highlight: true},
		]} />
));
add('And here\'s a detail that shows', (s) => (
	<StatsShot id="p4-quarter" start={s} title="Take-Two, the quarter before launch" titleAt={s + 4} source="Source: Take-Two Q2 fiscal 2027 (via Yahoo Finance)"
		items={[
			{value: '−$54M', label: 'net loss', at: c.f('Fifty-four million dollars')},
			{value: '+8%', label: 'shares, the next morning', at: c.f('more than eight percent')},
		]} />
));
add('So in a sense, the eighty dollars', photo('p4-money', {apoio: "Your $80 isn't just buying a game. It's paying back", hero: 'YEARS OF SPENDING'}));
add('And it\'s worth knowing where', (s) => (
	<SplitShot id="p4-rcs" start={s} title="Take-Two sales, last full fiscal year" titleAt={s + 4} total={100} totalLabel="100%" source="Source: Take-Two fiscal 2026 results (via Benzinga)"
		pieces={[
			{value: 78, label: 'SPENT AFTER THE GAME IS BOUGHT', display: '78%', at: c.f('seventy-eight percent'), highlight: true},
			{value: 22, label: 'EVERYTHING ELSE', display: '22%', at: c.f('in-game currency')},
		]} />
));

// ---------------- Parte 5 — The British Taxpayer's Share (azul-marinho) ----------------
add('Part 5', card({id: 'p5-title', apoio: 'Part 5', hero: "THE BRITISH TAXPAYER'S SHARE", textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true, dark: true}));
add('The Grand Theft Auto games are set', photo('p5-edinburgh', {tone: 'navy', apoio: 'Set in fictional American cities. The lead studio is in', hero: 'EDINBURGH, SCOTLAND'}));
add('And the United Kingdom has a tax relief', card({id: 'p5-test', apoio: 'UK video games relief: pass a test as', hero: '"CULTURALLY BRITISH"', complemento: 'the studio can claim back part of what it spends', textSide: 'center', object: 'none', heroSize: 120, dark: true}));
add('Grand Theft Auto Five passed that test', (s) => (
	<TimelineShot id="p5-timeline" start={s} dark title="The relief" source="Sources: TaxWatch UK; BFI"
		events={[
			{year: '2015', label: 'GTA V passes the test', at: c.f('passed that test in 2015')},
			{year: 'POINTS', label: 'where the work is done, and who does it', at: c.f('where the work is done')},
			{year: '2024', label: 'New credit: 34% of qualifying spending', at: c.f('In 2024'), gold: true},
		]} />
));
add('According to an investigation', (s) => (
	<BarsShot id="p5-scotsman" start={s} title="Rockstar, video games relief (The Scotsman)" titleAt={s + 4} source="Source: The Scotsman investigations"
		bars={[
			{label: '2015–2023', value: 360, display: '£360M', at: c.f('three hundred sixty million pounds'), highlight: true},
			{label: '2024–2025 ALONE', value: 70, display: '£70M+', at: c.f('more than seventy million pounds')},
		]} />
));
add('A research group called TaxWatch', card({id: 'p5-taxwatch', apoio: 'TaxWatch UK (2019, 2020): UK corporation tax over ten years:', hero: 'NONE', complemento: 'claims likely linked to the next GTA', textSide: 'center', object: 'none', heroSize: 200, dark: true}));
add('There\'s another side to this', (s) => (
	<DocLinesShot id="p5-other" start={s} title="The other side" titleAt={s + 4} source="Sources: company statement and Ukie (via VGC)"
		lines={[
			{label: 'Legal, and designed to attract big productions', at: c.f('The relief is legal')},
			{label: 'Company: "well over 1,000" skilled UK jobs', at: c.f('well over a thousand')},
			{label: 'Trade body: £1 of relief brings back ~£4', at: c.f('four pounds'), highlight: true},
		]} />
));
add('So when you buy Grand Theft Auto Six, part', card({id: 'p5-covered', apoio: 'Part of the cost of making it was already covered.', hero: 'BY BRITISH TAXPAYERS', textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true, dark: true}));

// ---------------- Parte 6 — So, Who Gets Rich? ----------------
add('Part 6', card({id: 'p6-title', apoio: 'Part 6', hero: 'SO, WHO GETS RICH?', textSide: 'center', object: 'none', heroSize: 150, heroUnderline: true}));
add('So let\'s put the eighty dollars back', (s) => (
	<DocLinesShot id="p6-who" start={s} title="The $80, put back together" titleAt={s + 4}
		lines={[
			{label: 'Sony or Microsoft (digital)', value: '~$24', at: c.f('about twenty-four dollars went')},
			{label: 'Store + console maker (box)', value: 'a third or more', at: c.f('If you bought a box')},
			{label: 'Government', value: 'sales tax on top', at: c.f('Sales tax went')},
			{label: 'Take-Two', value: 'the rest, after years of costs', at: c.f('The rest went to Take-Two'), highlight: true},
		]} />
));
add('But here\'s the thing. The biggest money', (s) => (
	<RouteShot2 id="p6-after" start={s} goAt={c.f('kept earning for thirteen years')}
		nodes={[
			{name: 'THE $80', sub: 'THE FIRST SALE', at: s + 4},
			{name: 'ONLINE MODE', sub: '13 YEARS OF SPENDING', at: c.f('through its online mode')},
			{name: '78%', sub: 'AFTER THE PURCHASE', at: c.f("That's the seventy-eight percent")},
		]} />
));
add('The eighty dollars is just the ticket', card({id: 'p6-final', apoio: 'The $80 is just the ticket at the door.', hero: 'THE REAL BUSINESS IS INSIDE', textSide: 'center', object: 'none', heroSize: 100, heroUnderline: true, dark: true}));

// ---------------- Fechamento ----------------
add('Next time', photo('c-next', {tone: 'navy', apoio: 'Next: 167 years old, gone in a weekend', hero: 'CREDIT SUISSE'}));
add('And if you want the other side', (s) => (
	<SisterShot id="c-sister" start={s} at={{ships: c.f('the ships'), planes: c.f('planes'), rockets: c.f('rockets'), name: c.f('Cargo and Capital')}} />
));
add('This is Billions and Bulls. This video', (s) => (
	<EndShot id="c-end" start={s} at={{sign: s + 4, disclaimer: c.f('This video explains'), subscribe: c.f('Subscribe'), endscreen: c.f('following the money') + 40}} />
));

export const Ep10 = () => <E.Episode voice="audio/ep10-voice.wav" music={(timeline as Timeline).provisional ? undefined : 'audio/ep10-spark.wav'} />;
export const EP10_FRAMES = E.frames;
