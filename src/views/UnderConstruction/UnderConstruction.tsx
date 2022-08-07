import React from 'react';
import { Box, Typography } from '@mui/material';
import Graph from 'views/Graph/Graph';

const BP1 = '@media (max-width: 260px)';

const sx = {
	root: {
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		px: '16px',
	},
	textContainer: {
		position: 'relative',
		py: '12px',
		px: '16px',
		borderRadius: '10px',
		backgroundColor: 'black',
		cursor: 'default',
	},
	text: {
		fontFamily: 'poppins',
		fontWeight: 500,
		fontSize: '24px',
		textAlign: 'center',
		transition: 'font-size .3s',
		color: 'white',
		[BP1]: {
			fontSize: '18px',
		},
	},
	graph: {
		position: 'absolute',
		height: '100vh',
		top: 0,
		left: 0,
	},
};

const UnderConstruction = () => (
	<Box sx={sx.root}>
		<Graph style={sx.graph} />
		<Box sx={sx.textContainer}>
			<Typography sx={sx.text}>This site is under construction</Typography>
		</Box>
	</Box>
);

export default UnderConstruction;
