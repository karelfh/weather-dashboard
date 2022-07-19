import { useState, useEffect } from 'react';
import Head from 'next/head';

import type { NextPage, GetServerSideProps } from 'next';
import type { Data, Location } from '../types/typeWeatherApi';
import type { HomeProps } from '../types/pages';

import { getCurrentWeather } from './api/currentWeather';
import { getCurrentLocation } from './api/currentLocation';
import WeatherCardList from '../components/weather-card-list/weather-card-list';
import WeatherDisplay from '../components/weather-display/weather-display';
import WeatherForecastList from '../components/weather-forecast-list/weather-forecast-list';

import style from './index.module.scss';

const Home: NextPage<HomeProps> = ({
	initialWeather,
	initialLocation,
	weatherData,
	locationData,
}: {
	initialWeather: Data;
	initialLocation: Location;
	weatherData: any;
	locationData: any;
}) => {
	const [location, setLocation] = useState<Location>(initialLocation);
	const [currentWeatherData, setWeatherData] = useState<Data>(initialWeather);
	// TODO: Ask user what units to display
	const [units, setUnits] = useState('metric');
	// TODO: Ask user what language to display
	const [lang, setLang] = useState('en');

	useEffect(() => {
		if (weatherData && locationData) {
			setWeatherData(weatherData);
			setLocation(locationData);
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

export const getServerSideProps: GetServerSideProps = async () => {
	const defaultWeatherQuery = {
		lat: '51.5072',
		lon: '0.1276',
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
