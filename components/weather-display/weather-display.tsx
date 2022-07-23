import { IconContext } from 'react-icons';
import { MdOutlineLocationOn, MdOutlineVisibility } from 'react-icons/md';
import { WiCloudy } from 'react-icons/wi';
import { BsDropletHalf } from 'react-icons/bs';

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
	current: Current;
	daily: Daily[];
}) => {
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
								Today at <TimeDisplay time={current.dt} />
							</p>
						</div>
					</div>
					<div className={style['temp-container']}>
						<h2 className={style['weather-temp']}>
							{Math.round(current.temp)} &deg;C
						</h2>
						{Math.round(current.feels_like) !== Math.round(current.temp) ? (
							<p className={style['temp-feels']}>
								Feels like {Math.round(current.feels_like)} &deg;C
							</p>
						) : null}
						<p className={style['weather-desc']}>Mostly clear</p>
					</div>
					<div className={style['weather-data']}>
						<div className={style['data-container']}>
							<WiCloudy className={style['icon-clouds']} />
							<p>{current.clouds}%</p>
						</div>
						<div className={style['data-container']}>
							<MdOutlineVisibility className={style['icon-visibility']} />
							<p>{current.visibility / 1000} km</p>
						</div>
						<div className={style['data-container']}>
							<BsDropletHalf className={style['icon-dew-point']} />
							<p>{Math.round(current.dew_point)} &deg;C</p>
						</div>
					</div>
				</div>
				<div className={style['temp-graph']}>
					<GraphTemp temp={daily[0].temp} />
				</div>
			</article>
		</IconContext.Provider>
	);
};

export default WeatherDisplay;
