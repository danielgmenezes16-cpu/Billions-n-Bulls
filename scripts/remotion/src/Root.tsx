import React from 'react';
import {Composition, Series, Still} from 'remotion';
import {Card, CardProps} from './Card';
import {Opener, OPENER_FRAMES} from './Opener';
import {Thumbnail} from './Thumbnail';
import {EpThumb, EP_THUMBS} from './thumbs/EpThumbs';
import {Avatar, Banner, Watermark} from './thumbs/ChannelArt';
import {Ep01, EP01_FRAMES, EP01_TEST_FRAMES} from './ep01/Ep01';
import {Ep02, EP02_FRAMES} from './ep02/Ep02';
import {Ep03, EP03_FRAMES} from './ep03/Ep03';
import {Ep04, EP04_FRAMES} from './ep04/Ep04';
import {Ep05, EP05_FRAMES} from './ep05/Ep05';

// Demo: abertura do piloto "If Trading Is Free, Who Pays?" (sem áudio)
const card1: CardProps = {
	id: 'c1',
	apoio: 'If trading is free,',
	hero: 'WHO PAYS?',
	complemento: 'follow one $0 trade',
	textSide: 'left',
	object: 'card',
	heroSize: 150,
	enter: true,
	exit: true,
	objectSlide: true,
};
const card2: CardProps = {
	id: 'c2',
	apoio: 'Part 1',
	hero: 'THE $0 TRADE',
	complemento: 'from your phone to Wall Street',
	textSide: 'right',
	object: 'phone',
	heroSize: 112,
	enter: true,
	exit: false,
};
const D1 = 120; // 4,0 s
const D2 = 126; // 4,2 s

const Demo: React.FC = () => (
	<Series>
		<Series.Sequence durationInFrames={D1}>
			<Card {...card1} />
		</Series.Sequence>
		<Series.Sequence durationInFrames={D2}>
			<Card {...card2} />
		</Series.Sequence>
	</Series>
);

export const RemotionRoot: React.FC = () => (
	<>
		<Composition id="Opener" component={Opener} durationInFrames={OPENER_FRAMES} fps={30} width={1920} height={1080} />
		<Composition id="Ep01" component={Ep01} durationInFrames={EP01_FRAMES} fps={30} width={1920} height={1080} />
		<Composition id="Ep02" component={Ep02} durationInFrames={EP02_FRAMES} fps={30} width={1920} height={1080} />
		<Composition id="Ep03" component={Ep03} durationInFrames={EP03_FRAMES} fps={30} width={1920} height={1080} />
		<Composition id="Ep04" component={Ep04} durationInFrames={EP04_FRAMES} fps={30} width={1920} height={1080} />
		<Composition id="Ep05" component={Ep05} durationInFrames={EP05_FRAMES} fps={30} width={1920} height={1080} />
		<Composition id="Ep01Test" component={Ep01} durationInFrames={EP01_TEST_FRAMES} fps={30} width={1920} height={1080} />
		<Composition id="Demo" component={Demo} durationInFrames={D1 + D2} fps={30} width={1920} height={1080} />
		<Composition id="Card" component={Card} durationInFrames={D1} fps={30} width={1920} height={1080} defaultProps={card1} />
		<Still id="ThumbA" component={Thumbnail} width={1280} height={720} defaultProps={{variant: 'A' as const}} />
		<Still id="ThumbB" component={Thumbnail} width={1280} height={720} defaultProps={{variant: 'B' as const}} />
		<Still id="ThumbC" component={Thumbnail} width={1280} height={720} defaultProps={{variant: 'C' as const}} />
		<Still id="ThumbD" component={Thumbnail} width={1280} height={720} defaultProps={{variant: 'D' as const}} />
		<Still id="Banner" component={Banner} width={2560} height={1440} />
		<Still id="Avatar" component={Avatar} width={800} height={800} />
		<Still id="Watermark" component={Watermark} width={150} height={150} />
		{EP_THUMBS.map((v) => (
			<Still key={v} id={`Thumb${v}`} component={EpThumb} width={1280} height={720} defaultProps={{v}} />
		))}
	</>
);
