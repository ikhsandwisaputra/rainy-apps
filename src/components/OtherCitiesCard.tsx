// src/components/OtherCitiesCard.tsx

import React from 'react';
import type { CurrentWeatherData } from '../types/weather';
import { Card, CardContent } from "../components/ui/card";

interface Props {
  cityWeather: CurrentWeatherData | null;
}

const OtherCitiesCard: React.FC<Props> = ({ cityWeather }) => {
  if (!cityWeather) {
    return <Card><CardContent><p>Loading city...</p></CardContent></Card>;
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-lg">{cityWeather.name}</p>
            <p className="capitalize">{cityWeather.weather[0].description}</p>
          </div>
          <p className="font-bold text-2xl">{Math.round(cityWeather.main.temp)}°C</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OtherCitiesCard;