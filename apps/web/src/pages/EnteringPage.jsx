import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

function EnteringPage() {
  const navigate = useNavigate();
  const [showReveal, setShowReveal] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowReveal(true);
    }, 600);

    const navTimer = setTimeout(() => {
      navigate('/archivo');
    }, 4200);

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
      className="min-h-dvh flex items-center justify-center bg-black px-6"
    >
      <Helmet>
        <title>FIXIETY | Revelando</title>
      </Helmet>

      {showReveal && (
        <motion.div
          initial={{ opacity: 0, filter: 'blur(14px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="flex flex-col items-center text-center"
        >
          <p className="mb-10 text-sm md:text-base tracking-[0.35em] text-white/35 uppercase">
            FIXIETY
          </p>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white uppercase">
            REVELANDO
          </h1>

          <p className="mt-6 text-sm md:text-base tracking-[0.3em] text-white/35">
            Developing
          </p>

          <div className="mt-12 h-px w-48 overflow-hidden bg-white/10">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.4, ease: 'easeInOut' }}
              className="h-full bg-white/60"
            />
          </div>
        </motion.div>
      )}
    </motion.main>
  );
}

export default EnteringPage;