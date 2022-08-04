import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';

import BaseLayer from './base-layer';

import style from './weather-map.module.scss';

const WeatherMap = ({ location }: any) => {
	const coords =
		location === undefined ? [51.505, -0.09] : [location.lat, location.lon];

	return (
		<div id="map" className={style['map']}>
			<MapContainer
				center={[coords[0], coords[1]]}
				zoom={13}
				scrollWheelZoom={true}
			>
				<BaseLayer location={location} />
				<LayersControl position="topright">
					<LayersControl.Overlay name="Temperature">
						<TileLayer
							url="https://tile.openweathermap.org/map/temp_new/13/1/1.png?appid=9ab09b77d6f79204dc9d442ed9b7c96d"
							attribution='<a href="https://openweathermap.org/">OpenWeatherMap</a>'
						/>
					</LayersControl.Overlay>
					<LayersControl.Overlay name="Wind Speed">
						<TileLayer
							url="https://tile.openweathermap.org/map/wind_new/13/5/5.png?appid=9ab09b77d6f79204dc9d442ed9b7c96d"
							attribution='<a href="https://openweathermap.org/">OpenWeatherMap</a>'
						/>
					</LayersControl.Overlay>
					<LayersControl.Overlay name="Pressure">
						<TileLayer
							url="https://tile.openweathermap.org/map/pressure_new/13/5/5.png?appid=9ab09b77d6f79204dc9d442ed9b7c96d"
							attribution='<a href="https://openweathermap.org/">OpenWeatherMap</a>'
						/>
					</LayersControl.Overlay>
					<LayersControl.Overlay name="Precipitation">
						<TileLayer
							url="https://tile.openweathermap.org/map/precipitation_new/13/5/5.png?appid=9ab09b77d6f79204dc9d442ed9b7c96d"
							attribution='<a href="https://openweathermap.org/">OpenWeatherMap</a>'
						/>
					</LayersControl.Overlay>
					<LayersControl.Overlay name="Clouds">
						<TileLayer
							url="https://tile.openweathermap.org/map/clouds_new/13/5/5.png?appid=9ab09b77d6f79204dc9d442ed9b7c96d"
							attribution='<a href="https://openweathermap.org/">OpenWeatherMap</a>'
						/>
					</LayersControl.Overlay>
				</LayersControl>
			</MapContainer>
		</div>
	);
};

export default WeatherMap;
