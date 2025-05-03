import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import StarField from '../components/StarField';

const Home: React.FC = () => {
  return (
    <PageTransition>
      <div className="relative min-h-screen w-full overflow-hidden">
        <StarField starCount={100} />

        <div className="container mx-auto px-4 pt-16 md:pt-24 lg:pt-32 relative z-10">
          <div className="flex flex-col items-center justify-center text-center min-h-[80vh]">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-7xl font-orbitron font-bold mb-6 glow bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-accent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Dear Builders of Bharat,<br />the Future Is Yours.
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl mb-12 max-w-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              From Bharat to the World: Build Rockets of Innovation.
            </motion.p>
          </div>
          
          <div className="scroll-indicator">
            <ChevronDown size={24} className="text-white opacity-70" />
            <span className="text-sm mt-2 opacity-70">Scroll to Explore</span>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-xl font-orbitron mb-4 text-accent">Innovation Hub</h3>
              <p className="text-gray-300">
                Explore cutting-edge technologies where India has strategic advantages and witness how they're shaping the future of the global tech landscape.
              </p>
            </motion.div>
            
            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-xl font-orbitron mb-4 text-blue-400">Path to Success</h3>
              <p className="text-gray-300">
                Navigate through common challenges faced by Indian startups and discover proven solutions and support systems that help overcome obstacles.
              </p>
            </motion.div>
            
            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-xl font-orbitron mb-4 text-green-400">Global Impact</h3>
              <p className="text-gray-300">
                See how India is competing on the world stage in deep tech sectors and making its mark through groundbreaking innovations and collaborations.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;