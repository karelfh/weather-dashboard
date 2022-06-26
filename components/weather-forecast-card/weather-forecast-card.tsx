import type { Daily } from '../../types/typeWeatherApi';

const WeatherForecastCard = ({ day, date }: { day?: Daily; date: string }) => {
	return (
		<>
			{day && (
				<div key={day.dt}>
					<div>{date}</div>
					<div>{day.temp.max} °C</div>
					<div>weather icon</div>
				</div>
			)}
		</>
	);
};

export default WeatherForecastCard;
