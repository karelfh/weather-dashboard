import type { NextPage, GetServerSideProps } from 'next';
import type { AxiosResponse } from 'axios';
import type { Data } from '../types/typeWeatherApi';

import { useState } from 'react';
import axios from 'axios';

import WeatherCard from '../components/weather-card/weather-card';
import WeatherDisplay from '../components/weather-display/weather-display';

const Home: NextPage<Data> = (props: Data) => {
	const [location, setLocation] = useState({
		lon: -73.935242,
		lat: 40.73061,
	});
	const [weatherData, setWeatherData] = useState<Data>({
		lat: props.lat,
		lon: props.lon,
		timezone: props.timezone,
		timezone_offset: props.timezone_offset,
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

			<WeatherDisplay current={weatherData.current} daily={weatherData.daily} />

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

// TODO: FIX: getServerSideProps returns undefined in page props
export const getServerSideProps: GetServerSideProps = async () => {
	const response: AxiosResponse<Data> = await axios.get(
		`http://localhost:3000/api/currentWeather?lat=-73.935242&lon=40.73061&units=metric&lang=en&appid=${process.env.OPEN_WEATHER_API}`
	);

	return {
		props: {
			initialData: response.data,
		},
	};
};

export default Home;
