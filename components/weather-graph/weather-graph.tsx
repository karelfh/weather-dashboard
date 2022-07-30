import { useState } from 'react';
import {
	IoIosArrowDropright,
	IoIosArrowDroprightCircle,
	IoIosArrowDropleft,
	IoIosArrowDropleftCircle,
} from 'react-icons/io';

import useHover from '../../hooks/useHover';
import GraphTemp from '../graph-temp/graph-temp';

import type { Daily } from '../../types/typeWeatherApi';

import style from './weather-graph.module.scss';

const WeatherGraph = ({ daily }: { daily: Daily[] }) => {
	const [hoverRefLeft, isHoveredLeft] = useHover<HTMLButtonElement>();
	const [hoverRefRight, isHoveredRight] = useHover<HTMLButtonElement>();

	const pageList = ['Temperature', 'Rain', 'Sun'];
	const [page, setPage] = useState(0);

	const switchPageRight = () => {
		if (page < pageList.length - 1) {
			setPage((prevPageState) => prevPageState + 1);
		} else {
			setPage(0);
		}
	};

	const switchPageLeft = () => {
		if (page > 0) {
			setPage((prevPageState) => prevPageState - 1);
		} else {
			setPage(pageList.length - 1);
		}
	};

	return (
		<div className={style['graph-container']}>
			<div className={style['header']}>
				<button
					className={style['header-button']}
					onClick={switchPageLeft}
					ref={hoverRefLeft}
					title="Previous page"
					aria-label="Move to previous page"
				>
					{isHoveredLeft ? (
						<IoIosArrowDropleftCircle className={style['header-icon']} />
					) : (
						<IoIosArrowDropleft className={style['header-icon']} />
					)}
				</button>
				<h3
					className={style['header-title']}
					style={{ display: 'inline-block' }}
				>
					{pageList[page]}
				</h3>
				<button
					className={style['header-button']}
					onClick={switchPageRight}
					ref={hoverRefRight}
					title="Next page"
					aria-label="Move to next page"
				>
					{isHoveredRight ? (
						<IoIosArrowDroprightCircle className={style['header-icon']} />
					) : (
						<IoIosArrowDropright className={style['header-icon']} />
					)}
				</button>
			</div>
			{pageList[page] === 'Temperature' ? (
				<GraphTemp temp={daily[0].temp} />
			) : null}
			{pageList[page] === 'Rain' ? (
				<div className={style['soon']}>coming soon</div>
			) : null}
			{pageList[page] === 'Sun' ? (
				<div className={style['soon']}>coming soon</div>
			) : null}
		</div>
	);
};

export default WeatherGraph;
