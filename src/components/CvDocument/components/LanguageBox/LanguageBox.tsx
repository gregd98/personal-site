import React, { FC } from 'react';
import { StyleSheet, View } from '@react-pdf/renderer';
import { ILanguageItem } from '../../CvDocument';
import Title from '../Title';
import LanguageItem from './LanguageItem';

const styles = StyleSheet.create({
	root: {
		marginTop: '24px',
	},
	title: {
		marginBottom: '12px',
	},
});

const LanguageBox: FC<{ languages: ILanguageItem[] }> = ({ languages }) => (
	<View style={styles.root}>
		<Title title='Languages' style={styles.title} />
		{languages.map((language, i) => (
			<LanguageItem key={i.toString()} language={language} />
		))}
	</View>
);

export default LanguageBox;
