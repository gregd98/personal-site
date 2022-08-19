import React, { FC } from 'react';
import {
	StyleSheet, View, Text, Link,
} from '@react-pdf/renderer';
import { IContactItem } from '../../CvDocument';
import SvgIcon from '../SvgIcon/SvgIcon';

const styles = StyleSheet.create({
	root: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		height: '20px',
	},
	value: {
		fontFamily: 'poppins',
		fontSize: '10px',
		marginLeft: '4px',
		textDecoration: 'none',
		color: 'black',
		fontWeight: 500,
	},
});

/* eslint-disable jsx-a11y/anchor-is-valid */
const ContactItem: FC<{
	data: IContactItem
}> = ({ data }) => (
	<View style={styles.root}>
		<SvgIcon variant={data.icon} />
		{data.url ? (
			<Link src={data.url} style={styles.value}>{data.value}</Link>
		) : (
			<Text style={styles.value}>{data.value}</Text>
		)}
	</View>
);

export default ContactItem;
