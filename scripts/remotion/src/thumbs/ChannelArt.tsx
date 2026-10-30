import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Background} from '../components/Background';
import {Coin} from '../objects/Coin';
import {DARK, ensureFonts, FONT, GOLD, INK, NAVY} from '../brand';

ensureFonts();

// Identidade do canal no YouTube.
// Banner 2560×1440: tudo o que importa fica na área segura central de 1546×423 (x 507–2053, y 508–931),
// que é o que aparece no celular; o resto é só papel e o rastro do ponto dourado (aparece na TV).

export const Banner: React.FC = () => (
	<AbsoluteFill>
		<Background id="banner" drift={0} lines={false} />
		<AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,250,0.5) 0%, rgba(255,255,250,0) 55%)'}} />
		<svg width={2560} height={1440} style={{position: 'absolute', inset: 0}}>
			{/* o ponto dourado entra pela esquerda e para ao lado do nome */}
			<path d="M -40 1150 C 300 1080, 380 760, 640 720" fill="none" stroke={GOLD} strokeWidth={10} strokeLinecap="round" strokeDasharray="6 22" />
			<path d="M 2060 720 C 2250 690, 2380 520, 2620 470" fill="none" stroke={GOLD} strokeWidth={10} strokeLinecap="round" strokeDasharray="6 22" strokeOpacity={0.6} />
		</svg>
		<div style={{position: 'absolute', left: 560, top: 560, width: 300, height: 300, filter: 'drop-shadow(10px 16px 18px rgba(40,38,34,0.35))'}}>
			<div style={{transform: 'scale(0.536)', transformOrigin: 'top left'}}>
				<Coin />
			</div>
		</div>
		<div style={{position: 'absolute', left: 920, top: 560, fontFamily: FONT}}>
			<div style={{fontSize: 132, fontWeight: 900, color: DARK, letterSpacing: -4, lineHeight: 1}}>BILLIONS &amp; BULLS</div>
			<div style={{position: 'relative', marginTop: 26, width: 'fit-content'}}>
				<div style={{position: 'absolute', left: -8, right: -10, top: 30, height: 34, background: GOLD, borderRadius: 6, transform: 'rotate(-1deg)'}} />
				<div style={{position: 'relative', fontSize: 58, fontWeight: 700, color: DARK}}>Money stories. Follow the money.</div>
			</div>
			<div style={{fontSize: 40, fontWeight: 600, color: INK, letterSpacing: 6, marginTop: 30}}>NEW STORY EVERY TUESDAY</div>
		</div>
	</AbsoluteFill>
);

// Foto de perfil 800×800 (o YouTube recorta em círculo)
export const Avatar: React.FC = () => (
	<AbsoluteFill style={{background: `radial-gradient(circle at 40% 35%, #1D375E 0%, ${NAVY} 70%)`, alignItems: 'center', justifyContent: 'center'}}>
		<div style={{transform: 'scale(1.12)'}}>
			<Coin />
		</div>
	</AbsoluteFill>
);

// Marca d'água de inscrição 150×150 (fundo transparente)
export const Watermark: React.FC = () => (
	<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
		<div style={{transform: 'scale(0.26)'}}>
			<Coin />
		</div>
	</AbsoluteFill>
);
