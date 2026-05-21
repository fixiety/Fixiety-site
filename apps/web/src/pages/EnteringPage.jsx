import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

function EnteringPage() {
  const navigate = useNavigate();
  const [showSignal, setShowSignal] = useState(false);

  useEffect(() => {
    // Show signal text after a brief delay
    const showTimer = setTimeout(() => {
      setShowSignal(true);
    }, 1000);

    // Auto-navigate to /sistema after a few seconds
    const navTimer = setTimeout(() => {
      navigate('/sistema');
    }, 4500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-dvh flex items-center justify-center bg-black"
    >
      <Helmet>
        <title>FIXIETY | Señal Detectada</title>
      </Helmet>
      
      <div className="flex flex-col items-center justify-center text-center">
        {showSignal && (
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex flex-col items-center space-y-6 glitch-text"
          >
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white uppercase">
              Señal detectada
            </h1>
            <p className="text-sm md:text-base tracking-[0.3em] text-muted uppercase">
              Signal detected
            </p>
          </motion.div>
        )}
      </div>
    </motion.main>
  );
}

export default EnteringPage;