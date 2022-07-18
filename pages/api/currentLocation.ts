import axios from 'axios';

import type { NextApiRequest, NextApiResponse } from 'next';

export const getCurrentLocation = async (query: {
	[key: string]: string | string[] | undefined;
}) => {
	const { lat, lon } = query;

	const baseUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.OPEN_WEATHER_API}`;

	const response = await axios.get(baseUrl);

	return response.data;
};

const currentLocationHandler = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const data = await getCurrentLocation(req.query);

	res.status(200).json(data);
};

export default currentLocationHandler;
