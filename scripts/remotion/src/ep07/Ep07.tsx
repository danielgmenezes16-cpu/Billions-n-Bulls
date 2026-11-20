import React from 'react';
import {makeEpisode} from '../epkit/build';
import {DocLinesShot, RouteShot2, SplitShot, SubscribeShot2, TimelineShot} from '../epkit/shots';
import {BarsShot, StatsShot} from '../shots/partA';
import {EndShot, SisterShot} from '../shots/partC';
import credits from './creditos.json';
import timeline from './timeline.json';
import type {Timeline} from '../epkit/cues';
import type {Credit} from '../epkit/build';

// Episódio 7 — "Where Did Wirecard's $2 Billion Go?"
// Cada cena começa numa frase do roteiro (roteiros/rascunhos/fonte/ep07-roteiro.txt). Parte 3 em azul-marinho.
// Sem logos e sem fotos de pessoas: nomes só em texto. Alegações sempre atribuídas; Braun nega tudo e é presumido inocente.

const E = makeEpisode(timeline as Timeline, credits as Record<string, Credit>);
const {c, add, card, photo} = E;

const WIKI = 'Source: Wirecard filings (via Wikipedia)';

// ---------------- Abertura ----------------
add('Where Did Wirecard\'s', card({id: 'o-title', apoio: 'Wirecard:', hero: 'WHERE DID $2 BILLION GO?', textSide: 'left', object: 'coin', heroSize: 130, heroUnderline: true, objectSlide: true}));
add('June 18, 2020', photo('o-papers', {apoio: 'June 18, 2020. A German payments company was due to publish', hero: 'ITS ANNUAL RESULTS'}));
add('Instead, its auditors say', card({id: 'o-missing', apoio: "Its auditors can't confirm", hero: '€1.9 BILLION', complemento: 'about $2.1 billion, "in two banks in the Philippines"', textSide: 'center', object: 'none', heroSize: 190}));
add('The banks say they never had it', card({id: 'o-never', apoio: 'The banks say:', hero: 'WE NEVER HAD IT', textSide: 'center', object: 'none', heroSize: 150, heroUnderline: true}));
add('Two years earlier', (s) => (
	<TimelineShot id="o-fall" start={s} title="From star to insolvency" source="Sources: Deutsche Börse; Wirecard; Al Jazeera"
		events={[
			{year: '2018', label: 'Worth about €24 billion', at: c.f('twenty-four billion euros')},
			{year: 'DAX', label: "Takes a big bank's DAX seat", at: c.f("replaced one of Germany's")},
			{year: 'JUN 18, 2020', label: '€1.9 billion not confirmed', at: c.f('One week after')},
			{year: 'JUN 25, 2020', label: 'Bankrupt', at: c.f('it was bankrupt'), gold: true},
		]} />
));
add('This is Billions and Bulls', card({id: 'o-brand', apoio: 'This is Billions & Bulls.', hero: "LET'S FOLLOW THE MONEY", textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true}));

