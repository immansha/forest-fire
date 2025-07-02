import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { 
  Flame, 
  AlertTriangle, 
  MapPin, 
  Filter,
  Eye,
  Layers,
  Thermometer,
  Wind,
  Droplets
} from 'lucide-react';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function Map() {
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [mapCenter] = useState([39.8283, -98.5795]); // Center of USA

  // Mock fire incident data
  const fireIncidents = [
    {
      id: 1,
      lat: 40.7128,
      lng: -74.0060,
      location: 'New York Forest Reserve',
      riskLevel: 'High',
      temperature: 34,
      humidity: 15,
      windSpeed: 22,
      lastUpdated: '2 minutes ago',
      status: 'Active Alert'
    },
    {
      id: 2,
      lat: 34.0522,
      lng: -118.2437,
      location: 'Los Angeles National Forest',
      riskLevel: 'Medium',
      temperature: 28,
      humidity: 35,
      windSpeed: 15,
      lastUpdated: '15 minutes ago',
      status: 'Monitoring'
    },
    {
      id: 3,
      lat: 41.8781,
      lng: -87.6298,
      location: 'Chicago Forest Preserve',
      riskLevel: 'Low',
      temperature: 22,
      humidity: 65,
      windSpeed: 8,
      lastUpdated: '1 hour ago',
      status: 'Normal'
    },
    {
      id: 4,
      lat: 29.7604,
      lng: -95.3698,
      location: 'Houston Pine Forest',
      riskLevel: 'High',
      temperature: 36,
      humidity: 12,
      windSpeed: 25,
      lastUpdated: '5 minutes ago',
      status: 'Critical Alert'
    },
    {
      id: 5,
      lat: 33.4484,
      lng: -112.0740,
      location: 'Phoenix Desert Reserve',
      riskLevel: 'Medium',
      temperature: 31,
      humidity: 28,
      windSpeed: 18,
      lastUpdated: '30 minutes ago',
      status: 'Elevated Risk'
    }
  ];

  const filteredIncidents = selectedRiskLevel === 'all' 
    ? fireIncidents 
    : fireIncidents.filter(incident => incident.riskLevel.toLowerCase() === selectedRiskLevel);

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const createCustomIcon = (riskLevel) => {
    const color = getRiskColor(riskLevel);
    return L.divIcon({
      html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [20, 20],
      className: 'custom-marker'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Fire Risk Map</h1>
              <p className="text-gray-600">Real-time visualization of forest fire risks and incidents</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-3 h-3 bg-danger-500 rounded-full"></div>
                <span>High Risk</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-3 h-3 bg-warning-500 rounded-full"></div>
                <span>Medium Risk</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-3 h-3 bg-forest-500 rounded-full"></div>
                <span>Low Risk</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-900">Filter by Risk Level:</span>
              </div>
              <select
                value={selectedRiskLevel}
                onChange={(e) => setSelectedRiskLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-500 focus:border-fire-500"
              >
                <option value="all">All Levels</option>
                <option value="high">High Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="low">Low Risk</option>
              </select>
            </div>
            
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showHeatmap}
                  onChange={(e) => setShowHeatmap(e.target.checked)}
                  className="text-fire-600 focus:ring-fire-500"
                />
                <span className="text-sm font-medium text-gray-700">Show Heat Zones</span>
              </label>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-fire-100 text-fire-700 rounded-lg hover:bg-fire-200 transition-colors">
                <Layers className="h-4 w-4" />
                Layers
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="h-[600px] relative">
              <MapContainer
                center={mapCenter}
                zoom={4}
                style={{ height: '100%', width: '100%' }}
                className="rounded-xl"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {filteredIncidents.map((incident) => (
                  <React.Fragment key={incident.id}>
                    <Marker
                      position={[incident.lat, incident.lng]}
                      icon={createCustomIcon(incident.riskLevel)}
                    >
                      <Popup>
                        <div className="p-2 min-w-[200px]">
                          <h3 className="font-bold text-gray-900 mb-2">{incident.location}</h3>
                          <div className="space-y-2">
                            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              incident.riskLevel === 'High' 
                                ? 'bg-danger-100 text-danger-800' 
                                : incident.riskLevel === 'Medium'
                                ? 'bg-warning-100 text-warning-800'
                                : 'bg-forest-100 text-forest-800'
                            }`}>
                              {incident.riskLevel} Risk
                            </div>
                            <div className="text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Thermometer className="h-3 w-3" />
                                {incident.temperature}°C
                              </div>
                              <div className="flex items-center gap-1">
                                <Droplets className="h-3 w-3" />
                                {incident.humidity}%
                              </div>
                              <div className="flex items-center gap-1">
                                <Wind className="h-3 w-3" />
                                {incident.windSpeed} km/h
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">
                              Updated: {incident.lastUpdated}
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                    
                    {showHeatmap && (
                      <Circle
                        center={[incident.lat, incident.lng]}
                        radius={50000}
                        fillColor={getRiskColor(incident.riskLevel)}
                        fillOpacity={0.1}
                        stroke={false}
                      />
                    )}
                  </React.Fragment>
                ))}
              </MapContainer>
            </div>
          </motion.div>

          {/* Incident List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Active Incidents</h3>
              <div className="space-y-4">
                {filteredIncidents.map((incident) => (
                  <div
                    key={incident.id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm">{incident.location}</h4>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        incident.riskLevel === 'High' 
                          ? 'bg-danger-100 text-danger-800' 
                          : incident.riskLevel === 'Medium'
                          ? 'bg-warning-100 text-warning-800'
                          : 'bg-forest-100 text-forest-800'
                      }`}>
                        {incident.riskLevel}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Thermometer className="h-3 w-3" />
                        {incident.temperature}°C
                      </div>
                      <div className="flex items-center gap-1">
                        <Droplets className="h-3 w-3" />
                        {incident.humidity}%
                      </div>
                      <div className="flex items-center gap-1">
                        <Wind className="h-3 w-3" />
                        {incident.windSpeed} km/h
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{incident.lastUpdated}</span>
                      <span className={`font-medium ${
                        incident.status.includes('Critical') || incident.status.includes('Active')
                          ? 'text-danger-600'
                          : incident.status.includes('Elevated')
                          ? 'text-warning-600'
                          : 'text-forest-600'
                      }`}>
                        {incident.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Incidents</span>
                  <span className="font-bold text-gray-900">{fireIncidents.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">High Risk Areas</span>
                  <span className="font-bold text-danger-600">
                    {fireIncidents.filter(i => i.riskLevel === 'High').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Medium Risk Areas</span>
                  <span className="font-bold text-warning-600">
                    {fireIncidents.filter(i => i.riskLevel === 'Medium').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Low Risk Areas</span>
                  <span className="font-bold text-forest-600">
                    {fireIncidents.filter(i => i.riskLevel === 'Low').length}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}