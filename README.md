# Arduino IoT-Based Automated Greenhouse Monitoring and Control System

## Project Overview

This project implements an automated greenhouse system using Arduino and a modern web application. It monitors critical environmental parameters such as soil moisture, temperature, humidity, and fertilizer level, and controls actuators like water pumps, heaters/fans, and fertilizer dispensers to optimize plant growth.

The system provides real-time data visualization and manual control via a responsive web interface, communicating with the Arduino device over Wi-Fi.

---

## Hardware Components

- Arduino Uno / ESP8266 / ESP32 (with built-in Wi-Fi)
- Soil Moisture Sensor
- DHT11/DHT22 Temperature and Humidity Sensor
- Ultrasonic or Level Sensor for Fertilizer Tank
- Water Pump (controlled via Relay)
- Heater or Fan (controlled via Relay)
- Fertilizer Dispenser Motor
- Power Supply and Relay Modules

---

## Software Components

- Arduino IDE for microcontroller programming
- Next.js (React) for the web application frontend and backend API
- REST API endpoints for sensor data and control commands
- Tailwind CSS and custom UI components for modern responsive design
- Communication via HTTP protocol over Wi-Fi

---

## Features

- Automatic irrigation based on soil moisture
- Temperature and humidity monitoring and control
- Automatic fertilizer dispensing based on tank level
- Real-time sensor data dashboard with alerts
- Manual override controls with confirmation dialogs
- Alerts for abnormal conditions (low water, high temperature, empty fertilizer)
- Scalable and low-cost smart agriculture solution

---

## Setup Instructions

### Arduino Firmware

1. Connect sensors and actuators to the Arduino/ESP32 as per hardware specifications.
2. Program the Arduino to read sensor data and send it via HTTP POST to the web app API endpoint `/api/sensors`.
3. Implement command listening to receive control commands from `/api/control`.
4. Ensure Wi-Fi connectivity is configured correctly.

### Web Application

1. Clone this repository.
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Access the dashboard at `http://localhost:8000/dashboard` and manual control at `http://localhost:8000/manual`.

---

## API Endpoints

- `GET /api/sensors` - Retrieve current sensor data.
- `POST /api/sensors` - Update sensor data from Arduino.
- `POST /api/control` - Send control commands to Arduino.

---

## Future Enhancements

- Implement MQTT protocol for real-time communication.
- Add user authentication and role-based access.
- Integrate email/SMS notifications for alerts.
- Add historical data visualization and analytics.

---

## License

This project is open source and available under the MIT License.

---

## Author

Developed by Rashmitha RKL