// ---------------- Parte 1 — The Company That Replaced a Bank ----------------
add('Part 1', card({id: 'p1-title', apoio: 'Part 1', hero: 'THE COMPANY THAT REPLACED A BANK', textSide: 'center', object: 'none', heroSize: 100, heroUnderline: true}));
add('Wirecard started in 1999', card({id: 'p1-start', apoio: 'When you pay online, somebody has to move', hero: 'THE MONEY', complemento: 'from your card to the shop', textSide: 'right', object: 'card', heroSize: 110}));
add('Picture a pair of sneakers', (s) => (
	<RouteShot2 id="p1-route" start={s} goAt={c.f('a processor passes the payment')} stamp={{text: 'A SMALL FEE', at: c.f('it keeps a small fee')}}
		nodes={[
			{name: 'YOU', sub: '€100 SNEAKERS', at: c.f('You type in your card number')},
			{name: 'PROCESSOR', sub: 'CHECKS FOR FRAUD', at: c.f('checks it for fraud')},
			{name: 'THE SHOP', sub: 'GETS PAID', at: c.f('makes sure the shop gets paid')},
		]} />
));
add('Its first big customers', card({id: 'p1-early', apoio: 'Its first big customers, according to Der Spiegel:', hero: 'ADULT SITES & GAMBLING', complemento: "businesses many banks didn't want to touch", textSide: 'center', object: 'none', heroSize: 105}));
add('In 2002, an Austrian consultant', card({id: 'p1-braun', apoio: '2002: an Austrian consultant invests and becomes CEO:', hero: 'MARKUS BRAUN', textSide: 'left', object: 'chart', heroSize: 150}));
add('Wirecard didn\'t go public the usual way', card({id: 'p1-listing', apoio: '2005: merged into a small listed hotline company.', hero: 'A SHORTCUT', complemento: 'onto the stock market, with fewer questions', textSide: 'center', object: 'none', heroSize: 170, heroUnderline: true}));
add('Then it grew', (s) => (
	<BarsShot id="p1-revenue" start={s} title="Wirecard revenue, on its own accounts" titleAt={s + 4} source={WIKI}
		bars={[
			{label: '2013', value: 482, display: '€482M', at: c.f('four hundred eighty million euros')},
			{label: '2018', value: 2016, display: '€2.0B', at: c.f('more than two billion in 2018'), highlight: true},
		]} />
));
add('Some of those deals looked expensive', (s) => (
	<SplitShot id="p1-india" start={s} title="India deal, 2015: about €340 million" titleAt={s + 4} total={340} totalLabel="€340M" source="Source: Southern Investigative Reporting Foundation (via Wikipedia)"
		pieces={[
			{value: 175, label: 'NEVER REACHED THE SELLERS', display: '≥ €175M', at: c.f('one hundred seventy-five million euros'), highlight: true},
			{value: 165, label: 'THE REST', display: '€165M', at: c.f('three hundred forty million euros')},
		]} />
));
add('In September 2018, Wirecard joined the DAX', photo('p1-frankfurt', {apoio: 'September 2018: joins the DAX, taking the place of Commerzbank. Worth about', hero: '€24 BILLION'}));
add('Braun was the face of it', card({id: 'p1-stake', apoio: 'Braun owned about 7%. In September 2018, his shares:', hero: '€1.6 BILLION+', complemento: '2017: "artificial intelligence"; reportedly, spreadsheets', textSide: 'left', object: 'chart', heroSize: 140}));
add('Here\'s the thing about payments', card({id: 'p1-puzzle', apoio: 'A small slice of each sale. To earn billions, you need', hero: 'AN ENORMOUS NUMBER', complemento: 'of payments. So where were they coming from?', textSide: 'center', object: 'none', heroSize: 105, heroUnderline: true}));

