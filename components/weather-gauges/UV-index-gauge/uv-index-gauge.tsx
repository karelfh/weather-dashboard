import { CircularProgressbar } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';
import style from './uv-index-gauge.module.scss';

const UviGauge = ({ uvi }: { uvi?: number }) => {
	if (uvi === undefined) {
		return null;
	}

	const lowUvi = uvi <= 2;
	const moderateUvi = uvi > 2 && uvi <= 5;
	const highUvi = uvi > 5 && uvi <= 7;
	const veryHighUvi = uvi > 7 && uvi <= 10;

	const lowestUvi = 0;
	const highestUvi = 11;

	const uviPercent = ((uvi - lowestUvi) / (highestUvi - lowestUvi)) * 100;

	const uviColor = lowUvi
		? '#53B480'
		: moderateUvi
		? '#FFCF04'
		: highUvi
		? '#FF9D00'
		: veryHighUvi
		? '#FF2C2E'
		: '#9633FF';

	const uviText = lowUvi
		? 'low'
		: moderateUvi
		? 'moderate'
		: highUvi
		? 'high'
		: veryHighUvi
		? 'very high'
		: 'extreme';

	const uviFontSize = moderateUvi || veryHighUvi ? '0.9rem' : '1.2rem';

	return (
		<CircularProgressbar
			value={uviPercent}
			text={`${uviText}`}
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
					stroke: uviColor,
				},
				text: {
					fill: '#2C3E50',
					fontSize: `${uviFontSize}`,
					fontWeight: 'bold',
					textAnchor: 'middle',
				},
			}}
		/>
	);
};

export default UviGauge;
