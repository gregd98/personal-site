import { useState, useMemo, RefObject } from 'react';
import useResizeObserver from 'use-resize-observer';
import _ from 'lodash';

interface ISize {
	width?: number
	height?: number
}

const useDebouncedResizeObserver =  (ref: RefObject<any>, wait: number, leading = false): ISize => {
	const [size, setSize] = useState<ISize>({});
	const onResize = useMemo(() => _.debounce(setSize, wait, { leading }), [
		wait, leading,
	]);
	useResizeObserver({ ref, onResize });

	return size;
};

export default useDebouncedResizeObserver;
