import React, {
	useRef, useEffect, useState, useMemo,
} from 'react';
import { Box } from '@mui/material';
import useDebouncedResizeObserver from 'hooks/useDebouncedResizeObserver';

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

interface ICursorPos {
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

const createNode = (width: number, height: number, radius: number, fromSide = true): INode => {
	const a = Math.random() * 180;
	const speed = Math.random() / 2 + 0.2;
	let dir,
		x,
		y;
	if (fromSide) {
		switch (Math.floor(Math.random() * 4)) {
			case 0:
				x = -radius;
				y = Math.random() * height;
				dir = getDir(a >= 90 ? a + 180 : getDir(a));
				break;
			case 1:
				x = width + radius;
				y = Math.random() * height;
				dir = getDir(a + 90);
				break;
			case 2:
				x = Math.random() * width;
				y = -radius;
				dir = getDir(a);
				break;
			default:
				x = Math.random() * width;
				y = height + radius;
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

const getLineWidthByDistance = (dist: number, threshold: number): number => {
	const dpi = window.devicePixelRatio;
	const min = MIN_LINE_WIDTH * dpi;
	const max = MAX_LINE_WIDTH * dpi;
	return ((threshold - dist) / threshold) * (max - min) + min;
};

const getCount = (rootRef: any, density: number, minimumDensity: number) => {
	if (rootRef.current) {
		const dpi = window.devicePixelRatio;
		return Math.max(Math.floor((rootRef.current.clientWidth * rootRef.current.clientHeight * density) / (2073600 / dpi)), minimumDensity);
	}
	return minimumDensity;
};

interface Props {
	color?: string
	style?: object
	radius?: number
	lineWidth?: number
	density?: number
	minimumDensity?: number
	threshold?: number
	dynamicLineWidth?: boolean
}

// let outerCursorPos: ICursorPos | null = null;

const Graph = ({
	color = '#000000',
	radius = 2,
	lineWidth = 0.5,
	density = 70,
	minimumDensity = 10,
	threshold = 160,
	style = {},
	dynamicLineWidth = false,
}: Props) => {
	const rootRef = useRef<HTMLDivElement>();
	const canvasRef = useRef(null);
	const [count, setCount] = useState<number>(0);
	const [width, setWidth] = useState<number>(0);
	const [height, setHeight] = useState<number>(0);
	const size = useDebouncedResizeObserver(rootRef, 500);

	const cp: ICursorPos | null = null;
	let cursorPos = useMemo<ICursorPos|null>(() => cp, [cp]);

	useEffect(() => {
		if (size?.width && size?.height) {
			setWidth(size.width);
			setHeight(size.height);
			setCount(getCount(rootRef, density, minimumDensity));
		}
	}, [size, density, minimumDensity]);

	const setCursorPos = (x: number, y: number) => {
		if (rootRef.current) {
			const rect = rootRef.current.getBoundingClientRect();
			const { top, left } = rect;
			const dpi = window.devicePixelRatio;
			cursorPos = { x: (x - left - window.scrollX) * dpi, y: (y - top - window.scrollY) * dpi };
			// cursorPos = pos;
			// outerCursorPos = pos;
			// cursorPos = pos;
		}
	};

	const handleMouseMove = (e: MouseEvent) => {
		setCursorPos(e.pageX, e.pageY);
	};

	const handleMouseLeave = () => {
		cursorPos = null;
	};

	const handleTouchMove = (e: TouchEvent) => {
		const [{ clientX, clientY }] = e.touches;
		setCursorPos(clientX, clientY);
	};

	const nodes: INode[] = [];
	let distances = [];

	const draw = (ctx: any) => {
		const dpi = window.devicePixelRatio;
		const currentRadius = radius * dpi;
		for (let i = 0; i < count; i += 1) {
			const node = nodes[i];
			const newNode = {
				...node,
				x: node.x + Math.cos(node.dir) * node.speed,
				y: node.y + Math.sin(node.dir) * node.speed,
			};
			if (newNode.x < -currentRadius || newNode.y < -currentRadius || newNode.x >= ctx.canvas.width + currentRadius || newNode.y >= ctx.canvas.height + currentRadius) {
				nodes[i] = createNode(ctx.canvas.width, ctx.canvas.height, currentRadius);
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
			ctx.arc(nodes[i].x, nodes[i].y, currentRadius, 0, Math.PI * 2, true);
			ctx.fill();
		}

		if (cursorPos) {
			ctx.beginPath();
			ctx.arc(cursorPos.x, cursorPos.y, currentRadius, 0, Math.PI * 2, true);
			ctx.fill();
		}

		for (let i = 0; i < count; i += 1) {
			for (let j = 0; j < count; j += 1) {
				if (i !== j && distances[i * count + j] <= threshold * dpi) {
					ctx.beginPath();
					ctx.moveTo(nodes[i].x, nodes[i].y);
					if (dynamicLineWidth) {
						ctx.lineWidth = getLineWidthByDistance(distances[i * count + j], threshold * dpi);
					} else {
						ctx.lineWidth = lineWidth * dpi;
					}
					ctx.lineTo(nodes[j].x, nodes[j].y);
					ctx.stroke();
				}
			}
			if (cursorPos) {
				const mouseDist = calculateDistance(nodes[i].x, cursorPos.x, nodes[i].y, cursorPos.y);
				if (mouseDist <= threshold * dpi) {
					ctx.beginPath();
					ctx.moveTo(nodes[i].x, nodes[i].y);
					if (dynamicLineWidth) {
						ctx.lineWidth = getLineWidthByDistance(mouseDist, threshold * dpi);
					} else {
						ctx.lineWidth = lineWidth * dpi;
					}
					ctx.lineTo(cursorPos.x, cursorPos.y);
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
		const newRadius = radius * dpi;

		const styleHeight = +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
		const styleWidth = +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
		canvas.setAttribute('height', styleHeight * dpi);
		canvas.setAttribute('width', styleWidth * dpi);

		for (let i = 0; i < count; i += 1) {
			nodes.push(createNode(context.canvas.width, context.canvas.height, newRadius, false));
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
	}, [width, height, count, canvasRef, radius, lineWidth, color]);

	return (
		<Box
			ref={rootRef}
			sx={{ ...sx.root, ...style }}
			onMouseMove={(e) => handleMouseMove(e.nativeEvent)}
			onMouseLeave={handleMouseLeave}
			onTouchMove={(e) => handleTouchMove(e.nativeEvent)}
			onTouchEnd={handleMouseLeave}
		>
			<canvas ref={canvasRef} />
		</Box>
	);
};

export default Graph;
