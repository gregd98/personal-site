import React, { FC } from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	root: {
		marginBottom: '8px',
	},
	title: {
		fontFamily: 'lato',
		fontWeight: 700,
		fontSize: '14px',
		color: 'black',
	},
	divider: {
		width: '100%',
		height: '1px',
		backgroundColor: '#aaa',
		marginTop: '4px',
	},
});

const Title: FC<{ title: string}> = ({ title }) => (
	<View style={styles.root}>
		<Text style={styles.title}>{title.toUpperCase()}</Text>
		<View style={styles.divider} />
	</View>
);

export default Title;
