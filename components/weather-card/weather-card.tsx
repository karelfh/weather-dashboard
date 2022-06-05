import { Data } from '../../types/typeWeatherApi';

const WeatherCard = (props: Data) => {
	return (
		<div>
			<article>
				<title>Wind</title>
				<p>Today wind speed</p>
				<p>{props.current?.wind_speed} km/h</p>
			</article>
			<div>
				<p>wind-needle</p>
			</div>
		</div>
	);
};

export default WeatherCard;
