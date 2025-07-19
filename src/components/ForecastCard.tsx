// src/components/ForecastCard.tsx

import React from 'react';
import type { ForecastData, AirPollutionData } from '../types/weather';
import { Card, CardContent } from "../components/ui/card";

interface Props {
  data: ForecastData;
  airPollution: AirPollutionData;
}

const getAqiDescription = (aqi: number) => {
    switch (aqi) {
        case 1: return 'Good';
        case 2: return 'Fair';
        case 3: return 'Moderate';
        case 4: return 'Poor';
        case 5: return 'Very Poor';
        default: return 'Unknown';
    }
}

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


const ForecastCard: React.FC<Props> = ({ data, airPollution }) => {
  if (!data || !data.list || data.list.length === 0) {
    return <p>Loading forecast...</p>;
  }

  // Filter untuk mendapatkan satu data per hari, dimulai dari besok
  const dailyForecasts = data.list.filter(item => {
    const forecastDate = new Date(item.dt_txt).getDate();
    const today = new Date().getDate();
    return forecastDate !== today;
  }).filter((item, index, self) =>
    index === self.findIndex(t => (
      new Date(t.dt_txt).getDate() === new Date(item.dt_txt).getDate()
    ))
  ).slice(0, 4);


  const aqi = airPollution.list[0].main.aqi;


  return (
    <Card className="w-full">
      <CardContent className='p-4'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dailyForecasts.map((item, index) => (
            <div key={index} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow">
              <p className="font-bold text-lg">{new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}</p>
              <p className="text-sm text-gray-500">{new Date(item.dt * 1000).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}</p>
              <img
                src={getWeatherImage(item.weather[0].main)}
                alt={item.weather[0].description}
                className="w-20 h-20 my-2"
              />
              <p className="font-semibold text-xl">{Math.round(item.main.temp)}°C</p>
              <p className="capitalize text-gray-600">{item.weather[0].description}</p>
                <p className={`mt-2 px-3 py-1 text-sm rounded-full ${
                    aqi <= 2 ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                }`}>
                   {getAqiDescription(aqi)}
                </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;