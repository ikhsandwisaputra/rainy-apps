// src/App.tsx

import { useEffect, useState, type SetStateAction } from 'react';
import { getCurrentWeather, getForecast, getAirPollution, getOtherCityWeather } from './api/weatherService';
import type { CurrentWeatherData, ForecastData, AirPollutionData } from './types/weather';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import ForecastCard from './components/ForecastCard';
import AirPollutionCard from './components/AirPollutionCard';
import OtherCitiesCard from './components/OtherCitiesCard';
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

function App() {
  // State untuk menyimpan data dari API
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [airPollution, setAirPollution] = useState<AirPollutionData | null>(null);
  const [otherCities, setOtherCities] = useState<(CurrentWeatherData | null)[]>([]);
  
  // State untuk loading dan error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState('Pekanbaru'); // Kota default
  const [searchQuery, setSearchQuery] = useState('Pekanbaru');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1. Ambil data cuaca saat ini
        const currentWeatherData = await getCurrentWeather(city);
        setCurrentWeather(currentWeatherData);

        // Koordinat dari data cuaca saat ini digunakan untuk API lain
        const { lat, lon } = currentWeatherData.coord;

        // 2. Ambil data prakiraan & polusi secara bersamaan
        const [forecastData, airPollutionData] = await Promise.all([
          getForecast(lat, lon),
          getAirPollution(lat, lon),
        ]);
        setForecast(forecastData);
        setAirPollution(airPollutionData);

        // 3. Ambil data cuaca kota lain
        const cities = ['Jakarta', 'Bandung', 'Surabaya', 'Medan'];
        const otherCitiesData = await Promise.all(
          cities.map(city => getOtherCityWeather(city).catch(e => {
            console.error(`Failed to fetch weather for ${city}:`, e);
            return null; // Return null if a city fetch fails
          }))
        );
        setOtherCities(otherCitiesData);

      } catch (err) {
        setError('Gagal memuat data cuaca. Pastikan nama kota benar dan cek koneksi Anda.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city]); // <-- useEffect akan berjalan lagi setiap kali 'city' berubah

  const handleSearch = () => {
    setCity(searchQuery);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading weather data...</div>;
  }

  if (error) {
    return (
       <div className="flex flex-col justify-center items-center h-screen gap-4">
          <p className="text-red-500">{error}</p>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input 
              type="text" 
              placeholder="Coba kota lain, e.g., Jakarta" 
              value={searchQuery}
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSearchQuery(e.target.value)}
            />
            <Button onClick={handleSearch}>Cari</Button>
          </div>
       </div>
    );
  }

  return (
    <main className="container mx-auto p-4 space-y-6">
      <div className="flex w-full max-w-sm items-center space-x-2 mx-auto">
        <Input 
          type="text" 
          placeholder="Cari kota..." 
          value={searchQuery}
          onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSearchQuery(e.target.value)}
          onKeyPress={(e: { key: string; }) => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch}>Cari</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri */}
        <div className="lg:col-span-2 space-y-6">
          {currentWeather && <CurrentWeatherCard data={currentWeather} />}
          {forecast && <ForecastCard data={forecast} />}
        </div>

        {/* Kolom Kanan */}
        <div className="space-y-6">
          {airPollution && <AirPollutionCard data={airPollution} />}
          <div>
            <h2 className="text-xl font-bold mb-4">Other Cities</h2>
            <div className="space-y-4">
              {otherCities.map((cityWeather, index) => 
                cityWeather ? <OtherCitiesCard key={index} cityWeather={cityWeather} /> : null
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;