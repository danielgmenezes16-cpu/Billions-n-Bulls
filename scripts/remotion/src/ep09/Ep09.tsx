import React from 'react';
import {makeEpisode} from '../epkit/build';
import {CounterShot, DocLinesShot, SplitShot, SubscribeShot2, TimelineShot} from '../epkit/shots';
import {BarsShot, StatsShot} from '../shots/partA';
import {EndShot, SisterShot} from '../shots/partC';
import credits from './creditos.json';
import timeline from './timeline.json';
import type {Timeline} from '../epkit/cues';
import type {Credit} from '../epkit/build';

// Episódio 9 — "What Is One CEO Worth? Nvidia Just Found Out"
// Cada cena começa numa frase do roteiro (roteiros/rascunhos/fonte/ep09-roteiro.txt). Parte 2 em azul-marinho.
// Sem logos e sem fotos de pessoas: nomes só em texto. Toda alegação atribuída a quem fez, e cada negativa com o mesmo peso na tela.
// As duas mulheres citadas na imprensa não aparecem, nem por nome. Huang não foi acusado de nada: o fecho diz "reported, not proven".

const E = makeEpisode(timeline as Timeline, credits as Record<string, Credit>);
const {c, add, card, photo} = E;

const CNN = 'Source: CNN, November 17, 2026';

// ---------------- Abertura ----------------
add('What Is One CEO Worth', card({id: 'o-title', apoio: 'What is', hero: 'ONE CEO WORTH?', complemento: 'Nvidia just found out', textSide: 'left', object: 'coin', heroSize: 121, heroUnderline: true, objectSlide: true}));
add('November 12, 2026', photo('o-chip', {apoio: 'November 12, 2026. After 33 years, the man who started Nvidia', hero: 'RESIGNS AS CEO', complemento: 'effective immediately'}));
add('In the days around that announcement', (s) => (
	<StatsShot id="o-drop" start={s} title="Nvidia, in the days around the resignation" titleAt={s + 4} source={CNN}
		items={[
			{value: '−17%', label: 'stock price', at: c.f('seventeen percent')},
			{value: '~$750B', label: 'market value gone', at: c.f('seven hundred fifty billion')},
		]} />
));
add('That\'s more than the entire value', card({id: 'o-every', apoio: "That's more than the entire value of", hero: 'ALMOST EVERY COMPANY ON EARTH', textSide: 'center', object: 'none', heroSize: 100}));
add('But the chips didn\'t change', (s) => (
	<DocLinesShot id="o-same" start={s} title="What changed?" titleAt={s + 4} source="Source: Nvidia, quarterly results, November 17, 2026"
		lines={[
			{label: 'The chips', value: 'no change', at: c.f("chips didn't change")},
			{label: 'The factories', value: 'no change', at: c.f("factories didn't change")},
			{label: 'Five days later', value: 'its biggest quarter ever', at: c.f('Five days later'), highlight: true},
		]} />
));
add('So what exactly did investors lose', card({id: 'o-question', apoio: "What did investors lose? How much of a company's value can", hero: 'ONE PERSON CARRY?', textSide: 'center', object: 'none', heroSize: 140, heroUnderline: true}));
add('This is Billions and Bulls', card({id: 'o-brand', apoio: 'This is Billions & Bulls.', hero: "LET'S FOLLOW THE MONEY", textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true}));

