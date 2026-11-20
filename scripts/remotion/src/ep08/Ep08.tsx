import React from 'react';
import {makeEpisode} from '../epkit/build';
import {CounterShot, DocLinesShot, RouteShot2, SplitShot, SubscribeShot2, TimelineShot} from '../epkit/shots';
import {BarsShot, StatsShot} from '../shots/partA';
import {EndShot, SisterShot} from '../shots/partC';
import credits from './creditos.json';
import timeline from './timeline.json';
import type {Timeline} from '../epkit/cues';
import type {Credit} from '../epkit/build';

// Episódio 8 — "A $100 Bill Costs Pennies. Who Keeps the Rest?"
// Cada cena começa numa frase do roteiro (roteiros/rascunhos/fonte/ep08-roteiro.txt). Parte 5 em azul-marinho (a virada do prejuízo).
// Sem logos. Notas reais só no B-roll em vídeo/foto licenciado; nos gráficos, só números. Contas nossas sempre marcadas como ilustração.

const E = makeEpisode(timeline as Timeline, credits as Record<string, Credit>);
const {c, add, card, photo} = E;

const FED = 'Source: Federal Reserve';

// ---------------- Abertura ----------------
add('A $100 Bill Costs Pennies', card({id: 'o-title', apoio: 'A $100 bill costs pennies. Who keeps', hero: 'THE REST?', textSide: 'left', object: 'coin', heroSize: 150, heroUnderline: true, objectSlide: true}));
add('For 2027, the Federal Reserve has ordered', (s) => (
	<StatsShot id="o-order" start={s} title="The Fed's order of new $100 bills for 2027" titleAt={s + 4} source="Sources: Federal Reserve, 2027 print order and 2025 currency costs"
		items={[
			{value: '1.36B', label: 'new notes, at most', at: c.f('one point three six billion')},
			{value: '$137B', label: 'face value, at most', at: c.f('one hundred thirty-seven billion')},
			{value: '~11¢', label: 'paper, ink and labor for each', at: c.f('About eleven cents')},
		]} />
));
add('So between the eleven cents', (s) => (
	<DocLinesShot id="o-math" start={s} title="Simple math" titleAt={s + 4} source="Our math: $100 − 11.3¢"
		lines={[
			{label: 'Face value', value: '$100.00', at: s + 10},
			{label: 'Cost to print', value: '− $0.11', at: c.f('the eleven cents')},
			{label: 'Someone keeps', value: '$99.89?', at: c.f('ninety-nine dollars'), highlight: true},
		]} />
));
add('Not exactly', card({id: 'o-twist', apoio: 'It involves the whole world, a lot of interest, and', hero: 'A FEW HUNDRED BILLION', complemento: "that haven't been paid", textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true}));
add('This is Billions and Bulls', card({id: 'o-brand', apoio: 'This is Billions & Bulls.', hero: "LET'S FOLLOW THE MONEY", textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true}));

