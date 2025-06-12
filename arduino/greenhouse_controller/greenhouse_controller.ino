#include <DHT.h>
#include <WiFiNINA.h>
#include <ArduinoJson.h>
#include <Servo.h>

// Pin Definitions
#define DHT_PIN 2          // DHT22 sensor for temperature and humidity
#define SOIL_MOISTURE_PIN A0  // Soil moisture sensor
#define FERTILIZER_PIN A1     // Fertilizer level sensor
#define PUMP_PIN 3           // Water pump relay
#define HEATER_PIN 4         // Heater relay
#define FERTILIZER_PUMP_PIN 5 // Fertilizer pump relay
#define SERVO_PIN 6          // Servo for ventilation

// Constants
#define DHT_TYPE DHT22
#define SENSOR_ID "GH001"  // Unique identifier for this greenhouse
#define WIFI_RETRY_DELAY 5000
#define API_PORT 8000

// Network credentials
const char* ssid = "YourWiFiSSID";
const char* password = "YourWiFiPassword";
const char* serverAddress = "your-server-address"; // Your server IP or domain

// Initialize sensors
DHT dht(DHT_PIN, DHT_TYPE);
Servo ventServo;

// Global variables
unsigned long lastSensorUpdate = 0;
const unsigned long sensorInterval = 5000; // Read sensors every 5 seconds

void setup() {
  Serial.begin(9600);
  
  // Initialize pins
  pinMode(PUMP_PIN, OUTPUT);
  pinMode(HEATER_PIN, OUTPUT);
  pinMode(FERTILIZER_PUMP_PIN, OUTPUT);
  
  // Initialize servo
  ventServo.attach(SERVO_PIN);
  ventServo.write(0); // Close ventilation by default
  
  // Initialize DHT sensor
  dht.begin();
  
  // Connect to WiFi
  connectToWiFi();
}

void loop() {
  // Check WiFi connection
  if (WiFi.status() != WL_CONNECTED) {
    connectToWiFi();
  }

  // Read and send sensor data periodically
  if (millis() - lastSensorUpdate >= sensorInterval) {
    sendSensorData();
    lastSensorUpdate = millis();
  }

  // Check for incoming commands
  checkCommands();
}

void connectToWiFi() {
  Serial.print("Connecting to WiFi");
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\nConnected to WiFi");
}

void sendSensorData() {
  // Read sensor values
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  int soilMoisture = map(analogRead(SOIL_MOISTURE_PIN), 0, 1023, 0, 100);
  int fertilizerLevel = map(analogRead(FERTILIZER_PIN), 0, 1023, 0, 100);

  // Create JSON document
  StaticJsonDocument<200> doc;
  doc["sensorId"] = SENSOR_ID;
  doc["temperature"] = temperature;
  doc["humidity"] = humidity;
  doc["soilMoisture"] = soilMoisture;
  doc["fertilizerLevel"] = fertilizerLevel;

  // Convert to string
  String jsonString;
  serializeJson(doc, jsonString);

  // Send HTTP POST request
  WiFiClient client;
  if (client.connect(serverAddress, API_PORT)) {
    client.println("POST /api/sensors HTTP/1.1");
    client.println("Host: " + String(serverAddress));
    client.println("Content-Type: application/json");
    client.println("Content-Length: " + String(jsonString.length()));
    client.println();
    client.println(jsonString);
  }
  
  client.stop();
}

void checkCommands() {
  WiFiClient client;
  if (client.connect(serverAddress, API_PORT)) {
    client.println("GET /api/control HTTP/1.1");
    client.println("Host: " + String(serverAddress));
    client.println("Connection: close");
    client.println();

    while (client.available()) {
      String line = client.readStringUntil('\r');
      if (line.indexOf("command") > 0) {
        executeCommand(line);
      }
    }
  }
  client.stop();
}

void executeCommand(String command) {
  if (command.indexOf("startIrrigation") > 0) {
    digitalWrite(PUMP_PIN, HIGH);
  } 
  else if (command.indexOf("stopIrrigation") > 0) {
    digitalWrite(PUMP_PIN, LOW);
  }
  else if (command.indexOf("activateHeater") > 0) {
    digitalWrite(HEATER_PIN, HIGH);
  }
  else if (command.indexOf("deactivateHeater") > 0) {
    digitalWrite(HEATER_PIN, LOW);
  }
  else if (command.indexOf("dispenseFertilizer") > 0) {
    digitalWrite(FERTILIZER_PUMP_PIN, HIGH);
    delay(5000); // Dispense for 5 seconds
    digitalWrite(FERTILIZER_PUMP_PIN, LOW);
  }
}
