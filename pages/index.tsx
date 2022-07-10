import axios from 'axios';
import { useState } from 'react';
import Head from 'next/head';

import type { NextPage, GetServerSideProps } from 'next';
import type { Data, Location } from '../types/typeWeatherApi';

import { getCurrentWeather } from './api/currentWeather';
import { getCurrentLocation } from './api/currentLocation';
import WeatherCardList from '../components/weather-card-list/weather-card-list';
import WeatherDisplay from '../components/weather-display/weather-display';
import WeatherForecastList from '../components/weather-forecast-list/weather-forecast-list';

// TODO: Replace any data type for initialData
const Home: NextPage = ({ initialWeather, initialLocation }: any) => {
	const [location, setLocation] = useState<Location>(initialLocation);
	const [weatherData, setWeatherData] = useState<Data>(initialWeather);
	// TODO: Ask user what units to display
	const [units, setUnits] = useState('metric');
	// TODO: Ask user what language to display
	const [lang, setLang] = useState('en');

	const getGeolocationData = () => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				axios
					.get(
						`/api/currentLocation?lon=${position.coords.longitude}&lat=${position.coords.latitude}`
					)
					.then((response) => setLocation(response.data[0]));
			},
			(error) => {
				// TODO: Handle user declining geolocation prompt
				// eq. show message on screen that the app won't show
				// weather for current location
				console.warn(`ERROR(${error.code}): ${error.message}`);
			},
			{
				timeout: 10000,
				maximumAge: 0,
			}
		);
	};

	const getCurrentWeather = async () => {
		await axios
			.get(
				`/api/currentWeather?lon=${location.lon}&lat=${location.lat}&units=${units}&lang=${lang}`
			)
			.then((response) => setWeatherData(response.data))
			// TODO: Inform user of an error on screen not in console
			.catch((error) => console.error(error));
	};

	return (
		<>
			<Head>
				<title>
					Weather for {location.name}, {location.country}
				</title>
			</Head>
			{/* TODO: This section is for testing only - will be removed */}
			<section
				className="testing"
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					paddingBottom: '2rem',
				}}
			>
				<div>
					<p>Latitude: {location.lat}</p>
					<p>Longitude: {location.lon}</p>
				</div>
				<button onClick={getGeolocationData}>Get Current Location</button>

				<button onClick={getCurrentWeather}>Get Current Weather</button>
			</section>
			<section className="current-weather">
				<WeatherDisplay
					location={location}
					current={weatherData.current}
					daily={weatherData.daily}
				/>
				<WeatherCardList currentWeatherData={weatherData.current} />
			</section>
			<hr />
			<section className="weather-forecast">
				<WeatherForecastList daily={weatherData.daily} />
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