// ---------------- Parte 2 — Partners Nobody Could See ----------------
add('Part 2', card({id: 'p2-title', apoio: 'Part 2', hero: 'PARTNERS NOBODY COULD SEE', textSide: 'center', object: 'none', heroSize: 115, heroUnderline: true}));
add('A big part of the answer', card({id: 'p2-tpa', apoio: 'A business few investors saw up close:', hero: 'THIRD-PARTY ACQUIRING', textSide: 'center', object: 'none', heroSize: 115}));
add('The idea, in Wirecard\'s words', (s) => (
	<RouteShot2 id="p2-idea" start={s} goAt={c.f('local partner companies')}
		nodes={[
			{name: 'WIRECARD', sub: 'NO LICENSE THERE', at: c.f("didn't have the licenses")},
			{name: 'LOCAL PARTNER', sub: 'PROCESSES THE PAYMENTS', at: c.f('local partner companies')},
			{name: 'FEES', sub: 'SHARED WITH WIRECARD', at: c.f('Wirecard got a share of the fees')},
		]} />
));
add('Three partners mattered most', (s) => (
	<DocLinesShot id="p2-partners" start={s} title="The three partners that mattered most" titleAt={s + 4} source="Sources: dpa; Financial Times (via Wikipedia)"
		lines={[
			{label: 'Dubai', value: 'Al Alam', at: c.f('One in Dubai')},
			{label: 'Singapore', value: 'Senjo', at: c.f('One in Singapore')},
			{label: 'Philippines', value: 'PayEasy', at: c.f('one in the Philippines')},
		]} />
));
add('According to reporting by the Financial Times in 2019', photo('p2-dubai', {apoio: 'Those three partners, the FT reported in 2019:', hero: 'HALF THE REVENUE', complemento: 'and almost all the profit'}));
add('There was a catch', card({id: 'p2-escrow', apoio: "The money didn't sit in Wirecard's accounts. It sat in", hero: 'ESCROW', complemento: 'held by a trustee, and counted as cash anyway', textSide: 'left', object: 'coin', heroSize: 190}));
add('Think of it like this', (s) => (
	<RouteShot2 id="p2-friend" start={s} goAt={c.f('with a friend overseas')} stamp={{text: 'JUST A LETTER', at: c.f("Here's a letter from your friend")}}
		nodes={[
			{name: 'YOUR SHOP', sub: '"BIG PROFIT"', at: c.f('You run a shop')},
			{name: 'THE BANK', sub: '"SHOW ME THE CASH"', at: c.f('The bank asks to see the cash')},
			{name: 'A FRIEND OVERSEAS', sub: '"I HAVE IT"', at: c.f('with a friend overseas')},
		]} />
));
add('For years, Wirecard\'s auditors', photo('o-papers', {id: 'p2-letters', apoio: 'Each year, the auditors needed proof the cash was real. Each year:', hero: 'LETTERS'}));
add('A court in Singapore later found', photo('p2-singapore', {apoio: 'A Singapore court: letters confirming almost €1.1 billion for Wirecard were', hero: 'FALSE'}));
add('By 2019, according to Wirecard', card({id: 'p2-hole', apoio: 'By 2019, per Wirecard: escrow in two big Philippine banks.', hero: '€1.9 BILLION', textSide: 'center', object: 'none', heroSize: 200}));
add('That number would become', card({id: 'p2-famous', apoio: 'That number would become', hero: 'THE MOST FAMOUS HOLE', complemento: 'in German corporate history', textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true}));

