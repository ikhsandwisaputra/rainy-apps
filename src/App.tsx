import React from 'react';
import { Home, Wind, Droplets, Thermometer, Cloud, Sun, CloudRain, Zap, CloudSun,  Cloudy } from 'lucide-react';

// ============================================================================
// DATA MOCKUP
// Dalam aplikasi nyata, data ini akan datang dari API
// ============================================================================

const currentWeatherData = {
  city: 'Guang zhou',
  date: '23 July, Friday 12:00',
  temperature: 34,
  chanceOfRain: '28-35%',
  wind: '<3km/h',
  humidity: 90,
  airQuality: 34,
  hourlyTemps: [
    { time: '26°C', point: 20 },
    { time: '', point: 40 },
    { time: '34°C', point: 80 },
    { time: '', point: 30 },
    { time: '24°C', point: 10 },
  ],
};

const forecastData = [
  { day: 'Monday', date: '24 July', icon: <Zap size={40} className="text-yellow-300" />, tempRange: '28~32°C', condition: 'THUNDERSHOWER', wind: '<8km/h', aqi: 22, aqiStatus: 'Excellent', aqiColor: 'bg-green-400' },
  { day: 'Tuesday', date: '25 July', icon: <CloudRain size={40} className="text-white" />, tempRange: '25~32°C', condition: 'RAINSTORM', wind: '<10km/h', aqi: 50, aqiStatus: 'Good', aqiColor: 'bg-blue-400' },
  { day: 'Wednesday', date: '26 July', icon: <Sun size={40} className="text-yellow-400" />, tempRange: '25~33°C', condition: 'SUNSHINE', wind: '<3km/h', aqi: 80, aqiStatus: 'Poor', aqiColor: 'bg-orange-400' },
  { day: 'Thursday', date: '27 July', icon: <CloudSun size={40} className="text-white" />, tempRange: '25~32°C', condition: 'PARTLY CLOUDY', wind: '<3km/h', aqi: 80, aqiStatus: 'Poor', aqiColor: 'bg-orange-400' },
];

const otherCitiesData = [
  { city: 'Bei jing', temp: 23, icon: <Cloudy size={32} /> },
  { city: 'Shang hai', temp: 27, icon: <CloudRain size={32} /> },
  { city: 'Chong qing', temp: 23, icon: <Cloudy size={32} /> },
];

// ============================================================================
// DEFINISI TIPE (TypeScript)
// ============================================================================

type ForecastDayProps = typeof forecastData[0];
type CityWeatherCardProps = typeof otherCitiesData[0];

// ============================================================================
// KOMPONEN UI
// ============================================================================

