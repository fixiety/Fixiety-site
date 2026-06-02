import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

function EdicionesPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="min-h-dvh bg-black text-white flex items-center justify-center px-6"
    >
      <Helmet>
        <title>FIXIETY | Ediciones</title>
        <meta name="description" content="Ediciones. Objetos archivados. Archived objects." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="flex flex-col items-center text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight uppercase">
          Ediciones
        </h1>
        <span className="mt-4 text-sm md:text-base text-white/30 tracking-[0.3em] uppercase font-light">
          Editions
        </span>

        <p className="mt-16 text-base md:text-lg text-white/60 max-w-md leading-relaxed">
          Objetos archivados.
        </p>
        <span className="mt-2 text-xs md:text-sm text-white/25 tracking-[0.2em] uppercase">
          Archived objects
        </span>

        <div className="mt-16 h-px w-24 bg-white/10" />

        <span className="mt-8 text-xs text-white/25 tracking-[0.35em] uppercase">
          En preparación
        </span>
      </motion.div>
    </motion.main>
  );
}

export default EdicionesPage;
