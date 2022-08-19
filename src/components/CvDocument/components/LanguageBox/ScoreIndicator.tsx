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
		border: '1px solid #008cff',
		marginLeft: '2px',
	},
	circleActive: {
		backgroundColor: '#008cff',
		border: 'unset',
	},
});

const renderCircle = (active: boolean) => (
	<View style={{ ...styles.circle, ...(active && styles.circleActive) }} />
);

const ScoreIndicator: FC<{ score: number }> = ({ score }) => (
	<View style={styles.root}>
		{[...Array(5).keys()].map((i) => (
			<React.Fragment key={i}>{renderCircle(score >= i + 1)}</React.Fragment>
		))}
	</View>
);

export default ScoreIndicator;