// ---------------- Parte 1 — The World's Favorite Bill ----------------
add('Part 1', card({id: 'p1-title', apoio: 'Part 1', hero: "THE WORLD'S FAVORITE BILL", textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true}));
add('Start with a surprise', photo('p1-atm', {apoio: 'Cards everywhere. Phones pay for coffee. And yet, out there:', hero: 'MORE $100s THAN $1s'}));
add('According to the Federal Reserve, at the end of 2025', (s) => (
	<BarsShot id="p1-count" start={s} title="Notes in circulation, end of 2025" titleAt={s + 4} source="Source: Federal Reserve, currency in circulation (volume)"
		bars={[
			{label: '$1 BILLS', value: 15.2, display: '15.2B', at: c.f('fifteen point two billion')},
			{label: '$100 BILLS', value: 19.9, display: '19.9B', at: c.f('nineteen point nine billion'), highlight: true},
		]} />
));
add('In value, it isn\'t close', (s) => (
	<SplitShot id="p1-value" start={s} title="All US paper money, by value: about $2.4 trillion" titleAt={s + 4} total={2395} totalLabel="$2.4T" source="Source: Federal Reserve, currency in circulation (value); our math"
		pieces={[
			{value: 1989, label: 'IN $100 BILLS', display: '83%', at: c.f('almost two trillion'), highlight: true},
			{value: 406, label: 'ALL OTHER NOTES', display: '17%', at: c.f('More than four out of')},
		]} />
));
add('And the pile keeps growing', (s) => (
	<BarsShot id="p1-growth" start={s} title="$100 bills in circulation" titleAt={s + 4} source={FED} note={{text: '~3×', at: c.f('three times')}}
		bars={[
			{label: '2010', value: 7.0, display: '7.0B', at: c.f('about seven billion')},
			{label: '2025', value: 19.9, display: '19.9B', at: c.f('Fifteen years later'), highlight: true},
		]} />
));
add('Hundreds also live a long time', (s) => (
	<BarsShot id="p1-life" start={s} horizontal title="How long a bill lasts before it's destroyed" titleAt={s + 4} source="Source: Federal Reserve estimate, May 2025"
		bars={[
			{label: '$5 BILL', value: 5.8, display: 'under 6 years', at: c.f('less than six years')},
			{label: '$100 BILL', value: 24, display: '~24 years', at: c.f('About twenty-four years'), highlight: true},
		]} />
));
add('That tells you how people use them', photo('p1-safe', {apoio: 'A five gets spent. A hundred mostly sits: in a safe, under a mattress, in a bank box.', hero: 'OR IN ANOTHER COUNTRY'}));
add('The Federal Reserve\'s own staff estimate', (s) => (
	<StatsShot id="p1-abroad" start={s} title="US bills held outside the country" titleAt={s + 4} source="Sources: Fed staff, FEDS Note (July 2025); Fed working paper (Judson)"
		items={[
			{value: '$1T+', label: 'half of all US cash', sub: 'early 2025', at: c.f('more than one trillion'), ring: 0.5},
			{value: '~70%', label: 'of $100 bills', sub: 'estimate, end of 2022', at: c.f('about seventy percent'), ring: 0.7},
		]} />
));
add('In places where the local currency', photo('p1-exchange', {apoio: 'Where local money can lose its value fast, a $100 bill needs no bank and no phone. Just', hero: 'TRUST'}));
add('The US used to print even bigger bills', (s) => (
	<TimelineShot id="p1-big" start={s} title="$500, $1,000, $5,000, even $10,000 bills" source={FED}
		events={[
			{year: '1945', label: 'Last printed', at: c.f('last printed in 1945')},
			{year: '1969', label: 'No longer issued', sub: 'for lack of use', at: c.f('stopped issuing them in 1969')},
			{year: 'TODAY', label: 'The $100 is the biggest', at: c.f('Today, the hundred'), gold: true},
		]} />
));

