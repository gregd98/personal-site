import React, { FC } from 'react';
import { StyleSheet, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	root: {
		display: 'flex',
		flexDirection: 'row',
	},
	circle: {
		width: '16px',
		height: '16px',
		borderRadius: '50%',
		marginLeft: '2px',
	},
});

const renderCircle = (active: boolean, color: string) => {
	const style = { ...styles.circle, ...(active ? { backgroundColor: color } : { border: `1px solid ${color}` }) };
	return (
		<View style={style} />
	);
};

const ScoreIndicator: FC<{ score: number, color: string }> = ({ score, color }) => (
	<View style={styles.root}>
		{[...Array(5).keys()].map((i) => (
			<React.Fragment key={i}>{renderCircle(score >= i + 1, color)}</React.Fragment>
		))}
	</View>
);

export default ScoreIndicator;
