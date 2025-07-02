import mongoose from 'mongoose';

const predictionSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    trim: true
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90
    },
    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180
    }
  },
  environmentalData: {
    temperature: {
      type: Number,
      required: true,
      min: -50,
      max: 60
    },
    humidity: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    windSpeed: {
      type: Number,
      required: true,
      min: 0,
      max: 200
    },
    precipitation: {
      type: Number,
      default: 0,
      min: 0
    },
    soilMoisture: {
      type: Number,
      min: 0,
      max: 100
    }
  },
  prediction: {
    riskLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      required: true
    },
    riskScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    factors: {
      temperature: {
        type: String,
        enum: ['Low Impact', 'Medium Impact', 'High Impact']
      },
      humidity: {
        type: String,
        enum: ['Low Impact', 'Medium Impact', 'High Impact']
      },
      windSpeed: {
        type: String,
        enum: ['Low Impact', 'Medium Impact', 'High Impact']
      }
    }
  },
  recommendations: [{
    type: String,
    required: true
  }],
  predictionDate: {
    type: Date,
    default: Date.now
  },
  validUntil: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  metadata: {
    modelVersion: {
      type: String,
      default: '1.0.0'
    },
    processingTime: {
      type: Number // in milliseconds
    },
    dataSource: {
      type: String,
      default: 'manual_input'
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
predictionSchema.index({ location: 1, predictionDate: -1 });
predictionSchema.index({ 'coordinates.latitude': 1, 'coordinates.longitude': 1 });
predictionSchema.index({ 'prediction.riskLevel': 1, predictionDate: -1 });
predictionSchema.index({ validUntil: 1 });

// Virtual for checking if prediction is expired
predictionSchema.virtual('isExpired').get(function() {
  return new Date() > this.validUntil;
});

// Virtual for time remaining
predictionSchema.virtual('timeRemaining').get(function() {
  const now = new Date();
  const remaining = this.validUntil - now;
  return remaining > 0 ? remaining : 0;
});

// Static method to find active predictions
predictionSchema.statics.findActive = function() {
  return this.find({
    isActive: true,
    validUntil: { $gt: new Date() }
  });
};

// Static method to find by risk level
predictionSchema.statics.findByRiskLevel = function(riskLevel) {
  return this.find({
    'prediction.riskLevel': riskLevel,
    isActive: true,
    validUntil: { $gt: new Date() }
  });
};

// Instance method to deactivate prediction
predictionSchema.methods.deactivate = function() {
  this.isActive = false;
  return this.save();
};

export default mongoose.model('Prediction', predictionSchema);