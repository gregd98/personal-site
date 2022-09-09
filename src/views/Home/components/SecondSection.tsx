import React, {
	FC, MutableRefObject, useEffect, useRef, useState,
} from 'react';
import { motion, MotionValue, useMotionValue } from 'framer-motion';
import { Box } from '@mui/material';
import { HorizontalPager } from 'components';
import { useDebouncedResizeObserver } from 'hooks';

const sx = {
	root: {
		position: 'sticky' as const,
		height: 'calc(100vh - 63px)',
		top: '64px',
	},
	scrollArea: {
		position: 'absolute',
		top: 0,
		height: 'calc(100vh + 1600px)',
		width: '100%',
	},
	content: {
		width: '100%',
		height: 'calc(100vh - 63px)',
		position: 'sticky',
		top: '64px',
		transition: 'background-color .3s',
		backgroundColor: 'primary.main',
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
		const scrollAreaRef = useRef<HTMLDivElement>();
		const mt = useMotionValue(0);
		const [contentFixed, setContentFixed] = useState<boolean>(false);
		const { width } = useDebouncedResizeObserver(ref, 500);
		const [scrolls] = useState<MotionValue<number>[]>([
			useMotionValue<number>(width ? width - 40 : 3000),
			useMotionValue<number>(width ? width - 40 : 3000),
		]);

		useEffect(() => {
			const handleScroll = () => {
				if (topSectionRef?.current && ref?.current && scrollAreaRef?.current) {
					const { height, bottom } = topSectionRef.current.getBoundingClientRect();
					const { top } = ref.current.getBoundingClientRect();
					const v = height - bottom;
					setContentFixed(top <= 64);
					if (top >= 64) {
						mt.set(Math.min(-v * 0.4, 0));
					}
				}
				if (scrollAreaRef?.current && width) {
					const { top } = scrollAreaRef.current.getBoundingClientRect();
					const k = Math.abs(Math.min(top, 0));

					const sectionDividerWidth = 40;
					const range = width - sectionDividerWidth;

					const ratio1 = 1 - k / 800;
					const r1 = ratio1 * range;

					scrolls[0].set(Math.max(r1, 0));

					if (r1 > 0 && r1 <= 40) {
						scrolls[1].set(width - (40 - r1));
					} else {
						const ratio2 = 1 - (k - 800) / (1600 - 800);
						const r2 = ratio2 * range;
						scrolls[1].set(Math.max(r2, 0));
					}
				}
			};
			handleScroll();
			window.addEventListener('scroll', handleScroll);
			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		}, [scrolls, mt, topSectionRef, width]);

		return (
			<motion.div
				ref={ref}
				style={{
					...sx.root,
					...style,
					top: mt,
				}}
			>
				<Box sx={sx.content}>
					<Box sx={sx.divider} />
					<Box ref={scrollAreaRef} sx={sx.scrollArea} />
					<HorizontalPager isFixed={contentFixed} scrolls={scrolls} />
				</Box>
			</motion.div>
		);
	};

export default SecondSection;
