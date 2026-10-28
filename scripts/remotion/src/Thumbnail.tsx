import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Background} from './components/Background';
import {Phone} from './objects/Phone';
import {Receipt} from './objects/Receipt';
import {DARK, ensureFonts, FONT, GOLD, INK, NAVY} from './brand';

ensureFonts();

// Thumbnails do episódio 1 (1280×720), feitas com os mesmos objetos do vídeo.
// Regras: no máximo 3 palavras, texto com 1/4 da altura, canto inferior direito livre (duração do vídeo).
export type ThumbProps = {variant: 'A' | 'B' | 'C' | 'D'};

const BUY_GREEN = '#1FAF66'; // verde universal de "comprar" nos apps de corretora
const STAMP_RED = '#C8372D';
const shadow = 'drop-shadow(16px 24px 24px rgba(40,38,34,0.40))';

const Spot: React.FC = () => (
	<AbsoluteFill style={{background: 'radial-gradient(ellipse at 40% 45%, rgba(255,255,250,0.55) 0%, rgba(255,255,250,0) 62%)'}} />
);
const Vignette: React.FC<{dark?: boolean}> = ({dark}) => (
	<AbsoluteFill
		style={{background: `radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0) 55%, ${dark ? 'rgba(0,0,0,0.5)' : 'rgba(46,45,43,0.34)'} 100%)`}}
	/>
);

// A: o celular de $0 solta a trilha dourada até $40M
const VariantA: React.FC = () => (
	<AbsoluteFill>
		<Background id="tA" drift={0} lines={false} />
		<Spot />
		<div style={{position: 'absolute', left: 64, top: 70, transform: 'rotate(-7deg) scale(0.68)', transformOrigin: 'top left', filter: shadow}}>
			<Phone buyColor={BUY_GREEN} amount="$0.00" />
		</div>
		<svg width={1280} height={720} style={{position: 'absolute', inset: 0}}>
			<path d="M 372 318 C 466 282, 494 398, 576 372" stroke={GOLD} strokeWidth={15} fill="none" strokeLinecap="round" />
			<path d="M 548 338 L 592 368 L 554 404" stroke={GOLD} strokeWidth={15} fill="none" strokeLinecap="round" strokeLinejoin="round" />
			<circle cx={372} cy={318} r={15} fill={GOLD} />
		</svg>
		<div style={{position: 'absolute', left: 640, top: 200, fontFamily: FONT}}>
			<div style={{position: 'relative', display: 'inline-block'}}>
				<div style={{position: 'absolute', left: -10, right: -14, top: 112, height: 94, background: GOLD, borderRadius: 10, transform: 'rotate(-2deg)'}} />
				<div style={{position: 'relative', fontSize: 204, fontWeight: 900, color: DARK, letterSpacing: -8, lineHeight: 1}}>$40M</div>
			</div>
			<div style={{fontSize: 56, fontWeight: 700, color: INK, letterSpacing: 6, marginTop: 14, marginLeft: 6}}>A MONTH</div>
		</div>
		<Vignette />
	</AbsoluteFill>
);

// B: o comprovante de $0.00 com um carimbo "FREE?"
const VariantB: React.FC = () => (
	<AbsoluteFill>
		<Background id="tB" drift={0} lines={false} />
		<Spot />
		<div style={{position: 'absolute', left: 28, top: 40, transform: 'rotate(-6deg) scale(0.86)', transformOrigin: 'top left', filter: shadow}}>
			<div style={{position: 'relative', width: 520, height: 760}}>
				<Receipt />
				<svg width={520} height={760} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
					<ellipse cx={392} cy={563} rx={112} ry={54} fill="none" stroke={GOLD} strokeWidth={9} transform="rotate(-4 392 563)" />
				</svg>
			</div>
		</div>
		<div
			style={{
				position: 'absolute',
				left: 548,
				top: 250,
				transform: 'rotate(-11deg)',
				border: `16px solid ${STAMP_RED}`,
				borderRadius: 28,
				padding: '6px 36px 14px',
				color: STAMP_RED,
				fontFamily: FONT,
				fontWeight: 900,
				fontSize: 172,
				letterSpacing: 2,
				lineHeight: 1,
				opacity: 0.93,
			}}
		>
			FREE?
		</div>
		<Vignette />
	</AbsoluteFill>
);

