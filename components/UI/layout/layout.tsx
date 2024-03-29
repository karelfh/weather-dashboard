import React, { useState } from 'react';
import Head from 'next/head';

import { Data, Location } from '../../../types/typeWeatherApi';

import Header from '../header/header';
import Footer from '../footer/footer';

import style from './layout.module.scss';

const Layout = ({ children }: { children: React.ReactElement }) => {
	const [locationData, setLocationData] = useState<Location>();
	const [weatherData, setWeatherData] = useState<Data>();

	const handleWeatherData = (weatherData: Data, locationData: Location) => {
		setWeatherData(weatherData);
		setLocationData(locationData);
	};

	return (
		<>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="description" content="Put your description here."></meta>
				<meta charSet="UTF-8"></meta>
			</Head>
			<Header handleData={handleWeatherData} />
			<main className={style['main']}>
				{React.cloneElement(children, {
					weatherData,
					locationData,
				})}
			</main>
			<Footer />
		</>
	);
};

export default Layout;
