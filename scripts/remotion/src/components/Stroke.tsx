import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {getLength} from '@remotion/paths';
import {LINE} from '../brand';

// "Respiro vivo": traço grosso e translúcido que se desenha depois que o texto fica pronto.
export const Stroke: React.FC<{d: string; start: number; duration: number; width?: number; opacity?: number}> = ({
	d,
	start,
	duration,
	width = 30,
	opacity = 0.5,
}) => {
	const frame = useCurrentFrame();
	const len = getLength(d);
	const p = interpolate(frame, [start, start + duration], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.inOut(Easing.cubic),
	});
	return (
		<path
			d={d}
			fill="none"
			stroke={LINE}
			strokeOpacity={opacity}
			strokeWidth={width}
			strokeLinecap="butt"
			strokeDasharray={len}
			strokeDashoffset={len * (1 - p)}
		/>
	);
};