// ---------------- Parte 2 — Eleven Cents ----------------
add('Part 2', card({id: 'p2-title', apoio: 'Part 2', hero: 'ELEVEN CENTS', textSide: 'center', object: 'none', heroSize: 150, heroUnderline: true}));
add('US paper money is printed by', photo('p2-bep', {apoio: 'The printer: the Bureau of Engraving and Printing, part of the Treasury.', hero: 'TWO PLANTS'}));
add('One in Washington', photo('p2-press', {apoio: 'One in Washington, one in Texas:', hero: 'WASHINGTON & FORT WORTH'}));
add('But the printer doesn\'t decide', (s) => (
	<RouteShot2 id="p2-order" start={s} goAt={c.f('places an order')} stamp={{text: '1B+ HUNDREDS', at: c.f('More than a billion')}}
		nodes={[
			{name: 'THE FED', sub: 'ESTIMATES CASH NEEDED', at: c.f('the Federal Reserve estimates')},
			{name: 'THE ORDER', sub: 'UP TO 5.7B NOTES, 2027', at: c.f('places an order')},
			{name: 'THE PRINTER', sub: 'PAID THE COST', at: c.f('pays the printer')},
		]} />
));
add('The Fed publishes the price list', (s) => (
	<BarsShot id="p2-cost" start={s} title="Cost to print one note, 2025 (variable cost)" titleAt={s + 4} source="Source: Federal Reserve, 2025 currency costs"
		bars={[
			{label: '$1', value: 4.1, display: '4.1¢', at: c.f('about four cents')},
			{label: '$20', value: 7.3, display: '7.3¢', at: c.f('about seven cents')},
			{label: '$100', value: 11.3, display: '11.3¢', at: c.f('eleven point three cents'), highlight: true},
		]} />
));
add('The hundred costs more because', photo('o-cash', {id: 'p2-security', apoio: 'A blue 3-D ribbon, color-shifting ink, a hidden portrait. Franklin in front, design from 2013:', hero: 'MORE SECURITY'}));
add('Those prices don\'t include everything', (s) => (
	<StatsShot id="p2-budget" start={s} title="The Fed's currency budget, 2025" titleAt={s + 4} source="Source: Federal Reserve, 2025 currency budget"
		items={[
			{value: '~$690M', label: 'fixed costs', sub: 'factories, engraving, research', at: c.f('almost seven hundred million')},
			{value: '~$1B', label: 'whole currency budget', at: c.f('about one billion dollars')},
			{value: '$2.4T', label: 'value of the cash out there', at: c.f('two point four trillion')},
		]} />
));
add('Compare that with coins', photo('p2-penny', {apoio: '2024: each penny cost about 3.7¢ to make, a loss of ~$85 million. The last one was struck on', hero: 'NOV 12, 2025'}));
add('The penny lost money every time', card({id: 'p2-opposite', apoio: 'The penny lost money every time. The $100 bill:', hero: '11¢ IN, $100 OUT', complemento: 'so surely, someone is pocketing it?', textSide: 'center', object: 'none', heroSize: 150, heroUnderline: true}));

