import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {GOLD, INK} from '../brand';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Barras douradas crescendo (ilustrativas, sem dados). 760×720.
// Crescem devagar desde o começo da cena e disparam em `growFrame`.
export const Chart: React.FC<{growFrame?: number}> = ({growFrame = 30}) => {
	const frame = useCurrentFrame();
	const heights = [0.22, 0.33, 0.41, 0.56, 0.74, 1];
	const bw = 92;
	const gap = 34;
	const base = 680;
	const maxH = 600;
	return (
		<svg width={760} height={720} viewBox="0 0 760 720">
			<line x1={0} x2={760} y1={base} y2={base} stroke={INK} strokeOpacity={0.5} strokeWidth={3} />
			{heights.map((h, i) => {
				const slow = interpolate(frame, [0, growFrame], [0.18, 0.3], clamp);
				const surge = interpolate(frame, [growFrame + i * 2, growFrame + i * 2 + 14], [0, 1], {
					...clamp,
					easing: Easing.out(Easing.cubic),
				});
				const k = slow + (1 - slow) * surge;
				const height = h * maxH * k;
				const x = 40 + i * (bw + gap);
				return <rect key={i} x={x} y={base - height} width={bw} height={height} rx={6} fill={GOLD} fillOpacity={0.45 + i * 0.11} />;
			})}
		</svg>
	);
};
