import { Current } from '../../types/typeWeatherApi';

const WeatherCard = ({
	title,
	desc,
	current,
}: {
	title: string;
	desc: string;
	current?: Current;
}) => {
	let value;
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
				<p>weather-dial-component</p>
			</div>
		</div>
	);
};

export default WeatherCard;
