import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

function CargandoPeliculaPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="min-h-dvh bg-black text-white flex items-center justify-center px-6"
    >
      <Helmet>
        <title>FIXIETY | Cargando Película</title>
        <meta name="description" content="Cargando Película. Fixiety Magazine, Issue 001. Developing film." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="flex flex-col items-center text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-[1.05]">
          Cargando<br className="md:hidden" /> Película
        </h1>
        <span className="mt-4 text-sm md:text-base text-white/30 tracking-[0.3em] uppercase font-light">
          Developing Film
        </span>

        <p className="mt-16 text-base md:text-lg text-white/60 max-w-md leading-relaxed">
          Fixiety Magazine — Issue 001
        </p>

        <div className="mt-16 h-px w-24 bg-white/10" />

        <span className="mt-8 text-xs text-white/25 tracking-[0.35em] uppercase">
          En proceso
        </span>
      </motion.div>
    </motion.main>
  );
}

export default CargandoPeliculaPage;
