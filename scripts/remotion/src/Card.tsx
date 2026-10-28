import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Shot} from './components/Shot';
import {Stroke} from './components/Stroke';
import {scheduleWords, TextBlock, TextLines} from './components/TextBlock';
import {Chart} from './objects/Chart';
import {Coin} from './objects/Coin';
import {CreditCard} from './objects/CreditCard';
import {Phone} from './objects/Phone';
import {Receipt} from './objects/Receipt';
import {atFrame, ensureFonts, TIMING} from './brand';

ensureFonts();

export type ObjectKind = 'card' | 'phone' | 'receipt' | 'chart' | 'coin' | 'none';

export type CardProps = TextLines & {
	id: string;
	textSide: 'left' | 'right' | 'center'; // lado do texto; o objeto sai pela borda oposta
	object: ObjectKind;
	heroSize?: number;
	apoioSize?: number;
	enter?: boolean; // entra ainda afastando (zoom que atravessa o corte)
	exit?: boolean; // sai com zoom-out acelerando até o corte
	objectSlide?: boolean; // objeto desliza pela borda (só no 1º card do vídeo); depois de um corte ele já chega no quadro
	cues?: number[]; // segundos da narração, uma por palavra (apoio, herói, complemento)
	cardStart?: number; // frame absoluto em que a cena começa (para converter os cues)
	actionAt?: number; // segundo da narração em que o objeto age (toque no BUY, barras disparam)
	heroUnderline?: boolean; // sublinhado dourado no herói (cards sem objeto dourado ou com número-chave)
	dark?: boolean; // cena de tensão: fundo azul-marinho, texto claro
};

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

type Place = {left: number; top: number; rot: number; fromX: number; fromY: number; vx: number; vy: number};

// Onde cada objeto fica, conforme o lado: sempre cortado pela borda, derivando para o centro.
const place = (kind: ObjectKind, side: 'left' | 'right'): Place => {
	if (side === 'right') {
		if (kind === 'receipt') return {left: 1330, top: 150, rot: -8, fromX: 520, fromY: -200, vx: -1.8, vy: 0.5};
		if (kind === 'coin') return {left: 1420, top: 240, rot: -10, fromX: 520, fromY: -160, vx: -1.6, vy: 0.4};
		if (kind === 'chart') return {left: 1260, top: 330, rot: 0, fromX: 520, fromY: 0, vx: -1.6, vy: 0};
		if (kind === 'phone') return {left: 1440, top: 260, rot: -12, fromX: 520, fromY: 300, vx: -2.0, vy: -0.6};
		return {left: 1395, top: 120, rot: -22, fromX: 560, fromY: -280, vx: -2.2, vy: 0.7};
	}
	if (kind === 'chart') return {left: -210, top: 330, rot: 0, fromX: -520, fromY: 0, vx: 1.4, vy: 0};
	if (kind === 'receipt') return {left: -60, top: 170, rot: 8, fromX: -520, fromY: -200, vx: 1.8, vy: 0.5};
	if (kind === 'coin') return {left: -120, top: 260, rot: 10, fromX: -520, fromY: -160, vx: 1.6, vy: 0.4};
	if (kind === 'card') return {left: -420, top: 200, rot: 18, fromX: -560, fromY: -280, vx: 2.2, vy: 0.7};
	return {left: 40, top: 300, rot: 12, fromX: -520, fromY: 320, vx: 2.0, vy: -0.6};
};

const STROKES = {
	right: ['M 820 1130 C 1080 800, 1450 660, 2000 640', 'M 1760 -40 C 1640 260, 1560 560, 1380 1130'],
	left: ['M 1100 1130 C 840 800, 470 660, -80 640', 'M 160 -40 C 280 260, 360 560, 540 1130'],
	center: ['M -80 900 C 400 700, 1500 700, 2000 900', 'M 1700 -40 C 1600 260, 1580 560, 1500 1130'],
};

export const Card: React.FC<CardProps> = (p) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	// em cards longos, o objeto desliza no máximo o equivalente a ~4 s, para não cobrir o texto
	const slow = Math.min(1, 120 / durationInFrames);
	const cardStart = p.cardStart ?? 0;
	const objSide: 'left' | 'right' = p.textSide === 'left' ? 'right' : 'left';
	const action = p.actionAt !== undefined ? atFrame(p.actionAt) - cardStart : undefined;

	// Objeto: entra pela borda (só no 1º card) e depois deriva devagar em direção ao centro
	const pl = place(p.object, objSide);
	const inT = p.objectSlide ? interpolate(frame, [0, TIMING.objectEnter], [1, 0], {...clamp, easing: Easing.out(Easing.cubic)}) : 0;
	const ox = pl.fromX * inT + pl.vx * frame * slow;
	const oy = pl.fromY * inT + pl.vy * frame * slow;
	const el =
		p.object === 'card' ? <CreditCard /> :
		p.object === 'phone' ? <Phone tapFrame={action} /> :
		p.object === 'receipt' ? <Receipt /> :
		p.object === 'chart' ? <Chart growFrame={action} /> :
		p.object === 'coin' ? <Coin /> : null;

	// Texto: deriva lenta (paralaxe), no lado oposto ao objeto ou centralizado
	const center = p.textSide === 'center' || p.object === 'none';
	const tx = center ? 0 : (p.textSide === 'left' ? -0.35 : 0.35) * frame;
	const textPos = p.textSide === 'left' ? {x: 228, y: 380} : {x: 900, y: 360};

	// Respiro vivo: dois traços se desenham depois que o texto fica pronto
	const done = scheduleWords(p, p.cues, cardStart).doneAt;
	const strokes = center ? STROKES.center : p.textSide === 'left' ? STROKES.right : STROKES.left;

	return (
		<Shot id={p.id} enter={p.enter} exit={p.exit} dark={p.dark}>
			<svg width={1920} height={1080} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
				<Stroke d={strokes[0]} start={done + 6} duration={14} />
				<Stroke d={strokes[1]} start={done + 16} duration={20} />
			</svg>
			{el ? (
				<div
					style={{
						position: 'absolute',
						left: pl.left,
						top: pl.top,
						transform: `translate(${ox}px, ${oy}px) rotate(${pl.rot}deg)`,
						filter: 'drop-shadow(34px 46px 40px rgba(40,38,34,0.38))',
					}}
				>
					{el}
				</div>
			) : null}
			<div style={{position: 'absolute', inset: 0, transform: `translateX(${tx}px)`}}>
				<TextBlock
					lines={p}
					x={textPos.x}
					y={center ? 400 : textPos.y}
					center={center}
					heroSize={p.heroSize}
					apoioSize={p.apoioSize}
					cues={p.cues}
					cardStart={cardStart}
					heroUnderline={p.heroUnderline}
					dark={p.dark}
				/>
			</div>
		</Shot>
	);
};
