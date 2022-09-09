import React, { FC, useEffect, useState } from 'react';
import { motion, AnimationProps } from 'framer-motion';
import { Box, Theme, useTheme } from '@mui/material';
import { bp, px } from 'utils';
import { useAppDispatch } from 'store/store';
import { changePalette } from 'store/ui';

const HEIGHT = 64;

const sx = {
	root: {
		position: 'fixed',
		top: 0,
		width: 'calc(100% - 60px)',
		height: px(HEIGHT),
		pointerEvents: 'none',
		transition: 'all .3s',
		[bp(760)]: {
			width: 'calc(100% - 16px)',
		},
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
		cursor: 'pointer',
		userSelect: 'none',
		transition: 'color .3s',
		color: 'text.primary',
		pointerEvents: 'auto',
	},
	dividerContainer: {
		position: 'absolute' as const,
		width: '100%',
		height: px(HEIGHT),
		backgroundColor: 'primary.main',
		transition: 'background-color .3s',
	},
	divider: {
		position: 'absolute',
		width: '100%',
		height: '1px',
		left: 0,
		bottom: 0,
		transition: 'all .3s',
		backgroundColor: 'text.primary',
	},
};

const dividerAnimation: AnimationProps = {
	variants: {
		hidden: { top: '-74px' },
		show: { top: 0 },
	},
	initial: 'hidden',
	transition: { duration: 0.3 },
};

const Header: FC<{
	openThreshold: number
	style?: object
}> = ({ openThreshold, style = {} }) => {
	const [isOpen, setOpen] = useState<boolean>(false);
	const { palette }: Theme = useTheme();
	const dispatch = useAppDispatch();

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
				style={{ ...sx.dividerContainer, backgroundColor: palette.primary.main }}
			>
				<Box sx={sx.divider} />
			</motion.div>
			<Box sx={sx.content}>
				<a href='/curriculum-vitae' target='_blank' rel='noreferrer noopener'>
					<Box sx={sx.menuButton}>My CV</Box>
				</a>
				<Box
					sx={sx.menuButton}
					onClick={(e) => {
						e.stopPropagation();
						dispatch(changePalette());
					}}
				>
					Color
				</Box>
			</Box>
		</Box>
	);
};

export default Header;
