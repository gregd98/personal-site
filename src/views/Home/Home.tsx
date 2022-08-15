import React, { FC } from 'react';
import { Box } from '@mui/material';
import { Header, TopSection, HeaderDivider } from './components';

const sx = {
	root: {
	},
	dividerContainer: {
		position: 'sticky',
		top: '60px',
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: '80px',
	},
	divider: {
		width: '300px',
		height: '1px',
		borderRadius: '1px',
		backgroundColor: '#aaaaaa',
	},
};

const Home: FC = () => (
	<Box sx={sx.root}>
		<Header style={{ zIndex: 2 }} />
		<TopSection style={{ zIndex: 1 }} />
		<HeaderDivider style={{ mt: '80px' }} />
		<Box sx={{ height: '1500px' }} />
	</Box>
);

export default Home;
