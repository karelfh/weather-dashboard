import { useEffect } from 'react';
import { TileLayer, useMap } from 'react-leaflet';

const BaseLayer = ({ location }: any) => {
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
