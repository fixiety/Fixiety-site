import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const reveal = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

function CargandoPeliculaPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="min-h-dvh bg-black text-white pt-24 md:pt-28 pb-24 md:pb-40 px-6 flex items-start md:items-center justify-center overflow-x-hidden"
    >
      <Helmet>
        <title>FIXIETY | Cargando Película</title>
        <meta name="description" content="Cargando Película. Issue 001 en proceso de revelado. Developing film." />
      </Helmet>

      <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center">

        {/* Masthead */}
        <motion.span
          {...reveal}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-xs tracking-[0.4em] uppercase text-white/30"
        >
          001
        </motion.span>

        <motion.h1
          {...reveal}
          transition={{ duration: 1, delay: 0.35 }}
          className="mt-6 md:mt-8 text-3xl md:text-6xl font-bold tracking-tight uppercase leading-[1.05]"
        >
          Cargando<br className="md:hidden" /> Película
        </motion.h1>

        <motion.span
          {...reveal}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-4 text-xs md:text-sm tracking-[0.32em] uppercase text-white/30 font-light"
        >
          Developing Film
        </motion.span>

        <motion.span
          {...reveal}
          transition={{ duration: 1, delay: 0.65 }}
          className="mt-2 text-xs tracking-[0.25em] uppercase text-white/25"
        >
          Issue 001
        </motion.span>

        {/* Statement */}
        <motion.p
          {...reveal}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-14 md:mt-24 text-xl md:text-2xl tracking-tight text-white/80"
        >
          En proceso de revelado.
        </motion.p>

        <motion.p
          {...reveal}
          transition={{ duration: 1, delay: 1.05 }}
          className="mt-4 text-base md:text-lg text-white/45 leading-relaxed"
        >
          Registro visual del piñón fijo contemporáneo.
        </motion.p>

        {/* Editorial axes */}
        <motion.div
          {...reveal}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-12 md:mt-24 flex flex-col gap-3 text-lg md:text-2xl tracking-tight text-white/70"
        >
          <span>Fotografía.</span>
          <span>Texto.</span>
          <span>Ciudad.</span>
          <span>Movimiento.</span>
        </motion.div>

        {/* State — slowly developing line */}
        <motion.div
          {...reveal}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-14 md:mt-28 flex flex-col items-center"
        >
          <div className="h-px w-40 overflow-hidden bg-white/10">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.8, ease: 'easeInOut', delay: 1.8 }}
              className="h-full bg-white/50"
            />
          </div>

          <span className="mt-6 md:mt-10 text-xs tracking-[0.35em] uppercase text-white/25">
            Estado
          </span>

          <span className="mt-3 text-lg md:text-xl tracking-[0.2em] uppercase text-white/80">
            Revelando
          </span>
        </motion.div>

      </div>
    </motion.main>
  );
}

export default CargandoPeliculaPage;
