import React, { FC } from 'react';
import { Box } from '@mui/material';
import { Header, TopSection } from './components';

const sx = {
	root: {
		px: '30px',
	},
};

const Home: FC = () => (
	<Box sx={sx.root}>
		<Header openThreshold={60} style={{ zIndex: 2 }} />
		<TopSection style={{ zIndex: 1 }} />
		<Box sx={{ height: '1500px' }} />
	</Box>
);

export default Home;
