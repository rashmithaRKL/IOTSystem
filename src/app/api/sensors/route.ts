import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Sensor from '@/models/Sensor';

export async function GET() {
  try {
    await connectDB();
    // Get the latest sensor reading
    const latestSensor = await Sensor.findOne().sort({ timestamp: -1 });
    
    if (!latestSensor) {
      return NextResponse.json({ success: false, error: 'No sensor data available' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      data: {
        temperature: latestSensor.temperature,
        humidity: latestSensor.humidity,
        soilMoisture: latestSensor.soilMoisture,
        fertilizerLevel: latestSensor.fertilizerLevel,
        lastUpdated: latestSensor.timestamp,
        sensorId: latestSensor.sensorId
      }
    });
  } catch (error) {
    console.error('Failed to retrieve sensor data:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve sensor data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    if (
      body.temperature === undefined ||
      body.humidity === undefined ||
      body.soilMoisture === undefined ||
      body.fertilizerLevel === undefined ||
      body.sensorId === undefined
    ) {
      return NextResponse.json({ success: false, error: 'Invalid data payload' }, { status: 400 });
    }

    const sensorData = await Sensor.create({
      sensorId: body.sensorId,
      temperature: body.temperature,
      humidity: body.humidity,
      soilMoisture: body.soilMoisture,
      fertilizerLevel: body.fertilizerLevel,
      timestamp: new Date()
    });

    return NextResponse.json({ success: true, data: sensorData });
  } catch (error) {
    console.error('Error processing sensor data:', error);
    return NextResponse.json({ success: false, error: 'Error processing sensor data' }, { status: 500 });
  }
}
