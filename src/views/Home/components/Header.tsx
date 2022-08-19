import React, { FC, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { motion, AnimationProps } from 'framer-motion';
import { px } from 'utils';

const HEIGHT = 64;

const sx = {
	root: {
		position: 'fixed',
		top: 0,
		width: 'calc(100% - 60px)',
		height: px(HEIGHT),
	},
	content: {
		height: '100%',
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		columnGap: '16px',
		alignItems: 'center',
	},
	menuButton: {
		fontSize: '16px',
		fontFamily: 'poppins',
		color: 'black',
		cursor: 'pointer',
		backgroundColor: '#FFFFFF50',
	},
	dividerContainer: {
		position: 'absolute' as const,
		width: '100%',
		height: px(HEIGHT),
		backgroundColor: 'white',
	},
	divider: {
		position: 'absolute',
		width: '100%',
		height: '1px',
		backgroundColor: '#aaa',
		left: 0,
		bottom: 0,
	},
};

const dividerAnimation: AnimationProps = {
	variants: {
		hidden: { top: '-74px' },
		show: { top: 0 },
	},
	initial: 'hidden',
	transition: { duration: 0.4 },
};

const Header: FC<{
	openThreshold: number
	style?: object
}> = ({ openThreshold, style = {} }) => {
	const [isOpen, setOpen] = useState<boolean>(false);

	useEffect(() => {
		const handleScroll = () => {
			setOpen(window.scrollY >= openThreshold);
		};
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [openThreshold]);

	return (
		<Box sx={{ ...sx.root, ...style }}>
			<motion.div
				{...dividerAnimation}
				animate={isOpen ? 'show' : 'hidden'}
				style={sx.dividerContainer}
			>
				<Box sx={sx.divider} />
			</motion.div>
			<Box sx={sx.content}>
				<Box sx={sx.menuButton}>Menu 1</Box>
				<Box sx={sx.menuButton}>Menu 2</Box>
			</Box>
		</Box>
	);
};

export default Header;
