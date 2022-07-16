import { CircularProgressbar } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';
import style from './humidity-gauge.module.scss';

const HumidityGauge = ({ humidity }: { humidity?: number }) => {
	if (!humidity) {
		return null;
	}

	const lowestHumidity = 0;
	const highestHumidity = 100;
	const normalHumidityRange = [30, 50];

	const humidityPercent =
		((humidity - lowestHumidity) / (highestHumidity - lowestHumidity)) * 100;
	const humidityText =
		humidity < normalHumidityRange[0]
			? 'low'
			: humidity > normalHumidityRange[1]
			? 'high'
			: 'normal';
	const humidityColor =
		humidity < normalHumidityRange[0]
			? '#4B8EB4'
			: humidity > normalHumidityRange[1]
			? '#FD6D45'
			: '#53B480';

	return (
		<CircularProgressbar
			value={humidityPercent}
			text={`${humidityText}`}
			circleRatio={0.7}
			strokeWidth={10}
			className={style['gauge']}
			styles={{
				trail: {
					strokeLinecap: 'round',
					transform: 'rotate(-126deg)',
					transformOrigin: 'center center',
					stroke: '#fff',
				},
				path: {
					strokeLinecap: 'round',
					transform: 'rotate(-126deg)',
					transformOrigin: 'center center',
					stroke: humidityColor,
				},
				text: {
					fill: '#2C3E50',
					fontSize: '1.125rem',
					fontWeight: 'bold',
					textAnchor: 'middle',
				},
			}}
		/>
	);
};

export default HumidityGauge;
