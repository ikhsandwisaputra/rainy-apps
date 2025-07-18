// src/api/weatherService.ts

import type { CurrentWeatherData, ForecastData, AirPollutionData } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Fungsi untuk mendapatkan data cuaca saat ini
export const getCurrentWeather = async (city: string): Promise<CurrentWeatherData> => {
  const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
  if (!response.ok) {
    throw new Error('Failed to fetch current weather data.');
  }
  return response.json();
};

// Fungsi untuk mendapatkan data prakiraan cuaca
export const getForecast = async (lat: number, lon: number): Promise<ForecastData> => {
  const response = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
  if (!response.ok) {
    throw new Error('Failed to fetch forecast data.');
  }
  return response.json();
};

// Fungsi untuk mendapatkan data polusi udara
export const getAirPollution = async (lat: number, lon: number): Promise<AirPollutionData> => {
    const response = await fetch(`${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch air pollution data.');
    }
    return response.json();
}

// Fungsi untuk mendapatkan cuaca di kota lain (contoh)
export const getOtherCityWeather = async (city: string): Promise<CurrentWeatherData> => {
    return getCurrentWeather(city);
};