// ---------------- Parte 3 — Shooting the Messenger (azul-marinho) ----------------
add('Part 3', card({id: 'p3-title', apoio: 'Part 3', hero: 'SHOOTING THE MESSENGER', textSide: 'center', object: 'none', heroSize: 125, heroUnderline: true, dark: true}));
add('The doubts were old', (s) => (
	<TimelineShot id="p3-doubts" start={s} dark title="The doubts were old" source="Source: Wikipedia (Wirecard scandal)"
		events={[
			{year: '2008', label: 'Shareholder group doubts', at: c.f('In 2008')},
			{year: '2015', label: 'FT writers start asking', at: c.f('In 2015')},
			{year: '2016', label: 'Zatarra report alleges fraud', at: c.f('In 2016')},
			{year: 'SHARES', label: 'fall', at: c.f('The shares fell'), gold: true},
		]} />
));
add('Wirecard\'s answer was always the same', card({id: 'p3-answer', apoio: "Wirecard's answer: the critics were short sellers,", hero: 'LYING TO MAKE MONEY', textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true, dark: true}));
add('Germany\'s financial regulator', card({id: 'p3-bafin', apoio: "Germany's regulator, BaFin, opened investigations.", hero: 'INTO THE CRITICS', textSide: 'center', object: 'none', heroSize: 150, heroUnderline: true, dark: true}));
add('And the pressure went further', photo('p3-keyboard', {tone: 'navy', apoio: 'Citizen Lab: critics targeted by hackers-for-hire, some almost daily.', hero: 'HACKED', complemento: 'Wirecard denied any wrongdoing'}));
add('Then, in January 2019', photo('p3-press', {tone: 'navy', apoio: 'January 2019, the FT: a Singapore manager suspected of forging contracts. The source:', hero: 'A WHISTLEBLOWER'}));
add('Here\'s where the story gets strange', (s) => (
	<TimelineShot id="p3-bafin" start={s} dark title="The regulator, BaFin" source="Sources: BaFin (via Wikipedia); AP/PYMNTS"
		events={[
			{year: 'FEB 2019', label: 'Bans new bets against shares', sub: 'for two months', at: c.f('In February 2019')},
			{year: 'APR 2019', label: 'Complaint against 2 FT reporters', at: c.f('In April'), gold: true},
			{year: '2020', label: 'Dropped: no evidence', at: c.f('That case was dropped')},
		]} />
));
add('Investors kept believing', card({id: 'p3-softbank', apoio: '2019: SoftBank puts in about', hero: '€900 MILLION', complemento: 'most analysts stayed positive until early 2020', textSide: 'left', object: 'coin', heroSize: 160, dark: true}));
add('To be fair to those investors', card({id: 'p3-fair', apoio: 'Booming payments. Audited accounts. Critics with a motive.', hero: 'EASY TO BELIEVE', textSide: 'center', object: 'none', heroSize: 150, heroUnderline: true, dark: true}));
add('If you\'re enjoying the story so far', (s) => (
	<SubscribeShot2 id="p3-sub" start={s} dark free="It's free." line1="No escrow needed." line2="No letters from friends overseas."
		at={{ask: s + 4, tap: c.f('subscribing helps'), free: c.f('Because next'), line1: c.f('an outside auditor'), line2: c.f('got permission to look')}} />
));

// ---------------- Parte 4 — Seven Days in June ----------------
add('Part 4', card({id: 'p4-title', apoio: 'Part 4', hero: 'SEVEN DAYS IN JUNE', textSide: 'center', object: 'none', heroSize: 150, heroUnderline: true}));
add('To settle the doubts', card({id: 'p4-kpmg', apoio: 'April 28, 2020. KPMG special audit, partner profits 2016–2018:', hero: "CAN'T VERIFY", complemento: 'shares −26% in a day', textSide: 'center', object: 'none', heroSize: 170, heroUnderline: true}));
add('Wirecard\'s regular auditor, EY', card({id: 'p4-ey', apoio: 'EY asks the Philippine banks directly. June 18, 2020:', hero: 'NOT CONFIRMED', complemento: 'shares −62% that day', textSide: 'center', object: 'none', heroSize: 160, heroUnderline: true}));
add('The two banks were BDO', (s) => (
	<DocLinesShot id="p4-banks" start={s} title="What the Philippines said" titleAt={s + 4} source="Sources: Inquirer; Philstar; Philippine central bank (via PYMNTS)"
		lines={[
			{label: 'BDO and BPI', value: '"not our client"', at: c.f('Wirecard was not their client')},
			{label: 'The documents with their names', value: 'fake', at: c.f('documents carrying their names were fake')},
			{label: 'Central bank', value: 'the money never entered', at: c.f('The Philippine central bank went further'), highlight: true},
			{label: 'Inside the banks', value: 'one employee suspended', at: c.f('One bank suspended an employee')},
		]} />
));
add('Now the week moves fast', (s) => (
	<TimelineShot id="p4-week" start={s} title="One week in June 2020" source="Sources: Wikipedia; Al Jazeera"
		events={[
			{year: 'JUN 19', label: 'Braun resigns', at: c.f('June 19, Braun resigns')},
			{year: 'JUN 22', label: 'Braun arrested', sub: 'he denies wrongdoing', at: c.f('June 22')},
			{year: 'JUN 25', label: 'Insolvency', sub: 'a first for the DAX', at: c.f('June 25'), gold: true},
			{year: '85 DAYS', label: "Interim CEO's tenure", at: c.f('The man brought in')},
		]} />
));
add('One person was already gone', photo('p4-moscow', {tone: 'navy', apoio: 'COO Jan Marsalek: fired, gone. Traced to Belarus, then reportedly Moscow.', hero: 'STILL WANTED', complemento: 'London, 2025: spy ring convicted; prosecutors said he directed it'}));