// ---------------- Parte 1 — The Booth That Launched a Giant ----------------
add('Part 1', card({id: 'p1-title', apoio: 'Part 1', hero: 'THE BOOTH THAT LAUNCHED A GIANT', textSide: 'center', object: 'none', heroSize: 100, heroUnderline: true}));
add('In 1993, three engineers', photo('p1-diner', {apoio: "1993, a Denny's booth in San Jose. Three engineers plan a company making", hero: 'GRAPHICS CHIPS', complemento: 'for video games'}));
add('One of them was Jensen Huang', card({id: 'p1-huang', apoio: 'One of them, Jensen Huang, became chief executive. He stayed', hero: '33 YEARS', textSide: 'center', object: 'none', heroSize: 190, heroUnderline: true}));
add('For most of that time', (s) => (
	<TimelineShot id="p1-rise" start={s} title="From gamers to AI"
		events={[
			{year: 'GAMES', label: 'Gamers knew it', sub: 'investors mostly ignored it', at: c.f('gamers knew')},
			{year: 'AI', label: 'Runs best on the same chips', at: c.f('artificial intelligence turned out')},
			{year: 'DEMAND', label: 'Every big tech company wants them', at: c.f('every big tech company')},
			{year: 'SCALE', label: 'Almost nobody else can match it', at: c.f('almost nobody else'), gold: true},
		]} />
));
add('In early October 2026', card({id: 'p1-peak', apoio: "Early October 2026, a record. Nvidia's value:", hero: '$5.8 TRILLION', textSide: 'left', object: 'chart', heroSize: 150}));
add('Huang became the face', photo('p1-datacenter', {apoio: 'The leather jacket, the keynotes, the deals with governments and tech giants:', hero: 'THE FACE OF IT ALL'}));
add('According to Nvidia\'s own filing', (s) => (
	<StatsShot id="p1-stake" start={s} title="Huang's stake" titleAt={s + 4} source="Sources: Nvidia proxy filing, March 2026; our math at the October peak"
		items={[
			{value: '3.6%', label: 'of Nvidia', at: c.f('three point six percent'), ring: 0.036},
			{value: '~$200B', label: 'at the October peak', at: c.f('two hundred billion')},
		]} />
));
add('But here\'s a detail that matters later', card({id: 'p1-class', apoio: 'No special voting shares. Nvidia has', hero: '1 CLASS OF STOCK', complemento: 'so the board that trusted him could also let him go', textSide: 'center', object: 'none', heroSize: 150, heroUnderline: true}));
add('In 2023, Denny\'s put a plaque', (s) => (
	<DocLinesShot id="p1-plaque" start={s} title="The plaque on the booth" titleAt={s + 4} source="Sources: PC Gamer; IBTimes"
		lines={[
			{label: '2023', value: 'where a $1 trillion company was born', at: c.f('It celebrated')},
			{label: 'November 12, 2026', value: 'off the wall, reportedly', at: c.f('the plaque came off')},
			{label: 'A day later', value: 'back up', at: c.f('A day later'), highlight: true},
		]} />
));

// ---------------- Parte 2 — Two Weeks in November (azul-marinho) ----------------
add('Part 2', card({id: 'p2-title', apoio: 'Part 2', hero: 'TWO WEEKS IN NOVEMBER', textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true, dark: true}));
add('Here\'s what happened, based on', card({id: 'p2-warning', apoio: 'Based on the reporting so far. A lot of this is', hero: 'STILL BEING INVESTIGATED', complemento: 'and some of it is disputed', textSide: 'center', object: 'none', heroSize: 105, heroUnderline: true, dark: true}));
add('On October 29, The New York Times reported', (s) => (
	<DocLinesShot id="p2-reported" start={s} dark title="October 29: what The New York Times reported" titleAt={s + 4} source="Source: The New York Times (via TechCrunch)"
		lines={[
			{label: 'A possible spy plot', value: 'linked to China', at: c.f('a possible spy plot')},
			{label: 'A relationship', value: 'with an executive at a chip buyer', at: c.f('extramarital relationship')},
			{label: 'US officials suspected', value: 'she had been recruited', at: c.f('US officials')},
		]} />
));
add('China called the claims', (s) => (
	<DocLinesShot id="p2-replies" start={s} dark title="The replies" titleAt={s} source="Sources: statements collected by Wikipedia; Bloomberg"
		lines={[
			{label: 'China', value: '"groundless speculation"', at: c.f('China called the claims')},
			{label: 'The Singapore company', value: 'no verifiable evidence', at: c.f('The company said')},
			{label: 'US Justice Department', value: 'no conclusion', at: c.f('Justice Department')},
			{label: 'Huang', value: 'dealings "completely normal"', at: c.f('Huang said')},
		]} />
));
add('In Singapore, where the company is based', photo('p2-singapore', {tone: 'navy', apoio: 'Singapore\'s authorities: on the offences they looked into,', hero: 'NOT ENOUGH EVIDENCE', complemento: 'and no one investigated for spying'}));
add('Then, on November 11', (s) => (
	<TimelineShot id="p2-days" start={s} dark title="Two days in November" source="Sources: The New York Times; NPR; Nvidia filing"
		events={[
			{year: 'NOV 11', label: 'A new Times report', sub: 'a relationship with a direct report', at: c.f('on November 11')},
			{year: 'SAME DAY', label: 'The board meets', at: c.f("Nvidia's board met")},
			{year: 'NOV 12', label: 'Huang resigns', sub: 'as CEO, president and director', at: c.f('the company announced'), gold: true},
		]} />
));
add('The board moved fast', card({id: 'p2-kress', apoio: 'Kress becomes interim CEO. And for the first time, Nvidia gets', hero: 'A SEPARATE BOARD CHAIR', textSide: 'center', object: 'none', heroSize: 105, heroUnderline: true, dark: true}));
add('Kress isn\'t a household name', card({id: 'p2-cv', apoio: 'Before Nvidia: finance jobs at Cisco and Microsoft for almost', hero: '25 YEARS', textSide: 'center', object: 'none', heroSize: 190, heroUnderline: true, dark: true}));
add('The reaction was split', card({id: 'p2-letter', apoio: 'An open letter asking the board to bring Huang back:', hero: '170,000+ SIGNATURES', complemento: 'several tech leaders publicly backed him', textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true, dark: true}));
add('On November 17, Huang said', (s) => (
	<TimelineShot id="p2-return" start={s} dark title="November 17" source="Sources: CNN; NPR"
		events={[
			{year: 'HUANG', label: '"Honored" to return', sub: 'if the board decided it was best', at: c.f('honored to return')},
			{year: 'THE BOARD', label: 'No plan to reinstate him', at: c.f('The same day'), gold: true},
		]} />
));
add('And on December 1', photo('p2-capitol', {tone: 'navy', apoio: 'December 1:', hero: 'EXPECTED TO TESTIFY', complemento: 'in front of Congress'}));

