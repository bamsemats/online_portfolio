import React from 'react';
import { motion, useScroll, useTransform } from "framer-motion";

export default function StaticBG(props) {
  const { scrollYProgress } = useScroll();

  // Map 0 -> 0.25 (first 25% of scroll) to the desired values, and keep them there for the rest (up to 1)
  const left = useTransform(scrollYProgress, [0, 0.25, 1], ["5vw", "6vw", "6vw"]);
  const top = useTransform(scrollYProgress, [0, 0.25, 1], ["12vh", "10vh", "10vh"]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 1], [1, 0.25, 0.25]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 1], [0.1, 0.25, 0.25]);

  return (
    <div className="static-bg">
      <motion.div 
        className="token-1"
        style={{
          left,
          top,
          scale,
          position: 'fixed',
          zIndex: -1,
          fontWeight: 900,
          color: 'var(--token-color)',
          WebkitTextFillColor: 'initial',
          background: 'none',
          opacity,
          fontSize: '6rem',
          transformOrigin: 'left top' // Ensures scaling happens from the corner
        }}
      >
        {`{ ${props.current} }`}
      </motion.div>
    </div>
  );
}
