import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Shot} from './Shot';
import {DARK, FONT, GOLD, NAVY, PAPER, SOFT} from '../brand';

// B-roll com foto ou vídeo, sempre tratado na identidade do canal:
// duotone tinta → papel (ou azul-marinho nas cenas de tensão), Ken Burns lento, grão e vinheta do Shot,
// destaques em dourado por cima e o crédito da imagem no rodapé.

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const ease = {...clamp, easing: Easing.out(Easing.cubic)};

export type Mark =
	| {kind: 'circle'; x: number; y: number; r: number; at: number} // círculo dourado desenhado à mão
	| {kind: 'arrow'; x1: number; y1: number; x2: number; y2: number; at: number}
	| {kind: 'dot'; path: [number, number][]; at: number; dur?: number} // o ponto dourado que segue o dinheiro
	| {kind: 'label'; x: number; y: number; text: string; at: number}; // etiqueta de papel com texto

export type PhotoProps = {
	id: string;
	src: string; // caminho em public/ (img/ep02/slot.jpg ou .mp4)
	credit?: string; // "Photo: autor / fonte (licença)"
	layout?: 'full' | 'print'; // tela cheia ou foto impressa sobre o papel
	side?: 'left' | 'right'; // lado da foto no layout "print" (o texto fica do outro lado)
	tone?: 'ink' | 'navy' | 'warm'; // ink: papel e tinta · navy: tensão · warm: cor bem dessaturada
	zoom?: [number, number]; // escala inicial e final do Ken Burns
	pan?: [number, number]; // deslocamento total (px) em x e y ao longo da cena
	focus?: [number, number]; // ponto de origem do zoom, em % da imagem
	apoio?: string;
	hero?: string;
	complemento?: string;
	textAt?: number[]; // frames locais em que entram apoio, herói e complemento
	textPos?: 'bottom-left' | 'bottom-right' | 'top-left' | 'center';
	marks?: Mark[];
	enter?: boolean;
	exit?: boolean;
	start: number; // frame absoluto da cena (marcas e textAt vêm em frames absolutos)
	videoStartFrom?: number; // frame do vídeo de origem onde começa o trecho
};

const TONES = {
	// matriz de cor: luminância → mistura entre a cor escura e a clara de cada tom
	ink: {dark: [0x2e, 0x2d, 0x2b], light: [0xe8, 0xe7, 0xdf]},
	navy: {dark: [0x06, 0x10, 0x1f], light: [0xb9, 0xc4, 0xd3]},
	warm: {dark: [0x26, 0x24, 0x21], light: [0xf0, 0xec, 0xe0]},
};

const DuoFilter: React.FC<{id: string; tone: keyof typeof TONES}> = ({id, tone}) => {
	const {dark, light} = TONES[tone];
	const ch = (i: number) => `${dark[i] / 255} ${light[i] / 255}`;
	return (
		<svg width={0} height={0} style={{position: 'absolute'}}>
			<filter id={id} colorInterpolationFilters="sRGB">
				<feColorMatrix type="matrix" values="0.30 0.59 0.11 0 0  0.30 0.59 0.11 0 0  0.30 0.59 0.11 0 0  0 0 0 1 0" />
				<feComponentTransfer>
					<feFuncR type="table" tableValues={ch(0)} />
					<feFuncG type="table" tableValues={ch(1)} />
					<feFuncB type="table" tableValues={ch(2)} />
				</feComponentTransfer>
			</filter>
		</svg>
	);
};

const Media: React.FC<{src: string; filter: string; style: React.CSSProperties; startFrom?: number}> = ({src, filter, style, startFrom}) =>
	src.endsWith('.mp4') ? (
		<OffthreadVideo src={staticFile(src)} muted startFrom={startFrom} style={{...style, filter}} />
	) : (
		<Img src={staticFile(src)} style={{...style, filter}} />
	);

