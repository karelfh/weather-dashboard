import { CircularProgressbar } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';
import style from './pressure-gauge.module.scss';

const PressureGauge = ({ pressure }: { pressure?: number }) => {
	if (!pressure) {
		return null;
	}

	const lowestPressure = 978.25;
	const highestPressure = 1048.25;
	const normalPressureRange = [1009.14, 1022.69];

	const pressurePercent =
		((pressure - lowestPressure) / (highestPressure - lowestPressure)) * 100;
	const pressureText =
		pressure < normalPressureRange[0]
			? 'low'
			: pressure > normalPressureRange[1]
			? 'high'
			: 'normal';
	const pressureColor =
		pressure < normalPressureRange[0]
			? '#4B8EB4'
			: pressure > normalPressureRange[1]
			? '#FD6D45'
			: '#53B480';

	return (
		<CircularProgressbar
			value={pressurePercent}
			text={`${pressureText}`}
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
					stroke: pressureColor,
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

export default PressureGauge;
