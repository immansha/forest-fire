import express from 'express';
import Prediction from '../models/Prediction.js';

const router = express.Router();

// Calculate fire risk based on environmental factors
const calculateFireRisk = (temperature, humidity, windSpeed) => {
  let riskScore = 0;
  
  // Temperature factor (30% weight)
  if (temperature > 35) riskScore += 30;
  else if (temperature > 25) riskScore += 20;
  else if (temperature > 15) riskScore += 10;
  else riskScore += 5;
  
  // Humidity factor (40% weight) - lower humidity = higher risk
  if (humidity < 20) riskScore += 40;
  else if (humidity < 40) riskScore += 25;
  else if (humidity < 60) riskScore += 15;
  else riskScore += 5;
  
  // Wind speed factor (30% weight)
  if (windSpeed > 25) riskScore += 30;
  else if (windSpeed > 15) riskScore += 20;
  else if (windSpeed > 10) riskScore += 10;
  else riskScore += 5;

  // Determine risk level and confidence
  let riskLevel, confidence;
  
  if (riskScore >= 70) {
    riskLevel = 'High';
    confidence = 85 + Math.random() * 10;
  } else if (riskScore >= 40) {
    riskLevel = 'Medium';
    confidence = 75 + Math.random() * 15;
  } else {
    riskLevel = 'Low';
    confidence = 80 + Math.random() * 15;
  }

  // Factor analysis
  const factors = {
    temperature: temperature > 30 ? 'High Impact' : temperature > 20 ? 'Medium Impact' : 'Low Impact',
    humidity: humidity < 30 ? 'High Impact' : humidity < 50 ? 'Medium Impact' : 'Low Impact',
    windSpeed: windSpeed > 20 ? 'High Impact' : windSpeed > 10 ? 'Medium Impact' : 'Low Impact'
  };

  // Generate recommendations
  const recommendations = [];
  if (riskLevel === 'High') {
    recommendations.push('Immediate alert to fire departments and emergency services');
    recommendations.push('Restrict outdoor activities and campfires');
    recommendations.push('Increase surveillance and monitoring in the area');
    recommendations.push('Prepare evacuation plans for nearby communities');
  } else if (riskLevel === 'Medium') {
    recommendations.push('Enhanced monitoring of environmental conditions');
    recommendations.push('Alert forest rangers and local authorities');
    recommendations.push('Issue public advisories about fire safety');
    recommendations.push('Prepare response teams for potential deployment');
  } else {
    recommendations.push('Continue regular monitoring protocols');
    recommendations.push('Maintain standard fire prevention measures');
    recommendations.push('Monitor weather forecasts for changes');
  }

  return {
    riskLevel,
    riskScore: Math.round(riskScore),
    confidence: Math.round(confidence),
    factors,
    recommendations
  };
};

// GET /api/predictions - Get all predictions
router.get('/', async (req, res) => {
  try {
    const { 
      riskLevel, 
      location, 
      active = 'true',
      limit = 50,
      page = 1,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = {};
    
    if (riskLevel) {
      query['prediction.riskLevel'] = riskLevel;
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    if (active === 'true') {
      query.isActive = true;
      query.validUntil = { $gt: new Date() };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const predictions = await Prediction.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Prediction.countDocuments(query);

    res.json({
      success: true,
      data: predictions,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        count: predictions.length,
        totalRecords: total
      }
    });
  } catch (error) {
    console.error('Error fetching predictions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch predictions',
      message: error.message
    });
  }
});

// GET /api/predictions/:id - Get specific prediction
router.get('/:id', async (req, res) => {
  try {
    const prediction = await Prediction.findById(req.params.id);
    
    if (!prediction) {
      return res.status(404).json({
        success: false,
        error: 'Prediction not found'
      });
    }

    res.json({
      success: true,
      data: prediction
    });
  } catch (error) {
    console.error('Error fetching prediction:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch prediction',
      message: error.message
    });
  }
});

// POST /api/predictions - Create new prediction
router.post('/', async (req, res) => {
  try {
    const startTime = Date.now();
    
    const {
      location,
      coordinates,
      environmentalData
    } = req.body;

    // Validate required fields
    if (!location || !environmentalData) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        required: ['location', 'environmentalData']
      });
    }

    const { temperature, humidity, windSpeed } = environmentalData;

    if (temperature === undefined || humidity === undefined || windSpeed === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing environmental data',
        required: ['temperature', 'humidity', 'windSpeed']
      });
    }

    // Calculate prediction
    const predictionResult = calculateFireRisk(temperature, humidity, windSpeed);
    const processingTime = Date.now() - startTime;

    // Create prediction document
    const prediction = new Prediction({
      location,
      coordinates: coordinates || { latitude: 0, longitude: 0 },
      environmentalData,
      prediction: predictionResult,
      recommendations: predictionResult.recommendations,
      metadata: {
        processingTime,
        dataSource: 'api_request'
      }
    });

    await prediction.save();

    res.status(201).json({
      success: true,
      data: prediction,
      message: 'Prediction created successfully'
    });
  } catch (error) {
    console.error('Error creating prediction:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create prediction',
      message: error.message
    });
  }
});

// PUT /api/predictions/:id - Update prediction
router.put('/:id', async (req, res) => {
  try {
    const prediction = await Prediction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!prediction) {
      return res.status(404).json({
        success: false,
        error: 'Prediction not found'
      });
    }

    res.json({
      success: true,
      data: prediction,
      message: 'Prediction updated successfully'
    });
  } catch (error) {
    console.error('Error updating prediction:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update prediction',
      message: error.message
    });
  }
});

// DELETE /api/predictions/:id - Delete prediction
router.delete('/:id', async (req, res) => {
  try {
    const prediction = await Prediction.findByIdAndDelete(req.params.id);

    if (!prediction) {
      return res.status(404).json({
        success: false,
        error: 'Prediction not found'
      });
    }

    res.json({
      success: true,
      message: 'Prediction deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting prediction:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete prediction',
      message: error.message
    });
  }
});

// GET /api/predictions/stats/summary - Get prediction statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const stats = await Prediction.aggregate([
      {
        $match: {
          isActive: true,
          validUntil: { $gt: new Date() }
        }
      },
      {
        $group: {
          _id: '$prediction.riskLevel',
          count: { $sum: 1 },
          avgConfidence: { $avg: '$prediction.confidence' },
          avgRiskScore: { $avg: '$prediction.riskScore' }
        }
      }
    ]);

    const total = await Prediction.countDocuments({
      isActive: true,
      validUntil: { $gt: new Date() }
    });

    res.json({
      success: true,
      data: {
        total,
        byRiskLevel: stats,
        lastUpdated: new Date()
      }
    });
  } catch (error) {
    console.error('Error fetching prediction stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch prediction statistics',
      message: error.message
    });
  }
});

export default router;