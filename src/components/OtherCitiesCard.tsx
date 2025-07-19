import React from 'react';
import type { CurrentWeatherData } from '../types/weather';
import { Card, CardContent } from "../components/ui/card";

interface Props {
  cityWeather: CurrentWeatherData | null;
}

const getWeatherImage = (weatherMain: string): string => {
  // Ganti dengan URL asset atau import local image sesuai kebutuhan
  const images: { [key: string]: string } = {
    Clear: '/asset-rain-apps/Layer 1.png',
    Clouds: '/asset-rain-apps/Layer 2.png',
    Rain: '/asset-rain-apps/Layer 4.png',
    Snow: '/asset-rain-apps/Layer 18.png',
    Drizzle: '/asset-rain-apps/Layer 5.png',
    Mist:'/asset-rain-apps/Layer 6.png'
  };
  return images[weatherMain] || '/icons/default.png';
};

const getBackgroundClass = (cityName: string): string => {
  switch (cityName.toLowerCase()) {
    case 'jakarta':
      return 'bg-gradient-to-br from-green-400 to-blue-400';
    case 'bandung':
      return 'bg-gradient-to-br from-purple-500 to-indigo-500';
    case 'surabaya':
      return 'bg-gradient-to-br from-yellow-400 to-orange-400';
    default:
      return 'bg-gradient-to-br from-slate-400 to-slate-600';
  }
};

const OtherCitiesCard: React.FC<Props> = ({ cityWeather }) => {
  if (!cityWeather) {
    return (
      <Card>
        <CardContent>
          <p>Loading city...</p>
        </CardContent>
      </Card>
    );
  }

  const weatherMain = cityWeather.weather[0].main;
  const weatherImage = getWeatherImage(weatherMain);
  const background = getBackgroundClass(cityWeather.name);

  return (
    <div
      className={`w-full h-40 rounded-2xl shadow-md text-white flex flex-col items-center justify-center p-4 ${background}`}
    >
      <img
        src={weatherImage}
        alt={weatherMain}
        className="w-14 h-14 mb-2 drop-shadow-lg"
      />
      <p className="text-2xl font-semibold">{cityWeather.name}</p>
      <p className="text-xl font-bold">{Math.round(cityWeather.main.temp)}°C</p>
    </div>
  );
};

export default OtherCitiesCard;