// C: azul-marinho, "$0" dourado riscado e "NOT FREE"
const VariantC: React.FC = () => (
	<AbsoluteFill style={{background: `radial-gradient(ellipse at 36% 46%, #1D375E 0%, ${NAVY} 58%, #050C17 100%)`}}>
		<svg width={1280} height={720} style={{position: 'absolute', inset: 0}}>
			<defs>
				<pattern id="tC-grid" width={60} height={60} patternUnits="userSpaceOnUse">
					<path d="M 60 0 L 0 0 0 60" fill="none" stroke="#FFFFFF" strokeOpacity={0.05} strokeWidth={1.5} />
				</pattern>
			</defs>
			<rect width={1280} height={720} fill="url(#tC-grid)" />
		</svg>
		<div
			style={{
				position: 'absolute',
				left: 64,
				top: 104,
				paddingRight: 40,
				fontFamily: FONT,
				fontWeight: 900,
				fontSize: 480,
				lineHeight: 1,
				letterSpacing: -22,
				backgroundImage: 'linear-gradient(170deg, #F2D57E 0%, #D4AF37 50%, #A07D1E 100%)',
				WebkitBackgroundClip: 'text',
				backgroundClip: 'text',
				color: 'transparent',
			}}
		>
			$0
		</div>
		<svg width={1280} height={720} style={{position: 'absolute', inset: 0}}>
			<line x1={70} y1={580} x2={650} y2={230} stroke="#E5484D" strokeWidth={40} strokeLinecap="round" />
		</svg>
		<div style={{position: 'absolute', left: 716, top: 190, fontFamily: FONT, fontWeight: 900, fontSize: 176, lineHeight: 0.98, color: '#F4F3EE', letterSpacing: -5}}>
			NOT
			<br />
			FREE
		</div>
		<Vignette dark />
	</AbsoluteFill>
);

// D (blueprint): frase curta + gráfico com dado real (receitas do 4º tri de 2025) + o ponto dourado
const VariantD: React.FC = () => {
	const bars = [
		{label: 'STOCKS', value: 94, display: '$94M'},
		{label: 'OPTIONS', value: 314, display: '$314M'},
		{label: 'INTEREST', value: 411, display: '$411M', gold: true},
	];
	const base = 560;
	const maxH = 400;
	return (
		<AbsoluteFill>
			<Background id="tD" drift={0} lines={false} />
			<Spot />
			<div style={{position: 'absolute', left: 60, top: 150, fontFamily: FONT, fontWeight: 900, fontSize: 210, lineHeight: 0.95, color: DARK, letterSpacing: -8}}>
				FREE?
			</div>
			<div style={{position: 'absolute', left: 70, top: 370, fontFamily: FONT, fontWeight: 700, fontSize: 44, color: INK, letterSpacing: 2}}>
				$0 trades.
			</div>
			<svg width={1280} height={720} style={{position: 'absolute', inset: 0}}>
				<line x1={640} x2={1200} y1={base} y2={base} stroke={INK} strokeOpacity={0.5} strokeWidth={4} />
				{bars.map((b, i) => {
					const h = (maxH * b.value) / 411;
					const x = 660 + i * 180;
					return (
						<g key={b.label}>
							<rect x={x} y={base - h} width={140} height={h} rx={8} fill={b.gold ? GOLD : DARK} fillOpacity={b.gold ? 1 : 0.75} />
							<text x={x + 70} y={base - h - 18} fontFamily={FONT} fontWeight={900} fontSize={40} fill={DARK} textAnchor="middle">{b.display}</text>
							<text x={x + 70} y={base + 44} fontFamily={FONT} fontWeight={700} fontSize={26} fill={INK} textAnchor="middle" letterSpacing={3}>{b.label}</text>
						</g>
					);
				})}
				{/* o ponto dourado: o dinheiro que não aparece no comprovante */}
				<circle cx={1090} cy={base - 400 - 70} r={18} fill={GOLD} />
				<path d="M 300 470 C 520 520, 820 120, 1072 88" fill="none" stroke={GOLD} strokeWidth={8} strokeLinecap="round" strokeDasharray="4 16" />
			</svg>
			<Vignette />
		</AbsoluteFill>
	);
};

export const Thumbnail: React.FC<ThumbProps> = ({variant}) =>
	variant === 'A' ? <VariantA /> : variant === 'B' ? <VariantB /> : variant === 'D' ? <VariantD /> : <VariantC />;
