import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import type { NextPage } from 'next';
import { Location } from '../../types/typeWeatherApi';

const WeatherMap = dynamic(
	() => import('../../components/weather-map/weather-map'),
	{
		ssr: false,
	}
);

interface MapProps {
	locationData: Location;
}

const Map: NextPage<MapProps> = ({ locationData }: MapProps) => {
	const [location, setLocation] = useState<Location>();

	useEffect(() => {
		if (locationData) {
			setLocation(locationData);
		}
	}, [locationData]);

	return <WeatherMap location={location} />;
};

export default Map;
