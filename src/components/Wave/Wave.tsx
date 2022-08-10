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

	let cursorPos: IPoint | null = null;

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const dpi = window.devicePixelRatio;
			cursorPos = { x: e.pageX * dpi, y: e.pageY * dpi };
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	useEffect(() => {
		if (size?.width && size?.height) {
			setWidth(size.width);
			setHeight(size.height);
		}
	}, [size]);

	const draw = (ctx: any) => {
		const dpi = window.devicePixelRatio;
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.fillStyle = '#000000';
		ctx.strokeStyle = '#000000';

		ctx.beginPath();
		ctx.moveTo(0, (height / 2) * dpi);
		ctx.lineTo(width * dpi, (height / 2) * dpi);
		ctx.stroke();

		ctx.fillStyle = '#FFF';
		ctx.fillRect(0, 0, width * dpi, (height / 2) * dpi);
		ctx.fillStyle = '#000';
		ctx.fillRect(0, (height / 2) * dpi, width * dpi, (height / 2) * dpi);

		const drawPoint = ({ x, y }: IPoint,  col = 'red') => {
			ctx.fillStyle = col;
			ctx.beginPath();
			ctx.arc(x, y, 6 * dpi, 0, Math.PI * 2);
			ctx.fill();
		};

		const { top: rootTop } = rootRef.current.getBoundingClientRect();

		let up: boolean;
		let lineDist;
		if (cursorPos?.y) {
			up = (rootTop + height) / 2 > cursorPos.y / dpi;
			lineDist = Math.abs((rootTop + height) / 2 - cursorPos.y / dpi);
		} else {
			up = true;
			lineDist = 0;
		}
		// const up = false;
		const maxH = 100;
		const minDist = 100;
		const maxDist = 300;
		const h = Math.min(lineDist * 0.55, maxH);
		const dist = Math.min((maxDist - minDist) / (1 / (maxH / h)) - minDist, 300);
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

	useEffect(() => {
		const canvas: any = canvasRef.current;
		const ctx: any = canvas.getContext('2d');

		const dpi = window.devicePixelRatio;
		const styleHeight = +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
		const styleWidth = +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
		canvas.setAttribute('height', styleHeight * dpi);
		canvas.setAttribute('width', styleWidth * dpi);
		let frameCount = 0;
		let animationFrameId: number;

		const render = () => {
			frameCount += 1;
			draw(ctx);
			animationFrameId = window.requestAnimationFrame(render);
		};
		render();

		return () => {
			window.cancelAnimationFrame(animationFrameId);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [width, height]);

	return (
		<Box ref={rootRef} sx={{ ...sx.root, ...style }}>
			<canvas ref={canvasRef} />
		</Box>
	);
};

export default Wave;
