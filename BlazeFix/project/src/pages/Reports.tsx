import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  FileText, 
  Download, 
  Filter, 
  Calendar,
  MapPin,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Eye,
  Search
} from 'lucide-react';

export default function Reports() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('week');

  const reports = [
    {
      id: 1,
      title: 'Yellowstone Fire Risk Assessment',
      location: 'Yellowstone National Park',
      date: new Date('2024-01-15'),
      riskLevel: 'High',
      status: 'Critical',
      type: 'Risk Assessment',
      description: 'Comprehensive analysis of current fire conditions and risk factors.',
      temperature: 34,
      humidity: 15,
      windSpeed: 22,
      predictions: 'High probability of fire ignition within 48 hours'
    },
    {
      id: 2,
      title: 'Weekly Forest Monitoring Report',
      location: 'Pacific Northwest Region',
      date: new Date('2024-01-14'),
      riskLevel: 'Medium',
      status: 'Monitoring',
      type: 'Weekly Report',
      description: 'Regular monitoring report covering multiple forest areas.',
      temperature: 28,
      humidity: 35,
      windSpeed: 15,
      predictions: 'Moderate risk conditions expected to continue'
    },
    {
      id: 3,
      title: 'Sequoia Forest Analysis',
      location: 'Sequoia National Forest',
      date: new Date('2024-01-13'),
      riskLevel: 'Low',
      status: 'Normal',
      type: 'Analysis Report',
      description: 'Detailed environmental analysis and risk evaluation.',
      temperature: 22,
      humidity: 65,
      windSpeed: 8,
      predictions: 'Low risk conditions with favorable weather patterns'
    },
    {
      id: 4,
      title: 'Emergency Response Report',
      location: 'Colorado Rockies',
      date: new Date('2024-01-12'),
      riskLevel: 'High',
      status: 'Resolved',
      type: 'Emergency Report',
      description: 'Post-incident analysis and response effectiveness review.',
      temperature: 36,
      humidity: 12,
      windSpeed: 25,
      predictions: 'Immediate action prevented major fire outbreak'
    },
    {
      id: 5,
      title: 'Monthly Trend Analysis',
      location: 'California Central Valley',
      date: new Date('2024-01-10'),
      riskLevel: 'Medium',
      status: 'Completed',
      type: 'Trend Analysis',
      description: 'Monthly analysis of fire risk trends and patterns.',
      temperature: 31,
      humidity: 28,
      windSpeed: 18,
      predictions: 'Seasonal risk patterns align with historical data'
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesFilter = selectedFilter === 'all' || report.riskLevel.toLowerCase() === selectedFilter;
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'High': return 'text-danger-600 bg-danger-50 border-danger-200';
      case 'Medium': return 'text-warning-600 bg-warning-50 border-warning-200';
      case 'Low': return 'text-forest-600 bg-forest-50 border-forest-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Critical': return 'text-danger-600 bg-danger-100';
      case 'Monitoring': return 'text-warning-600 bg-warning-100';
      case 'Normal': return 'text-forest-600 bg-forest-100';
      case 'Resolved': return 'text-blue-600 bg-blue-100';
      case 'Completed': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fire Risk Reports</h1>
          <p className="text-gray-600">Comprehensive reports and analysis of forest fire risks</p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-500 focus:border-fire-500 w-64"
                />
              </div>

              {/* Risk Level Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-500 focus:border-fire-500"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="high">High Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="low">Low Risk</option>
                </select>
              </div>

              {/* Date Range */}
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-600" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-500 focus:border-fire-500"
                >
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="quarter">Last Quarter</option>
                  <option value="year">Last Year</option>
                </select>
              </div>
            </div>

            <button className="flex items-center gap-2 bg-fire-600 text-white px-6 py-2 rounded-lg hover:bg-fire-700 transition-colors">
              <Download className="h-4 w-4" />
              Export All
            </button>
          </div>
        </motion.div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-fire-100 p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-fire-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{report.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <MapPin className="h-4 w-4" />
                        {report.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(report.riskLevel)}`}>
                      {report.riskLevel} Risk
                    </div>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(report.status)}`}>
                      {report.status}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4">{report.description}</p>

                {/* Environmental Data */}
                <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Temperature</div>
                    <div className="font-bold text-gray-900">{report.temperature}°C</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Humidity</div>
                    <div className="font-bold text-gray-900">{report.humidity}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Wind Speed</div>
                    <div className="font-bold text-gray-900">{report.windSpeed} km/h</div>
                  </div>
                </div>

                {/* Predictions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">AI Predictions</span>
                  </div>
                  <p className="text-sm text-blue-700">{report.predictions}</p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    {format(report.date, 'MMM dd, yyyy')}
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-fire-600 hover:text-fire-700 text-sm font-medium">
                      <Eye className="h-4 w-4" />
                      View Details
                    </button>
                    <button className="flex items-center gap-1 text-gray-600 hover:text-gray-700 text-sm font-medium">
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Report Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-fire-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
                <FileText className="h-6 w-6 text-fire-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{reports.length}</div>
              <div className="text-sm text-gray-600">Total Reports</div>
            </div>
            
            <div className="text-center">
              <div className="bg-danger-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
                <AlertTriangle className="h-6 w-6 text-danger-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {reports.filter(r => r.riskLevel === 'High').length}
              </div>
              <div className="text-sm text-gray-600">High Risk Reports</div>
            </div>
            
            <div className="text-center">
              <div className="bg-warning-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
                <BarChart3 className="h-6 w-6 text-warning-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {reports.filter(r => r.riskLevel === 'Medium').length}
              </div>
              <div className="text-sm text-gray-600">Medium Risk Reports</div>
            </div>
            
            <div className="text-center">
              <div className="bg-forest-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="h-6 w-6 text-forest-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {reports.filter(r => r.status === 'Completed' || r.status === 'Resolved').length}
              </div>
              <div className="text-sm text-gray-600">Completed Reports</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}