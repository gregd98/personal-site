import React, { FC } from 'react';
import { StyleSheet, View, Text } from '@react-pdf/renderer';
import { ISkillCategory } from '../../CvDocument';
import Title from '../Title';
import SkillItem from './SkillItem';

const styles = StyleSheet.create({
	category: {
		fontFamily: 'lato',
		fontSize: '14px',
		fontWeight: 300,
		paddingLeft: '2px',
	},
	skillContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: '4px',
		marginBottom: '8px',
	},
});

const SkillBox: FC<{ skillCategories: ISkillCategory[] }> = ({ skillCategories }) => (
	<View>
		<Title title='Skills' />
		{skillCategories.map(({ name, skills }) => (
			<View key={name}>
				<Text style={styles.category}>{`${name}:`}</Text>
				<View style={styles.skillContainer}>
					{skills.map((skill, i) => (
						<SkillItem key={i.toString()} skill={skill} />
					))}
				</View>
			</View>
		))}
	</View>
);

export default SkillBox;
