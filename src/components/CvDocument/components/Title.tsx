import React, { FC } from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';

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
		borderRadius: '1px',
	},
});

const Title: FC<{ title: string, style?: Style }> = ({ title, style = {} }) => (
	<View style={{ ...styles.root, ...style }}>
		<Text style={styles.title}>{title.toUpperCase()}</Text>
		<View style={styles.divider} />
	</View>
);

export default Title;
