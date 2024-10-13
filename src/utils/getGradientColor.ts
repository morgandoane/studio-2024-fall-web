export const getGradientColor = (
	colors: string[],
	value: number,
	min: number,
	max: number
): string => {
	// Ensure value stays within bounds
	if (value <= min) return colors[0];
	if (value >= max) return colors[colors.length - 1];

	// Normalize value to range 0 - 1
	const normalizedValue = (value - min) / (max - min);

	// Calculate gradient position
	const index = normalizedValue * (colors.length - 1);
	const lowerIndex = Math.floor(index);
	const upperIndex = Math.ceil(index);

	// If the exact position matches a color, return that color
	if (lowerIndex === upperIndex) return colors[lowerIndex];

	// Get the two colors between which the value lies
	const lowerColor = hexToRgb(colors[lowerIndex]);
	const upperColor = hexToRgb(colors[upperIndex]);

	// Calculate ratio between the two colors
	const ratio = index - lowerIndex;

	// Interpolate between the two colors
	const interpolatedColor = interpolateColor(lowerColor, upperColor, ratio);

	// Convert back to hex and return the result
	return rgbToHex(interpolatedColor);
};

// Helper function to convert hex to RGB
const hexToRgb = (hex: string): [number, number, number] => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? [
				parseInt(result[1], 16),
				parseInt(result[2], 16),
				parseInt(result[3], 16),
		  ]
		: [0, 0, 0];
};

// Helper function to convert RGB to hex
const rgbToHex = ([r, g, b]: [number, number, number]): string => {
	return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

// Helper function to interpolate between two RGB colors
const interpolateColor = (
	[r1, g1, b1]: [number, number, number],
	[r2, g2, b2]: [number, number, number],
	ratio: number
): [number, number, number] => {
	const r = Math.round(r1 + ratio * (r2 - r1));
	const g = Math.round(g1 + ratio * (g2 - g1));
	const b = Math.round(b1 + ratio * (b2 - b1));
	return [r, g, b];
};
