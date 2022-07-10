import type { Current } from '../../types/typeWeatherApi';

import WeatherCard from '../weather-card/weather-card';

import style from './weather-card-list.module.scss';

const WeatherCardList = ({
	currentWeatherData,
}: {
	currentWeatherData?: Current;
}) => {
	return (
		<article className={style['weather-indicators']}>
			<WeatherCard
				title={'Wind'}
				desc={'Today wind speed'}
				current={currentWeatherData}
			/>
			<WeatherCard
				title={'Pressure'}
				desc={'Today pressure'}
				current={currentWeatherData}
			/>
			<WeatherCard
				title={'Humidity'}
				desc={'Today humidity'}
				current={currentWeatherData}
			/>
			<WeatherCard
				title={'UV Index'}
				desc={'Today UV Index'}
				current={currentWeatherData}
			/>
		</article>
	);
};

export default WeatherCardList;