// ---------------- Parte 3 — The Price of One Person ----------------
add('Part 3', card({id: 'p3-title', apoio: 'Part 3', hero: 'THE PRICE OF ONE PERSON', textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true}));
add('So let\'s look at the money', (s) => (
	<CounterShot id="p3-751" start={s} label="Nvidia market value lost since the admission and the investigation" labelAt={s + 4} from={0} to={751} countAt={c.f('Seven hundred fifty-one billion')} prefix="$" suffix="B" sub="about 17%" subAt={c.f('seventeen percent')} source={CNN} />
));
add('To understand why a company can lose that much', card({id: 'p3-bet', apoio: "A share isn't paying for what a company owns today. It's", hero: 'A BET ON THE FUTURE', complemento: 'years of future profits, squeezed into one number', textSide: 'left', object: 'chart', heroSize: 120, heroUnderline: true}));
add('So when a founder leaves', (s) => (
	<DocLinesShot id="p3-questions" start={s} title="When a founder leaves" titleAt={s + 4}
		lines={[
			{label: 'Who makes the big bets now?', at: c.f('Who makes the big bets')},
			{label: 'Who closes the next big deal?', at: c.f('Who closes the next deal')},
			{label: 'Will the best engineers stay?', at: c.f('Will the best engineers')},
			{label: 'A less certain future', value: 'is worth less today', at: c.f('a less certain future'), highlight: true},
		]} />
));
add('There\'s a name for this', card({id: 'p3-risk', apoio: "There's a name for this:", hero: 'KEY PERSON RISK', complemento: 'companies even warn about it in their annual reports', textSide: 'center', object: 'none', heroSize: 150, heroUnderline: true}));
add('It has happened before', (s) => (
	<BarsShot id="p3-mcd" start={s} title="McDonald's and its former CEO, 2019 to 2021" titleAt={s + 4} source="Source: CFO.com"
		bars={[
			{label: 'LEFT WITH (EST.)', value: 40, display: '~$40M', at: c.f('forty million dollars')},
			{label: 'RETURNED, 2021', value: 105, display: '$105M+', at: c.f('one hundred five million'), highlight: true},
		]} />
));
add('The lesson boards took', card({id: 'p3-lesson', apoio: 'The lesson for boards: rules about relationships at work apply', hero: 'AT THE VERY TOP', complemento: 'where one person can move billions', textSide: 'center', object: 'none', heroSize: 130, heroUnderline: true}));
add('But history also has the opposite lesson', card({id: 'p3-apple', apoio: 'Steve Jobs steps down in 2011. Under Tim Cook, Apple soars.', hero: 'A RISK, NOT A SENTENCE', textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true}));
add('If you\'re enjoying the story so far', (s) => (
	<SubscribeShot2 id="p3-sub" start={s} free="It's free." line1="No board vote needed." line2="One click, and you're in."
		at={{ask: s + 4, tap: c.f('subscribing helps'), free: c.f('Because next'), line1: c.f("we'll find out"), line2: c.f('who actually lost')}} />
));

