import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiSparkles } from "react-icons/hi2";

export default function RandomThemeWheel({ onRandomize }) {
  const [rotation, setRotation] = useState(0);

  const handleClick = () => {
    // Spin at least one full circle plus some random offset
    const newRotation = rotation + 360 + Math.floor(Math.random() * 360);
    setRotation(newRotation);
    onRandomize();
  };

  return (
    <div className="random-wheel-container" style={{ display: 'flex', alignItems: 'center' }}>
      <motion.button
        className="theme-cycle-button"
        style={{
          background: 'conic-gradient(from 0deg, #ff0000, #ff8000, #ffff00, #00ff00, #00ffff, #0000ff, #8000ff, #ff00ff, #ff0000)',
          border: 'none',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          marginLeft: '8px'
        }}
        onClick={handleClick}
        animate={{ rotate: rotation }}
        transition={{ 
          type: "spring", 
          stiffness: 60, 
          damping: 15,
          mass: 1
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Spin for a Random Theme!"
      >
        <motion.div
           animate={{ rotate: -rotation }} // Counter-rotate icon so it stays upright
           transition={{ type: "spring", stiffness: 60, damping: 15 }}
        >
          <HiSparkles size={14} style={{ color: 'white', filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))' }} />
        </motion.div>
      </motion.button>
    </div>
  );
}
