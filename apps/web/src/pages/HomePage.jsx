import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

function HomePage() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="relative min-h-[160vh] overflow-hidden bg-black"
    >
      <Helmet>
        <title>FIXIETY | Identidad</title>
        <meta name="description" content="No son solo bicicletas. Es identidad. Not just bikes. Identity." />
      </Helmet>

      {/* Background Image with Cinematic Treatment */}
      <div className="sticky top-0 h-dvh z-0 overflow-hidden">
  <motion.img
    initial={{ scale: 1.08, y: 0 }}
    whileInView={{ scale: 1, y: -60 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    src="https://images.unsplash.com/photo-1551887293-297ce7d00177?q=80&w=2574&auto=format&fit=crop"
    alt="Urban night cycling"
    className="w-full h-full object-cover object-center opacity-100"
  />
</div>

      {/* Content Container */}
      <div className="relative z-10 -mt-[100dvh] min-h-dvh flex flex-col items-center justify-end text-center px-6 pb-20 md:pb-28 max-w-4xl mx-auto">
        
        {/* Main Brand */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="mt-[100vh] text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white mb-32"
        >
          FIXIETY
        </motion.h1>

        {/* Bilingual Poetic Statement */}
        <div className="mb-40 flex flex-col items-center space-y-12">
  <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
            className="flex flex-col items-center space-y-2"
          >
            <span className="text-2xl md:text-4xl font-medium text-white tracking-tight">
              No son solo bicicletas.
            </span>
            <span className="text-2xl md:text-4xl font-medium text-white tracking-tight">
              Es identidad.
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 2.5 }}
            className="flex flex-col items-center space-y-1"
          >
            <span className="text-lg md:text-xl font-normal text-muted tracking-wide">
              Not just bikes.
            </span>
            <span className="text-lg md:text-xl font-normal text-muted tracking-wide">
              Identity.
            </span>
          </motion.div>
        </div>

        {/* Enter Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 3.5 }}
        >
          <Link 
            to="/entering" 
            className="group flex flex-col items-center"
          >
            <span className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest border-b border-transparent group-hover:border-white transition-colors duration-500 pb-1">
              Entrar
            </span>
            <span className="text-sm text-muted uppercase tracking-[0.2em] mt-3 group-hover:text-white/70 transition-colors duration-500">
              Enter
            </span>
          </Link>
        </motion.div>
        
      </div>
    </motion.main>
  );
}

export default HomePage;