import React from 'react';
import {Card, CardProps} from '../Card';
import {n} from './time';

export type SceneDef = {from: number; to: number; el: (start: number) => React.ReactNode};

// Card do template com cues em segundos do vídeo
export const card = (props: Omit<CardProps, 'cues'> & {cues: number[]}) => (start: number) => (
	<Card {...props} cues={props.cues.map(n)} cardStart={start} />
);
