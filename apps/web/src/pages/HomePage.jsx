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
      transition={{ duration: 1 }}
      className="relative min-h-[160vh] overflow-hidden bg-black"
    >
      <Helmet>
        <title>FIXIETY | Ciudad Fija</title>
        <meta
          name="description"
          content="Contemporary fixed gear archive. Archivo contemporáneo del piñón fijo."
        />
      </Helmet>

      {/* Background Image */}
      <div className="sticky top-0 h-dvh z-0 overflow-hidden">
        <motion.img
          initial={{ scale: 1.08, y: 0 }}
          whileInView={{ scale: 1, y: -60 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1551887293-297ce7d00177?q=80&w=2574&auto=format&fit=crop"
          alt="Urban night cycling"
          className="w-full h-full object-cover object-center brightness-[0.85] contrast-[1.05]"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 -mt-[100dvh] min-h-dvh flex flex-col items-center justify-end text-center px-6 pb-32 md:pb-40 max-w-4xl mx-auto">

        {/* FIXIETY */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay: 0 }}
          className="mt-[112vh] text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white mb-20"
        >
          FIXIETY
        </motion.h1>

        {/* Main Statement */}
        <div className="mb-40 flex flex-col items-center space-y-4">

          {/* English */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="flex flex-col items-center"
          >
            <span className="text-lg md:text-xl font-medium text-white/45 tracking-[0.08em]">
              Contemporary fixed gear archive.
            </span>
          </motion.div>

          {/* Spanish */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <span className="text-2xl md:text-4xl font-medium text-white tracking-tight leading-tight">
              Archivo contemporáneo del piñón fijo.
            </span>
          </motion.div>

        </div>

        {/* Enter Button */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay: 0.45 }}
        >
          <Link
            to="/entering"
            className="group flex flex-col items-center"
          >
            <span className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest border-b border-transparent group-hover:border-white transition-colors duration-500 pb-1">
              Entrar
            </span>

            <span className="text-sm text-white/20 uppercase tracking-[0.25em] mt-3 group-hover:text-white/50 transition-colors duration-500">
              Enter
            </span>
          </Link>
        </motion.div>

      </div>
    </motion.main>
  );
}

export default HomePage;