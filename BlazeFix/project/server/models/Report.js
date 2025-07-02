import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  coordinates: {
    latitude: {
      type: Number,
      min: -90,
      max: 90
    },
    longitude: {
      type: Number,
      min: -180,
      max: 180
    }
  },
  reportType: {
    type: String,
    enum: ['Risk Assessment', 'Weekly Report', 'Monthly Report', 'Emergency Report', 'Analysis Report', 'Trend Analysis'],
    required: true
  },
  status: {
    type: String,
    enum: ['Draft', 'In Progress', 'Completed', 'Published', 'Archived'],
    default: 'Draft'
  },
  riskLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  environmentalData: {
    temperature: {
      type: Number,
      required: true
    },
    humidity: {
      type: Number,
      required: true
    },
    windSpeed: {
      type: Number,
      required: true
    },
    precipitation: {
      type: Number,
      default: 0
    },
    soilMoisture: {
      type: Number
    }
  },
  predictions: {
    type: String,
    required: true,
    maxlength: 500
  },
  recommendations: [{
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      required: true
    },
    action: {
      type: String,
      required: true,
      maxlength: 200
    },
    description: {
      type: String,
      maxlength: 500
    },
    estimatedCost: {
      type: Number,
      min: 0
    },
    timeframe: {
      type: String,
      enum: ['Immediate', 'Within 24 hours', 'Within 1 week', 'Within 1 month', 'Long term']
    }
  }],
  attachments: [{
    filename: String,
    originalName: String,
    mimeType: String,
    size: Number,
    uploadDate: {
      type: Date,
      default: Date.now
    },
    url: String
  }],
  tags: [{
    type: String,
    trim: true
  }],
  reportPeriod: {
    startDate: Date,
    endDate: Date
  },
  generatedBy: {
    type: String,
    enum: ['System', 'Manual', 'AI'],
    default: 'Manual'
  },
  visibility: {
    type: String,
    enum: ['Public', 'Internal', 'Restricted'],
    default: 'Internal'
  },
  metrics: {
    views: {
      type: Number,
      default: 0
    },
    downloads: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    }
  },
  version: {
    type: Number,
    default: 1
  },
  publishedAt: Date,
  archivedAt: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
reportSchema.index({ location: 1, createdAt: -1 });
reportSchema.index({ reportType: 1, status: 1 });
reportSchema.index({ riskLevel: 1, createdAt: -1 });
reportSchema.index({ tags: 1 });
reportSchema.index({ 'reportPeriod.startDate': 1, 'reportPeriod.endDate': 1 });

// Virtual for report age
reportSchema.virtual('age').get(function() {
  return new Date() - this.createdAt;
});

// Virtual for formatted report period
reportSchema.virtual('formattedPeriod').get(function() {
  if (this.reportPeriod.startDate && this.reportPeriod.endDate) {
    return `${this.reportPeriod.startDate.toDateString()} - ${this.reportPeriod.endDate.toDateString()}`;
  }
  return null;
});

// Static method to find published reports
reportSchema.statics.findPublished = function() {
  return this.find({
    status: 'Published',
    visibility: { $in: ['Public', 'Internal'] }
  }).sort({ publishedAt: -1 });
};

// Static method to find by risk level
reportSchema.statics.findByRiskLevel = function(riskLevel) {
  return this.find({
    riskLevel: riskLevel,
    status: { $in: ['Completed', 'Published'] }
  }).sort({ createdAt: -1 });
};

// Static method to find recent reports
reportSchema.statics.findRecent = function(days = 7) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return this.find({
    createdAt: { $gte: cutoffDate },
    status: { $in: ['Completed', 'Published'] }
  }).sort({ createdAt: -1 });
};

// Instance method to publish report
reportSchema.methods.publish = function() {
  this.status = 'Published';
  this.publishedAt = new Date();
  return this.save();
};

// Instance method to archive report
reportSchema.methods.archive = function() {
  this.status = 'Archived';
  this.archivedAt = new Date();
  return this.save();
};

// Instance method to increment view count
reportSchema.methods.incrementViews = function() {
  this.metrics.views += 1;
  return this.save();
};

export default mongoose.model('Report', reportSchema);