import React, {
	FC, useEffect, useRef, useState,
} from 'react';
import { Box } from '@mui/material';
import { motion, AnimationProps  } from 'framer-motion';

const sx = {
	root: {
		position: 'sticky',
		top: '60px',
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	divider: {
		height: '1px',
		borderRadius: '1px',
		backgroundColor: '#aaaaaa',
	},
};

const animation: AnimationProps = {
	variants: {
		short: { width: '300px' },
		long: { width: '100%' },
	},
	initial: 'short',
	transition: { duration: 0.3 },
};

const HeaderDivider: FC<{ style?: object }> = ({ style = {} }) => {
	const ref = useRef<HTMLDivElement>();
	const [isFullWidth, setFullWidth] = useState<boolean>(false);
	useEffect(() => {
		const handleScroll = () => {
			if (ref.current) {
				const { top } = ref.current.getBoundingClientRect();
				setFullWidth(top <= 60);
			}
		};
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<Box ref={ref} sx={{ ...sx.root, ...style }}>
			<motion.div
				{...animation}
				animate={isFullWidth ? 'long' : 'short'}
				style={sx.divider}
			/>
		</Box>
	);
};

export default HeaderDivider;
