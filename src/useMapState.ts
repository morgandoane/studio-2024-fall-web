import { RefObject, useState } from 'react';
import { MapRef, ViewState } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';

export interface MapState {
	view: ViewState;
	setView: (view: ViewState) => void;
}

export const useMapState = (
	ref: RefObject<MapRef>
): [
	state: MapState,
	flyTo: (
		lat: { min: number; max: number },
		lon: { min: number; max: number }
	) => void
] => {
	const [view, setView] = useState(defaultView);

	const res: [
		state: MapState,
		flyTo: (
			lat: { min: number; max: number },
			lon: { min: number; max: number }
		) => void
	] = [
		{ view, setView },
		(lat, lon) => {
			try {
				if (ref.current) {
					const map = ref.current.getMap();

					if (map) {
						// flyTo the bounds of the lat and lon
						// makre sure to pad the bounds and calculate a good zoom level

						const rect = new mapboxgl.LngLatBounds(
							[lon.min, lat.min],
							[lon.max, lat.max]
						);

						const padding = 100;

						map.fitBounds(rect, {
							padding: {
								top: padding,
								bottom: padding,
								left: padding,
								right: padding,
							},
						});
					}
				}
			} catch (e) {
				console.error(e);
			}
		},
	];

	return res;
};

const defaultView: ViewState = {
	latitude: 40.7608,
	longitude: -111.891,
	zoom: 10,
	pitch: 45,
	bearing: -20,
	padding: {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
};
