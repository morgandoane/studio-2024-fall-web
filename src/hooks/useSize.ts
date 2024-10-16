import { useState, useEffect, RefObject } from 'react';

export const useSize = (
	ref: RefObject<HTMLElement>,
	cacheKey: string
): { width: number; height: number } => {
	const [size, setSize] = useState(() => {
		if (!ref.current) {
			const cachedSize = localStorage.getItem(cacheKey);
			if (cachedSize) {
				const { width, height } = JSON.parse(cachedSize);
				return { width, height };
			} else {
				return { width: 0, height: 0 };
			}
		}

		return {
			width: ref.current.offsetWidth,
			height: ref.current.offsetHeight,
		};
	});

	useEffect(() => {
		if (!ref.current) return;

		const updateSize = () => {
			setSize({
				width: ref.current!.offsetWidth,
				height: ref.current!.offsetHeight,
			});
		};

		const observer = new ResizeObserver(updateSize);
		observer.observe(ref.current);

		// Initial size set
		updateSize();

		return () => {
			observer.disconnect();
		};
	}, [ref]);

	useEffect(() => {
		localStorage.setItem(cacheKey, JSON.stringify(size));
	}, [size, cacheKey]);

	return size;
};
