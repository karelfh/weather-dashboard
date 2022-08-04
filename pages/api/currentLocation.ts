import axios from 'axios';
import rateLimit from '../../utils/rate-limit';

import type { NextApiRequest, NextApiResponse } from 'next';

const limiter = rateLimit({
	// 60 seconds
	interval: 60 * 1000,
	// Max 10 users per minute
	uniqueTokenPerInterval: 10,
});

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
	try {
		// 10 request per minute
		await limiter.check(res, 10, 'CACHE_TOKEN');
		const data = await getCurrentLocation(req.query);

		res.status(200).json(data);
	} catch {
		res.status(429).json({ error: 'Rate limit exceeded' });
	}
};

export default currentLocationHandler;
