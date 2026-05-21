import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';

function SignalPage() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 4000);
    return () => clearTimeout(timer1);
  }, []);

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-dvh flex items-center justify-center bg-black"
    >
      <Helmet>
        <title>FIXIETY | Señal</title>
      </Helmet>
      
      <div className="flex flex-col items-center justify-center text-center px-6">
        <AnimatePresence mode="wait">
          {phase === 0 ? (
            <motion.div
              key="unstable"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 1.5 }}
              className="flex flex-col items-center space-y-8 glitch-text"
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase opacity-80">
                Señal inestable
              </h1>
              <p className="text-base md:text-lg tracking-[0.4em] text-muted uppercase">
                Signal unstable
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="transmission"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 2, delay: 0.5 }}
              className="flex flex-col items-center space-y-8"
            >
              <h1 className="text-2xl md:text-4xl font-medium tracking-widest text-white uppercase animate-pulse">
                Transmisión próxima
              </h1>
              <p className="text-sm md:text-base tracking-[0.5em] text-muted uppercase">
                Transmission soon
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
}

export default SignalPage;