import { CircularProgressbar } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';
import style from './weather-gauge.module.scss';

const WeatherGauge = ({
	value,
	lowValue,
	highValue,
	idealRange,
}: {
	value?: number;
	lowValue: number;
	highValue: number;
	idealRange: number[];
}) => {
	if (!value) {
		return null;
	}

	const lowestValue = lowValue;
	const highestValue = highValue;
	const idealValuesRange = idealRange;

	const valuePercent =
		((value - lowestValue) / (highestValue - lowestValue)) * 100;
	const valueText =
		value < idealValuesRange[0]
			? 'low'
			: value > idealValuesRange[1]
			? 'high'
			: 'normal';
	const valueColor =
		value < idealValuesRange[0]
			? '#4B8EB4'
			: value > idealValuesRange[1]
			? '#FD6D45'
			: '#53B480';

	return (
		<CircularProgressbar
			value={valuePercent}
			text={`${valueText}`}
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
					stroke: valueColor,
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

export default WeatherGauge;
