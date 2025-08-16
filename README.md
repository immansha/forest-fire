# 🔥 Forest Fire Prediction System (BlazeFix)

A comprehensive MERN stack application for predicting and monitoring forest fire risks using machine learning algorithms and real-time data analysis.

## 🌟 Features

- **Real-time Fire Risk Prediction** - Advanced ML algorithms to predict fire probability
- **Interactive Dashboard** - Visualize fire risk data with charts and maps
- **Alert System** - Automated notifications for high-risk areas
- **Historical Data Analysis** - Track fire patterns and trends over time
- **User Authentication** - Secure login and user management
- **Responsive Design** - Works seamlessly across all devices

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Context API** for state management
- **CSS3** with modern styling

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests
- **Rate limiting** and security middleware

### Additional Tools
- **Nodemon** for development
- **Git** for version control
- **Vercel** for frontend deployment



## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/immansha/forest-fire.git
   cd forest-fire/BlazeFix/project
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Environment Setup**
   
   Create a `.env` file in the `server` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=9999
   ```

5. **Start the development servers**
   
   **Frontend** (from BlazeFix/project):
   ```bash
   npm run dev
   ```
   
   **Backend** (from BlazeFix/project/server):
   ```bash
   npm run dev
   ```
## 🔧 Configuration

### Frontend Configuration (vite.config.js)
```javascript
export default {
  server: {
    proxy: {
      '/api': 'http://localhost:9999'
    }
  }
}
```

### Backend Configuration
The server runs on port 9999 by default and connects to MongoDB using the connection string in your `.env` file.


## 📈 Performance

- **Frontend**: Optimized with Vite for fast HMR and builds
- **Backend**: Implements rate limiting and efficient database queries
- **Database**: Indexed queries for faster data retrieval






**Happy Coding! 🚀**
