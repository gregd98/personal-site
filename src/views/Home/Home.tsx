import React, { FC } from 'react';
import { Box } from '@mui/material';
import { Header, TopSection } from 'views/Home/components';

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
		<Box sx={sx.dividerContainer}>
			<Box sx={sx.divider} />
		</Box>
		<Box sx={{ height: '1500px' }} />
	</Box>
);

export default Home;
