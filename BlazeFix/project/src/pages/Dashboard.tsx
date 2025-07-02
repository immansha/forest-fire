import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Flame, 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  MapPin, 
  Thermometer,
  Droplets,
  Wind,
  Eye,
  Clock,
  Activity
} from 'lucide-react';

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const riskData = [
    { name: 'Jan', high: 12, medium: 25, low: 63 },
    { name: 'Feb', high: 8, medium: 20, low: 72 },
    { name: 'Mar', high: 15, medium: 30, low: 55 },
    { name: 'Apr', high: 22, medium: 35, low: 43 },
    { name: 'May', high: 28, medium: 40, low: 32 },
    { name: 'Jun', high: 35, medium: 45, low: 20 },
  ];

  const temperatureData = [
    { time: '00:00', temp: 18 },
    { time: '04:00', temp: 16 },
    { time: '08:00', temp: 22 },
    { time: '12:00', temp: 28 },
    { time: '16:00', temp: 32 },
    { time: '20:00', temp: 25 },
  ];

  const riskDistribution = [
    { name: 'Low Risk', value: 45, color: '#22c55e' },
    { name: 'Medium Risk', value: 35, color: '#f59e0b' },
    { name: 'High Risk', value: 20, color: '#ef4444' },
  ];

  const stats = [
    {
      title: 'Active Alerts',
      value: '12',
      change: '+3',
      icon: AlertTriangle,
      color: 'text-danger-600',
      bgColor: 'bg-danger-50',
      borderColor: 'border-danger-200'
    },
    {
      title: 'Areas Monitored',
      value: '1,247',
      change: '+15',
      icon: MapPin,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Predictions Today',
      value: '89',
      change: '+12',
      icon: Activity,
      color: 'text-forest-600',
      bgColor: 'bg-forest-50',
      borderColor: 'border-forest-200'
    },
    {
      title: 'Response Time',
      value: '4.2min',
      change: '-0.8',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      location: 'Yellowstone National Park',
      risk: 'High',
      time: '2 minutes ago',
      temperature: '34°C',
      humidity: '15%'
    },
    {
      id: 2,
      location: 'Sequoia Forest',
      risk: 'Medium',
      time: '15 minutes ago',
      temperature: '28°C',
      humidity: '25%'
    },
    {
      id: 3,
      location: 'Olympic National Forest',
      risk: 'High',
      time: '1 hour ago',
      temperature: '31°C',
      humidity: '18%'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-fire-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Fire Risk Dashboard</h1>
              <p className="text-gray-600">Real-time monitoring and risk assessment</p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <div className="text-sm text-gray-500">Last Updated</div>
              <div className="text-lg font-semibold text-gray-900">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-xl p-6 shadow-lg border ${stat.borderColor} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-forest-600' : 'text-danger-600'}`}>
                      {stat.change} from yesterday
                    </p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-xl`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Risk Levels Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Risk Levels</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="high" stackId="a" fill="#ef4444" name="High Risk" />
                <Bar dataKey="medium" stackId="a" fill="#f59e0b" name="Medium Risk" />
                <Bar dataKey="low" stackId="a" fill="#22c55e" name="Low Risk" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Temperature Trend */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Temperature Trend (24h)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Risk Distribution and Recent Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Risk Distribution Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Risk Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {riskDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      alert.risk === 'High' ? 'bg-danger-100 text-danger-600' : 'bg-warning-100 text-warning-600'
                    }`}>
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{alert.location}</h4>
                      <p className="text-sm text-gray-600">{alert.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      alert.risk === 'High' 
                        ? 'bg-danger-100 text-danger-800' 
                        : 'bg-warning-100 text-warning-800'
                    }`}>
                      {alert.risk} Risk
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {alert.temperature} • {alert.humidity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Environmental Conditions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 bg-white rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Current Environmental Conditions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-fire-50 to-fire-100 rounded-lg">
              <Thermometer className="h-8 w-8 text-fire-600" />
              <div>
                <p className="text-sm text-gray-600">Temperature</p>
                <p className="text-2xl font-bold text-gray-900">32°C</p>
                <p className="text-sm text-fire-600">Above normal</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <Droplets className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Humidity</p>
                <p className="text-2xl font-bold text-gray-900">22%</p>
                <p className="text-sm text-warning-600">Low</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
              <Wind className="h-8 w-8 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Wind Speed</p>
                <p className="text-2xl font-bold text-gray-900">18 km/h</p>
                <p className="text-sm text-forest-600">Moderate</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}