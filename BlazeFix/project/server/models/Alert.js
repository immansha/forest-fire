import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 150
  },
  message: {
    type: String,
    required: true,
    maxlength: 500
  },
  alertType: {
    type: String,
    enum: ['Fire Risk', 'Weather Warning', 'System Alert', 'Emergency', 'Maintenance'],
    required: true
  },
  severity: {
    type: String,
    enum: ['Info', 'Low', 'Medium', 'High', 'Critical'],
    required: true
  },
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
  affectedArea: {
    radius: {
      type: Number, // in kilometers
      required: true,
      min: 0
    },
    population: {
      type: Number,
      min: 0
    },
    landmarks: [{
      type: String,
      trim: true
    }]
  },
  environmentalData: {
    temperature: Number,
    humidity: Number,
    windSpeed: Number,
    windDirection: String,
    precipitation: Number,
    visibility: Number
  },
  riskFactors: [{
    factor: {
      type: String,
      required: true
    },
    impact: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      required: true
    },
    description: String
  }],
  recommendations: [{
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Immediate'],
      required: true
    },
    action: {
      type: String,
      required: true
    },
    target: {
      type: String,
      enum: ['General Public', 'Emergency Services', 'Forest Rangers', 'Local Authorities', 'All'],
      default: 'General Public'
    }
  }],
  status: {
    type: String,
    enum: ['Active', 'Acknowledged', 'In Progress', 'Resolved', 'Cancelled'],
    default: 'Active'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  acknowledgedBy: [{
    userId: String,
    name: String,
    role: String,
    acknowledgedAt: {
      type: Date,
      default: Date.now
    }
  }],
  escalationLevel: {
    type: Number,
    default: 1,
    min: 1,
    max: 5
  },
  relatedAlerts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alert'
  }],
  metadata: {
    source: {
      type: String,
      enum: ['Automated', 'Manual', 'Sensor', 'Satellite', 'Report'],
      default: 'Automated'
    },
    confidence: {
      type: Number,
      min: 0,
      max: 100
    },
    modelVersion: String,
    processingTime: Number
  },
  notifications: {
    sent: {
      type: Boolean,
      default: false
    },
    sentAt: Date,
    channels: [{
      type: String,
      enum: ['Email', 'SMS', 'Push', 'Radio', 'Siren']
    }],
    recipients: Number
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
alertSchema.index({ location: 1, createdAt: -1 });
alertSchema.index({ severity: 1, status: 1 });
alertSchema.index({ alertType: 1, isActive: 1 });
alertSchema.index({ 'coordinates.latitude': 1, 'coordinates.longitude': 1 });
alertSchema.index({ expiresAt: 1 });
alertSchema.index({ status: 1, createdAt: -1 });

// Virtual for checking if alert is expired
alertSchema.virtual('isExpired').get(function() {
  return new Date() > this.expiresAt;
});

// Virtual for time remaining
alertSchema.virtual('timeRemaining').get(function() {
  const now = new Date();
  const remaining = this.expiresAt - now;
  return remaining > 0 ? remaining : 0;
});

// Virtual for alert age
alertSchema.virtual('age').get(function() {
  return new Date() - this.createdAt;
});

// Static method to find active alerts
alertSchema.statics.findActive = function() {
  return this.find({
    isActive: true,
    expiresAt: { $gt: new Date() },
    status: { $in: ['Active', 'Acknowledged', 'In Progress'] }
  }).sort({ severity: -1, createdAt: -1 });
};

// Static method to find by severity
alertSchema.statics.findBySeverity = function(severity) {
  return this.find({
    severity: severity,
    isActive: true,
    expiresAt: { $gt: new Date() }
  }).sort({ createdAt: -1 });
};

// Static method to find critical alerts
alertSchema.statics.findCritical = function() {
  return this.find({
    severity: 'Critical',
    isActive: true,
    expiresAt: { $gt: new Date() }
  }).sort({ createdAt: -1 });
};

// Static method to find alerts in area
alertSchema.statics.findInArea = function(lat, lng, radiusKm) {
  return this.find({
    isActive: true,
    expiresAt: { $gt: new Date() },
    'coordinates.latitude': {
      $gte: lat - (radiusKm / 111), // Rough conversion: 1 degree ≈ 111 km
      $lte: lat + (radiusKm / 111)
    },
    'coordinates.longitude': {
      $gte: lng - (radiusKm / (111 * Math.cos(lat * Math.PI / 180))),
      $lte: lng + (radiusKm / (111 * Math.cos(lat * Math.PI / 180)))
    }
  });
};

// Instance method to acknowledge alert
alertSchema.methods.acknowledge = function(userId, userName, userRole) {
  this.acknowledgedBy.push({
    userId: userId,
    name: userName,
    role: userRole,
    acknowledgedAt: new Date()
  });
  
  if (this.status === 'Active') {
    this.status = 'Acknowledged';
  }
  
  return this.save();
};

// Instance method to resolve alert
alertSchema.methods.resolve = function() {
  this.status = 'Resolved';
  this.isActive = false;
  return this.save();
};

// Instance method to escalate alert
alertSchema.methods.escalate = function() {
  if (this.escalationLevel < 5) {
    this.escalationLevel += 1;
    
    // Auto-escalate severity if needed
    if (this.escalationLevel >= 3 && this.severity !== 'Critical') {
      if (this.severity === 'High') {
        this.severity = 'Critical';
      } else if (this.severity === 'Medium') {
        this.severity = 'High';
      }
    }
  }
  
  return this.save();
};

// Instance method to extend expiration
alertSchema.methods.extend = function(hours = 24) {
  this.expiresAt = new Date(this.expiresAt.getTime() + (hours * 60 * 60 * 1000));
  return this.save();
};

export default mongoose.model('Alert', alertSchema);