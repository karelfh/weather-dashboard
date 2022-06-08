import { Current, Daily } from '../../types/typeWeatherApi';

const WeatherDisplay = ({
	current,
	daily,
}: {
	current?: Current;
	daily?: Daily[];
}) => {
	const hour = current?.dt != null && new Date(current?.dt * 1000).getHours();
	const minutes =
		current?.dt != null && new Date(current?.dt * 1000).getMinutes();
	const currentTime = current?.dt != null && `${hour}:${minutes}`;

	return (
		<div>
			<div>
				<div>
					<div>
						<i>Icon</i>
						{/* TODO: API doesnt return location name */}
						<p>Location-name</p>
					</div>
					<div>
						<p>Today at {currentTime}</p>
					</div>
				</div>
				<div>
					<h2>{current?.temp} C</h2>
					<p>Mostly clear</p>
				</div>
				<div>
					<div>
						<i>Icon</i>
						<p>{current?.pressure} hPa</p>
					</div>
					<div>
						<i>Icon</i>
						<p>{current?.humidity} %</p>
					</div>
					<div>
						<i>Icon</i>
						<p>{current?.wind_speed} km/h</p>
					</div>
				</div>
			</div>
			<div>
				{/* TODO: Create separete component */}
				<div>
					<h2>Temperature</h2>
					{/* TODO: Create line graph for temps */}
					<div>graph</div>
					<div>
						<div>
							<p>Morning</p>
							<p>{daily != null && daily[0].temp.morn}</p>
						</div>
						<div>
							<p>Afternoon</p>
							<p>{daily != null && daily[0].temp.day}</p>
						</div>
						<div>
							<p>Evening</p>
							<p>{daily != null && daily[0].temp.eve}</p>
						</div>
						<div>
							<p>Night</p>
							<p>{daily != null && daily[0].temp.night}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WeatherDisplay;
