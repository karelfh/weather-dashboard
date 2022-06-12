import type { NextPage, GetServerSideProps } from 'next';
import type { AxiosResponse } from 'axios';
import type { Data, Location } from '../types/typeWeatherApi';

import { useState } from 'react';
import axios from 'axios';

import WeatherCard from '../components/weather-card/weather-card';
import WeatherDisplay from '../components/weather-display/weather-display';

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

			<WeatherDisplay
				location={location}
				current={weatherData.current}
				daily={weatherData.daily}
			/>

			<WeatherCard
				title={'Wind'}
				desc={'Today wind speed'}
				current={weatherData.current}
			/>
			<WeatherCard
				title={'Pressure'}
				desc={'Today pressure'}
				current={weatherData.current}
			/>
			<WeatherCard
				title={'Humidity'}
				desc={'Today humidity'}
				current={weatherData.current}
			/>
			<WeatherCard
				title={'UV Index'}
				desc={'Today UV Index'}
				current={weatherData.current}
			/>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const defaultLocation = {
		lat: '40.712776',
		lon: '-74.005974',
	};

	const weather: AxiosResponse = await axios.get(
		`http://localhost:3000/api/currentWeather?lat=${defaultLocation.lat}&lon=${defaultLocation.lon}&units=metric&lang=en&appid=${process.env.OPEN_WEATHER_API}`
	);

	const location: AxiosResponse = await axios.get(
		`http://localhost:3000/api/currentLocation?lat=${defaultLocation.lat}&lon=${defaultLocation.lon}&limit=1&appid=${process.env.OPEN_WEATHER_API}`
	);

	return {
		props: {
			initialWeather: weather.data,
			initialLocation: location.data[0],
		},
	};
};

export default Home;
