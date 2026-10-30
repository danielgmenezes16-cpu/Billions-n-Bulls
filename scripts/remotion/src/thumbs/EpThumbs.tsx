import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Background} from '../components/Background';
import {DARK, ensureFonts, FONT, GOLD, INK, NAVY} from '../brand';

ensureFonts();

// Thumbnails a partir do ep. 2, na estrutura fixa do blueprint:
// papel quadriculado (ou azul-marinho), frase de 2 a 3 palavras, gráfico com dado real em dourado
// e o ponto dourado que segue o dinheiro. Canto inferior direito sempre livre (duração do vídeo).

const W = 1280;
const H = 720;

const Spot: React.FC = () => (
	<AbsoluteFill style={{background: 'radial-gradient(ellipse at 40% 45%, rgba(255,255,250,0.55) 0%, rgba(255,255,250,0) 62%)'}} />
);
const Vignette: React.FC<{dark?: boolean}> = ({dark}) => (
	<AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0) 55%, ${dark ? 'rgba(0,0,0,0.5)' : 'rgba(46,45,43,0.34)'} 100%)`}} />
);
const NavyBg: React.FC<{id: string}> = ({id}) => (
	<AbsoluteFill style={{background: `radial-gradient(ellipse at 36% 46%, #1D375E 0%, ${NAVY} 58%, #050C17 100%)`}}>
		<svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
			<defs>
				<pattern id={`${id}-grid`} width={60} height={60} patternUnits="userSpaceOnUse">
					<path d="M 60 0 L 0 0 0 60" fill="none" stroke="#FFFFFF" strokeOpacity={0.05} strokeWidth={1.5} />
				</pattern>
			</defs>
			<rect width={W} height={H} fill={`url(#${id}-grid)`} />
		</svg>
	</AbsoluteFill>
);

// Frase grande (até 3 palavras), com marca-texto dourado opcional atrás de uma linha
const Words: React.FC<{lines: string[]; size: number; x: number; y: number; dark?: boolean; mark?: number; sub?: string}> = ({lines, size, x, y, dark, mark, sub}) => (
	<div style={{position: 'absolute', left: x, top: y, fontFamily: FONT}}>
		{lines.map((l, i) => (
			<div key={i} style={{position: 'relative', display: 'block', width: 'fit-content'}}>
				{mark === i ? <div style={{position: 'absolute', left: -10, right: -14, top: size * 0.5, height: size * 0.46, background: GOLD, borderRadius: 10, transform: 'rotate(-2deg)'}} /> : null}
				<div style={{position: 'relative', fontSize: size, fontWeight: 900, color: dark ? '#F4F3EE' : DARK, letterSpacing: -size * 0.035, lineHeight: 0.98}}>{l}</div>
			</div>
		))}
		{sub ? <div style={{fontSize: 40, fontWeight: 700, color: dark ? '#C9D1DC' : INK, letterSpacing: 3, marginTop: 16}}>{sub}</div> : null}
	</div>
);

type Bar = {label: string; value: number; display: string; gold?: boolean; negative?: boolean};
// Barras verticais com rótulos; o ponto dourado pousa no topo da barra dourada
const Bars: React.FC<{bars: Bar[]; x: number; base: number; maxH: number; bw?: number; gap?: number; dark?: boolean; dot?: boolean; min?: number}> = ({bars, x, base, maxH, bw = 150, gap = 40, dark, dot = true, min = 6}) => {
	const max = Math.max(...bars.map((b) => b.value));
	const ink = dark ? '#E6EAF0' : DARK;
	return (
		<svg width={W} height={H} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
			<line x1={x - 20} x2={x + bars.length * (bw + gap)} y1={base} y2={base} stroke={dark ? '#E6EAF0' : INK} strokeOpacity={0.5} strokeWidth={4} />
			{bars.map((b, i) => {
				const h = Math.max(min, (maxH * b.value) / max);
				const bx = x + i * (bw + gap);
				return (
					<g key={i}>
						<rect x={bx} y={base - h} width={bw} height={h} rx={8} fill={b.gold ? GOLD : ink} fillOpacity={b.gold ? 1 : 0.72} />
						<text x={bx + bw / 2} y={base - h - 18} fontFamily={FONT} fontWeight={900} fontSize={46} fill={b.gold ? GOLD : ink} textAnchor="middle">{b.display}</text>
						<text x={bx + bw / 2} y={base + 40} fontFamily={FONT} fontWeight={700} fontSize={24} fill={dark ? '#AEB6C2' : INK} textAnchor="middle" letterSpacing={3}>{b.label}</text>
						{b.gold && dot ? <circle cx={bx + bw / 2} cy={base - h - 92} r={18} fill={GOLD} /> : null}
					</g>
				);
			})}
		</svg>
	);
};

