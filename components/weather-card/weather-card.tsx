import type { Current } from '../../types/typeWeatherApi';

import style from './weather-card.module.css';

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
		<div>
			<article>
				<h2>{title}</h2>
				<p>{desc}</p>
				<p>
					{value} {units}
				</p>
			</article>
			<div>
				{/* TODO: Create separate components for each title */}
				{title === 'Wind' && (
					<div className={style['outer']}>
						<div
							className={style['needle']}
							style={{ transform: `rotate(${current?.wind_deg}deg)` }}
						></div>
						{current?.wind_deg}°
					</div>
				)}
			</div>
		</div>
	);
};

export default WeatherCard;