// ---------------- Parte 3 — Nobody Keeps $99.89 ----------------
add('Part 3', card({id: 'p3-title', apoio: 'Part 3', hero: 'NOBODY KEEPS $99.89', textSide: 'center', object: 'none', heroSize: 130, heroUnderline: true}));
add('Here\'s the twist', card({id: 'p3-nobody', apoio: 'When a new $100 bill leaves the Fed,', hero: 'NOBODY GETS $99.89', complemento: 'not the Fed, not the printer, not the government', textSide: 'center', object: 'none', heroSize: 130, heroUnderline: true}));
add('Here\'s how cash really gets to you', (s) => (
	<RouteShot2 id="p3-route" start={s} goAt={c.f('The Fed sends the cash')} stamp={{text: 'A SWAP, NOT A GIFT', at: c.f('It swapped one kind')}}
		nodes={[
			{name: 'YOUR BANK', sub: 'NEEDS BILLS FOR ATMS', at: c.f('Your bank needs')},
			{name: 'THE FED', sub: 'SENDS $100 IN CASH', at: c.f('The Fed sends the cash')},
			{name: 'ITS ACCOUNT', sub: '$100 TAKEN OUT', at: c.f('takes the same amount')},
		]} />
));
add('On the Fed\'s books, that bill', (s) => (
	<DocLinesShot id="p3-liability" start={s} title="On the Fed's books" titleAt={s + 4} header="WHAT THE FED OWES"
		lines={[
			{label: 'Your $100 bill', value: 'a liability, an IOU', at: c.f("It's a liability")},
			{label: 'Interest it pays you', value: 'zero. Ever.', at: c.f('It pays no interest'), highlight: true},
		]} />
));
add('Think about your own cash', (s) => (
	<StatsShot id="p3-drawer" start={s} title="$1,000 in a drawer for a year" titleAt={s + 4} source="Our math: 3% × $1,000, as an illustration" stamp={{text: 'WHO EARNED IT?', at: c.f('somebody else earned')}}
		items={[
			{value: '$1,000', label: 'still yours', at: c.f('ten hundred-dollar bills')},
			{value: '−$30', label: 'interest given up, at 3%', at: c.f('about thirty dollars')},
		]} />
));
add('Now look at the other side', (s) => (
	<DocLinesShot id="p3-assets" start={s} title="The other side of the Fed's books" titleAt={s + 4} header="WHAT THE FED OWNS"
		lines={[
			{label: 'Assets', value: 'mostly US government bonds', at: c.f('Mostly US government bonds')},
			{label: 'Interest they pay', value: 'yes', at: c.f('do pay interest'), highlight: true},
		]} />
));
add('So here\'s the trick', (s) => (
	<DocLinesShot id="p3-trick" start={s} title="So here's the trick" titleAt={s + 4}
		lines={[
			{label: 'The Fed owes you', value: 'paper that pays nothing', at: c.f('a piece of paper')},
			{label: 'It holds', value: 'a bond that pays something', at: c.f('it holds a bond')},
			{label: 'The gap', value: 'the real profit from printing money', at: c.f('The gap between'), highlight: true},
		]} />
));
add('Economists call it seigniorage', card({id: 'p3-seign', apoio: 'Economists call it', hero: 'SEIGNIORAGE', complemento: 'from the old French for lord, the seigneur', textSide: 'center', object: 'none', heroSize: 160, heroUnderline: true}));
add('How big can it get', (s) => (
	<CounterShot id="p3-70" start={s} label="Simple math: 3% a year on $2.4 trillion of cash" labelAt={s + 4} from={0} to={70} countAt={c.f('seventy billion')} prefix="~$" suffix="B" sub="a year, from the interest cash holders give up" subAt={c.f('Not from printing')} source="Our math, as an illustration" />
));
add('If you\'re enjoying the story so far', (s) => (
	<SubscribeShot2 id="p3-sub" start={s} free="It's free." line1="Costs less than 11 cents." line2="No interest given up."
		at={{ask: s + 4, tap: c.f('subscribing helps'), free: c.f('Because now'), line1: c.f('we follow that interest'), line2: c.f('see who gets it')}} />
));

// ---------------- Parte 4 — Where the Profit Goes ----------------
add('Part 4', card({id: 'p4-title', apoio: 'Part 4', hero: 'WHERE THE PROFIT GOES', textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true}));
add('The Federal Reserve isn\'t a normal company', photo('p4-treasury', {apoio: "By law, after its costs and a small dividend to member banks, the Fed's profit goes to", hero: 'THE US TREASURY'}));
add('In good years, that\'s a lot of money', (s) => (
	<BarsShot id="p4-2021" start={s} horizontal title="2021: the Fed's payment vs. the cost of all paper money" titleAt={s + 4} source="Source: Federal Reserve, January 14, 2022" note={{text: '~1%', at: c.f('Roughly one percent')}}
		bars={[
			{label: 'TO THE TREASURY', value: 107.4, display: '$107.4B', at: c.f('one hundred seven point four'), highlight: true},
			{label: 'COST OF CASH', value: 1.0, display: '~$1B', at: c.f('about one billion dollars')},
		]} />
));
add('So the first answer to our question', card({id: 'p4-answer1', apoio: 'First answer: the US government. And through it,', hero: 'AMERICAN TAXPAYERS', complemento: 'every dollar sent is a dollar not raised in taxes or borrowed', textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true}));
add('But follow the bills one more step', photo('p3-bank', {apoio: 'Savers abroad holding $100 bills are, in effect, lending to the United States', hero: 'AT ZERO INTEREST', complemento: 'with no end date'}));
add('The Fed\'s own staff noticed something', (s) => (
	<DocLinesShot id="p4-slowing" start={s} title="Foreign demand for dollar bills has slowed" titleAt={s + 4} source="Source: Fed staff, FEDS Note (July 2025)"
		lines={[
			{label: 'Higher interest rates', value: 'a drawer of bills costs more', at: c.f('higher interest rates')},
			{label: 'Stablecoins', value: 'replacing some paper dollars', at: c.f('called stablecoins'), highlight: true},
		]} />
));
add('And that\'s the hidden price of holding cash', card({id: 'p4-hidden', apoio: 'The hidden price of holding cash:', hero: 'YOU GIVE UP THE INTEREST', complemento: 'and inflation slowly eats away at what the bill can buy', textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true}));
add('Someone else earns that interest instead', card({id: 'p4-wasnt', apoio: 'For a century: the Fed, and then the Treasury.', hero: "UNTIL IT SUDDENLY WASN'T", textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true, dark: true}));

