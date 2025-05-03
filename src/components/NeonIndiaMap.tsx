import React from 'react';
import { motion } from 'framer-motion';

const NeonIndiaMap: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="w-32 h-32 mx-auto mb-8"
    >
      <svg
        viewBox="0 0 900 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full india-map"
      >
        <path
          d="M630 40C630 40 645 65 650 90C655 115 640 130 640 130L625 150L605 165L580 175L570 190L575 210L590 225L605 245L615 270L625 290L640 305L660 315L680 330L695 350L705 375L710 400L705 425L695 445L680 460L660 470L645 485L635 505L630 530L635 555L645 575L660 590L680 600L695 615L705 635L710 660L705 685L695 705L680 720L660 730L645 745L635 765L630 790L635 815L645 835L660 850L680 860L695 875L705 895L710 920L705 945L695 965L680 980L660 990L640 995L615 997L590 995L570 990L550 980L535 965L525 945L520 920L525 895L535 875L550 860L570 850L585 835L595 815L600 790L595 765L585 745L570 730L550 720L535 705L525 685L520 660L525 635L535 615L550 600L570 590L585 575L595 555L600 530L595 505L585 485L570 470L550 460L535 445L525 425L520 400L525 375L535 350L550 330L570 315L585 290L595 270L600 245L595 225L585 190L570 175L550 165L535 150L525 130L520 105L525 80L535 60L550 45L570 35L590 30L615 32L630 40Z"
          fill="url(#india-gradient)"
          stroke="rgba(147, 51, 234, 0.5)"
          strokeWidth="2"
        />
        <defs>
          <linearGradient id="india-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
            <stop offset="50%" stopColor="rgba(99, 102, 241, 0.2)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.2)" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default NeonIndiaMap;