import axios from 'axios';

import type { NextApiRequest, NextApiResponse } from 'next';

export const getCurrentWeather = async (query: {
	[key: string]: string | string[];
}) => {
	const { lat, lon, exclude, units, lang } = query;

	const baseUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=${units}&lang=${lang}&appid=${process.env.OPEN_WEATHER_API}`;

	const response = await axios.get(baseUrl);

	return response.data;
};

const currentWeatherHandler = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const data = await getCurrentWeather(req.query);

	res.status(200).json(data);
};

export default currentWeatherHandler;
