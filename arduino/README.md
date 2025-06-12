# Greenhouse Controller - Arduino Setup

## Components Required
1. Arduino Board (with WiFi capability, e.g., Arduino Uno WiFi Rev2 or ESP32)
2. DHT22 Temperature and Humidity Sensor
3. Soil Moisture Sensor
4. Analog Fertilizer Level Sensor
5. Water Pump with Relay Module
6. Heater with Relay Module
7. Fertilizer Pump with Relay Module
8. Servo Motor for Ventilation
9. Jumper Wires
10. Breadboard
11. Power Supply (12V for pumps, 5V for logic)

## Pin Connections

### DHT22 Temperature/Humidity Sensor
- VCC → 5V
- GND → GND
- DATA → Digital Pin 2

### Soil Moisture Sensor
- VCC → 5V
- GND → GND
- AO → Analog Pin A0

### Fertilizer Level Sensor
- VCC → 5V
- GND → GND
- AO → Analog Pin A1

### Water Pump Relay
- VCC → 5V
- GND → GND
- IN → Digital Pin 3
- COM → 12V Power Supply
- NO → Water Pump +
- Water Pump - → Power Supply Ground

### Heater Relay
- VCC → 5V
- GND → GND
- IN → Digital Pin 4
- COM → 12V Power Supply
- NO → Heater +
- Heater - → Power Supply Ground

### Fertilizer Pump Relay
- VCC → 5V
- GND → GND
- IN → Digital Pin 5
- COM → 12V Power Supply
- NO → Fertilizer Pump +
- Fertilizer Pump - → Power Supply Ground

### Servo Motor
- Red → 5V
- Brown/Black → GND
- Orange/Yellow → Digital Pin 6

## Circuit Diagram
```
                                    +5V
                                     │
                                     ├── DHT22 VCC
                                     ├── Soil Moisture VCC
                                     ├── Fertilizer Sensor VCC
                                     ├── Relay VCC (x3)
                                     └── Servo VCC
                                     
                                    GND
                                     │
                                     ├── DHT22 GND
                                     ├── Soil Moisture GND
                                     ├── Fertilizer Sensor GND
                                     ├── Relay GND (x3)
                                     └── Servo GND

Arduino Pins:
D2 ─── DHT22 Data
D3 ─── Water Pump Relay IN
D4 ─── Heater Relay IN
D5 ─── Fertilizer Pump Relay IN
D6 ─── Servo Signal
A0 ─── Soil Moisture AO
A1 ─── Fertilizer Level AO
```

## Software Setup
1. Install required libraries in Arduino IDE:
   - DHT sensor library by Adafruit
   - WiFiNINA (for WiFi boards)
   - ArduinoJson
   - Servo

2. Update WiFi credentials in the code:
   ```cpp
   const char* ssid = "YourWiFiSSID";
   const char* password = "YourWiFiPassword";
   const char* serverAddress = "your-server-address";
   ```

3. Upload the code to your Arduino board

## Operation
- The system reads sensor data every 5 seconds and sends it to the server
- Monitors temperature, humidity, soil moisture, and fertilizer levels
- Accepts commands from the server for:
  - Irrigation control
  - Heater control
  - Fertilizer dispensing
  - Ventilation control

## Troubleshooting
1. If WiFi connection fails:
   - Check credentials
   - Ensure signal strength is adequate
   - Verify server address is correct

2. If sensors read incorrect values:
   - Check power connections
   - Verify sensor calibration
   - Check analog reference voltage

3. If actuators don't respond:
   - Check relay connections
   - Verify power supply voltage
   - Check control signal connections

## Safety Notes
- Always disconnect power before modifying connections
- Use appropriate fuses for pump and heater circuits
- Keep water away from electrical connections
- Ensure proper ventilation for the heater
- Use waterproof connections for outdoor components
