import React, { FC } from 'react';
import { StyleSheet, View, Text } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';
import SvgIcon, { Variant } from '../SvgIcon/SvgIcon';

const styles = StyleSheet.create({
	root: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	value: {
		fontFamily: 'lato',
		fontSize: '10px',
		marginLeft: '2px',
		textDecoration: 'none',
		fontWeight: 400,
	},
});

const DetailItem: FC<{
	icon: Variant
	value: string
	color?: string
	style?: Style
}> = ({
	icon, value, style = {}, color = '#384346',
}) => (
	<View style={{ ...styles.root, ...style }}>
		<SvgIcon variant={icon} color={color} />
		<Text style={{ ...styles.value, color }}>{value}</Text>
	</View>
);

export default DetailItem;
