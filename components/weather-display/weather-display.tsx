import { IconContext } from 'react-icons';
import { MdOutlineLocationOn } from 'react-icons/md';
import { GiWindsock } from 'react-icons/gi';
import { WiBarometer, WiHumidity } from 'react-icons/wi';

import type { Current, Daily, Location } from '../../types/typeWeatherApi';

import GraphTemp from '../graph-temp/graph-temp';
import TimeDisplay from '../utils/time-display/time-display';

import style from './weather-display.module.scss';

const WeatherDisplay = ({
	location,
	current,
	daily,
}: {
	location: Location;
	current?: Current;
	daily?: Daily[];
}) => {
	const same =
		current && Math.round(current.feels_like) !== Math.round(current.temp) ? (
			<p>Feels like {Math.round(current.feels_like)}</p>
		) : null;

	return (
		<IconContext.Provider value={{ className: style['icon'] }}>
			<article className={style['weather-display']}>
				<div className={style['weather-container']}>
					<div className={style['location-time']}>
						<div className={style['location']}>
							<MdOutlineLocationOn className={style['icon-location']} />
							<p>
								{location.name}, {location.country}
							</p>
						</div>
						<div className={style['time']}>
							<p>
								Today at <TimeDisplay time={current!.dt} />
							</p>
						</div>
					</div>
					<div className={style['temp-container']}>
						<h2 className={style['weather-temp']}>
							{current != null && Math.round(current.temp)} &deg;C
						</h2>
						{current &&
						Math.round(current.feels_like) !== Math.round(current.temp) ? (
							<p className={style['temp-feels']}>
								Feels like {Math.round(current.feels_like)} &deg;C
							</p>
						) : null}
						<p className={style['weather-desc']}>Mostly clear</p>
					</div>
					<div className={style['weather-data']}>
						<div className={style['data-container']}>
							<WiBarometer className={style['icon-pressure']} />
							<p>{current != null && Math.round(current.pressure)} hPa</p>
						</div>
						<div className={style['data-container']}>
							<WiHumidity className={style['icon-humidity']} />
							<p>{current != null && Math.round(current.humidity)} %</p>
						</div>
						<div className={style['data-container']}>
							<GiWindsock className={style['icon-wind-speed']} />
							<p>{current != null && Math.round(current.wind_speed)} km/h</p>
						</div>
					</div>
				</div>
				<div className={style['temp-graph']}>
					{daily != null && <GraphTemp temp={daily[0].temp} />}
				</div>
			</article>
		</IconContext.Provider>
	);
};

export default WeatherDisplay;
