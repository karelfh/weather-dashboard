import { Data, Location } from './typeWeatherApi';

export interface HomeProps {
	initialWeather: Data;
	initialLocation: Location;
	weatherData: any;
	locationData: any;
}
