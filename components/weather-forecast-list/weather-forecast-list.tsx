import type { Daily } from '../../types/typeWeatherApi';

import WeatherForecastCard from '../weather-forecast-card/weather-forecast-card';

const WeatherForecastList = ({ daily }: { daily?: Daily[] }) => {
	return (
		<>
			<h2>Weather Forecast</h2>
			<div>
				{daily &&
					// Skip first element because it's the current day
					daily.slice(1).map((day: Daily, index: number) => {
						const dateDay =
							day.dt && ('0' + new Date(day.dt * 1000).getDate()).slice(-2);
						const dateMonth =
							day.dt && ('0' + new Date(day.dt * 1000).getMonth()).slice(-2);
						const dateYear = day.dt && new Date(day.dt * 1000).getFullYear();

						// If the day is tomorrow, then display "Tomorrow" else display the full date
						// index == 0 is tomorrow, because we skipped the current day
						const date =
							index === 0
								? 'Tomorrow'
								: `${dateDay}. ${dateMonth}. ${dateYear}`;

						return <WeatherForecastCard key={day.dt} day={day} date={date} />;
					})}
			</div>
		</>
	);
};

export default WeatherForecastList;
