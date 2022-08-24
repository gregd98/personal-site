import React, {
	FC, MutableRefObject, useEffect, useRef,
} from 'react';
import { motion, MotionProps, useMotionValue } from 'framer-motion';
import { Box, Theme, useTheme } from '@mui/material';

const sx = {
	root: {
		height: '1200px',
		position: 'relative' as const,
		transition: 'background-color .3s',
	},
	divider: {
		width: '100%',
		height: '1px',
		borderRadius: '1px',
		backgroundColor: 'text.primary',
	},
};

const SecondSection: FC<{
	style?: object,
	topSectionRef: MutableRefObject<HTMLDivElement | undefined>}> = ({
		style = {},
		topSectionRef,
	}) => {
		const ref = useRef<any>();
		const { palette }: Theme = useTheme();
		const mt = useMotionValue(0);

		useEffect(() => {
			const handleScroll = () => {
				if (topSectionRef?.current) {
					const { height, bottom } = topSectionRef.current.getBoundingClientRect();
					const v = height - bottom;
					mt.set(Math.min(-v * 0.3, 0));
				}
			};
			window.addEventListener('scroll', handleScroll);
			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		}, [mt, topSectionRef]);

		const rootProps: MotionProps = {
			style: {
				...sx.root,
				...style,
				backgroundColor: palette.primary.main,
				marginTop: mt,
			},
			transition: { duration: 0.6 },
		};

		return (
			<motion.div
				ref={ref}
				{...rootProps}
			>
				<Box sx={sx.divider} />
			</motion.div>
		);
	};

export default SecondSection;
