// src/components/AirPollutionCard.tsx

import React from 'react';
import type { AirPollutionData } from '../types/weather';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

interface Props {
  data: AirPollutionData;
  aura: string;
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

const AirPollutionCard: React.FC<Props> = ({ data }) => {
  if (!data || !data.list || data.list.length === 0) {
    return <p>Loading air pollution data...</p>;
  }

  const { aqi } = data.list[0].main;
  const { co, no2, o3, pm2_5 } = data.list[0].components;


  return (
    <Card className="w-full">
        <CardHeader>
            <CardTitle>Air Quality</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-2xl font-bold mb-2">AQI: {aqi} ({getAqiDescription(aqi)})</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
                <p>CO: {co.toFixed(2)} μg/m³</p>
                <p>NO₂: {no2.toFixed(2)} μg/m³</p>
                <p>O₃: {o3.toFixed(2)} μg/m³</p>
                <p>PM2.5: {pm2_5.toFixed(2)} μg/m³</p>
            </div>
        </CardContent>
    </Card>
  );
};

export default AirPollutionCard;