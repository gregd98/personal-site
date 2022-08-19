import React, { FC } from 'react';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	name: {
		fontFamily: 'lato',
		fontWeight: 700,
		fontSize: '36px',
	},
	role: {
		fontFamily: 'lato',
		fontWeight: 400,
		fontSize: '16px',
		marginTop: '8px',
	},
});

const Header: FC<{ name: string, role: string }> = ({ name, role }) => (
	<View style={styles.root}>
		<Text style={styles.name}>{name}</Text>
		<Text style={styles.role}>{role}</Text>
	</View>
);

export default Header;
