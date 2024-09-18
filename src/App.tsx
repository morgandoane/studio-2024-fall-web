import React, { FC, useRef } from 'react';
import Map, { MapRef } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './map.css';

const token = process.env.REACT_APP_MAPBOX_TOKEN;

const App: FC = () => {
	if (!token) throw new Error('Mapbox token not found');

	const ref = useRef<MapRef>(null);

	return (
		<Map
			ref={ref}
			mapboxAccessToken={token}
			interactive
			mapStyle={'mapbox://styles/morganddoane/cm15g7rjn000k01nwcune9cm0'}
			projection={{
				name: 'globe',
			}}
			style={{
				height: '100vh',
				width: '100vw',
			}}
		/>
	);
};

export default App;