// ---------------- Parte 4 — Who Lost the $751 Billion ----------------
add('Part 4', card({id: 'p4-title', apoio: 'Part 4', hero: 'WHO LOST THE $751 BILLION?', textSide: 'center', object: 'none', heroSize: 115, heroUnderline: true}));
add('When a stock falls', card({id: 'p4-paper', apoio: 'No pile of cash moves anywhere. The value just', hero: "ISN'T THERE ANYMORE", complemento: "but somebody's account balance goes down", textSide: 'center', object: 'none', heroSize: 130, heroUnderline: true}));
add('Start with Huang himself', (s) => (
	<SplitShot id="p4-huang" start={s} title="Some simple math: 3.6% of $751 billion" titleAt={s + 4} total={751} totalLabel="$751B" source="Our math: Huang's 3.6% stake × CNN's $751 billion" zoomSmall
		pieces={[
			{value: 724, label: 'EVERYONE ELSE', display: '~$724B', at: c.f('Three point six percent')},
			{value: 27, label: 'HUANG, ON PAPER', display: '~$27B', at: c.f('twenty-seven billion'), highlight: true},
		]} />
));
add('Then there are Nvidia\'s employees', photo('p4-office', {apoio: 'Many employees are paid partly in stock. For years it made them rich. In November,', hero: 'IT WENT THE OTHER WAY'}));
add('And then, there\'s almost everyone else', (s) => (
	<StatsShot id="p4-index" start={s} title="Nvidia's weight in an S&P 500 index fund, mid-November" titleAt={s + 4} source="Source: Trefis analysis, November 13, 2026"
		items={[{value: '~6%', label: 'of the fund', sub: 'in many retirement accounts', at: c.f('about six percent'), ring: 0.06}]} />
));
add('So if you have a retirement account', card({id: 'p4-yours', apoio: 'An index fund in your retirement account? You probably owned', hero: 'A PIECE OF THAT DROP', complemento: 'without ever buying a single Nvidia share on purpose', textSide: 'center', object: 'none', heroSize: 130, heroUnderline: true}));
add('But here\'s the twist', card({id: 'p4-twist', apoio: "Here's the twist:", hero: 'NOT ALL OF IT WAS HUANG', complemento: "Nvidia's shares had already started sliding", textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true}));
add('Since the record in early October', (s) => (
	<StatsShot id="p4-peak" start={s} title="Nvidia since its record in early October" titleAt={s + 4} source={CNN}
		items={[
			{value: '−35%', label: 'stock price', at: c.f('thirty-five percent')},
			{value: '~$2T', label: 'market value', at: c.f('Roughly two trillion')},
		]} />
));
add('Part of that was a wider fear', photo('p3-ticker', {apoio: "A wider fear about the AI boom. October 29, Google's parent company had", hero: 'ITS WORST DAY EVER', complemento: 'on the stock market'}));
add('So the honest answer', (s) => (
	<DocLinesShot id="p4-split" start={s} title="Who caused the drop?" titleAt={s + 4}
		lines={[
			{label: "Huang's part", value: '?', at: c.f("Huang's part")},
			{label: "The market's part", value: '?', at: c.f("the market's part")},
			{label: 'The scandal', value: 'one more reason', at: c.f('The scandal gave them'), highlight: true},
		]} />
));

