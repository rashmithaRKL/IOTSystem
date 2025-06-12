export async function fetchSensorData() {
  try {
    const response = await fetch('/api/sensors');
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch sensor data');
    }
    return result.data;
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    throw error;
  }
}

export async function sendControlCommand(command: string) {
  try {
    const response = await fetch('/api/control', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command }),
    });
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'Command failed');
    }
    return result.message;
  } catch (error) {
    console.error('Error sending control command:', error);
    throw error;
  }
}
