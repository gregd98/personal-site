import React, { FC } from 'react';
import { StyleSheet, View, Text } from '@react-pdf/renderer';
import { ILanguageItem } from '../../CvDocument';
import ScoreIndicator from './ScoreIndicator';

const styles = StyleSheet.create({
	root: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: '8px',
	},
	name: {
		fontFamily: 'poppins',
		fontSize: '14px',
		fontWeight: 500,
	},
});

const LanguageItem: FC<{ language: ILanguageItem, color: string }> = ({ language, color }) => (
	<View style={styles.root}>
		<Text style={styles.name}>{language.name}</Text>
		<ScoreIndicator score={language.score} color={color} />
	</View>
);

export default LanguageItem;