// ---------------- Parte 5 — When Printing Money Lost Money (azul-marinho) ----------------
add('Part 5', card({id: 'p5-title', apoio: 'Part 5', hero: 'WHEN PRINTING MONEY LOST MONEY', textSide: 'center', object: 'none', heroSize: 100, heroUnderline: true, dark: true}));
add('In 2022, inflation surged', card({id: 'p5-2022', apoio: '2022: inflation surges, and the Fed raises rates fast.', hero: 'THE MATH FLIPS', textSide: 'center', object: 'none', heroSize: 150, heroUnderline: true, dark: true}));
add('Remember, the Fed doesn\'t only owe cash', (s) => (
	<DocLinesShot id="p5-owes" start={s} dark title="What the Fed owes" titleAt={s + 4} source="Source: Federal Reserve (via Econlib)"
		lines={[
			{label: 'Cash', value: 'no interest', at: c.f("doesn't only owe cash")},
			{label: "Banks' reserves", value: 'interest, since 2008', at: c.f('since 2008'), highlight: true},
		]} />
));
add('During the pandemic', card({id: 'p5-balance', apoio: 'Paid for with new reserves. By 2022, its balance sheet:', hero: '~$9 TRILLION', complemento: 'almost four times all the US cash', textSide: 'center', object: 'none', heroSize: 170, heroUnderline: true, dark: true}));
add('When rates were near zero', card({id: 'p5-expensive', apoio: 'Rates near zero: cheap. Rates above 5%:', hero: 'VERY EXPENSIVE', textSide: 'center', object: 'none', heroSize: 150, heroUnderline: true, dark: true}));
add('Meanwhile, many of the bonds', (s) => (
	<DocLinesShot id="p5-squeeze" start={s} dark title="The squeeze" titleAt={s + 4}
		lines={[
			{label: 'Earned on older bonds', value: 'low interest', at: c.f('kept paying low interest')},
			{label: 'Paid on reserves', value: 'more', at: c.f('paying more on what it owed'), highlight: true},
		]} />
));
add('In September 2022, most of the regional', (s) => (
	<TimelineShot id="p5-deferred" start={s} dark title="The deferred asset" source="Source: Federal Reserve, quarterly financial report (June 30, 2026)"
		events={[
			{year: 'SEP 2022', label: 'Payments to the Treasury stop', at: c.f('In September 2022')},
			{year: 'A RUNNING TOTAL', label: 'Losses to earn back first', at: c.f('a deferred asset')},
			{year: 'JUN 2026', label: 'About $235 billion', at: c.f('By June 2026'), gold: true},
		]} />
));
add('But it means the profit from all that cash', card({id: 'p5-hole', apoio: 'The profit from $2 trillion of interest-free cash has to fill', hero: 'A $235B HOLE FIRST', complemento: 'some regional Fed banks pay the Treasury again; most do not', textSide: 'center', object: 'none', heroSize: 130, heroUnderline: true, dark: true}));
add('It\'s not just an American story', photo('p5-frankfurt', {tone: 'navy', apoio: "Germany's Bundesbank, first loss since 1979:", hero: '−€19.2B IN 2024', complemento: 'then another €8.6 billion loss in 2025'}));
add('For years, the German government', card({id: 'p5-berlin', apoio: 'The German government reportedly counted on about', hero: '€2.5B A YEAR', complemento: 'from its central bank. That money stopped arriving.', textSide: 'center', object: 'none', heroSize: 150, heroUnderline: true, dark: true}));
add('In 2019, the euro area also stopped', photo('p5-euro500', {tone: 'navy', apoio: "2019: the euro area stops issuing its biggest note. The ECB's worry: illegal activity.", hero: 'THE €500 BILL'}));

