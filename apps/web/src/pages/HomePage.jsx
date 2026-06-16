import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const HOME_HERO =
  'https://edelwrzijrnydxrnqhff.supabase.co/storage/v1/object/public/fixiety-archive/home-hero-001.jpg';

function HomePage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="relative overflow-hidden bg-black"
    >
      <Helmet>
        <title>FIXIETY | Ciudad Fija</title>
        <meta
          name="description"
          content="Contemporary fixed gear archive. Archivo contemporáneo del piñón fijo."
        />
      </Helmet>

      {/* Mobile — encuadre cover, fade intermedio */}
      <section className="md:hidden relative min-h-[100dvh]">
        <div className="sticky top-0 h-dvh relative overflow-hidden bg-black">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            src={HOME_HERO}
            alt="Archivo Fixiety"
            className="w-full h-full object-cover object-center brightness-[0.85] contrast-[1.05]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-b from-transparent via-black/25 to-black/75" />
        </div>
      </section>

      {/* Desktop — foto completa, scroll editorial, sin crop */}
      <section className="hidden md:block relative bg-black">
        <div className="relative mx-auto flex min-h-[200vh] flex-col items-center justify-start px-6 pt-8">
          <div className="relative w-full flex justify-center">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              src={HOME_HERO}
              alt="Archivo Fixiety"
              className="w-auto max-w-full h-auto min-h-[160vh] object-contain brightness-[0.85] contrast-[1.05]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-36 bg-gradient-to-b from-transparent via-black/30 to-black/80" />
          </div>
        </div>
      </section>

      {/* Contenido — mobile: overlay con scroll; desktop: después de la foto */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pb-32 md:pb-40 max-w-4xl mx-auto md:mt-0 -mt-[100dvh] min-h-dvh md:min-h-0">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay: 0 }}
          className="mt-[112vh] md:mt-0 md:pt-16 text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white mb-20"
        >
          FIXIETY
        </motion.h1>

        <div className="mb-40 flex flex-col items-center space-y-4">
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
