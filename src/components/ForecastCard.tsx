// src/components/ForecastCard.tsx

import React from 'react';
import type { ForecastData } from '../types/weather';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

interface Props {
  data: ForecastData;
}

const ForecastCard: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <p>Loading forecast...</p>;
  }

  // Ambil 5 data prakiraan cuaca berikutnya
  const nextForecasts = data.list.slice(0, 5);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          {nextForecasts.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <p className="font-semibold">{new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt={item.weather[0].description} />
              <p>{Math.round(item.main.temp)}°C</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;