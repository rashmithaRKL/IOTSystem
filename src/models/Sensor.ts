import mongoose from 'mongoose';

const SensorSchema = new mongoose.Schema({
  sensorId: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  soilMoisture: {
    type: Number,
    required: true,
  },
  fertilizerLevel: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create indexes for better query performance
SensorSchema.index({ sensorId: 1, timestamp: -1 });

export default mongoose.models.Sensor || mongoose.model('Sensor', SensorSchema);
