import React, { FC } from 'react';
import { Path, Svg } from '@react-pdf/renderer';
import pathMap from './icon-path-map.json';

export type Variant = 'email' | 'location' | 'link' | 'github' | 'linkedin' | 'calendar';

const viewBoxMap: { [key in Variant]?: string } = {
	github: '0 0 32.58 31.77',
};

const ContactIcon: FC<{
	variant: Variant,
	color?: string,
	size?: number
}> = ({ variant, color = '#008cff', size = 14 }) => (
	// @ts-ignore
	<Svg
		width={size}
		height={size}
		viewBox={viewBoxMap[variant] ? viewBoxMap[variant] : '0 0 24 24'}
		fill={color}
	>
		<Path d={pathMap[variant]} />
	</Svg>
);

export default ContactIcon;
