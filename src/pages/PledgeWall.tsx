import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Stars, X } from 'lucide-react';

interface Pledge {
  id: string;
  name: string;
  idea: string;
  x: number;
  y: number;
  size: number;
  brightness: number;
}

interface ModalProps {
  pledge: Pledge;
  onClose: () => void;
}

const PledgeModal: React.FC<ModalProps> = ({ pledge, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 bg-opacity-90 border border-indigo-500 rounded-xl p-6 max-w-lg w-full shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-orbitron">{pledge.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <p className="text-gray-300">{pledge.idea}</p>
      </motion.div>
    </motion.div>
  );
};

const PledgeWall: React.FC = () => {
  const [pledges, setPledges] = useState<Pledge[]>([
    {
      id: '1',
      name: 'Quantum Bharat',
      idea: 'Building quantum secure communication networks for critical infrastructure',
      x: 25,
      y: 30,
      size: 3,
      brightness: 0.9
    },
    {
      id: '2',
      name: 'AgroSpace',
      idea: 'Satellite imaging for precision agriculture to boost farm yields',
      x: 70,
      y: 45,
      size: 2.5,
      brightness: 0.8
    },
    {
      id: '3',
      name: 'BharatEV',
      idea: 'Solar-powered EV charging stations for rural India',
      x: 40,
      y: 60,
      size: 3.2,
      brightness: 1
    },
    {
      id: '4',
      name: 'NeuroVeda',
      idea: 'AI for ancient Ayurvedic knowledge digitization and modern medical research',
      x: 80,
      y: 70,
      size: 2.8,
      brightness: 0.85
    },
    {
      id: '5',
      name: 'DroneGuru',
      idea: 'Developing autonomous drones for disaster response in remote regions',
      x: 55,
      y: 20,
      size: 2.2,
      brightness: 0.75
    }
  ]);

  const [newPledge, setNewPledge] = useState({
    name: '',
    idea: ''
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [selectedPledge, setSelectedPledge] = useState<Pledge | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPledge.name.trim() || !newPledge.idea.trim()) {
      setFormError('Please fill in both fields.');
      return;
    }

    const newPledgeObj: Pledge = {
      id: Date.now().toString(),
      name: newPledge.name,
      idea: newPledge.idea,
      x: 0,
      y: 0,
      size: 0,
      brightness: 1
    };

    setPledges([...pledges, newPledgeObj]);
    setNewPledge({ name: '', idea: '' });
    setFormError(null);

    setTimeout(() => {
      if (galleryRef.current) {
        galleryRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPledge(prev => ({ ...prev, [name]: value }));
    if (formError) setFormError(null);
  };

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
            The Pledge Wall
          </motion.h1>

          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-xl font-orbitron text-accent italic mb-3">
              "Each Thought is a Spark. Together, We Ignite Change."
            </p>
            <p className="text-gray-300">
              Share your deep-tech dream for India. Add your voice to the wall.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              className="card"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-orbitron mb-6 flex items-center gap-2">
                <Stars size={24} className="text-accent" />
                Make Your Pledge
              </h2>

              <form onSubmit={handlePledgeSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-300 mb-2">Startup / Founder Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newPledge.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-white"
                    placeholder="Your name or company name"
                    maxLength={40}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="idea" className="block text-gray-300 mb-2">Your Deep-Tech Commitment</label>
                  <textarea
                    id="idea"
                    name="idea"
                    value={newPledge.idea}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-white min-h-[100px]"
                    placeholder="Describe your innovation or deep-tech idea..."
                    maxLength={200}
                  />
                </div>

                {formError && (
                  <div className="mb-4 p-3 bg-red-900 bg-opacity-30 border border-red-700 rounded-lg text-red-300 text-sm">
                    {formError}
                  </div>
                )}

                <motion.button
                  type="submit"
                  className="btn btn-primary w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add Your Pledge
                </motion.button>
              </form>
            </motion.div>

            <motion.div
              ref={galleryRef}
              className="card"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-orbitron mb-6">Pledge Wall</h2>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {pledges.length > 0 ? (
                  pledges.map((pledge) => (
                    <motion.div
                      key={pledge.id}
                      className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg p-4 cursor-pointer hover:border-accent transition"
                      onClick={() => setSelectedPledge(pledge)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-lg font-semibold text-white mb-1">{pledge.name}</h3>
                      <p className="text-gray-300 text-sm line-clamp-3">{pledge.idea}</p>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-500">No pledges yet. Be the first to make one!</p>
                )}
              </div>

              <p className="mt-4 text-gray-400 text-sm text-center">
                Click on a pledge to view full details
              </p>
            </motion.div>
          </div>

          <motion.div
            className="mt-16 card max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-2xl font-orbitron mb-6 text-center">Join the Movement</h2>

            <p className="text-gray-300 mb-6">
              By adding your pledge, you're joining a nationwide movement of innovators committed to breakthrough technologies. Your pledge represents your commitment to:
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-500 mt-1 flex-shrink-0"></div>
                <p>Solving India's unique challenges through deep technology</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-purple-500 mt-1 flex-shrink-0"></div>
                <p>Building globally competitive products and services born in India</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-green-500 mt-1 flex-shrink-0"></div>
                <p>Collaborating with innovators, researchers, and initiatives</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-yellow-500 mt-1 flex-shrink-0"></div>
                <p>Contributing to India's vision of becoming a global tech leader</p>
              </li>
            </ul>
          </motion.div>
        </div>

        <AnimatePresence>
          {selectedPledge && (
            <PledgeModal
              pledge={selectedPledge}
              onClose={() => setSelectedPledge(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default PledgeWall;
