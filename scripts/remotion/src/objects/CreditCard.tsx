import React from 'react';
import {FONT, GOLD, NAVY} from '../brand';

// Cartão desenhado em SVG (sem marca real). 900×568, proporção de cartão de verdade.
export const CreditCard: React.FC = () => (
	<svg width={900} height={568} viewBox="0 0 900 568">
		<defs>
			<linearGradient id="cc-body" x1="0" y1="0" x2="1" y2="0.4">
				<stop offset="0" stopColor={NAVY} />
				<stop offset="1" stopColor="#1C3052" />
			</linearGradient>
			<clipPath id="cc-clip">
				<rect width={900} height={568} rx={42} />
			</clipPath>
		</defs>
		<g clipPath="url(#cc-clip)">
			<rect width={900} height={568} fill="url(#cc-body)" />
			<polygon points="405,0 675,0 315,568 45,568" fill="#FFFFFF" fillOpacity={0.07} />
		</g>
		<rect x={90} y={190} width={125} height={95} rx={14} fill={GOLD} />
		<line x1={90} y1={222} x2={215} y2={222} stroke="#96781E" strokeWidth={3} />
		<line x1={90} y1={254} x2={215} y2={254} stroke="#96781E" strokeWidth={3} />
		<line x1={152} y1={190} x2={152} y2={285} stroke="#96781E" strokeWidth={3} />
		<text x={90} y={410} fontFamily={FONT} fontSize={46} fill="#CDD2DA" letterSpacing={4}>
			•••• •••• •••• 4242
		</text>
		<text x={90} y={500} fontFamily={FONT} fontWeight={700} fontSize={30} fill={GOLD} letterSpacing={2}>
			B&amp;B PLATINUM
		</text>
	</svg>
);