// ---------------- Parte 6 — So, Who Keeps the Rest? ----------------
add('Part 6', card({id: 'p6-title', apoio: 'Part 6', hero: 'SO, WHO KEEPS THE REST?', textSide: 'center', object: 'none', heroSize: 115, heroUnderline: true}));
add('So let\'s follow the hundred-dollar bill one last time', (s) => (
	<RouteShot2 id="p6-route" start={s} goAt={c.f('The money comes later')} stamp={{text: 'NOBODY POCKETS $99.89', at: c.f('Nobody pockets')}}
		nodes={[
			{name: 'PRINTING', sub: 'ABOUT 11¢', at: c.f('about eleven cents')},
			{name: 'INTEREST', sub: 'SLOWLY, OVER TIME', at: c.f('The money comes later')},
			{name: 'THE TREASURY', sub: 'IN NORMAL TIMES', at: c.f('goes to the US Treasury')},
		]} />
));
add('And who pays for it', photo('p6-wallet', {apoio: 'Who pays? Everyone who holds cash, here and abroad, giving up interest for money they can touch.', hero: 'CASH HOLDERS'}));
add('Right now, that profit', card({id: 'p6-now', apoio: 'Right now, that profit is quietly paying back', hero: "THE FED'S LOSSES", complemento: 'before the Treasury sees much of it again', textSide: 'center', object: 'none', heroSize: 130, heroUnderline: true}));
add('Not everyone thinks big bills are a good idea', (s) => (
	<DocLinesShot id="p6-debate" start={s} title="Should big bills exist?" titleAt={s + 4} source="Sources: Kenneth Rogoff, The Curse of Cash (2016)"
		lines={[
			{label: 'Kenneth Rogoff', value: 'phase out: crime, tax evasion', at: c.f('Kenneth Rogoff')},
			{label: 'Defenders of cash', value: 'privacy, blackouts, the unbanked', at: c.f('Others say cash')},
		]} />
));
add('A hundred-dollar bill isn\'t worth a hundred dollars', card({id: 'p6-agree', apoio: "Not the paper. It's worth $100 because people all over", hero: 'THE WORLD AGREES TO HOLD IT', textSide: 'center', object: 'none', heroSize: 100, heroUnderline: true, dark: true}));
add('And while they hold it', card({id: 'p6-final', apoio: 'And while they hold it,', hero: 'SOMEONE ELSE COLLECTS THE INTEREST', textSide: 'center', object: 'none', heroSize: 87, heroUnderline: true, dark: true}));

// ---------------- Fechamento ----------------
add('Next time', photo('o-cash', {id: 'c-next', tone: 'navy', apoio: 'Next: another story where billions went', hero: 'SOMEWHERE NOBODY EXPECTED'}));
add('And if you want the other side', (s) => (
	<SisterShot id="c-sister" start={s} at={{ships: c.f('the ships'), planes: c.f('planes'), rockets: c.f('rockets'), name: c.f('Cargo and Capital')}} />
));
add('This is Billions and Bulls. This video', (s) => (
	<EndShot id="c-end" start={s} at={{sign: s + 4, disclaimer: c.f('This video explains'), subscribe: c.f('Subscribe'), endscreen: c.f('following the money') + 40}} />
));

export const Ep08 = () => <E.Episode voice="audio/ep08-voice.wav" music={(timeline as Timeline).provisional ? undefined : 'audio/ep08-spark.wav'} />;
export const EP08_FRAMES = E.frames;
