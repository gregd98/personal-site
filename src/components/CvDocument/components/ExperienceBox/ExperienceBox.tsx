import React, { FC } from 'react';
import { View } from '@react-pdf/renderer';
import { IExperienceItem } from '../../CvDocument';
import Title from '../Title';
import ExperienceItem from './ExperienceItem';

const ExperienceBox: FC<{ data: IExperienceItem[], color: string }> = ({ data, color }) => (
	<View>
		<Title title='Experience' />
		{data.map((item, i) => (
			<ExperienceItem key={i.toString()} data={item} color={color} />
		))}
	</View>
);

export default ExperienceBox;
