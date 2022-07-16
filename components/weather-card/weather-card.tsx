import type { Current } from '../../types/typeWeatherApi';

import WindGauge from '../weather-gauges/wind-gauge/wind-gauge';
import UVIndexGauge from '../weather-gauges/UV-index-gauge/uv-index-gauge';

import WeatherGauge from '../weather-gauges/weather-gauge/weather-gauge';

import style from './weather-card.module.scss';

const WeatherCard = ({
	title,
	desc,
	current,
}: {
	title: string;
	desc: string;
	current?: Current;
}) => {
	let value: number | undefined;
	let units: string = '';

	switch (title) {
		case 'Wind':
			value = current?.wind_speed;
			units = 'km/h';
			break;
		case 'Pressure':
			value = current?.pressure;
			units = 'hPa';
			break;
		case 'Humidity':
			value = current?.humidity;
			units = '%';
			break;
		case 'UV Index':
			value = current?.uvi;
	}

	return (
		<article className={style['weather-card']}>
			<div className={style['info']}>
				<h2 className={style['title']}>{title}</h2>
				<p className={style['description']}>{desc}</p>
				<p className={style['value']}>
					{value} {units}
				</p>
			</div>
			<div className={style['gauge']}>
				{title === 'Wind' && <WindGauge windDirection={current?.wind_deg} />}
				{title === 'Pressure' && (
					<WeatherGauge
						value={current?.pressure}
						lowValue={978.25}
						highValue={1048.25}
						idealRange={[1009.14, 1022.69]}
					/>
				)}
				{title === 'Humidity' && (
					<WeatherGauge
						value={current?.humidity}
						lowValue={0}
						highValue={100}
						idealRange={[30, 50]}
					/>
				)}
				{title === 'UV Index' && <UVIndexGauge uvi={current?.uvi} />}
			</div>
		</article>
	);
};

export default WeatherCard;