// ---------------- Parte 5 — Following the Real Money ----------------
add('Part 5', card({id: 'p5-title', apoio: 'Part 5', hero: 'FOLLOWING THE REAL MONEY', textSide: 'center', object: 'none', heroSize: 115, heroUnderline: true}));
add('So, back to our question', card({id: 'p5-where', apoio: 'The €1.9 billion? The administrator and the prosecutors:', hero: 'NOWHERE', complemento: 'it was never there', textSide: 'center', object: 'none', heroSize: 200, heroUnderline: true}));
add('The administrator, Michael', card({id: 'p5-fiction', apoio: 'No trace of the money. A key witness, in court:', hero: '"SYNTHETIC FICTIONS"', textSide: 'center', object: 'none', heroSize: 120}));
add('But that doesn\'t mean no money was lost', card({id: 'p5-real', apoio: 'But real money was lost.', hero: 'IT CAME FROM SOMEWHERE ELSE', textSide: 'center', object: 'none', heroSize: 100, heroUnderline: true}));
add('Follow the cash that actually existed', (s) => (
	<BarsShot id="p5-cash" start={s} title="The money that actually came in" titleAt={s + 4} source="Sources: Reuters (via Business Recorder); Wikipedia"
		bars={[
			{label: 'BANK LOANS', value: 1.75, display: '€1.75B', at: c.f('one point seven five billion euros'), highlight: true},
			{label: 'BONDS', value: 0.5, display: '€0.5B', at: c.f('five hundred million euros in bonds')},
			{label: 'SOFTBANK', value: 0.9, display: '€0.9B', at: c.f('about nine hundred million')},
		]} />
));
add('That was real money, from real lenders', card({id: 'p5-burn', apoio: 'Jaffé testified: Wirecard burned through', hero: '€1.1 BILLION', complemento: 'just to keep running', textSide: 'left', object: 'coin', heroSize: 130}));
add('The banks felt it', (s) => (
	<DocLinesShot id="p5-banks" start={s} title="The banks felt it (reportedly)" titleAt={s + 4} source="Sources: Bloomberg (via American Banker); WSJ (via PYMNTS)"
		lines={[
			{label: 'Commerzbank, the bank it replaced', value: '~€175M set aside', at: c.f('Commerzbank, the same bank')},
			{label: 'ING', value: 'about the same', at: c.f('ING, about the same')},
			{label: 'One slice of the loans, €120M', value: 'sold for ~18¢ per €1', at: c.f('One bank reportedly sold its slice'), highlight: true},
		]} />
));
add('In other words, the fake profits', card({id: 'p5-hiding', apoio: "The fake profits weren't hiding cash. They were hiding", hero: 'A BUSINESS LOSING IT', complemento: 'damage, per prosecutors: about €3 billion', textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true}));
add('And then there are the shareholders', (s) => (
	<StatsShot id="p5-shareholders" start={s} title="The insolvency" titleAt={s + 4} source="Sources: Stuttgarter Zeitung; Federal Court of Justice (via LTO)"
		items={[
			{value: '€15.4B', label: 'claims filed', at: c.f('fifteen point four billion euros')},
			{value: '~€650M', label: 'in the estate', at: c.f('six hundred fifty million')},
			{value: '~50,000', label: 'shareholders expected to get nothing', at: c.f('About fifty thousand shareholders')},
		]} />
));
add('What was left of the real business', card({id: 'p5-sold', apoio: 'Sold off: core technology to Santander. That money goes', hero: 'TO THE CREDITORS', complemento: 'not the shareholders', textSide: 'center', object: 'none', heroSize: 130}));

