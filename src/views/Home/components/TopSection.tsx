import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { Graph } from 'components';
import { bp } from 'utils/utils';

const sx = {
	root: {
		position: 'relative',
		width: '100%',
		height: '500px',
	},
	graph: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		zIndex: 0,
		// paddingTop: '60px',
		// backgroundColor: '#FF000020',
	},
	contentContainer: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		px: '20px',
		pointerEvents: 'none',
	},
	content: {
		width: '100%',
		pt: '60px',
		maxWidth: '1200px',
		height: '100%',
		// backgroundColor: '#0000FF10',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		columnGap: '40px',
		mx: 'auto',
	},
	textContainer: {
		height: '100%',
		// backgroundColor: '#0000FF08',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	welcomeText: {
		pointerEvents: 'none',
		fontSize: '64px',
		lineHeight: '70px',
		fontFamily: 'raleway',
		color: 'black',
		fontWeight: 300,
		animationName: 'fade-in',
		animationDuration: '1.3s',
		animationDelay: '1.5s',
		animationFillMode: 'forwards',
		backgroundColor: '#FFFFFF40',
		// backgroundColor: '#FF0000',
		maxWidth: '290px',
		borderRadius: '20px',
		transition: 'all .3s',
		opacity: 0,
		'@keyframes fade-in': {
			from: {
				opacity: 0,
			},
			to: {
				opacity: 1,
			},
		},
		[bp(860)]: {
			fontSize: '48px',
			lineHeight: '52px',
		},
		[bp(450)]: {
			fontSize: '42px',
			lineHeight: '44px',
		},
	},
	nameText: {
		borderRadius: '40px',
		mt: '16px',
		ml: '80px',
		pointerEvents: 'none',
		fontSize: '80px',
		lineHeight: '110px',
		color: 'black',
		fontFamily: 'quicksand',
		fontWeight: 300,
		transition: 'all .3s',
		backgroundColor: '#FFFFFF40',
		// backgroundColor: 'red',
		animationName: 'fade-in',
		animationDuration: '1.3s',
		animationDelay: '3s',
		opacity: 0,
		animationFillMode: 'forwards',
		[bp(860)]: {
			fontSize: '52px',
			lineHeight: '55px',
			mt: 0,
		},
	},
	rightContainer: {
		width: '500px',
		height: 'calc(100%)',
		mt: '40px',
		// backgroundColor: '#00000030',
		border: '1px solid #00000030',
		borderRadius: '40px',
		transition: 'width .3s',
		[bp(1080)]: {
			width: '300px',
		},
		[bp(760)]: {
			display: 'none',
		},
	},
};

const TopSection: FC<{
	style?: object
}> = ({ style = {} }) => (
	<Box sx={{ ...sx.root, ...style }}>
		<Graph style={sx.graph} color='#cccccc' radius={1} />
		<Box sx={sx.contentContainer}>
			<Box sx={sx.content}>
				<Box sx={sx.textContainer}>
					<Typography sx={sx.welcomeText}>Welcome</Typography>
					<Typography sx={sx.nameText}>
						{'I am '}
						<Box component='span' sx={{ fontWeight: 500 }}>Greg</Box>
					</Typography>
				</Box>
				<Box sx={sx.rightContainer} />
			</Box>
		</Box>
	</Box>
);

export default TopSection;
