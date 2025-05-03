import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Layout from './components/Layout';
import Home from './pages/Home';
import RocketBuilder from './pages/RocketBuilder';
import ObstacleCourse from './pages/ObstacleCourse';
import GlobalLeaderboard from './pages/GlobalLeaderboard';
import PledgeWall from './pages/PledgeWall';

function App() {
  return (
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
           
            <Route path="/obstacle-course" element={<ObstacleCourse />} />
            <Route path="/global-leaderboard" element={<GlobalLeaderboard />} />
            <Route path="/pledge-wall" element={<PledgeWall />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>
  );
}

export default App;