// src/components/CurrentWeatherCard.tsx

import React from 'react';
import { type CurrentWeatherData } from '../types/weather'; //
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"; //
import {  WiStrongWind, WiHumidity, WiSunrise, WiSunset } from 'react-icons/wi';

// Fungsi untuk memilih gambar berdasarkan kondisi cuaca
const getWeatherImage = (weatherMain: string) => {
  const weatherCondition = weatherMain.toLowerCase();
  switch (weatherCondition) {
    case 'clear':
      return '/rainy-apps/asset-rain-apps/Layer 1.png'; // Cerah
    case 'clouds':
      return '/rainy-apps/asset-rain-apps/Layer 2.png'; // Berawan
    case 'rain':
      return '/rainy-apps/asset-rain-apps/Layer 4.png'; // Hujan
    case 'drizzle':
      return '/rainy-apps/asset-rain-apps/Layer 5.png'; // Gerimis
    case 'thunderstorm':
      return '/rainy-apps/asset-rain-apps/Layer 11.png'; // Badai petir
    case 'snow':
      return '/rainy-apps/asset-rain-apps/Layer 18.png'; // Salju
    case 'mist':
    case 'smoke':
    case 'haze':
    case 'dust':
    case 'fog':
    case 'sand':
    case 'ash':
    case 'squall':
    case 'tornado':
      return '/rainy-apps/asset-rain-apps/Layer 6.png'; // Berkabut/Asap/dll.
    default:
      return '/rainy-apps/asset-rain-apps/Layer 3.png'; // Default
  }
};


interface Props {
  data: CurrentWeatherData;
}

const CurrentWeatherCard: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <p>Loading current weather...</p>;
  }

  const { name, main, weather, wind, sys } = data;

  return (
    <Card className="w-full h-full bg-gradient-to-br from-[#1071e0] via-indigo-500 to-blue-500 text-white rounded-xl shadow-lg">
      <CardHeader className='text-center'>
        <p className="text-lg">Current Weather</p>
        <CardTitle className='text-4xl font-bold'>{name}</CardTitle>
        <p>{new Date().toLocaleString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center h-fit gap-8 text-center">
        <div className="flex flex-col items-center">
            {/* Menggunakan fungsi getWeatherImage untuk sumber gambar dinamis */}
            <img
                src={getWeatherImage(weather[0].main)}
                alt={weather[0].description}
                className="w-24 h-24"
            />
            <div>
              <p className="text-6xl font-extrabold">{Math.round(main.temp)}°C</p>
              <p className="text-xl capitalize">{weather[0].description}</p>
              <p className="text-md">Feels like {Math.round(main.feels_like)}°C</p>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-md">
          <div className="flex items-center gap-2"><WiStrongWind size={28} /> Wind: {wind.speed} m/s</div>
          <div className="flex items-center gap-2"><WiHumidity size={28} /> Humidity: {main.humidity}%</div>
          <div className="flex items-center gap-2"><WiSunrise size={28} /> Sunrise: {new Date(sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div className="flex items-center gap-2"><WiSunset size={28} /> Sunset: {new Date(sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeatherCard;