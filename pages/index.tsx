import { useState, useEffect } from 'react';
import Head from 'next/head';
import Cookies from 'js-cookie';

import type { NextPage, GetServerSideProps } from 'next';
import type { Data, Location } from '../types/typeWeatherApi';

import { getCurrentWeather } from './api/currentWeather';
import { getCurrentLocation } from './api/currentLocation';
import WeatherCardList from '../components/weather-card-list/weather-card-list';
import WeatherDisplay from '../components/weather-display/weather-display';
import WeatherForecastList from '../components/weather-forecast-list/weather-forecast-list';

import style from './index.module.scss';

interface HomeProps {
	initialWeather: Data;
	initialLocation: Location;
	weatherData: Data;
	locationData: Location;
}

const Home: NextPage<HomeProps> = ({
	initialWeather,
	initialLocation,
	weatherData,
	locationData,
}: HomeProps) => {
	const [location, setLocation] = useState<Location>(initialLocation);
	const [currentWeatherData, setWeatherData] = useState<Data>(initialWeather);

	useEffect(() => {
		if (weatherData && locationData) {
			setWeatherData(weatherData);
			setLocation(locationData);

			// TODO: Create a custom hook?
			// TODO: Create a message to inform the user that we use cookies.
			if (Cookies.get('loc') === undefined) {
				Cookies.set('loc', locationData.lat + '-' + locationData.lon, {
					path: '/',
					sameSite: 'strict',
					secure: true,
					expires: 14,
				});
			}
		}
	}, [weatherData, locationData]);

	return (
		<>
			<Head>
				<title>
					WeatherWizz | {location.name}, {location.country}
				</title>
			</Head>
			<section className={style['current-weather']}>
				<WeatherDisplay
					location={location}
					current={currentWeatherData.current}
					daily={currentWeatherData.daily}
				/>
				<WeatherCardList currentWeatherData={currentWeatherData.current} />
			</section>
			<section className={style['weather-forecast']}>
				<WeatherForecastList daily={currentWeatherData.daily} />
			</section>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { cookie } = context.req.headers;

	// Select only numbers from the cookie and split them into an array.
	const locCookie = cookie && cookie.match(/\d+\.\d+/g);

	// If the cookie is not set, use the default location (London).
	const locLatCookie = locCookie ? locCookie[0] : '51.5072';
	const locLonCookie = locCookie ? locCookie[1] : '0.1275';

	const defaultWeatherQuery = {
		lat: locLatCookie,
		lon: locLonCookie,
		exclude: '',
		units: 'metric',
		lang: 'en',
	};

	const defaultLocationQuery = {
		lat: defaultWeatherQuery.lat,
		lon: defaultWeatherQuery.lon,
	};

	const defaultWeather = await getCurrentWeather(defaultWeatherQuery);
	const defaultLocation = await getCurrentLocation(defaultLocationQuery);

	return {
		props: {
			initialWeather: defaultWeather,
			initialLocation: defaultLocation[0],
		},
	};
};

export default Home;
