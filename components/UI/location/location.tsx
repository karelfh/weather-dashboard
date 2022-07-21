import axios from 'axios';
import { FaSearchLocation } from 'react-icons/fa';

import { Data } from '../../../types/typeWeatherApi';

import style from './location.module.scss';

const Location = ({
	handleData,
}: {
	handleData: (weatherData: Data, locationData: Data) => void;
}) => {
	const handleClick = () => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				axios
					.get(
						`/api/currentLocation?lon=${position.coords.longitude}&lat=${position.coords.latitude}`
					)
					.then((response) => {
						const data = response.data[0];

						getCurrentWeather(data);
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

	const getCurrentWeather = async (locationData: any) => {
		await axios
			.get(
				`/api/currentWeather?lon=${locationData.lon}&lat=${
					locationData.lat
				}&units=${`metric`}&lang=${locationData.country}`
			)
			.then((response) => handleData(response.data, locationData))
			// TODO: Inform user of an error on screen not in console
			.catch((error) => console.error(error));
	};

	return (
		<div className={style['toggle']}>
			<FaSearchLocation
				className={style['toggle-icon']}
				onClick={handleClick}
			/>
		</div>
	);
};

export default Location;
