import axios from 'axios';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getCurrentLocation(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const {
		query: { lat, lon },
	} = req;

	const baseUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.OPEN_WEATHER_API}`;

	const response = await axios.get(baseUrl);

	res.status(200).json(response.data);
}
