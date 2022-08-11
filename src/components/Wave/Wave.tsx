import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import useDebouncedResizeObserver from '../../hooks/useDebouncedResizeObserver';

const sx = {
	root: {
		width: '100%',
		height: '100vh',
		backgroundColor: '#FF000020',
		'& canvas': {
			width: '100%',
			height: '100%',
		},
	},
};

interface IPoint {
	x: number
	y: number
}

interface Props {
	style?: object
}

const Wave = ({ style = {} }: Props) => {
	const rootRef = useRef<any>(null);
	const canvasRef = useRef(null);
	const [width, setWidth] = useState<number>(0);
	const [height, setHeight] = useState<number>(0);
	const size = useDebouncedResizeObserver(rootRef, 500);

	useEffect(() => {
		if (size?.width && size?.height) {
			setWidth(size.width);
			setHeight(size.height);
		}
	}, [size]);

	useEffect(() => {
		const canvas: any = canvasRef.current;
		const ctx: any = canvas.getContext('2d');

		let cursorPos: IPoint | null = null;

		const dpi = window.devicePixelRatio;
		const styleHeight = +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
		const styleWidth = +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
		canvas.setAttribute('height', styleHeight * dpi);
		canvas.setAttribute('width', styleWidth * dpi);
		let frameCount = 0;
		let animationFrameId: number;

		const draw = () => {
			// const dpi = window.devicePixelRatio;
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			ctx.fillStyle = '#000000';

			ctx.fillStyle = '#FFF';
			ctx.fillRect(0, 0, width * dpi, (height / 2) * dpi);
			ctx.fillStyle = '#000';
			ctx.fillRect(0, (height / 2) * dpi, width * dpi, (height / 2) * dpi);

			// const drawPoint = ({ x, y }: IPoint,  col = 'red') => {
			// 	ctx.fillStyle = col;
			// 	ctx.beginPath();
			// 	ctx.arc(x, y, 6 * dpi, 0, Math.PI * 2);
			// 	ctx.fill();
			// };

			const { top: rootTop } = rootRef.current.getBoundingClientRect();

			let up: boolean;
			let lineDist;
			if (cursorPos?.y) {
				up = (rootTop + height) / 2 > cursorPos.y / dpi;
				up = !up;
				lineDist = Math.abs((rootTop + height) / 2 - cursorPos.y / dpi);
			} else {
				up = true;
				lineDist = 0;
			}
			// const up = false;
			const maxH = 60;
			const minDist = 80;
			const maxDist = 500;
			const h = Math.min(lineDist * 0.55, maxH);
			const dist = (1 - (h / maxH)) * (maxDist - minDist) + minDist;

			// (1-(v-a1) /(a2-a1)) * (b2-b1) + b1
			// const width;

			const cent = cursorPos?.y ? cursorPos.x / dpi : width / 2;
			const centerY = (height / 2 + (up ? -h : +h)) * dpi;
			const centerPoint = { x: cent * dpi, y: centerY };
			const leftPoint = { x: (cent - dist) * dpi, y: (height / 2) * dpi };
			const rightPoint = { x: (cent + dist) * dpi, y: (height / 2) * dpi };

			const leftControl = { x: (cent - dist / 2) * dpi, y: centerY };
			const rightControl = { x: (cent + dist / 2) * dpi, y: centerY };

			const drawCurve = () => {
				ctx.beginPath();
				ctx.strokeStyle = up ? '#000' : '#FFF';
				ctx.fillStyle = up ? '#000' : '#FFF';
				ctx.moveTo(leftPoint.x, leftPoint.y);  // start left side
				ctx.quadraticCurveTo(leftControl.x, leftControl.y, centerPoint.x, centerPoint.y);
				ctx.quadraticCurveTo(rightControl.x, rightControl.y, rightPoint.x, rightPoint.y);
				ctx.fill();
			};

			// drawPoint(leftPoint);
			// drawPoint(centerPoint);
			// drawPoint(rightPoint);
			// drawPoint(leftControl, 'blue');
			// drawPoint(rightControl, 'blue');
			drawCurve();
		};

		const render = () => {
			frameCount += 1;
			if (width && height) {
				draw();
			}
			animationFrameId = window.requestAnimationFrame(render);
		};
		render();

		const handleMouseMove = (e: MouseEvent) => {
			cursorPos = { x: e.pageX * dpi, y: e.pageY * dpi };
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.cancelAnimationFrame(animationFrameId);
			window.removeEventListener('mousemove', handleMouseMove);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [width, height, canvasRef]);

	return (
		<Box ref={rootRef} sx={{ ...sx.root, ...style }}>
			<canvas ref={canvasRef} />
		</Box>
	);
};

export default Wave;
