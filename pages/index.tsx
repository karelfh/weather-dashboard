import type { NextPage } from 'next';
import { useState } from 'react';
import axios from 'axios';

const Home: NextPage<{ data: Array<string> }> = () => {
	const [location, setLocation] = useState({
		lon: -73.935242,
		lat: 40.73061,
	});

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
			.get(`/api/currentWeather?lon=${location.lon}&lat=${location.lat}`)
			.then((response) => console.log(response))
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
		</div>
	);
};

export default Home;
