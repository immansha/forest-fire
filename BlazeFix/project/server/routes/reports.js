import express from 'express';
import Report from '../models/Report.js';

const router = express.Router();

// GET /api/reports - Get all reports
router.get('/', async (req, res) => {
  try {
    const {
      reportType,
      riskLevel,
      status,
      location,
      limit = 20,
      page = 1,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search
    } = req.query;

    const query = {};

    if (reportType) query.reportType = reportType;
    if (riskLevel) query.riskLevel = riskLevel;
    if (status) query.status = status;
    if (location) query.location = { $regex: location, $options: 'i' };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const reports = await Report.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip)
      .select('-attachments'); // Exclude large attachment data

    const total = await Report.countDocuments(query);

    res.json({
      success: true,
      data: reports,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        count: reports.length,
        totalRecords: total
      }
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reports',
      message: error.message
    });
  }
});

// GET /api/reports/:id - Get specific report
router.get('/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      });
    }

    // Increment view count
    await report.incrementViews();

    res.json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch report',
      message: error.message
    });
  }
});

// POST /api/reports - Create new report
router.post('/', async (req, res) => {
  try {
    const reportData = {
      ...req.body,
      generatedBy: req.body.generatedBy || 'Manual'
    };

    const report = new Report(reportData);
    await report.save();

    res.status(201).json({
      success: true,
      data: report,
      message: 'Report created successfully'
    });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create report',
      message: error.message
    });
  }
});

// PUT /api/reports/:id - Update report
router.put('/:id', async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { ...req.body, version: { $inc: 1 } },
      { new: true, runValidators: true }
    );

    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      });
    }

    res.json({
      success: true,
      data: report,
      message: 'Report updated successfully'
    });
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update report',
      message: error.message
    });
  }
});

// DELETE /api/reports/:id - Delete report
router.delete('/:id', async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      });
    }

    res.json({
      success: true,
      message: 'Report deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete report',
      message: error.message
    });
  }
});

// POST /api/reports/:id/publish - Publish report
router.post('/:id/publish', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      });
    }

    await report.publish();

    res.json({
      success: true,
      data: report,
      message: 'Report published successfully'
    });
  } catch (error) {
    console.error('Error publishing report:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to publish report',
      message: error.message
    });
  }
});

// POST /api/reports/:id/archive - Archive report
router.post('/:id/archive', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      });
    }

    await report.archive();

    res.json({
      success: true,
      data: report,
      message: 'Report archived successfully'
    });
  } catch (error) {
    console.error('Error archiving report:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to archive report',
      message: error.message
    });
  }
});

// GET /api/reports/stats/summary - Get report statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const stats = await Report.aggregate([
      {
        $group: {
          _id: null,
          totalReports: { $sum: 1 },
          byStatus: {
            $push: {
              status: '$status',
              count: 1
            }
          },
          byRiskLevel: {
            $push: {
              riskLevel: '$riskLevel',
              count: 1
            }
          },
          byType: {
            $push: {
              reportType: '$reportType',
              count: 1
            }
          },
          totalViews: { $sum: '$metrics.views' },
          totalDownloads: { $sum: '$metrics.downloads' }
        }
      }
    ]);

    const recentReports = await Report.findRecent(7);
    const publishedReports = await Report.find({ status: 'Published' }).countDocuments();

    res.json({
      success: true,
      data: {
        summary: stats[0] || {},
        recentCount: recentReports.length,
        publishedCount: publishedReports,
        lastUpdated: new Date()
      }
    });
  } catch (error) {
    console.error('Error fetching report stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch report statistics',
      message: error.message
    });
  }
});

// GET /api/reports/published - Get published reports
router.get('/published', async (req, res) => {
  try {
    const reports = await Report.findPublished();
    
    res.json({
      success: true,
      data: reports
    });
  } catch (error) {
    console.error('Error fetching published reports:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch published reports',
      message: error.message
    });
  }
});

export default router;