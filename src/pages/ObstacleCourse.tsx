import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PageTransition from '../components/PageTransition';
import { ShieldAlert, CheckCircle, ArrowDown } from 'lucide-react';

interface Obstacle {
  id: string;
  title: string;
  description: string;
  solution: string;
  solutionTitle: string;
}

const ObstacleCourse: React.FC = () => {
  const obstacles: Obstacle[] = [
    {
      id: 'funding',
      title: 'Funding Gaps',
      description: 'Early-stage deep tech startups in India face challenges securing capital due to longer development cycles and higher risk profiles compared to software startups.',
      solutionTitle: 'PLI Schemes & Venture Funding',
      solution: 'Government Production Linked Incentive (PLI) schemes offer $26 billion across tech sectors. Additionally, dedicated deep tech venture funds like Bharat Innovation Fund and specialized accelerators are emerging to bridge early funding gaps.'
    },
    {
      id: 'talent',
      title: 'Brain Drain',
      description: 'India produces exceptional technical talent, but many top engineers and researchers move abroad for better opportunities and compensation.',
      solutionTitle: 'Research Incentives & Returnship Programs',
      solution: 'Initiatives like the Startup India Seed Fund, NIDHI programs, and corporate-backed innovation labs provide researchers with grants to commercialize their work. Returnship programs and improved compensation structures are bringing back talent from abroad.'
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure Challenges',
      description: 'Specialized facilities, testing infrastructure, and manufacturing capabilities necessary for hardware development are limited compared to software resources.',
      solutionTitle: 'ISRO Collaborations & Tech Parks',
      solution: 'ISRO\'s technology transfer program has opened up aerospace technologies to startups. New specialized hardware incubators like Maker Village and hardware-focused technology parks provide testing facilities, prototyping tools, and manufacturing support.'
    },
    {
      id: 'regulatory',
      title: 'Regulatory Hurdles',
      description: 'Lengthy compliance processes, certifications, and unclear regulatory frameworks slow down innovation, especially in highly regulated sectors.',
      solutionTitle: 'Regulatory Sandboxes',
      solution: 'Regulatory sandboxes by RBI, SEBI, and IRDAI allow controlled testing of innovations. New streamlined approval processes for drones, space technologies, and healthtech are reducing time-to-market for regulated products.'
    },
    {
      id: 'market',
      title: 'Market Access Barriers',
      description: 'Deep tech products often require significant customer education, face longer sales cycles, and struggle with early adoption in conservative enterprise markets.',
      solutionTitle: 'Government Procurement Channels',
      solution: 'The Government e-Marketplace (GeM) now has a dedicated Startup Runway section for procurement from startups. Defense and space sectors have opened up procurement channels for private innovation through iDEX and IN-SPACe initiatives.'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen py-12 relative">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-3xl md:text-4xl font-orbitron text-center mb-16 mt-6 glow"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Navigate the Obstacles
          </motion.h1>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-gray-300 mb-16">
              Every innovation journey faces challenges. Scroll down to discover how India's builders overcome common obstacles in the deep tech ecosystem.
            </p>
            
            <div className="space-y-24 relative">
              {/* Central line connector */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-gray-600 to-transparent transform -translate-x-1/2 z-0"></div>
              
              {obstacles.map((obstacle, index) => (
                <ObstacleItem key={obstacle.id} obstacle={obstacle} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

interface ObstacleItemProps {
  obstacle: Obstacle;
  index: number;
}

const ObstacleItem: React.FC<ObstacleItemProps> = ({ obstacle, index }) => {
  const [showSolution, setShowSolution] = useState(false);
  const [obstacleRef, obstacleInView] = useInView({
    threshold: 0.6,
    triggerOnce: false,
  });
  
  const [solutionRef, solutionInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  useEffect(() => {
    if (obstacleInView) {
      const timer = setTimeout(() => {
        setShowSolution(true);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [obstacleInView]);
  
  const isEven = index % 2 === 0;
  
  return (
    <div ref={obstacleRef} className="relative">
      <motion.div 
        className={`obstacle ${obstacleInView ? 'active' : ''}`}
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={obstacleInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-red-900 bg-opacity-30">
            <ShieldAlert size={24} className="text-red-400" />
          </div>
          <div>
            <h3 className="text-xl font-orbitron mb-2">{obstacle.title}</h3>
            <p className="text-gray-300">{obstacle.description}</p>
            
            {showSolution && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 flex justify-center"
              >
                <ArrowDown size={24} className="text-accent animate-bounce" />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
      
      {showSolution && (
        <motion.div 
          ref={solutionRef}
          className={`solution ml-12 ${solutionInView ? 'visible' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={solutionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-green-900 bg-opacity-30">
              <CheckCircle size={24} className="text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-orbitron mb-2">{obstacle.solutionTitle}</h3>
              <p className="text-gray-300">{obstacle.solution}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ObstacleCourse;