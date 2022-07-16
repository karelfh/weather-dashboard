import { useEffect, useState } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import type { Daily } from '../../types/typeWeatherApi';

import style from './graph-temp.module.scss';

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
		<div className={style['temp-graph']}>
			<Line
				data={{
					labels: ['', '', '', ''],
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
							borderWidth: 3,
							borderColor: '#23609B',
							backgroundColor: '#23609B',
							pointBorderColor: '#23609B',
							pointBackgroundColor: '#FFF',
							pointBorderWidth: 2,
							pointRadius: 4,
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
			<div className={style['legend']}>
				<div className={style['legend-item']}>
					<p className={style['day']}>Morning</p>
					<p className={style['temp']}>{Math.round(temperature.morn)} &deg;C</p>
				</div>
				<div className={style['legend-item']}>
					<p className={style['day']}>Afternoon</p>
					<p className={style['temp']}>{Math.round(temperature.day)} &deg;C</p>
				</div>
				<div className={style['legend-item']}>
					<p className={style['day']}>Evening</p>
					<p className={style['temp']}>{Math.round(temperature.eve)} &deg;C</p>
				</div>
				<div className={style['legend-item']}>
					<p className={style['day']}>Night</p>
					<p className={style['temp']}>
						{Math.round(temperature.night)} &deg;C
					</p>
				</div>
			</div>
		</div>
	);
};

export default GraphTemp;
