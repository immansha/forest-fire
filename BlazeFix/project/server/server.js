import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

// Import routes
import predictionRoutes from './routes/predictions.js';
import reportRoutes from './routes/reports.js';
import alertRoutes from './routes/alerts.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9999;


// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use(morgan('combined'));

// MongoDB connection
// MongoDB connection
const connectDB = async () => {
  try {
    // Hardcoded fallback for now
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://immanshasingh:Hx8BxMFqOokMYICG@ff.ibeuo7o.mongodb.net/?retryWrites=true&w=majority&appName=ff';
    
    console.log('🔗 Attempting MongoDB connection...');
    console.log('📍 Using URI:', mongoURI.substring(0, 50) + '...');
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    
    // Let's see what the actual error is
    if (error.name === 'MongoServerSelectionError') {
      console.log('💡 This might be a network/authentication issue');
      console.log('🔍 Check: 1) Internet connection 2) MongoDB Atlas whitelist 3) Credentials');
    }
    
    process.exit(1);
  }
};

// Routes
app.use('/api/predictions', predictionRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/alerts', alertRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'FireWatch API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to FireWatch API',
    version: '1.0.0',
    endpoints: {
      predictions: '/api/predictions',
      reports: '/api/reports',
      alerts: '/api/alerts',
      health: '/api/health'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 API URL: http://localhost:${PORT}`);
  });
};

startServer();

export default app;