// --- Kartu Cuaca Saat Ini (Sisi Kiri) ---
const CurrentWeather = () => {
  const { city, date, temperature, chanceOfRain, hourlyTemps, wind, humidity, airQuality } = currentWeatherData;
  
  // Membuat path SVG untuk grafik
  const graphPath = hourlyTemps.map((p, i) => {
    const x = i * 25; // 25% width for each point
    const y = 100 - p.point;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    // MENGGUNAKAN ARBITRARY VALUES: from-[#5C9CE5] to-[#8E85E3]
    <div className="bg-gradient-to-br from-[#5C9CE5] to-[#8E85E3] text-white rounded-3xl p-6 flex flex-col h-full shadow-lg relative overflow-hidden">
      {/* Latar Belakang Awan */}
      <Cloud size={150} className="absolute -top-10 -right-10 text-white/20" />
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">{city}</h2>
        <p className="text-sm opacity-80">{date}</p>
        <p className="text-xs opacity-80 mt-1">Chance of Rain: {chanceOfRain}</p>
      </div>

      {/* Tampilan Temperatur Utama */}
      <div className="flex-grow flex items-center justify-center my-6 relative">
        <Cloud size={90} className="absolute left-10 top-1 text-white/80" />
        <Sun size={40} className="absolute left-28 top-4 text-yellow-300" />
        <p className="text-8xl font-bold z-10">{temperature}°</p>
      </div>

      {/* Grafik Temperatur per Jam */}
      <div className="mb-4">
        <svg viewBox="0 0 100 100" className="w-full h-24" preserveAspectRatio="none">
          <path d={graphPath} fill="none" stroke="white" strokeWidth="2" />
          {hourlyTemps.map((p, i) => (
            p.time && <circle key={i} cx={i * 25} cy={100 - p.point} r="3" fill="white" />
          ))}
        </svg>
        <div className="flex justify-between text-xs -mt-8 px-1">
          {hourlyTemps.map((p, i) => (
            p.time && <span key={i}>{p.time}</span>
          ))}
        </div>
      </div>
      
      {/* Detail Cuaca */}
      <div className="flex justify-between items-center text-center border-t border-white/20 pt-4 text-xs">
        <div>
          <p className="font-semibold">{wind}</p>
          <p className="opacity-80">Wind</p>
        </div>
        <div>
          <p className="font-semibold">{humidity}%</p>
          <p className="opacity-80">Humidty</p>
        </div>
        <div>
          <p className="font-semibold">{airQuality}</p>
          <p className="opacity-80">Air quality</p>
        </div>
      </div>
      
      {/* Navigasi Bawah */}
      <div className="flex justify-around items-center mt-6 p-2 bg-black/10 rounded-full">
        <button className="p-2 rounded-full bg-white/20"><Home size={20} /></button>
        <button><Wind size={20} className="opacity-70" /></button>
        <button><Droplets size={20} className="opacity-70" /></button>
        <button><Thermometer size={20} className="opacity-70" /></button>
      </div>
    </div>
  );
};

// --- Kartu Prakiraan Cuaca Harian (Bagian Kanan Atas) ---
const ForecastDay = ({ day, date, icon, tempRange, condition, wind, aqi, aqiStatus, aqiColor }: ForecastDayProps) => (
  <div className="flex-shrink-0 w-36 text-center flex flex-col items-center p-4 bg-white/20 backdrop-blur-md rounded-2xl space-y-2 text-white shadow-md">
    <p className="font-semibold">{day}</p>
    <p className="text-xs opacity-80">{date}</p>
    <div className="my-2">{icon}</div>
    <p className="font-bold text-lg">{tempRange}</p>
    <p className="text-sm opacity-90">{condition}</p>
    <p className="text-xs opacity-80">{wind}</p>
    <div className={`text-xs px-3 py-1 rounded-full ${aqiColor} text-black/80 font-semibold`}>
      {aqi} {aqiStatus}
    </div>
  </div>
);

// --- Kartu Cuaca Kota Lain (Bagian Kanan Bawah) ---
const CityWeatherCard = ({ city, temp, icon }: CityWeatherCardProps) => (
  <div className="flex-1 min-w-[120px] bg-white/20 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between text-white shadow-md">
    <div className="flex items-center space-x-2">
      {icon}
      <div>
        <p className="font-semibold">{city}</p>
        <p className="text-xs opacity-80">Cloudy</p> {/* Static as per design */}
      </div>
    </div>
    <p className="text-2xl font-bold">{temp}°C</p>
  </div>
);

// ============================================================================
// KOMPONEN UTAMA APLIKASI
// ============================================================================

export default function App() {
  return (
    // MENGGUNAKAN ARBITRARY VALUES: from-[#3D4E9A] to-[#6C63AB]
    <div className="bg-gradient-to-br from-[#3D4E9A] to-[#6C63AB] min-h-screen p-4 sm:p-6 lg:p-8 font-sans text-white">
      <div className="max-w-7xl mx-auto">
        <main className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-6">

          {/* Kolom Kiri: Cuaca Saat Ini */}
          <div className="lg:col-span-1 xl:col-span-2">
            <CurrentWeather />
          </div>

          {/* Kolom Kanan: Prakiraan & Kota Lain */}
          <div className="lg:col-span-2 xl:col-span-3 flex flex-col gap-6">
            
            {/* Prakiraan Cuaca Mingguan (Horizontal scroll on mobile) */}
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {forecastData.map(day => <ForecastDay key={day.day} {...day} />)}
            </div>

            {/* Kota Lain */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
               {otherCitiesData.map(city => <CityWeatherCard key={city.city} {...city} />)}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}