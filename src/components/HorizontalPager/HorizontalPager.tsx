import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { MotionValue } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import { selectCurrentPaddingX } from 'store/ui';
import { px } from 'utils/utils';
import { Page } from './components';

const sx = {
	root: {
		display: 'flex',
		flexDirection: 'row',
		overflow: 'hidden',
	},
};

const getRootStyle = (isFixed: boolean, paddingX: number) => ({
	...sx.root,
	...(isFixed ? {
		position: 'fixed',
		width: `calc(100% - ${px(paddingX * 2)})`,
		height: 'calc(100% - 64px)',
		top: '64px',
	} : {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: 0,
	}),
});

const HorizontalPager: FC<{
	isFixed: boolean,
	scrolls: MotionValue<number>[]
}> = ({
	isFixed,
	scrolls,
}) => {
	const paddingX = useSelector(selectCurrentPaddingX);

	return (
		<Box sx={getRootStyle(isFixed, paddingX)}>
			<Page title='First page' style={{ left: 0 }}>
				<Typography>First page</Typography>
			</Page>
			<Page title='Second page' style={{ left: scrolls[0] }}>
				<Typography>Second page</Typography>
			</Page>
			<Page title='Third page' style={{ left: scrolls[1] }}>
				<Typography>Third page</Typography>
			</Page>
		</Box>
	);
};

export default HorizontalPager;
