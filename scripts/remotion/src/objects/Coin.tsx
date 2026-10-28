import React from 'react';
import {FONT, GOLD, NAVY} from '../brand';

// Moeda dourada com o monograma B&B. 560×560.
export const Coin: React.FC = () => (
	<svg width={560} height={560} viewBox="0 0 560 560">
		<defs>
			<radialGradient id="coin-face" cx="0.38" cy="0.32" r="0.8">
				<stop offset="0" stopColor="#F1D77A" />
				<stop offset="0.55" stopColor={GOLD} />
				<stop offset="1" stopColor="#9C7A1F" />
			</radialGradient>
		</defs>
		<circle cx={280} cy={280} r={270} fill="url(#coin-face)" />
		<circle cx={280} cy={280} r={232} fill="none" stroke="#9C7A1F" strokeWidth={6} strokeOpacity={0.7} />
		<circle cx={280} cy={280} r={218} fill="none" stroke="#F6E3A1" strokeWidth={2} strokeOpacity={0.8} />
		<text x={280} y={322} fontFamily={FONT} fontWeight={700} fontSize={128} fill={NAVY} textAnchor="middle" letterSpacing={-4}>
			B&amp;B
		</text>
		<text x={280} y={396} fontFamily={FONT} fontWeight={600} fontSize={22} fill={NAVY} textAnchor="middle" letterSpacing={6} fillOpacity={0.8}>
			EST. 2026
		</text>
	</svg>
);
