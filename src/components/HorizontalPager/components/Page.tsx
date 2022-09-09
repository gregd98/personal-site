import React, { FC, PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import { Box, Theme, useTheme } from '@mui/material';
import SectionDivider from './SectionDivider';

const sx = {
	root: {
		position: 'absolute' as const,
		height: 'calc(100% - 80px)',
		marginTop: '40px',
		width: '100%',
		minWidth: '100%',
		display: 'flex',
		flexDirection: 'row' as const,
		transition: 'background-color .3s',
	},
	content: {
		flex: 1,
	},
};

const Page: FC<
	PropsWithChildren<{
	title: string,
	style?: object
}>
	> = ({
		title,
		style = {},
		children,
	}) => {
		const { palette }: Theme = useTheme();
		return (
			<motion.div style={{ ...sx.root, backgroundColor: palette.primary.main, ...style }}>
				<SectionDivider title={title} />
				<Box sx={sx.content}>
					{children}
				</Box>
			</motion.div>
		);
	};

export default Page;
