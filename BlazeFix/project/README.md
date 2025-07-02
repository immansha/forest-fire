# 🔥 FireWatch - Forest Fire Prediction System

A comprehensive MERN stack application for predicting and monitoring forest fire risks using real-time environmental data and AI-powered analytics.

![FireWatch Dashboard](https://images.pexels.com/photos/1363876/pexels-photo-1363876.jpeg?auto=compress&cs=tinysrgb&w=800)

## 🌟 Features

### 🤖 AI-Powered Predictions
- Advanced machine learning algorithms for fire risk assessment
- Real-time environmental data analysis
- Confidence scoring and factor analysis
- Automated recommendation generation

### 📊 Interactive Dashboard
- Real-time monitoring of environmental conditions
- Risk level visualization with charts and graphs
- Historical data analysis and trends
- Performance metrics and statistics

### 🗺️ Interactive Fire Map
- Live fire risk visualization on interactive maps
- Incident tracking and location-based alerts
- Heat zone mapping and risk distribution
- Geographic filtering and area-based searches

### 📋 Comprehensive Reporting
- Automated report generation
- Multiple report types (Risk Assessment, Weekly, Emergency, etc.)
- Export functionality and data visualization
- Historical report archive and search

### 🚨 Alert System
- Real-time fire risk alerts
- Multiple severity levels (Info, Low, Medium, High, Critical)
- Location-based notifications
- Alert acknowledgment and escalation

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Leaflet** - Interactive maps
- **Recharts** - Data visualization
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Additional Tools
- **Vite** - Build tool and dev server
- **ESLint** - Code linting
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/firewatch.git
   cd firewatch
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. **Environment Setup**
   ```bash
   # Copy environment file
   cp server/.env.example server/.env
   
   # Edit the .env file with your configuration
   nano server/.env
   ```

4. **Start MongoDB**
   ```bash
   # Using MongoDB service
   sudo systemctl start mongod
   
   # Or using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

5. **Run the application**
   ```bash
   # Development mode (runs both frontend and backend)
   npm run dev
   
   # Or run separately
   npm run client  # Frontend only
   npm run server  # Backend only
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000/api

## 📁 Project Structure

```
firewatch/
├── public/                 # Static assets
├── src/                   # Frontend source code
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   └── styles/           # CSS and styling
├── server/               # Backend source code
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Server utilities
│   └── config/           # Configuration files
├── docs/                 # Documentation
└── tests/                # Test files
```

## 🔧 API Endpoints

### Predictions
- `GET /api/predictions` - Get all predictions
- `POST /api/predictions` - Create new prediction
- `GET /api/predictions/:id` - Get specific prediction
- `PUT /api/predictions/:id` - Update prediction
- `DELETE /api/predictions/:id` - Delete prediction

### Reports
- `GET /api/reports` - Get all reports
- `POST /api/reports` - Create new report
- `GET /api/reports/:id` - Get specific report
- `PUT /api/reports/:id` - Update report
- `POST /api/reports/:id/publish` - Publish report

### Alerts
- `GET /api/alerts` - Get all alerts
- `POST /api/alerts` - Create new alert
- `GET /api/alerts/active` - Get active alerts
- `POST /api/alerts/:id/acknowledge` - Acknowledge alert
- `POST /api/alerts/:id/resolve` - Resolve alert

## 🧪 Testing

```bash
# Run frontend tests
npm test

# Run backend tests
cd server && npm test

# Run all tests
npm run test:all
```

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push

### Backend (Render/Railway)
1. Connect your GitHub repository
2. Set start command: `npm start`
3. Add environment variables
4. Deploy automatically on push

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas cluster
2. Get connection string
3. Update `MONGODB_URI` in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Weather data provided by OpenWeatherMap API
- Satellite imagery from NASA Earth Data
- Icons by Lucide React
- Maps powered by OpenStreetMap and Leaflet

## 📞 Support

For support, email support@firewatch.com or join our Slack channel.

## 🔗 Links

- [Live Demo](https://firewatch-demo.vercel.app)
- [API Documentation](https://firewatch-api.herokuapp.com/docs)
- [Project Board](https://github.com/your-username/firewatch/projects)
- [Issues](https://github.com/your-username/firewatch/issues)

---

**Built with ❤️ for forest conservation and fire prevention**