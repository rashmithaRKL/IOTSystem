import { NextRequest, NextResponse } from 'next/server';

let sensorData: {
  temperature: number | null;
  humidity: number | null;
  soilMoisture: number | null;
  fertilizerLevel: number | null;
  lastUpdated: string | null;
} = {
  temperature: null,
  humidity: null,
  soilMoisture: null,
  fertilizerLevel: null,
  lastUpdated: null,
};

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: sensorData });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to retrieve sensor data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (
      body.temperature === undefined ||
      body.humidity === undefined ||
      body.soilMoisture === undefined ||
      body.fertilizerLevel === undefined
    ) {
      return NextResponse.json({ success: false, error: 'Invalid data payload' }, { status: 400 });
    }
    sensorData = {
      temperature: body.temperature,
      humidity: body.humidity,
      soilMoisture: body.soilMoisture,
      fertilizerLevel: body.fertilizerLevel,
      lastUpdated: new Date().toISOString(),
    };
    return NextResponse.json({ success: true, data: sensorData });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error processing sensor data' }, { status: 500 });
  }
}
