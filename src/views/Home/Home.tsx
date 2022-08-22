import React, { FC } from 'react';
import { Box } from '@mui/material';
import { useAppDispatch } from 'store/store';
import { changePalette } from 'store/ui/actions';
import { Header, TopSection } from './components';

const sx = {
	root: {
		px: '30px',
		transition: 'background-color .3s',
		backgroundColor: 'primary.main',
	},
};

const Home: FC = () => {
	const dispatch = useAppDispatch();
	return (
		<Box
			sx={sx.root}
			onClick={() => {
				dispatch(changePalette());
			}}
		>
			<Header openThreshold={60} style={{ zIndex: 2 }} />
			<TopSection style={{ zIndex: 1 }} />
			<Box sx={{ height: '1500px' }} />
		</Box>
	);
};

export default Home;
