import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Flame, 
  Shield, 
  BarChart3, 
  MapPin, 
  AlertTriangle,
  Thermometer,
  Wind,
  Droplets,
  Eye,
  Brain,
  Clock
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Predictions',
      description: 'Advanced machine learning algorithms analyze environmental data to predict fire risks with high accuracy.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Eye,
      title: 'Real-time Monitoring',
      description: 'Continuous monitoring of temperature, humidity, wind speed, and other critical environmental factors.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: MapPin,
      title: 'Interactive Fire Map',
      description: 'Visualize fire risks and incidents on an interactive map with real-time updates and historical data.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: AlertTriangle,
      title: 'Early Warning System',
      description: 'Get instant alerts when fire risk levels increase in your area, enabling proactive measures.',
      color: 'from-fire-500 to-fire-600'
    }
  ];

  const stats = [
    { label: 'Areas Monitored', value: '10,000+', icon: MapPin },
    { label: 'Predictions Made', value: '50,000+', icon: Brain },
    { label: 'Fires Prevented', value: '1,200+', icon: Shield },
    { label: 'Response Time', value: '<5min', icon: Clock }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-fire-50 via-white to-forest-50">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1363876/pexels-photo-1363876.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 bg-fire-100 text-fire-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Flame className="h-4 w-4 animate-fire-flicker" />
                Advanced Forest Fire Prediction
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Protect Our Forests with
                <span className="block bg-gradient-to-r from-fire-600 to-fire-500 bg-clip-text text-transparent">
                  Smart Predictions
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Harness the power of AI and real-time environmental data to predict, prevent, 
                and respond to forest fires before they become disasters.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/prediction"
                className="group bg-gradient-to-r from-fire-600 to-fire-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-fire-700 hover:to-fire-600 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Prediction
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/map"
                className="border-2 border-fire-600 text-fire-600 px-8 py-4 rounded-xl font-semibold hover:bg-fire-600 hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <MapPin className="h-5 w-5" />
                View Fire Map
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-fire-200 rounded-full opacity-20"
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 bg-forest-200 rounded-full opacity-20"
          animate={{ y: [0, 20, 0], rotate: [0, -180, -360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="bg-gradient-to-br from-fire-100 to-fire-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-fire-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-fire-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advanced Fire Prevention Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive system combines cutting-edge technology with environmental science 
              to provide the most accurate fire risk predictions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                    <div className={`bg-gradient-to-r ${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Environmental Factors Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Key Environmental Factors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We monitor critical environmental conditions that contribute to fire risk assessment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Thermometer,
                title: 'Temperature',
                description: 'High temperatures increase fire risk',
                value: '35°C',
                status: 'High Risk',
                color: 'text-danger-600'
              },
              {
                icon: Droplets,
                title: 'Humidity',
                description: 'Low humidity creates dry conditions',
                value: '25%',
                status: 'Medium Risk',
                color: 'text-warning-600'
              },
              {
                icon: Wind,
                title: 'Wind Speed',
                description: 'Strong winds spread fires rapidly',
                value: '15 km/h',
                status: 'Low Risk',
                color: 'text-forest-600'
              }
            ].map((factor, index) => {
              const Icon = factor.icon;
              return (
                <motion.div
                  key={factor.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="h-8 w-8 text-gray-600" />
                    <span className={`text-sm font-semibold ${factor.color}`}>
                      {factor.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{factor.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{factor.description}</p>
                  <div className="text-2xl font-bold text-gray-900">{factor.value}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-fire-600 via-fire-500 to-fire-600 bg-300% animate-gradient-shift">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Protect Our Forests?
            </h2>
            <p className="text-fire-100 text-xl mb-8 max-w-2xl mx-auto">
              Join the fight against forest fires with our advanced prediction system. 
              Every prediction could save thousands of acres and countless lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="bg-white text-fire-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <BarChart3 className="h-5 w-5" />
                View Dashboard
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-fire-600 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}