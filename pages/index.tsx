import type { NextPage, GetServerSideProps } from 'next';
import type { Data } from '../types/typeWeatherApi';

import { useState } from 'react';
import axios from 'axios';

import WeatherCard from '../components/weather-card/weather-card';

const Home: NextPage<Data> = () => {
	const [location, setLocation] = useState({
		lon: -73.935242,
		lat: 40.73061,
	});
	const [weatherData, setWeatherData] = useState<Data>({
		lat: location.lat,
		lon: location.lon,
		timezone: '',
		timezone_offset: 0,
	});
	const [units, setUnits] = useState('metric');
	const [exclude, setExclude] = useState('');
	const [lang, setLang] = useState('en');

	const getGeolocationData = () => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				let location = position.coords;

				setLocation({
					lon: location.longitude,
					lat: location.latitude,
				});
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

	// TODO: Do something useful not console.log
	const getCurrentWeather = async () => {
		await axios
			.get(
				`/api/currentWeather?lon=${location.lon}&lat=${location.lat}&exclude=${exclude}&units=${units}&lang=${lang}`
			)
			.then((response) => setWeatherData(response.data))
			// TODO: Infrom user of an error on screen not in console
			.catch((error) => console.error(error));
	};

	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<h1 className="text-4xl font-bold">Weather Dashboard</h1>
			<div>
				<p>Latitude: {location.lat}</p>
				<p>Longitude: {location.lon}</p>
			</div>
			<button
				className="p-2 border-2 bg-cyan-500  border-black  hover:bg-cyan-300"
				onClick={getGeolocationData}
			>
				Get Current Location
			</button>

			<button
				className="p-2 border-2 bg-cyan-500  border-black  hover:bg-cyan-300"
				onClick={getCurrentWeather}
			>
				Get Current Weather
			</button>

			<WeatherCard
				lat={weatherData.lat}
				lon={weatherData.lon}
				timezone={weatherData.timezone}
				timezone_offset={weatherData.timezone_offset}
				current={weatherData.current}
			/>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const response = await axios.get(
		`http://localhost:3000/api/currentWeather?lat=-73.935242&lon=40.73061&units=metric&lang=en&appid=${process.env.OPEN_WEATHER_API}`
	);

	return {
		props: {
			initialData: response.data,
		},
	};
};

export default Home;
