/* eslint-disable no-param-reassign */
import React, { useRef, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import _ from 'lodash';

const RADIUS = 4;
const THRESHOLD = 300;
const DENS = 130;
const MIN_DENS = 10;
const DEFAULT_LINE_WIDTH = 2;
const MIN_LINE_WIDTH = 0.5;
const MAX_LINE_WIDTH = 5;

const sx = {
	root: {
		width: '100%',
		height: '100vh',
		'& canvas': {
			width: '100%',
			height: '100%',
		},
	},
};

interface IMousePos {
	x: number
	y: number
}

interface INode {
	x: number
	y: number
	dir: number
	speed: number
}

const getDir = (angle: number): number => (angle * Math.PI) / 180;

const createNode = (width: number, height: number, fromSide = true): INode => {
	const a = Math.random() * 180;
	const speed = Math.random() / 2 + 0.2;
	let dir,
		x,
		y;
	if (fromSide) {
		switch (Math.floor(Math.random() * 4)) {
			case 0:
				x = -RADIUS;
				y = Math.random() * height;
				dir = getDir(a >= 90 ? a + 180 : getDir(a));
				break;
			case 1:
				x = width + RADIUS;
				y = Math.random() * height;
				dir = getDir(a + 90);
				break;
			case 2:
				x = Math.random() * width;
				y = -RADIUS;
				dir = getDir(a);
				break;
			default:
				x = Math.random() * width;
				y = height + RADIUS;
				dir = getDir(a + 180);
		}
	} else {
		x = Math.random() * width;
		y = Math.random() * height;
		dir = getDir(Math.random() * 380);
	}
	return {
		x, y, dir, speed,
	};
};

const calculateDistance = (x1: number, x2: number, y1: number, y2: number): number => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

const calculateDistances = (nodes: INode[], count: number): number[] => {
	const res = [];
	for (let i = 0; i < count; i += 1) {
		for (let j = 0; j < count; j += 1) {
			res.push(i === j ? 0 : calculateDistance(nodes[i].x, nodes[j].x, nodes[i].y, nodes[j].y));
		}
	}
	return res;
};

const getLineWidthByDistance = (dist: number): number => ((THRESHOLD - dist) / THRESHOLD) * (MAX_LINE_WIDTH - MIN_LINE_WIDTH) + MIN_LINE_WIDTH;

const getCount = (rootRef: any) => {
	if (rootRef.current) {
		return Math.max(Math.floor((rootRef.current.clientWidth * rootRef.current.clientHeight * DENS) / 2073600), MIN_DENS);
	}
	return MIN_DENS;
};

let mousePos: IMousePos | null = null;

interface Props {
	color?: string
	style?: object
	dynamicLineWidth?: boolean
}

const Graph = ({ color = '#000000', style = {}, dynamicLineWidth = false }: Props) => {
	const rootRef = useRef<any>(null);
	const canvasRef = useRef(null);
	const [count, setCount] = useState(0);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		const handleMouse = (e: MouseEvent) => {
			const dpi = window.devicePixelRatio;
			mousePos = { x: e.pageX * dpi, y: e.pageY * dpi };
		};

		const handleResize = () => {
			if (rootRef.current) {
				setWidth(rootRef.current.clientWidth);
				setHeight(rootRef.current.clientHeight);
				setCount(getCount(rootRef));
			}
		};

		const handleTouch = (e: TouchEvent) => {
			const touch = e.touches[0];
			const dpi = window.devicePixelRatio;
			mousePos = { x: touch.clientX * dpi, y: touch.clientY * dpi };
		};

		const handleResizeDebounced = _.debounce(handleResize, 500);

		window.addEventListener('mousemove', handleMouse);
		window.addEventListener('resize', handleResizeDebounced);
		window.addEventListener('touchmove', handleTouch);

		handleResize();

		return () => {
			window.removeEventListener('mousemove', handleMouse);
			window.removeEventListener('resize', handleResizeDebounced);
			window.removeEventListener('touchmove', handleTouch);
		};
	}, []);

	const nodes: INode[] = [];
	let distances = [];

	const draw = (ctx: any) => {
		for (let i = 0; i < count; i += 1) {
			const node = nodes[i];
			const newNode = {
				...node,
				x: node.x + Math.cos(node.dir) * node.speed,
				y: node.y + Math.sin(node.dir) * node.speed,
			};
			if (newNode.x < -RADIUS || newNode.y < -RADIUS || newNode.x >= ctx.canvas.width + RADIUS || newNode.y >= ctx.canvas.height + RADIUS) {
				nodes[i] = createNode(ctx.canvas.width, ctx.canvas.height);
			} else {
				nodes[i] = newNode;
			}
		}

		distances = calculateDistances(nodes, count);

		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.fillStyle = color;
		ctx.strokeStyle = color;

		for (let i = 0; i < count; i += 1) {
			ctx.beginPath();
			ctx.arc(nodes[i].x, nodes[i].y, RADIUS, 0, Math.PI * 2, true);
			ctx.fill();
		}

		if (mousePos) {
			ctx.beginPath();
			ctx.arc(mousePos.x, mousePos.y, RADIUS, 0, Math.PI * 2, true);
			ctx.fill();
		}

		for (let i = 0; i < count; i += 1) {
			for (let j = 0; j < count; j += 1) {
				if (i !== j && distances[i * count + j] <= THRESHOLD) {
					ctx.beginPath();
					ctx.moveTo(nodes[i].x, nodes[i].y);
					if (dynamicLineWidth) {
						ctx.lineWidth = getLineWidthByDistance(distances[i * count + j]);
					} else {
						ctx.lineWidth = DEFAULT_LINE_WIDTH;
					}
					ctx.lineTo(nodes[j].x, nodes[j].y);
					ctx.stroke();
				}
			}
			if (mousePos) {
				const mouseDist = calculateDistance(nodes[i].x, mousePos.x, nodes[i].y, mousePos.y);
				if (mouseDist <= THRESHOLD) {
					ctx.beginPath();
					ctx.moveTo(nodes[i].x, nodes[i].y);
					if (dynamicLineWidth) {
						ctx.lineWidth = getLineWidthByDistance(mouseDist);
					} else {
						ctx.lineWidth = DEFAULT_LINE_WIDTH;
					}
					ctx.lineTo(mousePos.x, mousePos.y);
					ctx.stroke();
				}
			}
		}
	};

	useEffect(() => {
		const canvas: any = canvasRef.current;
		canvas.width = width;
		canvas.height = height - 5;
		const context: any = canvas.getContext('2d');
		let frameCount = 0;
		let animationFrameId: number;
		const dpi = window.devicePixelRatio;

		const styleHeight = +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
		const styleWidth = +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
		canvas.setAttribute('height', styleHeight * dpi);
		canvas.setAttribute('width', styleWidth * dpi);

		for (let i = 0; i < count; i += 1) {
			nodes.push(createNode(context.canvas.width, context.canvas.height, false));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
		distances = calculateDistances(nodes, count);

		const render = () => {
			frameCount += 1;
			draw(context);
			animationFrameId = window.requestAnimationFrame(render);
		};
		render();

		return () => {
			window.cancelAnimationFrame(animationFrameId);
		};
	}, [width, height, count, canvasRef]);

	return (
		<Box ref={rootRef} sx={{ ...sx.root, ...style }}>
			<canvas ref={canvasRef} />
		</Box>
	);
};

export default Graph;