const MarkLayer: React.FC<{marks: Mark[]; frame: number}> = ({marks, frame}) => (
	<svg width={1920} height={1080} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
		{marks.map((m, i) => {
			const k = interpolate(frame, [m.at, m.at + 14], [0, 1], ease);
			if (k <= 0) return null;
			if (m.kind === 'circle') {
				const c = 2 * Math.PI * m.r;
				return (
					<ellipse key={i} cx={m.x} cy={m.y} rx={m.r * 1.15} ry={m.r} fill="none" stroke={GOLD} strokeWidth={9} strokeLinecap="round"
						strokeDasharray={c * 1.1} strokeDashoffset={c * 1.1 * (1 - k)} transform={`rotate(-8 ${m.x} ${m.y})`} />
				);
			}
			if (m.kind === 'arrow') {
				const x = m.x1 + (m.x2 - m.x1) * k;
				const y = m.y1 + (m.y2 - m.y1) * k;
				const a = Math.atan2(m.y2 - m.y1, m.x2 - m.x1);
				return (
					<g key={i}>
						<line x1={m.x1} y1={m.y1} x2={x} y2={y} stroke={GOLD} strokeWidth={10} strokeLinecap="round" />
						<path d={`M ${x} ${y} L ${x - 30 * Math.cos(a - 0.5)} ${y - 30 * Math.sin(a - 0.5)} L ${x - 30 * Math.cos(a + 0.5)} ${y - 30 * Math.sin(a + 0.5)} Z`} fill={GOLD} />
					</g>
				);
			}
			if (m.kind === 'dot') {
				const t = interpolate(frame, [m.at, m.at + (m.dur ?? 40)], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
				const seg = (m.path.length - 1) * t;
				const j = Math.min(m.path.length - 2, Math.floor(seg));
				const u = seg - j;
				const [x0, y0] = m.path[j];
				const [x1, y1] = m.path[j + 1];
				return (
					<g key={i}>
						<circle cx={x0 + (x1 - x0) * u} cy={y0 + (y1 - y0) * u} r={34} fill={GOLD} opacity={0.25} />
						<circle cx={x0 + (x1 - x0) * u} cy={y0 + (y1 - y0) * u} r={20} fill={GOLD} />
					</g>
				);
			}
			const w = m.text.length * 24 + 56;
			return (
				<g key={i} opacity={k} transform={`translate(${m.x} ${m.y + 16 * (1 - k)})`}>
					<rect x={6} y={8} width={w} height={64} rx={6} fill="rgba(0,0,0,0.25)" />
					<rect x={0} y={0} width={w} height={64} rx={6} fill={PAPER} />
					<rect x={0} y={0} width={10} height={64} rx={3} fill={GOLD} />
					<text x={32} y={43} fontFamily={FONT} fontWeight={700} fontSize={30} letterSpacing={3} fill={DARK}>
						{m.text}
					</text>
				</g>
			);
		})}
	</svg>
);

export const PhotoShot: React.FC<PhotoProps> = (p) => {
	const frame = useCurrentFrame();
	const {durationInFrames: dur} = useVideoConfig();
	const layout = p.layout ?? 'full';
	const tone = p.tone ?? 'ink';
	const fid = `duo-${p.id}`;
	const off = p.start ?? 0;
	const local = (t: number) => t - off; // marcas e texto chegam em frames absolutos
	const marks = (p.marks ?? []).map((m) => ({...m, at: local(m.at)}));
	const [z0, z1] = p.zoom ?? [1.04, 1.14];
	const [px, py] = p.pan ?? [-40, -12];
	const t = interpolate(frame, [0, dur], [0, 1], clamp);
	const kb: React.CSSProperties = {
		transform: `translate(${px * t}px, ${py * t}px) scale(${z0 + (z1 - z0) * t})`,
		transformOrigin: `${(p.focus ?? [50, 50])[0]}% ${(p.focus ?? [50, 50])[1]}%`,
	};
	const filter = `url(#${fid}) contrast(1.06)`;
	const textAt = p.textAt ? p.textAt.map(local) : [8, 18, 30];
	const k = (i: number) => interpolate(frame, [textAt[i] ?? 0, (textAt[i] ?? 0) + 8], [0, 1], ease);
	const isDark = tone === 'navy';

	const words = (p.apoio || p.hero || p.complemento) && (
		<div
			style={{
				position: 'absolute',
				...(layout === 'print' ? {left: (p.side ?? 'right') === 'right' ? 110 : 1190, top: 330} : p.textPos === 'top-left' ? {left: 110, top: 100} : p.textPos === 'bottom-right' ? {right: 110, bottom: 120, textAlign: 'right'} : p.textPos === 'center' ? {left: 0, right: 0, top: 380, textAlign: 'center'} : {left: 110, bottom: 120}),
				fontFamily: FONT,
				color: layout === 'full' ? '#F4F3EE' : isDark ? '#E6EAF0' : DARK,
				textShadow: layout === 'full' ? '0 4px 30px rgba(0,0,0,0.55)' : undefined,
				maxWidth: layout === 'print' ? 640 : 1500,
			}}
		>
			{p.apoio && <div style={{fontSize: 46, fontWeight: 400, opacity: k(0), transform: `translateY(${12 * (1 - k(0))}px)`}}>{p.apoio}</div>}
			{p.hero && (
				<div style={{fontSize: layout === "print" ? (Math.max(...p.hero.split(" ").map((w) => w.length)) > 10 ? 74 : 92) : 118, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2, opacity: k(1), transform: `translateY(${16 * (1 - k(1))}px)`}}>
					{p.hero}
					<div style={{height: 10, width: `${interpolate(frame, [textAt[1] + 6, textAt[1] + 20], [0, 100], ease)}%`, maxWidth: 420, background: GOLD, marginTop: 10, marginLeft: p.textPos === 'bottom-right' ? 'auto' : p.textPos === 'center' ? 'auto' : 0, marginRight: p.textPos === 'center' ? 'auto' : 0}} />
				</div>
			)}
			{p.complemento && <div style={{fontSize: 46, fontWeight: 400, marginTop: 14, opacity: k(2), transform: `translateY(${12 * (1 - k(2))}px)`}}>{p.complemento}</div>}
		</div>
	);

	const credit = p.credit && (
		<div style={{position: 'absolute', left: 40, bottom: 26, fontFamily: FONT, fontSize: 18, color: layout === 'full' || isDark ? 'rgba(240,240,235,0.75)' : SOFT}}>{p.credit}</div>
	);

	if (layout === 'print') {
		const right = (p.side ?? 'right') === 'right';
		const rot = right ? 2.2 : -2.2;
		const enterK = interpolate(frame, [0, 16], [0, 1], ease);
		return (
			<Shot id={p.id} enter={p.enter ?? true} exit={p.exit ?? true} dark={isDark}>
				<DuoFilter id={fid} tone={tone} />
				<AbsoluteFill>
					<div
						style={{
							position: 'absolute',
							top: 150,
							[right ? 'right' : 'left']: 110,
							width: 1000,
							height: 690,
							background: '#F6F5F0',
							padding: 22,
							boxShadow: '14px 22px 40px rgba(30,28,25,0.28)',
							transform: `rotate(${rot}deg) translateY(${(1 - enterK) * 40}px) translateX(${(right ? -1 : 1) * 10 * Math.sin(frame / 90)}px)`,
						}}
					>
						<div style={{width: '100%', height: '100%', overflow: 'hidden', position: 'relative'}}>
							<Media src={p.src} filter={filter} startFrom={p.videoStartFrom} style={{width: '100%', height: '100%', objectFit: 'cover', ...kb}} />
						</div>
						{/* fitas adesivas nos cantos */}
						<div style={{position: 'absolute', top: -18, left: 60, width: 150, height: 44, background: 'rgba(212,175,55,0.55)', transform: 'rotate(-6deg)'}} />
						<div style={{position: 'absolute', bottom: -16, right: 70, width: 150, height: 44, background: 'rgba(224,224,215,0.85)', transform: 'rotate(5deg)'}} />
					</div>
				</AbsoluteFill>
				{words}
				<MarkLayer marks={marks} frame={frame} />
				{credit}
			</Shot>
		);
	}

	return (
		<Shot id={p.id} enter={p.enter ?? true} exit={p.exit ?? true} dark={isDark}>
			<DuoFilter id={fid} tone={tone} />
			<AbsoluteFill style={{overflow: 'hidden', backgroundColor: isDark ? NAVY : DARK}}>
				<Media src={p.src} filter={filter} startFrom={p.videoStartFrom} style={{width: '100%', height: '100%', objectFit: 'cover', ...kb}} />
				{/* escurece a base para o texto ler bem */}
				<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(20,19,17,0) 45%, rgba(20,19,17,0.55) 100%)'}} />
			</AbsoluteFill>
			<MarkLayer marks={marks} frame={frame} />
			{words}
			{credit}
		</Shot>
	);
};