// ---------------- Ep. 2 — Visa ----------------
const E2A = () => (
	<AbsoluteFill>
		<Background id="t2A" drift={0} lines={false} />
		<Spot />
		<Words lines={['SAME', '$100?']} size={196} x={60} y={150} mark={1} sub="WHAT YOUR BANK GETS" />
		<Bars x={690} base={560} maxH={330} bw={140} gap={40}
			bars={[{label: 'DEBIT', value: 0.27, display: '27¢'}, {label: 'BASIC', value: 1.53, display: '$1.53'}, {label: 'PREMIUM', value: 2.4, display: '$2.40', gold: true}]} />
		<Vignette />
	</AbsoluteFill>
);
const E2B = () => (
	<AbsoluteFill>
		<Background id="t2B" drift={0} lines={false} />
		<Spot />
		<Words lines={['WHO', 'PAYS?']} size={186} x={56} y={170} sub="FOR YOUR POINTS" />
		<Bars x={820} base={560} maxH={330} bw={150} gap={50}
			bars={[{label: 'CASH', value: 149, display: '−$149'}, {label: 'CARDS', value: 1133, display: '+$1,133', gold: true}]} />
		<svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
			<path d="M 895 470 C 900 330, 960 220, 1010 130" fill="none" stroke={GOLD} strokeWidth={8} strokeLinecap="round" strokeDasharray="4 16" />
		</svg>
		<Vignette />
	</AbsoluteFill>
);
const E2C = () => (
	<AbsoluteFill>
		<NavyBg id="t2C" />
		<div style={{position: 'absolute', left: 60, top: 80, fontFamily: FONT, fontWeight: 900, fontSize: 470, lineHeight: 1, letterSpacing: -24,
			backgroundImage: 'linear-gradient(170deg, #F2D57E 0%, #D4AF37 50%, #A07D1E 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', paddingRight: 30}}>
			9×
		</div>
		<Words lines={['MORE']} size={150} x={70} y={520} dark />
		<Bars x={820} base={520} maxH={330} bw={130} gap={50} dark
			bars={[{label: 'DEBIT', value: 0.27, display: '27¢'}, {label: 'PREMIUM', value: 2.4, display: '$2.40', gold: true}]} />
		<Vignette dark />
	</AbsoluteFill>
);

// ---------------- Ep. 3 — Credit Suisse ----------------
const E3A = () => (
	<AbsoluteFill>
		<Background id="t3A" drift={0} lines={false} />
		<Spot />
		<Words lines={['167', 'YEARS']} size={200} x={60} y={110} mark={0} />
		<svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
			{/* 167 anos numa barra; o fim de semana é o tracinho dourado na ponta */}
			<rect x={70} y={520} width={1000} height={46} rx={8} fill={DARK} fillOpacity={0.75} />
			<rect x={1070} y={508} width={12} height={70} rx={3} fill={GOLD} />
			<text x={70} y={612} fontFamily={FONT} fontWeight={700} fontSize={30} fill={INK} letterSpacing={3}>1856</text>
			<text x={1076} y={490} fontFamily={FONT} fontWeight={900} fontSize={34} fill={DARK} textAnchor="middle" letterSpacing={2}>2 DAYS</text>
			<circle cx={1076} cy={430} r={18} fill={GOLD} />
			<path d="M 1076 412 C 1076 330, 1010 260, 960 230" fill="none" stroke={GOLD} strokeWidth={8} strokeLinecap="round" strokeDasharray="4 16" />
		</svg>
		<Vignette />
	</AbsoluteFill>
);
const E3B = () => (
	<AbsoluteFill>
		<Background id="t3B" drift={0} lines={false} />
		<Spot />
		<Words lines={['TO', 'ZERO']} size={210} x={60} y={150} mark={1} sub="CHF 16 BILLION OF BONDS" />
		<svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
			<line x1={760} x2={1180} y1={560} y2={560} stroke={INK} strokeOpacity={0.5} strokeWidth={4} />
			<rect x={800} y={150} width={170} height={410} rx={8} fill="none" stroke={DARK} strokeWidth={5} strokeDasharray="14 12" />
			<text x={885} y={128} fontFamily={FONT} fontWeight={900} fontSize={44} fill={DARK} textAnchor="middle">16B</text>
			<rect x={1010} y={552} width={150} height={8} rx={3} fill={GOLD} />
			<text x={1085} y={520} fontFamily={FONT} fontWeight={900} fontSize={52} fill={GOLD} textAnchor="middle">0</text>
			<circle cx={1085} cy={460} r={18} fill={GOLD} />
			<path d="M 885 160 C 960 170, 1060 300, 1085 440" fill="none" stroke={GOLD} strokeWidth={8} strokeLinecap="round" strokeDasharray="4 16" />
		</svg>
		<Vignette />
	</AbsoluteFill>
);
const E3C = () => (
	<AbsoluteFill>
		<NavyBg id="t3C" />
		<Words lines={['THE', 'RUN']} size={230} x={60} y={130} dark sub="CHF PULLED OUT" />
		<Bars x={760} base={540} maxH={360} bw={160} gap={60} dark
			bars={[{label: 'Q4 2022', value: 110.5, display: '110B', gold: true}, {label: 'Q1 2023', value: 61.2, display: '61B'}]} />
		<Vignette dark />
	</AbsoluteFill>
);

