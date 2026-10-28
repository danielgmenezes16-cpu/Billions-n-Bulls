import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {LINE, NAVY, PAPER} from '../brand';

// Fundo de papel com grade (~8% da altura do quadro) e duas linhas finas na diagonal.
// Desenhado 60% maior que o quadro para o zoom-out nunca mostrar borda.
export const Background: React.FC<{id: string; drift?: number; lines?: boolean; dark?: boolean}> = ({id, drift = 0.6, lines = true, dark = false}) => {
	const bg = dark ? NAVY : PAPER;
	const ln = dark ? '#2B3D58' : LINE;
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();
	const cell = Math.round(height * 0.083);
	const W = width * 1.6;
	const H = height * 1.6;
	const ox = -width * 0.3;
	const oy = -height * 0.3;
	const shift = (frame * drift) % cell;
	const d = frame * drift * 1.3;
	return (
		<AbsoluteFill>
			<svg width={W} height={H} style={{position: 'absolute', left: ox, top: oy}}>
				<defs>
					<pattern
						id={`grid-${id}`}
						width={cell}
						height={cell}
						patternUnits="userSpaceOnUse"
						patternTransform={`translate(${-shift} ${shift * 0.35})`}
					>
						<path d={`M ${cell} 0 L 0 0 0 ${cell}`} fill="none" stroke={ln} strokeOpacity={dark ? 0.6 : 0.3} strokeWidth={1.5} />
					</pattern>
				</defs>
				<rect width={W} height={H} fill={bg} />
				<rect width={W} height={H} fill={`url(#grid-${id})`} />
				{lines ? (
					<>
						<line x1={-50 - ox - d} y1={0.83 * height - oy} x2={width * 1.03 - ox - d} y2={0.3 * height - oy} stroke={ln} strokeWidth={2.2} />
						<line x1={0.51 * width - ox - d * 0.6} y1={-40 - oy} x2={0.66 * width - ox - d * 0.6} y2={height + 40 - oy} stroke={ln} strokeWidth={2.2} />
					</>
				) : null}
			</svg>
		</AbsoluteFill>
	);
};