// ---------------- Parte 6 — So, Where Did It Go? ----------------
add('Part 6', card({id: 'p6-title', apoio: 'Part 6', hero: 'SO, WHERE DID IT GO?', textSide: 'center', object: 'none', heroSize: 140, heroUnderline: true}));
add('The one point nine billion euros never sat', card({id: 'p6-paper', apoio: 'The €1.9 billion existed only', hero: 'ON PAPER', complemento: 'in contracts and bank letters that turned out to be false', textSide: 'center', object: 'none', heroSize: 200, heroUnderline: true}));
add('The money that really disappeared', (s) => (
	<DocLinesShot id="p6-who" start={s} title="The money that really disappeared" titleAt={s + 4} source="Source: Munich civil court ruling, 2024 (via Wikipedia)"
		lines={[
			{label: 'Came from', value: 'lenders, bondholders, shareholders', at: c.f('lenders, bondholders and shareholders')},
			{label: 'Paid for', value: 'a company losing money', at: c.f('a company that was losing money')},
			{label: 'Went out as', value: "loans that shouldn't have been approved", at: c.f('should never have been approved')},
			{label: 'Civil damages: Braun + 2 ex-executives', value: '€140M', at: c.f('one hundred forty million euros'), highlight: true},
		]} />
));
add('What about the watchdogs', (s) => (
	<DocLinesShot id="p6-watchdogs" start={s} title="The watchdogs" titleAt={s + 4} source="Sources: Finextra (APAS decision, 2023); Wikipedia"
		lines={[
			{label: 'EY', value: '€500,000 fine', at: c.f('five hundred thousand euros')},
			{label: 'EY', value: '2 years without new large listed clients', at: c.f('for two years')},
			{label: 'BaFin chief', value: '"a complete disaster"; left in 2021', at: c.f('a complete disaster'), highlight: true},
		]} />
));
add('And some people did make money', card({id: 'p6-shorts', apoio: 'The people Wirecard called liars:', hero: 'SHORT SELLERS PROFITED', textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true}));
add('In Singapore, at least four people', photo('p6-court', {apoio: 'Singapore: at least 4 sentenced. January 2026, the man whose firm sent the false letters:', hero: '10 YEARS'}));
add('In Munich, Markus Braun has been on trial', card({id: 'p6-trial', apoio: 'On trial since December 2022. Braun denies all the charges.', hero: 'PRESUMED INNOCENT', complemento: 'verdict expected around the end of 2026', textSide: 'center', object: 'none', heroSize: 120, heroUnderline: true}));
add('The missing two billion was never in a bank', card({id: 'p6-final', apoio: 'The missing two billion was never in a bank.', hero: 'IT WAS IN A SPREADSHEET', textSide: 'center', object: 'none', heroSize: 110, heroUnderline: true, dark: true}));

// ---------------- Fechamento ----------------
add('Next time', photo('c-next', {tone: 'navy', apoio: 'Next: pay in four, no interest.', hero: "WHO'S PAYING?"}));
add('And if you want the other side', (s) => (
	<SisterShot id="c-sister" start={s} at={{ships: c.f('the ships'), planes: c.f('planes'), rockets: c.f('rockets'), name: c.f('Cargo and Capital')}} />
));
add('This is Billions and Bulls. This video', (s) => (
	<EndShot id="c-end" start={s} at={{sign: s + 4, disclaimer: c.f('This video explains'), subscribe: c.f('Subscribe'), endscreen: c.f('following the money') + 40}} />
));

export const Ep07 = () => <E.Episode voice="audio/ep07-voice.wav" music={(timeline as Timeline).provisional ? undefined : 'audio/ep07-heist.wav'} />;
export const EP07_FRAMES = E.frames;
