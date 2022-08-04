import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import type { NextPage } from 'next';

const WeatherMap = dynamic(
	() => import('../../components/weather-map/weather-map'),
	{
		ssr: false,
	}
);

interface MapProps {
	locationData: any;
}

const Map: NextPage<MapProps> = ({ locationData }) => {
	const [location, setLocation] = useState();

	useEffect(() => {
		if (locationData) {
			setLocation(locationData);
		}
	}, [locationData]);

	return <WeatherMap location={location} />;
};

export default Map;
