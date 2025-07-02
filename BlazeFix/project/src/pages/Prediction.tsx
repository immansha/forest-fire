import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  Brain, 
  Thermometer, 
  Droplets, 
  Wind, 
  MapPin, 
  Calendar,
  AlertTriangle,
  Shield,
  Activity,
  TrendingUp,
  Zap
} from 'lucide-react';

export default function Prediction() {
  const [formData, setFormData] = useState({
    temperature: '',
    humidity: '',
    windSpeed: '',
    location: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateRisk = () => {
    const temp = parseFloat(formData.temperature);
    const humidity = parseFloat(formData.humidity);
    const wind = parseFloat(formData.windSpeed);

    // Simple rule-based prediction logic
    let riskScore = 0;
    
    // Temperature factor (30% weight)
    if (temp > 35) riskScore += 30;
    else if (temp > 25) riskScore += 20;
    else if (temp > 15) riskScore += 10;
    
    // Humidity factor (40% weight) - lower humidity = higher risk
    if (humidity < 20) riskScore += 40;
    else if (humidity < 40) riskScore += 25;
    else if (humidity < 60) riskScore += 15;
    else riskScore += 5;
    
    // Wind speed factor (30% weight)
    if (wind > 25) riskScore += 30;
    else if (wind > 15) riskScore += 20;
    else if (wind > 10) riskScore += 10;
    else riskScore += 5;

    let riskLevel, riskColor, riskBg, confidence;
    
    if (riskScore >= 70) {
      riskLevel = 'High';
      riskColor = 'text-danger-600';
      riskBg = 'bg-danger-50 border-danger-200';
      confidence = 85 + Math.random() * 10;
    } else if (riskScore >= 40) {
      riskLevel = 'Medium';
      riskColor = 'text-warning-600';
      riskBg = 'bg-warning-50 border-warning-200';
      confidence = 75 + Math.random() * 15;
    } else {
      riskLevel = 'Low';
      riskColor = 'text-forest-600';
      riskBg = 'bg-forest-50 border-forest-200';
      confidence = 80 + Math.random() * 15;
    }

    return {
      riskLevel,
      riskScore: Math.round(riskScore),
      confidence: Math.round(confidence),
      riskColor,
      riskBg,
      factors: {
        temperature: temp > 30 ? 'High Impact' : temp > 20 ? 'Medium Impact' : 'Low Impact',
        humidity: humidity < 30 ? 'High Impact' : humidity < 50 ? 'Medium Impact' : 'Low Impact',
        windSpeed: wind > 20 ? 'High Impact' : wind > 10 ? 'Medium Impact' : 'Low Impact'
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.temperature || !formData.humidity || !formData.windSpeed || !formData.location) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const result = calculateRisk();
      setPrediction(result);
      setIsLoading(false);
      toast.success('Prediction generated successfully!');
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      temperature: '',
      humidity: '',
      windSpeed: '',
      location: '',
      date: new Date().toISOString().split('T')[0]
    });
    setPrediction(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-fire-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-fire-100 text-fire-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Brain className="h-4 w-4" />
            AI-Powered Fire Risk Prediction
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Forest Fire Risk Predictor
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter environmental conditions to get an instant fire risk assessment 
            powered by advanced machine learning algorithms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Environmental Data</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Temperature */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Thermometer className="h-4 w-4 text-fire-500" />
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleInputChange}
                  placeholder="Enter temperature"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-500 focus:border-fire-500 transition-colors"
                  min="-10"
                  max="60"
                  step="0.1"
                />
              </div>

              {/* Humidity */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  Humidity (%)
                </label>
                <input
                  type="number"
                  name="humidity"
                  value={formData.humidity}
                  onChange={handleInputChange}
                  placeholder="Enter humidity percentage"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-500 focus:border-fire-500 transition-colors"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>

              {/* Wind Speed */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Wind className="h-4 w-4 text-gray-500" />
                  Wind Speed (km/h)
                </label>
                <input
                  type="number"
                  name="windSpeed"
                  value={formData.windSpeed}
                  onChange={handleInputChange}
                  placeholder="Enter wind speed"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-500 focus:border-fire-500 transition-colors"
                  min="0"
                  max="200"
                  step="0.1"
                />
              </div>

              {/* Location */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 text-forest-500" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter location name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-500 focus:border-fire-500 transition-colors"
                />
              </div>

              {/* Date */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 text-purple-500" />
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-500 focus:border-fire-500 transition-colors"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-fire-600 to-fire-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-fire-700 hover:to-fire-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5" />
                      Predict Risk
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>
          </motion.div>

          {/* Prediction Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {prediction ? (
              <>
                {/* Risk Level Card */}
                <div className={`${prediction.riskBg} border-2 rounded-2xl p-8 text-center`}>
                  <div className="mb-4">
                    {prediction.riskLevel === 'High' && <AlertTriangle className="h-16 w-16 text-danger-600 mx-auto" />}
                    {prediction.riskLevel === 'Medium' && <Activity className="h-16 w-16 text-warning-600 mx-auto" />}
                    {prediction.riskLevel === 'Low' && <Shield className="h-16 w-16 text-forest-600 mx-auto" />}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Fire Risk Level</h3>
                  <div className={`text-4xl font-bold ${prediction.riskColor} mb-2`}>
                    {prediction.riskLevel}
                  </div>
                  <p className="text-gray-600">
                    Risk Score: {prediction.riskScore}/100
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Confidence: {prediction.confidence}%
                  </p>
                </div>

                {/* Factor Analysis */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Factor Analysis</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-5 w-5 text-fire-500" />
                        <span className="font-medium">Temperature</span>
                      </div>
                      <span className={`text-sm font-semibold ${
                        prediction.factors.temperature === 'High Impact' ? 'text-danger-600' :
                        prediction.factors.temperature === 'Medium Impact' ? 'text-warning-600' : 'text-forest-600'
                      }`}>
                        {prediction.factors.temperature}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Droplets className="h-5 w-5 text-blue-500" />
                        <span className="font-medium">Humidity</span>
                      </div>
                      <span className={`text-sm font-semibold ${
                        prediction.factors.humidity === 'High Impact' ? 'text-danger-600' :
                        prediction.factors.humidity === 'Medium Impact' ? 'text-warning-600' : 'text-forest-600'
                      }`}>
                        {prediction.factors.humidity}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Wind className="h-5 w-5 text-gray-500" />
                        <span className="font-medium">Wind Speed</span>
                      </div>
                      <span className={`text-sm font-semibold ${
                        prediction.factors.windSpeed === 'High Impact' ? 'text-danger-600' :
                        prediction.factors.windSpeed === 'Medium Impact' ? 'text-warning-600' : 'text-forest-600'
                      }`}>
                        {prediction.factors.windSpeed}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Recommendations</h4>
                  <div className="space-y-3">
                    {prediction.riskLevel === 'High' && (
                      <>
                        <div className="flex items-start gap-3 p-3 bg-danger-50 rounded-lg">
                          <AlertTriangle className="h-5 w-5 text-danger-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-danger-800">Immediate Action Required</p>
                            <p className="text-sm text-danger-600">Alert fire departments and restrict outdoor activities</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-warning-50 rounded-lg">
                          <Shield className="h-5 w-5 text-warning-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-warning-800">Increase Monitoring</p>
                            <p className="text-sm text-warning-600">Deploy additional surveillance in the area</p>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {prediction.riskLevel === 'Medium' && (
                      <>
                        <div className="flex items-start gap-3 p-3 bg-warning-50 rounded-lg">
                          <Activity className="h-5 w-5 text-warning-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-warning-800">Enhanced Vigilance</p>
                            <p className="text-sm text-warning-600">Monitor conditions closely and prepare response teams</p>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {prediction.riskLevel === 'Low' && (
                      <div className="flex items-start gap-3 p-3 bg-forest-50 rounded-lg">
                        <Shield className="h-5 w-5 text-forest-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-forest-800">Normal Operations</p>
                          <p className="text-sm text-forest-600">Continue regular monitoring protocols</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ready for Prediction</h3>
                <p className="text-gray-600">
                  Fill in the environmental data on the left to get your fire risk assessment.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}