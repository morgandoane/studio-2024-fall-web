import { useState, useEffect, RefObject } from 'react';

export const useSize = (
	ref: RefObject<HTMLElement>,
	defaultSize: { width: number; height: number } = { width: 100, height: 100 } // default values
): { width: number; height: number } => {
	const [size, setSize] = useState<{ width: number; height: number }>(
		defaultSize
	);

	useEffect(() => {
		const updateSize = () => {
			if (ref.current) {
				setSize({
					width: ref.current.offsetWidth,
					height: ref.current.offsetHeight,
				});
			}
		};

		// Initialize ResizeObserver to observe element's size
		const observer = new ResizeObserver(() => {
			updateSize();
		});

		if (ref.current) {
			observer.observe(ref.current);
		}

		// Listen for window resize events
		window.addEventListener('resize', updateSize);

		// Call it initially to set the size right away
		updateSize();

		// Cleanup
		return () => {
			observer.disconnect();
			window.removeEventListener('resize', updateSize);
		};
	}, [ref]);

	return size;
};
