import React from 'react';
import { motion } from 'motion/react';

const LoadingSplash: React.FC = () => (
  <motion.div
    key="loader"
    exit={{ opacity: 0 }}
    transition={{ duration: 0.15 }}
    className="min-h-screen bg-surface-deep flex flex-col items-center justify-center p-12 lg:p-24 overflow-hidden"
  >
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#ff007f_0%,transparent_60%)]"></div>
    </div>
    <div className="z-10 w-full text-center text-7xl lg:text-9xl font-black text-[#ff007f] tracking-tighter leading-[0.8] animate-pulse uppercase">
      IS IT<br />A<br />BUY?
    </div>
  </motion.div>
);

export default LoadingSplash;
