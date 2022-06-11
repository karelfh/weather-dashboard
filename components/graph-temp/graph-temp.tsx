import type { Daily } from '../../types/typeWeatherApi';
import { useEffect, useState } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const GraphTemp = ({ temp }: Daily) => {
	const [temperature, setTemperature] = useState({
		day: 0,
		eve: 0,
		morn: 0,
		night: 0,
		min: 0,
		max: 0,
	});

	useEffect(() => {
		temp != null && setTemperature(temp);
	}, [temp]);

	return (
		<Line
			data={{
				labels: [
					`Morning ${Math.round(temperature.morn)} C`,
					`Afternoon ${Math.round(temperature.day)} C`,
					`Evening ${Math.round(temperature.eve)} C`,
					`Night ${Math.round(temperature.night)} C`,
				],
				datasets: [
					{
						label: 'temps',
						data: [
							temperature.morn,
							temperature.day,
							temperature.eve,
							temperature.night,
						],
						tension: 0.2,
						borderColor: 'rgb(53, 162, 235)',
						backgroundColor: 'rgba(53, 162, 235, 0.5)',
					},
				],
			}}
			options={{
				responsive: true,
				scales: {
					xAxis: {
						grid: {
							display: false,
							drawBorder: false,
						},
					},
					yAxis: {
						display: false,
					},
				},
			}}
		/>
	);
};

export default GraphTemp;
