import axios from "axios";

export default async function getCurrentWeather(req, res) {
  const {
    query: { lat, lon },
  } = req;

  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPEN_WEATHER_API}`;

  const response = await axios.get(baseUrl);

  res.status(200).json({currentWeather: response.data});
}
