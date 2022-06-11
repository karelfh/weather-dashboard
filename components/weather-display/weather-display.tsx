import { Current, Daily } from '../../types/typeWeatherApi';
import GraphTemp from '../graph-temp/graph-temp';

const WeatherDisplay = ({
	current,
	daily,
}: {
	current?: Current;
	daily?: Daily[];
}) => {
	const hour =
		current?.dt != null &&
		('0' + new Date(current?.dt * 1000).getHours()).slice(-2);
	const minutes =
		current?.dt != null &&
		('0' + new Date(current?.dt * 1000).getMinutes()).slice(-2);
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
					<h2>{current != null && Math.round(current.temp)} C</h2>
					<p>Mostly clear</p>
				</div>
				<div>
					<div>
						<i>Icon</i>
						<p>{current != null && Math.round(current.pressure)} hPa</p>
					</div>
					<div>
						<i>Icon</i>
						<p>{current != null && Math.round(current.humidity)} %</p>
					</div>
					<div>
						<i>Icon</i>
						<p>{current != null && Math.round(current.wind_speed)} km/h</p>
					</div>
				</div>
			</div>
			<div>
				{/* TODO: Create separete component */}
				<div>
					{daily != null && <GraphTemp temp={daily[0].temp} />}
					<div>
						<div>
							<p>Morning</p>
							<p>{daily != null && Math.round(daily[0].temp.morn)}</p>
						</div>
						<div>
							<p>Afternoon</p>
							<p>{daily != null && Math.round(daily[0].temp.day)}</p>
						</div>
						<div>
							<p>Evening</p>
							<p>{daily != null && Math.round(daily[0].temp.eve)}</p>
						</div>
						<div>
							<p>Night</p>
							<p>{daily != null && Math.round(daily[0].temp.night)}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WeatherDisplay;
