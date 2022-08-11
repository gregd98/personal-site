import React from 'react';
import { Box } from '@mui/material';
import { Graph } from 'components/Graph';

const sx = {
	root: {
		width: '100%',
		height: '500px',
	},
	triangleWrapper: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		filter: 'drop-shadow(-4px 0px 4px rgba(50, 50, 50, 0.8))',
		height: '500px',
	},
	triangle: {
		width: '100%',
		height: '500px',
		clipPath: 'polygon(75% 0, 100% 0, 100% 100%, 60% 100%)',
		background: 'linear-gradient(45deg, rgba(0,0,0,1) 34%, rgba(37,37,37,1) 100%, rgba(62,62,62,1) 100%)',
	},
	graph: {
		position: 'relative',
		width: '75%',
		height: '100%',
		backgroundColor: '#00000008',
	},
};

const TopSection = () => (
	<Box sx={sx.root}>
		<Box sx={sx.triangleWrapper}>
			<Box sx={sx.triangle} />
		</Box>
		<Graph style={sx.graph} />
	</Box>
);

export default TopSection;
