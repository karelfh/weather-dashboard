import style from './wind-gauge.module.scss';

const WindGauge = ({ windDirection }: { windDirection?: number }) => {
	return (
		<div className={style['compass']}>
			<div className={style['direction']}>
				<p>
					NE
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