// ---------------- Parte 5 — The Company Without Him ----------------
add('Part 5', card({id: 'p5-title', apoio: 'Part 5', hero: 'THE COMPANY WITHOUT HIM', textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true}));
add('Then came the test', card({id: 'p5-test', apoio: 'November 17, five days after the resignation:', hero: 'QUARTERLY RESULTS', textSide: 'center', object: 'none', heroSize: 130, heroUnderline: true}));
add('Revenue was one hundred fifteen point eight', (s) => (
	<StatsShot id="p5-results" start={s} title="Nvidia's quarter, reported November 17" titleAt={s + 4} source={CNN}
		items={[
			{value: '$115.8B', label: 'revenue', sub: 'more than double a year earlier', at: c.f('one hundred fifteen point eight')},
			{value: '$65B+', label: 'profit', at: c.f('sixty-five billion')},
			{value: '~$130B', label: 'revenue expected next quarter', at: c.f('one hundred thirty billion')},
		]} />
));
add('After the report, the shares rose', card({id: 'p5-after', apoio: 'After the report, in after-hours trading:', hero: '+5%', complemento: 'an orderly change at the top need not destroy value', textSide: 'left', object: 'chart', heroSize: 200}));
add('But the questions didn\'t go away', (s) => (
	<DocLinesShot id="p5-new" start={s} title="New questions" titleAt={s + 4} source="Sources: CNN; Wikipedia"
		lines={[
			{label: 'New board committee', value: 'national security, export rules', at: c.f('a new committee')},
			{label: 'US Treasury Secretary', value: 'hire the next CEO from outside', at: c.f('Treasury Secretary')},
			{label: 'China and the rest of Asia', value: 'depend partly on Washington', at: c.f('business in China'), highlight: true},
		]} />
));
add('There\'s a strange irony here', photo('p2-capitol', {id: 'p5-irony', apoio: 'Years arguing in Washington to sell more chips abroad. Now the rules could get', hero: 'TIGHTER, NOT LOOSER'}));

// ---------------- Parte 6 — So, What Is One CEO Worth? ----------------
add('Part 6', card({id: 'p6-title', apoio: 'Part 6', hero: 'SO, WHAT IS ONE CEO WORTH?', textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true}));
add('So let\'s put it together', (s) => (
	<DocLinesShot id="p6-score" start={s} title="November, side by side" titleAt={s + 4}
		lines={[
			{label: 'Chips, customers, factories', value: 'unchanged', at: c.f('The chips, the customers')},
			{label: 'The quarter', value: 'the best ever', at: c.f('The quarter was the best')},
			{label: 'The story about the future', value: 'changed', at: c.f('What changed was the story'), highlight: true},
		]} />
));
add('The seven hundred fifty billion dollars didn\'t go to anyone', card({id: 'p6-price', apoio: "The $750 billion didn't go to anyone. It was", hero: 'THE PRICE OF UNCERTAINTY', complemento: 'Who leads now? Who makes the next big bet?', textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true}));
add('Some of that value could come back', photo('p6-city', {apoio: 'Some of that value could come back. Some of it may have been', hero: 'AIR FROM A BIGGER BOOM'}));
add('And one person is still at the center of it', card({id: 'p6-huang', apoio: 'Huang: not charged with anything. Investigations still open.', hero: 'REPORTED, NOT PROVEN', textSide: 'center', object: 'none', heroSize: 130, heroUnderline: true}));
add('A company\'s value is a guess about the future', card({id: 'p6-final', apoio: 'Value is a guess about the future. When its author walks out,', hero: 'THE GUESS GETS CHEAPER', textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true, dark: true}));

// ---------------- Fechamento ----------------
add('Next time', photo('p3-ticker', {id: 'c-next', tone: 'navy', apoio: 'Next: about $500 billion gone in one day, right after sales jumped.', hero: 'WHAT WERE INVESTORS AFRAID OF?'}));
add('And if you want the other side', (s) => (
	<SisterShot id="c-sister" start={s} at={{ships: c.f('the ships'), planes: c.f('planes'), rockets: c.f('rockets'), name: c.f('Cargo and Capital')}} />
));
add('This is Billions and Bulls. This video', (s) => (
	<EndShot id="c-end" start={s} at={{sign: s + 4, disclaimer: c.f('This video explains'), subscribe: c.f('Subscribe'), endscreen: c.f('following the money') + 40}} />
));

export const Ep09 = () => <E.Episode voice="audio/ep09-voice.wav" music={(timeline as Timeline).provisional ? undefined : 'audio/ep09-heist.wav'} />;
export const EP09_FRAMES = E.frames;
