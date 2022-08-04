import { useEffect } from 'react';
import { TileLayer, useMap } from 'react-leaflet';

import type { Location } from '../../types/typeWeatherApi';

const BaseLayer = ({ location }: { location?: Location }) => {
	const map = useMap();

	useEffect(() => {
		if (location) {
			map.setView([location.lat, location.lon]);
		}
	}, [location, map]);

	return (
		<TileLayer
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		/>
	);
};

export default BaseLayer;
