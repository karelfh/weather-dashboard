import type { Daily } from '../../types/typeWeatherApi';
import type { Date } from '../../types/typeDate';

import WeatherForecastCard from '../weather-forecast-card/weather-forecast-card';

const WeatherForecastList = ({ daily }: { daily?: Daily[] }) => {
	return (
		<>
			<h2>Weather Forecast</h2>
			<div>
				{daily &&
					// Skip first element because it's the current day
					daily.slice(1).map((day: Daily, index: number) => {
						// TODO: Make variable for locale for users to change to their locale (e.g. CZ) instead of hardcoding (en-US).
						const dateWeekDay =
							day.dt &&
							new Date(day.dt * 1000).toLocaleDateString('en-US', {
								weekday: 'short',
							});
						const dateDay =
							day.dt && ('0' + new Date(day.dt * 1000).getDate()).slice(-2);
						const dateMonth =
							day.dt &&
							('0' + (new Date(day.dt * 1000).getMonth() + 1)).slice(-2);
						const dateYear = day.dt && new Date(day.dt * 1000).getFullYear();

						// If the day is tomorrow, then display "Tomorrow" else display the full date
						// index == 0 is tomorrow, because we skipped the current day
						const date: Date = {
							weekDay: index === 0 ? 'Tomorrow' : dateWeekDay,
							day: dateDay,
							month: dateMonth,
							year: dateYear,
						};

						return <WeatherForecastCard key={day.dt} day={day} date={date} />;
					})}
			</div>
		</>
	);
};

export default WeatherForecastList;
