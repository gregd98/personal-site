import React, { useState } from 'react';
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
		transition: 'all .3s',
	},
	textContainer: {
		position: 'relative',
		py: '12px',
		px: '16px',
		borderRadius: '10px',
		cursor: 'pointer',
		transition: 'all .3s',
	},
	text: {
		fontFamily: 'poppins',
		fontWeight: 500,
		fontSize: '24px',
		textAlign: 'center',
		transition: 'font-size .3s',
		userSelect: 'none',
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

const UnderConstruction = () => {
	const [darkMode, setDarkMode] = useState(false);
	const handleTextClick = () => {
		setDarkMode((state) => !state);
	};
	return (
		<Box sx={{ ...sx.root, backgroundColor: darkMode ? 'black' : 'white' }}>
			<Graph style={sx.graph} color={darkMode ? '#FFFFFF' : '#000000'} />
			<Box sx={{ ...sx.textContainer, backgroundColor: !darkMode ? 'black' : 'white' }} onClick={handleTextClick}>
				<Typography sx={{ ...sx.text, color: darkMode ? 'black' : 'white' }}>This site is under construction</Typography>
			</Box>
		</Box>
	);
};

export default UnderConstruction;
