import type { Current } from '../../types/typeWeatherApi';

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
				{/* TODO: Create separate components for each title */}
				{title === 'Wind' && (
					<div className={style['compass']}>
						<div className={style['direction']}>
							<p>
								NE
								<span>{current?.wind_deg}&deg;</span>
							</p>
						</div>
						<div
							className={style['arrow']}
							style={{ transform: `rotate(${current?.wind_deg}deg)` }}
						></div>
						<div className={style['arrow-hand']}></div>
					</div>
				)}
			</div>
		</article>
	);
};

export default WeatherCard;
