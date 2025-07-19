// src/components/ForecastCard.tsx

import React from 'react';
import type { ForecastData } from '../types/weather';
import { Card, CardContent} from "../components/ui/card";

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
    <Card className="w-full h-full">      
      <CardContent className='bg-red-400 h-full'>
        <div className="flex justify-around bg-amber-300 h-full w-full">
          {nextForecasts.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2 border h-full my-auto">
              <p className="font-semibold">{new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              {/* <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt={item.weather[0].description} /> */}
              <img src="/asset-rain-apps/Layer 1.png" alt="" />
              <p>{Math.round(item.main.temp)}°C</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;