const hexToRgb = (hex: string) => {
	const bigint = parseInt(hex.slice(1), 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;
	return [r, g, b];
};

const rgbToHex = (r: number, g: number, b: number) => {
	return (
		'#' +
		((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
	);
};

const interpolateColor = (
	color1: number[],
	color2: number[],
	factor: number
) => {
	const result = color1.slice();
	for (let i = 0; i < 3; i++) {
		result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
	}
	return result;
};

export const getColorOnGradient = (
	value: number,
	max: number,
	hexCodes: string[]
) => {
	if (value < 0 || value > max || hexCodes.length === 0) return null;

	// Determine the interval between colors
	const steps = hexCodes.length - 1;
	const step = (value / max) * steps;
	const lowerIndex = Math.floor(step);
	const upperIndex = Math.min(lowerIndex + 1, hexCodes.length - 1);

	const factor = step - lowerIndex;

	// Get the RGB values of the two colors to interpolate between
	const color1 = hexToRgb(hexCodes[lowerIndex]);
	const color2 = hexToRgb(hexCodes[upperIndex]);

	// Interpolate between color1 and color2
	const interpolatedColor = interpolateColor(color1, color2, factor);

	// Convert the interpolated RGB color back to hex
	return rgbToHex(
		interpolatedColor[0],
		interpolatedColor[1],
		interpolatedColor[2]
	);
};
