import React from 'react';
import {FONT, GOLD, INK, SOFT} from '../brand';

// Comprovante de ordem (genérico, sem marca). 520×760, com a borda de baixo serrilhada.
export const Receipt: React.FC = () => {
	const teeth = Array.from({length: 13}, (_, i) => `L ${500 - i * 40} 760 L ${480 - i * 40} 740`).join(' ');
	const row = (y: number, label: string, value: string, strong = false) => (
		<g>
			<text x={50} y={y} fontFamily={FONT} fontSize={30} fill={strong ? INK : SOFT} fontWeight={strong ? 700 : 400}>
				{label}
			</text>
			<text x={470} y={y} fontFamily={FONT} fontSize={30} fill={strong ? GOLD : INK} fontWeight={700} textAnchor="end">
				{value}
			</text>
		</g>
	);
	return (
		<svg width={520} height={760} viewBox="0 0 520 760">
			<path d={`M 0 0 L 520 0 L 520 740 ${teeth} Z`} fill="#FBFAF6" />
			<text x={50} y={90} fontFamily={FONT} fontWeight={600} fontSize={24} fill={SOFT} letterSpacing={4}>
				TRADE CONFIRMATION
			</text>
			<text x={50} y={160} fontFamily={FONT} fontWeight={700} fontSize={44} fill={INK}>
				Buy · 1 share
			</text>
			<line x1={50} x2={470} y1={215} y2={215} stroke={SOFT} strokeOpacity={0.4} strokeDasharray="6 8" strokeWidth={2} />
			{row(290, 'Commission', '$0.00')}
			{row(360, 'Exchange fee', '$0.00')}
			{row(430, 'Platform fee', '$0.00')}
			<line x1={50} x2={470} y1={495} y2={495} stroke={SOFT} strokeOpacity={0.4} strokeDasharray="6 8" strokeWidth={2} />
			{row(575, 'You paid', '$0.00', true)}
		</svg>
	);
};
