import React, { FC, useRef } from 'react';
import { Box } from '@mui/material';
import { useAppDispatch } from 'store/store';
import { changePalette } from 'store/ui/actions';
import { bp } from 'utils/utils';
import { Header, TopSection, SecondSection } from './components';

const sx = {
	root: {
		px: '30px',
		transition: 'all .3s',
		backgroundColor: 'primary.main',
		[bp(760)]: {
			px: '8px',
		},
	},
};

const Home: FC = () => {
	const dispatch = useAppDispatch();
	const topSectionRef = useRef<HTMLDivElement>();

	return (
		<Box
			sx={sx.root}
			onClick={() => {
				dispatch(changePalette());
			}}
		>
			<Header openThreshold={60} style={{ zIndex: 3 }} />
			<TopSection ref={topSectionRef} style={{ zIndex: 1 }} />
			<SecondSection topSectionRef={topSectionRef} style={{ zIndex: 2 }} />
		</Box>
	);
};

export default Home;
