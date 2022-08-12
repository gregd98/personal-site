import React, { FC } from 'react';
import { Box } from '@mui/material';
import { px } from 'utils/utils';

const WIDTH = 300;

const sx = {
	root: {
		position: 'fixed',
		top: 0,
		right: `calc(50% - ${px(WIDTH)} / 2)`,
		width: px(WIDTH),
		height: '60px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		columnGap: '16px',
		alignItems: 'center',
		// backgroundColor: '#00FF0010',
		paddingRight: '20px',
	},
	menuButton: {
		fontSize: '16px',
		fontFamily: 'poppins',
		color: 'black',
		cursor: 'pointer',
		backgroundColor: '#FFFFFF50',
	},
};

const Header: FC<{
	style?: object
}> = ({ style = {} }) => (
	<Box sx={{ ...sx.root, ...style }}>
		<Box sx={sx.menuButton}>Menu 1</Box>
		<Box sx={sx.menuButton}>Menu 2</Box>
	</Box>
);

export default Header;
