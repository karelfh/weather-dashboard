import type { NextApiRequest, NextApiResponse } from 'next';
import type { Data } from '../../types/typeWeatherApi';

import axios from 'axios';

export default async function getCurrentWeather(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const {
		query: { lat, lon, exclude, units, lang },
	} = req;

	const baseUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=${units}&lang=${lang}&appid=${process.env.OPEN_WEATHER_API}`;

	const response = await axios.get(baseUrl);

	res.status(200).json(response.data);
}
