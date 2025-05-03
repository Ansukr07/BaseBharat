import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import PageTransition from '../components/PageTransition';
import { Globe } from 'lucide-react';

type LeaderboardCategory = 'ev' | 'quantum' | 'space' | 'ai';

interface CountryData {
  name: string;
  color: string;
  ev: number;
  evDescription: string;
  quantum: number;
  quantumDescription: string;
  space: number;
  spaceDescription: string;
  ai: number;
  aiDescription: string;
}

const GlobalLeaderboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<LeaderboardCategory>('ev');

  const categories = [
    { id: 'ev', name: 'EV Market Share', icon: '🚗' },
    { id: 'quantum', name: 'Quantum Research Papers', icon: '⚛️' },
    { id: 'space', name: 'Space Launches', icon: '🚀' },
    { id: 'ai', name: 'AI Startups Funded', icon: '🧠' },
  ];

  const countryData: CountryData[] = [
    {
      name: 'India',
      color: '#ff9f40',
      ev: 38,
      evDescription: '38% annual growth rate in EV market with 2-wheeler segment leading the transition',
      quantum: 48,
      quantumDescription: '48% increase in quantum computing research papers in the last 3 years',
      space: 27,
      spaceDescription: '27 successful satellite launches in 2024, up from 19 in 2023',
      ai: 150,
      aiDescription: '150+ AI startups received funding exceeding $1M in 2024'
    },
    {
      name: 'USA',
      color: '#4795ec',
      ev: 47,
      evDescription: '47% annual growth rate in EV adoption with robust charging infrastructure',
      quantum: 92,
      quantumDescription: '92% of global quantum computing patents, dominated by tech giants',
      space: 45,
      spaceDescription: '45 commercial launches in 2024 with SpaceX leading the industry',
      ai: 380,
      aiDescription: '380+ AI startups funded with focus on enterprise solutions'
    },
    {
      name: 'China',
      color: '#f44336',
      ev: 51,
      evDescription: '51% of global EV production with strong government mandates',
      quantum: 65,
      quantumDescription: '65% increase in quantum research funding with focus on quantum communications',
      space: 38,
      spaceDescription: '38 launches with emphasis on lunar and Mars exploration programs',
      ai: 310,
      aiDescription: '310 AI startups funded with strong focus on surveillance and automation applications'
    },
    {
      name: 'EU',
      color: '#4caf50',
      ev: 42,
      evDescription: '42% annual growth with strong regulatory incentives for EV adoption',
      quantum: 76,
      quantumDescription: '76 research centers focused on quantum technologies across member states',
      space: 22,
      spaceDescription: '22 launches through Arianespace with focus on climate and communication satellites',
      ai: 220,
      aiDescription: '220 AI startups funded with emphasis on ethical AI frameworks'
    }
  ];

  const getCategoryDescription = (country: CountryData) => {
    switch (selectedCategory) {
      case 'ev': return country.evDescription;
      case 'quantum': return country.quantumDescription;
      case 'space': return country.spaceDescription;
      case 'ai': return country.aiDescription;
    }
  };

  const chartData = countryData.map(country => ({
    name: country.name,
    value: country[selectedCategory],
    color: country.color,
    description: getCategoryDescription(country)
  }));

  const selectedCategoryInfo = categories.find(cat => cat.id === selectedCategory);

  return (
    <PageTransition>
      <div className="min-h-screen py-12 relative">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-3xl md:text-4xl font-orbitron text-center mb-6 mt-6 glow"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Global Tech Leaderboard
          </motion.h1>
          
          <motion.div
            className="flex items-center justify-center mb-12 gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Globe size={24} className="text-accent" />
            <p className="text-center text-lg text-gray-300">
              How India compares globally in Deep Tech innovation
            </p>
          </motion.div>
          
          <div className="bg-gray-900 bg-opacity-50 border border-gray-800 rounded-xl p-6 md:p-8 mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  className={`py-3 px-4 rounded-lg border transition-all duration-300 text-center ${
                    selectedCategory === category.id
                      ? 'border-accent bg-accent bg-opacity-20 text-white'
                      : 'border-gray-700 bg-gray-800 bg-opacity-50 text-gray-300 hover:border-gray-500'
                  }`}
                  onClick={() => setSelectedCategory(category.id as LeaderboardCategory)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="block text-xl mb-1">{category.icon}</span>
                  <span className="text-sm font-medium">{category.name}</span>
                </motion.button>
              ))}
            </div>
            
            <motion.div
              key={selectedCategory}
              className="w-full h-[350px] md:h-[400px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                  <XAxis dataKey="name" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(20, 20, 40, 0.9)',
                      borderColor: '#555',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name={selectedCategoryInfo?.name || ''} 
                    isAnimationActive={true}
                    animationDuration={1000}
                    animationEasing="ease-out"
                  >
                    {chartData.map((entry, index) => (
                      <motion.rect 
                        key={`bar-${index}`} 
                        fill={entry.color}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {chartData.map((country, index) => (
              <motion.div
                key={country.name}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: country.color }}></div>
                  <h3 className="font-orbitron text-lg">{country.name}</h3>
                </div>
                <p className="text-gray-300 text-sm">{country.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">{selectedCategoryInfo?.name}:</span>
                    <span className="font-medium">{country.value}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <p className="text-sm text-gray-400">
              Data is based on 2024-2025 industry reports and may vary by source. Metrics represent either absolute values or growth percentages depending on category.
            </p>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default GlobalLeaderboard;