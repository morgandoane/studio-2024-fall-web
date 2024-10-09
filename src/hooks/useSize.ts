import { useState, useEffect, RefObject } from 'react';

export const useSize = (
	ref: RefObject<HTMLElement>
): { width: number; height: number } => {
	const [size, setSize] = useState<{ width: number; height: number }>(() => {
		if (ref.current) {
			return {
				width: ref.current.offsetWidth,
				height: ref.current.offsetHeight,
			};
		}

		return {
			width: 0,
			height: 0,
		};
	});

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
