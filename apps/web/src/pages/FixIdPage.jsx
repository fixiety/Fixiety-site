import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { getToken, NETWORK_LABEL } from '@/data/fixidTokens.js';

const reveal = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

function RegistroRow({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-white/10 py-4">
      <span className="text-xs tracking-[0.3em] uppercase text-white/35">{label}</span>
      <span className="text-sm md:text-base tracking-[0.15em] uppercase text-white/90 text-right">
        {value}
      </span>
    </div>
  );
}

function VerifiedView({ data }) {
  return (
    <div className="w-full">
      {/* Status */}
      <div className="px-6 max-w-3xl mx-auto text-center">
        <motion.span
          {...reveal}
          transition={{ duration: 1, delay: 0.2 }}
          className="block text-xs tracking-[0.4em] uppercase text-white/30"
        >
          {NETWORK_LABEL}
        </motion.span>

        <motion.h1
          {...reveal}
          transition={{ duration: 1, delay: 0.35 }}
          className="mt-8 text-3xl md:text-5xl font-bold tracking-tight uppercase"
        >
          Acceso verificado
        </motion.h1>

        <motion.span
          {...reveal}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-4 block text-xs md:text-sm tracking-[0.32em] uppercase text-white/30 font-light"
        >
          Access verified
        </motion.span>
      </div>

      {/* Dominant photograph */}
      <motion.figure
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '88vw' }}
        className="mt-16 md:mt-24 mx-auto group"
      >
        <div className="relative overflow-hidden cinematic-vignette">
          <img
            src={data.src}
            alt={data.alt}
            loading="lazy"
            className="w-full aspect-[3/2] object-cover grayscale brightness-[0.9] transition-all duration-[1400ms] ease-out group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.03]"
          />
        </div>
      </motion.figure>

      {/* Registry */}
      <motion.div
        {...reveal}
        transition={{ duration: 1, delay: 0.95 }}
        className="mt-16 md:mt-24 px-6 max-w-xl mx-auto flex flex-col"
      >
        <RegistroRow label="Token" value={data.token} />
        <RegistroRow label="Pieza" value={data.pieza} />
        <RegistroRow label="Edición" value={data.edicion} />
        <RegistroRow label="Estado" value={data.estado} />
        <RegistroRow label="Año" value={data.anio} />
      </motion.div>
    </div>
  );
}

function DeniedView({ token }) {
  return (
    <div className="px-6 max-w-2xl mx-auto flex flex-col items-center text-center">
      <motion.span
        {...reveal}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-xs tracking-[0.4em] uppercase text-white/30"
      >
        {NETWORK_LABEL}
      </motion.span>

      <motion.h1
        {...reveal}
        transition={{ duration: 1, delay: 0.35 }}
        className="mt-8 text-3xl md:text-5xl font-bold tracking-tight uppercase"
      >
        Token no reconocido
      </motion.h1>

      <motion.span
        {...reveal}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-6 block text-sm md:text-base tracking-[0.32em] uppercase text-white/45"
      >
        Acceso denegado
      </motion.span>

      <motion.span
        {...reveal}
        transition={{ duration: 1, delay: 0.65 }}
        className="mt-2 block text-xs tracking-[0.3em] uppercase text-white/25"
      >
        Access denied
      </motion.span>

      {token && (
        <motion.span
          {...reveal}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-16 block text-xs tracking-[0.25em] uppercase text-white/20"
        >
          {token}
        </motion.span>
      )}
    </div>
  );
}

function FixIdPage() {
  const { token } = useParams();
  const data = getToken(token);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="min-h-dvh bg-black text-white pt-28 pb-40 flex items-center justify-center overflow-x-hidden"
    >
      <Helmet>
        <title>FIXIETY | FixID</title>
        <meta name="description" content="FixID. Sistema de verificación editorial." />
      </Helmet>

      {data ? <VerifiedView data={data} /> : <DeniedView token={token ? token.toUpperCase() : ''} />}
    </motion.main>
  );
}

export default FixIdPage;
