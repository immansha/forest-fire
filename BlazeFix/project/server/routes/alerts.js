import express from 'express';
import Alert from '../models/Alert.js';

const router = express.Router();

// GET /api/alerts - Get all alerts
router.get('/', async (req, res) => {
  try {
    const {
      severity,
      alertType,
      status,
      location,
      active = 'true',
      limit = 50,
      page = 1,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = {};

    if (severity) query.severity = severity;
    if (alertType) query.alertType = alertType;
    if (status) query.status = status;
    if (location) query.location = { $regex: location, $options: 'i' };
    
    if (active === 'true') {
      query.isActive = true;
      query.expiresAt = { $gt: new Date() };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const alerts = await Alert.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip)
      .populate('relatedAlerts', 'title severity location');

    const total = await Alert.countDocuments(query);

    res.json({
      success: true,
      data: alerts,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        count: alerts.length,
        totalRecords: total
      }
    });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch alerts',
      message: error.message
    });
  }
});

// GET /api/alerts/active - Get active alerts
router.get('/active', async (req, res) => {
  try {
    const alerts = await Alert.findActive();
    
    res.json({
      success: true,
      data: alerts
    });
  } catch (error) {
    console.error('Error fetching active alerts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch active alerts',
      message: error.message
    });
  }
});

// GET /api/alerts/critical - Get critical alerts
router.get('/critical', async (req, res) => {
  try {
    const alerts = await Alert.findCritical();
    
    res.json({
      success: true,
      data: alerts
    });
  } catch (error) {
    console.error('Error fetching critical alerts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch critical alerts',
      message: error.message
    });
  }
});

// GET /api/alerts/:id - Get specific alert
router.get('/:id', async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id)
      .populate('relatedAlerts', 'title severity location createdAt');
    
    if (!alert) {
      return res.status(404).json({
        success: false,
        error: 'Alert not found'
      });
    }

    res.json({
      success: true,
      data: alert
    });
  } catch (error) {
    console.error('Error fetching alert:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch alert',
      message: error.message
    });
  }
});

// POST /api/alerts - Create new alert
router.post('/', async (req, res) => {
  try {
    const alertData = {
      ...req.body,
      expiresAt: req.body.expiresAt || new Date(Date.now() + 24 * 60 * 60 * 1000) // Default 24 hours
    };

    const alert = new Alert(alertData);
    await alert.save();

    res.status(201).json({
      success: true,
      data: alert,
      message: 'Alert created successfully'
    });
  } catch (error) {
    console.error('Error creating alert:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create alert',
      message: error.message
    });
  }
});

// PUT /api/alerts/:id - Update alert
router.put('/:id', async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!alert) {
      return res.status(404).json({
        success: false,
        error: 'Alert not found'
      });
    }

    res.json({
      success: true,
      data: alert,
      message: 'Alert updated successfully'
    });
  } catch (error) {
    console.error('Error updating alert:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update alert',
      message: error.message
    });
  }
});

// POST /api/alerts/:id/acknowledge - Acknowledge alert
router.post('/:id/acknowledge', async (req, res) => {
  try {
    const { userId, userName, userRole } = req.body;
    
    if (!userId || !userName) {
      return res.status(400).json({
        success: false,
        error: 'User ID and name are required'
      });
    }

    const alert = await Alert.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({
        success: false,
        error: 'Alert not found'
      });
    }

    await alert.acknowledge(userId, userName, userRole || 'User');

    res.json({
      success: true,
      data: alert,
      message: 'Alert acknowledged successfully'
    });
  } catch (error) {
    console.error('Error acknowledging alert:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to acknowledge alert',
      message: error.message
    });
  }
});

// POST /api/alerts/:id/resolve - Resolve alert
router.post('/:id/resolve', async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({
        success: false,
        error: 'Alert not found'
      });
    }

    await alert.resolve();

    res.json({
      success: true,
      data: alert,
      message: 'Alert resolved successfully'
    });
  } catch (error) {
    console.error('Error resolving alert:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to resolve alert',
      message: error.message
    });
  }
});

// POST /api/alerts/:id/escalate - Escalate alert
router.post('/:id/escalate', async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({
        success: false,
        error: 'Alert not found'
      });
    }

    await alert.escalate();

    res.json({
      success: true,
      data: alert,
      message: 'Alert escalated successfully'
    });
  } catch (error) {
    console.error('Error escalating alert:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to escalate alert',
      message: error.message
    });
  }
});

// POST /api/alerts/:id/extend - Extend alert expiration
router.post('/:id/extend', async (req, res) => {
  try {
    const { hours = 24 } = req.body;
    
    const alert = await Alert.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({
        success: false,
        error: 'Alert not found'
      });
    }

    await alert.extend(hours);

    res.json({
      success: true,
      data: alert,
      message: `Alert extended by ${hours} hours`
    });
  } catch (error) {
    console.error('Error extending alert:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to extend alert',
      message: error.message
    });
  }
});

// GET /api/alerts/area/:lat/:lng/:radius - Get alerts in area
router.get('/area/:lat/:lng/:radius', async (req, res) => {
  try {
    const { lat, lng, radius } = req.params;
    
    const alerts = await Alert.findInArea(
      parseFloat(lat),
      parseFloat(lng),
      parseFloat(radius)
    );

    res.json({
      success: true,
      data: alerts,
      count: alerts.length
    });
  } catch (error) {
    console.error('Error fetching alerts in area:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch alerts in area',
      message: error.message
    });
  }
});

// GET /api/alerts/stats/summary - Get alert statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const stats = await Alert.aggregate([
      {
        $group: {
          _id: null,
          totalAlerts: { $sum: 1 },
          activeAlerts: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$isActive', true] },
                    { $gt: ['$expiresAt', new Date()] }
                  ]
                },
                1,
                0
              ]
            }
          },
          bySeverity: {
            $push: {
              severity: '$severity',
              count: 1
            }
          },
          byStatus: {
            $push: {
              status: '$status',
              count: 1
            }
          },
          criticalAlerts: {
            $sum: {
              $cond: [{ $eq: ['$severity', 'Critical'] }, 1, 0]
            }
          }
        }
      }
    ]);

    const recentAlerts = await Alert.find({
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    }).countDocuments();

    res.json({
      success: true,
      data: {
        summary: stats[0] || {},
        recentCount: recentAlerts,
        lastUpdated: new Date()
      }
    });
  } catch (error) {
    console.error('Error fetching alert stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch alert statistics',
      message: error.message
    });
  }
});

export default router;