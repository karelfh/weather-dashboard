import type { Daily } from '../../types/typeWeatherApi';
import type { Date } from '../../types/typeDate';

const WeatherForecastCard = ({ day, date }: { day?: Daily; date: Date }) => {
	return (
		<>
			{day && (
				<div key={day.dt}>
					<div>{date.weekDay}</div>
					<div>
						{date.day}. {date.month}. {date.year}
					</div>
					<div>{day.temp.max} °C</div>
					<div>weather icon</div>
				</div>
			)}
		</>
	);
};

export default WeatherForecastCard;
