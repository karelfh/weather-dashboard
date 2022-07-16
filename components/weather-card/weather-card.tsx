import type { Current } from '../../types/typeWeatherApi';

import WindGauge from '../weather-gauges/wind-gauge/wind-gauge';
import PressureGauge from '../weather-gauges/pressure-gauge/pressure-gauge';
import HumidityGauge from '../weather-gauges/humidity-gauge/humidity-gauge';
import UVIndexGauge from '../weather-gauges/UV-index-gauge/uv-index-gauge';

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
				{title === 'Pressure' && <PressureGauge pressure={current?.pressure} />}
				{title === 'Humidity' && <HumidityGauge humidity={current?.humidity} />}
				{title === 'UV Index' && <UVIndexGauge uvi={current?.uvi} />}
			</div>
		</article>
	);
};

export default WeatherCard;
