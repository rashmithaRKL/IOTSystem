'use client';
import React, { useEffect, useState } from 'react';
import { fetchSensorData } from '@/lib/api';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface SensorData {
  temperature: number | null;
  humidity: number | null;
  soilMoisture: number | null;
  fertilizerLevel: number | null;
  lastUpdated: string | null;
}

const DashboardPage = () => {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [error, setError] = useState<string>('');
  const [lastUpdatedClient, setLastUpdatedClient] = useState<string>('');

  const loadSensorData = async () => {
    try {
      const data = await fetchSensorData();
      setSensorData(data);
      setError('');
      setLastUpdatedClient(new Date().toLocaleTimeString());
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadSensorData();
    const interval = setInterval(loadSensorData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Greenhouse Dashboard</h1>

      {error && <Alert variant="destructive">Error: {error}</Alert>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Temperature Card */}
        <div className="p-4 border shadow rounded-lg flex flex-col items-center">
          <img
            src="https://images.pexels.com/photos/4592257/pexels-photo-4592257.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Temperature Sensor"
            className="w-16 h-16 object-cover"
          />
          <h2 className="mt-2 text-lg font-semibold">Temperature</h2>
          <p className="mt-1">
            {sensorData && sensorData.temperature !== null ? `${sensorData.temperature} °C` : '--'}
          </p>
        </div>

        {/* Humidity Card */}
        <div className="p-4 border shadow rounded-lg flex flex-col items-center">
          <img
            src="https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Humidity Sensor"
            className="w-16 h-16 object-cover"
          />
          <h2 className="mt-2 text-lg font-semibold">Humidity</h2>
          <p className="mt-1">
            {sensorData && sensorData.humidity !== null ? `${sensorData.humidity}%` : '--'}
          </p>
        </div>

        {/* Soil Moisture Card */}
        <div className="p-4 border shadow rounded-lg flex flex-col items-center">
          <img
            src="https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Soil Moisture Sensor"
            className="w-16 h-16 object-cover"
          />
          <h2 className="mt-2 text-lg font-semibold">Soil Moisture</h2>
          <p className="mt-1">
            {sensorData && sensorData.soilMoisture !== null ? `${sensorData.soilMoisture}%` : '--'}
          </p>
        </div>

        {/* Fertilizer Level Card */}
        <div className="p-4 border shadow rounded-lg flex flex-col items-center">
          <img
            src="https://images.pexels.com/photos/4669401/pexels-photo-4669401.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Fertilizer Level"
            className="w-16 h-16 object-cover"
          />
          <h2 className="mt-2 text-lg font-semibold">Fertilizer Level</h2>
          <p className="mt-1">
            {sensorData && sensorData.fertilizerLevel !== null ? `${sensorData.fertilizerLevel}%` : '--'}
          </p>
        </div>
      </div>

      {sensorData && sensorData.lastUpdated && (
        <p className="text-sm text-gray-500 mt-4">
          Server Last Updated: {new Date(sensorData.lastUpdated).toLocaleTimeString()}
        </p>
      )}
      {lastUpdatedClient && (
        <p className="text-sm text-gray-500">
          Client Last Updated: {lastUpdatedClient}
        </p>
      )}

      <Button onClick={loadSensorData}>Refresh Data</Button>
    </div>
  );
};

export default DashboardPage;
