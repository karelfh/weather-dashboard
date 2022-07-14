import style from './wind-gauge.module.scss';

const WindGauge = ({ windDirection }: { windDirection?: number }) => {
	const getDirection = (angle: number) => {
		let directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
		let index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;

		return directions[index];
	};

	return (
		<div className={style['compass']}>
			<div className={style['direction']}>
				<p>
					{windDirection && `${getDirection(windDirection)}`}
					<span>{windDirection}&deg;</span>
				</p>
			</div>
			<div
				className={style['arrow']}
				style={{ transform: `rotate(${windDirection}deg)` }}
			></div>
			<div className={style['arrow-hand']}></div>
		</div>
	);
};

export default WindGauge;
