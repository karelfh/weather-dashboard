import { useEffect, useState } from 'react';

import style from './time-display.module.scss';

const TimeDisplay = ({ time }: { time: number }) => {
	const [isUTC, setIsUTC] = useState(true);
	const [currentTime, setCurrentTime] = useState(() => {
		const hour = ('0' + new Date(time * 1000).getUTCHours()).slice(-2);
		const minutes = ('0' + new Date(time * 1000).getUTCMinutes()).slice(-2);

		return `${hour}:${minutes}`;
	});

	useEffect(() => {
		setCurrentTime(() => {
			const hour = ('0' + new Date(time * 1000).getHours()).slice(-2);
			const minutes = ('0' + new Date(time * 1000).getMinutes()).slice(-2);

			setIsUTC(false);

			return `${hour}:${minutes}`;
		});
	}, [time]);

	const isTimeVisible = isUTC ? style['hidden'] : style['visible'];

	return <span className={isTimeVisible}>{currentTime}</span>;
};

export default TimeDisplay;
