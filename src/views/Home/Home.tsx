import React, { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Box, useMediaQuery } from '@mui/material';
import { useAppDispatch } from 'store/store';
import { selectCurrentPaddingX, setHomePaddingX, changePalette } from 'store/ui';
import { mq, px } from 'utils/utils';
import { Header, TopSection, SecondSection } from './components';

const sx = {
	root: {
		transition: 'all .3s',
		backgroundColor: 'primary.main',
	},
};

const Home: FC = () => {
	const dispatch = useAppDispatch();
	const topSectionRef = useRef<HTMLDivElement>();
	const isSmallMargin = useMediaQuery(mq(760));
	const paddingX = useSelector(selectCurrentPaddingX);

	useEffect(() => {
		dispatch(setHomePaddingX(isSmallMargin ? 8 : 30));
	}, [dispatch, isSmallMargin]);

	return (
		<Box
			sx={{ ...sx.root, px: px(paddingX) }}
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
