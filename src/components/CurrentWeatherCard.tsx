// src/components/CurrentWeatherCard.tsx

import React from 'react';
import { type CurrentWeatherData } from '../types/weather';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {  WiStrongWind, WiHumidity, WiSunrise, WiSunset } from 'react-icons/wi';

interface Props {
  data: CurrentWeatherData;
}

const CurrentWeatherCard: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <p>Loading current weather...</p>;
  }

  const { name, main, weather, wind, sys } = data;
  const weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Current Weather in {name}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-4xl font-bold">{Math.round(main.temp)}°C</p>
            <p className="text-lg capitalize">{weather[0].description}</p>
            <p className="text-sm">Feels like {Math.round(main.feels_like)}°C</p>
          </div>
          <img src={weatherIcon} alt={weather[0].description} className="w-20 h-20" />
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2"><WiStrongWind size={24} /> Wind: {wind.speed} m/s</div>
          <div className="flex items-center gap-2"><WiHumidity size={24} /> Humidity: {main.humidity}%</div>
          <div className="flex items-center gap-2"><WiSunrise size={24} /> Sunrise: {new Date(sys.sunrise * 1000).toLocaleTimeString()}</div>
          <div className="flex items-center gap-2"><WiSunset size={24} /> Sunset: {new Date(sys.sunset * 1000).toLocaleTimeString()}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeatherCard;