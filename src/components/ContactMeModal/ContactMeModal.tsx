import React, { FC } from 'react';
import { Box } from '@mui/material';

const sx = {
	root: {
		position: 'fixed',
		bottom: '16px',
		right: '16px',
		width: '200px',
	},
	content: {
		width: '100%',
		borderRadius: '8px',
		backgroundColor: '#252525',
		height: '80px',
	},
};

const ContactMeModal: FC = () => (
	<Box sx={sx.root}>
		<Box sx={sx.content} />
	</Box>
);

export default ContactMeModal;
