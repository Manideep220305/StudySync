import React from 'react';
import { motion } from 'framer-motion';

const FadeIn = ({ children, delay = 0, direction = 'up', className = '', fullWidth = false }) => {
  const directions = {
    up: { y: 40, opacity: 0 },
    down: { y: -40, opacity: 0 },
    left: { x: 40, opacity: 0 },
    right: { x: -40, opacity: 0 },
    none: { opacity: 0 },
  };

  return (
    <motion.div
      initial={directions[direction]}
      whileInView={{ y: 0, x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }} // Triggers animation when 100px into view
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }} // Smooth easeOutQuad curve
      className={className}
      style={{ width: fullWidth ? '100%' : 'auto' }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;