// ---------------- Ep. 4 — Poupança ----------------
const E4A = () => (
	<AbsoluteFill>
		<Background id="t4A" drift={0} lines={false} />
		<Spot />
		<Words lines={['$1', 'A YEAR']} size={200} x={60} y={120} mark={0} sub="ON $10,000" />
		<Bars x={880} base={560} maxH={360} bw={140} gap={60} min={4}
			bars={[{label: 'YOU, 0.01%', value: 1, display: '$1'}, {label: 'BANK, 3.9%', value: 390, display: '$390', gold: true}]} />
		<Vignette />
	</AbsoluteFill>
);
// Juro do Fed × média de poupança da FDIC, 2022–2024 (valores aproximados de fim de período)
const FED = [0.08, 0.33, 1.58, 3.08, 4.33, 4.83, 5.08, 5.33, 5.33, 5.33, 5.33];
const SAV = [0.06, 0.06, 0.08, 0.13, 0.33, 0.37, 0.42, 0.45, 0.47, 0.46, 0.45];
const line = (v: number[], x0: number, x1: number, base: number, k: number) =>
	v.map((y, i) => `${i ? 'L' : 'M'} ${x0 + ((x1 - x0) * i) / (v.length - 1)} ${base - y * k}`).join(' ');
const E4B = () => (
	<AbsoluteFill>
		<Background id="t4B" drift={0} lines={false} />
		<Spot />
		<Words lines={['THE', 'GAP']} size={220} x={60} y={150} mark={1} />
		<svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
			<line x1={640} x2={1200} y1={560} y2={560} stroke={INK} strokeOpacity={0.5} strokeWidth={4} />
			<path d={line(FED, 660, 1180, 560, 66)} fill="none" stroke={GOLD} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
			<path d={line(SAV, 660, 1180, 560, 66)} fill="none" stroke={DARK} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
			<text x={1180} y={180} fontFamily={FONT} fontWeight={900} fontSize={44} fill={GOLD} textAnchor="end">FED 5%+</text>
			<text x={1180} y={520} fontFamily={FONT} fontWeight={900} fontSize={40} fill={DARK} textAnchor="end">SAVINGS 0.47%</text>
			<text x={660} y={604} fontFamily={FONT} fontWeight={700} fontSize={24} fill={INK} letterSpacing={3}>2022</text>
			<circle cx={1180} cy={560 - 5.33 * 66} r={18} fill={GOLD} />
		</svg>
		<Vignette />
	</AbsoluteFill>
);
const E4C = () => (
	<AbsoluteFill>
		<NavyBg id="t4C" />
		<div style={{position: 'absolute', left: 60, top: 60, fontFamily: FONT, fontWeight: 900, fontSize: 470, lineHeight: 1, letterSpacing: -24,
			backgroundImage: 'linear-gradient(170deg, #F2D57E 0%, #D4AF37 50%, #A07D1E 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', paddingRight: 30}}>
			1%
		</div>
		<Words lines={['ONLY']} size={140} x={70} y={520} dark />
		<svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
			{/* o e-mail sobre a conta melhor: só 1% de quem leu fez algo */}
			<g transform="translate(880 200) rotate(-6)">
				<rect x={0} y={0} width={300} height={200} rx={14} fill="#F4F3EE" />
				<path d="M 0 10 L 150 120 L 300 10" fill="none" stroke={DARK} strokeWidth={8} strokeLinejoin="round" />
				<circle cx={280} cy={10} r={30} fill={GOLD} />
			</g>
		</svg>
		<Vignette dark />
	</AbsoluteFill>
);

const MAP = {'2A': E2A, '2B': E2B, '2C': E2C, '3A': E3A, '3B': E3B, '3C': E3C, '4A': E4A, '4B': E4B, '4C': E4C};
export type EpThumbProps = {v: keyof typeof MAP};
export const EpThumb: React.FC<EpThumbProps> = ({v}) => {
	const C = MAP[v];
	return <C />;
};
export const EP_THUMBS = Object.keys(MAP) as (keyof typeof MAP)[];
