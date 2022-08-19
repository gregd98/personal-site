import React, { FC } from 'react';
import { StyleSheet, View, Text } from '@react-pdf/renderer';
import { ISkillItem } from '../../CvDocument';

const styles = StyleSheet.create({
	root: {
		paddingHorizontal: '8px',
		border: '1px solid #384346',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		margin: '2px',
		height: '26px',
		borderRadius: '10px',
	},
	name: {
		fontFamily: 'poppins',
		fontSize: '10px',
		color: '#384346',
	},
	years: {
		fontFamily: 'lato',
		fontSize: '8px',
		color: '#38434680',
		marginLeft: '2px',
	},
});

const SkillItem: FC<{ skill: ISkillItem }> = ({ skill }) => (
	<View style={styles.root}>
		<Text style={styles.name}>{skill.name}</Text>
		{!!skill.years && <Text style={styles.years}>{`${skill.years}y`}</Text>}
	</View>
);

export default SkillItem;
