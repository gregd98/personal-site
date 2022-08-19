import React, { FC } from 'react';
import { View } from '@react-pdf/renderer';
import { IExperienceItem } from '../../CvDocument';
import Title from '../Title';
import ExperienceItem from './ExperienceItem';

const ExperienceBox: FC<{ data: IExperienceItem[] }> = ({ data }) => (
	<View>
		<Title title='Experience' />
		{data.map((item, i) => (
			<ExperienceItem key={i.toString()} data={item} />
		))}
	</View>
);

export default ExperienceBox;
