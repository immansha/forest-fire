import React from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Shield, 
  Brain, 
  Users, 
  Target, 
  Award,
  Zap,
  Globe,
  Heart,
  Code,
  Database,
  Cpu
} from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Predictions',
      description: 'Advanced machine learning algorithms analyze environmental data to predict fire risks with unprecedented accuracy.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Zap,
      title: 'Real-time Monitoring',
      description: 'Continuous monitoring of temperature, humidity, wind speed, and other critical environmental factors.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Monitor forest areas worldwide with our comprehensive satellite and ground-based sensor network.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Shield,
      title: 'Early Warning System',
      description: 'Get instant alerts when fire risk levels increase, enabling proactive measures and rapid response.',
      color: 'from-fire-500 to-fire-600'
    }
  ];

  const techStack = [
    { name: 'React.js', description: 'Modern frontend framework', icon: Code },
    { name: 'Node.js', description: 'Backend runtime environment', icon: Cpu },
    { name: 'MongoDB', description: 'NoSQL database', icon: Database },
    { name: 'Express.js', description: 'Web application framework', icon: Code }
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Lead Data Scientist',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'PhD in Environmental Science with 10+ years in climate modeling and fire prediction systems.'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Full Stack Developer',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Expert in MERN stack development with focus on real-time data visualization and mapping.'
    },
    {
      name: 'Dr. Emily Johnson',
      role: 'Forest Ecologist',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Specialist in forest ecosystem dynamics and fire behavior analysis with 15+ years experience.'
    }
  ];

  const stats = [
    { label: 'Forests Monitored', value: '10,000+', icon: Globe },
    { label: 'Predictions Made', value: '50,000+', icon: Brain },
    { label: 'Fires Prevented', value: '1,200+', icon: Shield },
    { label: 'Lives Protected', value: '100,000+', icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-fire-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1363876/pexels-photo-1363876.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-fire-100 text-fire-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Flame className="h-4 w-4 animate-fire-flicker" />
              About FireWatch
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Protecting Forests with
              <span className="block bg-gradient-to-r from-fire-600 to-fire-500 bg-clip-text text-transparent">
                Advanced Technology
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              FireWatch is a cutting-edge forest fire prediction system that combines artificial intelligence, 
              real-time environmental monitoring, and advanced analytics to prevent forest fires before they start.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                Forest fires are one of the most devastating natural disasters, causing billions in damage 
                and threatening countless lives each year. Traditional fire detection methods are reactive, 
                often identifying fires only after they've already begun spreading.
              </p>
              <p className="text-gray-600 mb-6">
                FireWatch changes this paradigm by predicting fire risks before ignition occurs. Our system 
                analyzes environmental conditions in real-time, using machine learning to identify patterns 
                that indicate high fire probability, enabling proactive prevention measures.
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-fire-100 p-3 rounded-full">
                  <Target className="h-6 w-6 text-fire-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Our Goal</h3>
                  <p className="text-gray-600">Prevent 90% of forest fires through early prediction and intervention</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/1363876/pexels-photo-1363876.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Forest protection"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-forest-600" />
                  <span className="font-semibold">1,200+ Fires Prevented</span>
                </div>
              </div>
            </motion.div>
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
              Advanced Technology Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive system combines cutting-edge technology with environmental science 
              to provide the most accurate fire risk predictions available.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
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

      {/* Tech Stack Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built with Modern Technology</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our system is built using the MERN stack, ensuring scalability, performance, and reliability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <Icon className="h-8 w-8 text-fire-600 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">{tech.name}</h3>
                  <p className="text-sm text-gray-600">{tech.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-fire-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Icon className="h-8 w-8 text-fire-200 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-fire-200">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our diverse team of experts combines deep domain knowledge with cutting-edge technology 
              to create the most effective fire prediction system available.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-fire-600 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-fire-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
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
              Join the Fight Against Forest Fires
            </h2>
            <p className="text-fire-100 text-xl mb-8 max-w-2xl mx-auto">
              Help us protect our forests and communities with advanced fire prediction technology. 
              Together, we can prevent disasters before they happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-fire-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <Users className="h-5 w-5" />
                Get Involved
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-fire-600 transition-all duration-300">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}