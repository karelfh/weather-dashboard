import type { Daily } from '../../types/typeWeatherApi';
import type { Date } from '../../types/typeDate';

import style from './weather-forecast-card.module.scss';

const WeatherForecastCard = ({ day, date }: { day: Daily; date: Date }) => {
	return (
		<>
			{day && (
				<div className={style['card']} key={day.dt}>
					<div className={style['card-inner']}>
						<p className={style['day']}>{date.weekDay}</p>
						<p className={style['date']}>
							{date.day}.{date.month}.{date.year}
						</p>
					</div>
					<div className={style['card-inner']}>
						<p className={style['temp']}>{Math.round(day.temp.max)} °C</p>
					</div>
					<div className={style['card-inner']}>
						<i
							className={`wi wi-owm-day-${day.weather![0].id} ${style['icon']}`}
						></i>
					</div>
				</div>
			)}
		</>
	);
};

export default WeatherForecastCard;
