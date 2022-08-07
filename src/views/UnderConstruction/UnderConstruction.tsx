import React from 'react';
import { Box, Typography } from '@mui/material';

const BP1 = '@media (max-width: 260px)';

const sx = {
	root: {
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		px: '16px',
	},
	text: {
		fontFamily: 'poppins',
		fontWeight: 500,
		fontSize: '24px',
		textAlign: 'center',
		transition: 'font-size .3s',
		[BP1]: {
			fontSize: '18px',
		},
	},
};

const UnderConstruction = () => (
	<Box sx={sx.root}>
		<Typography sx={sx.text}>This site is under construction</Typography>
	</Box>
);

export default UnderConstruction;
