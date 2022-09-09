import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

const sx = {
	root: {
		height: '100%',
		width: '40px',
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	divider: {
		width: '1px',
		height: '100%',
		backgroundColor: 'text.primary',
		borderRadius: '1px',
		transition: 'background-color .3s',
	},
	text: {
		writingMode: 'vertical-rl',
		transform: 'scale(-1, -1)',
		position: 'sticky',
		bottom: '16px',
		fontSize: '18px',
		color: 'text.primary',
		transition: 'color .3s',
	},
};

const SectionDivider: FC<{ title: string, style?: object }> = ({ title, style = {} }) => (
	<Box sx={{ ...sx.root, ...style }}>
		<Box sx={sx.divider} />
		<Typography sx={sx.text}>{title}</Typography>
	</Box>
);

export default SectionDivider;
