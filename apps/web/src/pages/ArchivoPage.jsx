import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { archiveItems, categories } from '@/data/archiveItems.js';

function Caption({ item }) {
  return (
    <figcaption className="mt-5 flex flex-col gap-1.5">
      <span className="text-sm tracking-[0.32em] uppercase text-white/60">
        {item.registro}
      </span>
      <span className="text-xs tracking-[0.18em] uppercase text-white/35">
        {item.lugar}
      </span>
      {item.temporada && (
        <span className="text-xs tracking-[0.18em] uppercase text-white/25">
          {item.temporada}
        </span>
      )}
      {item.nota && (
        <span className="text-xs tracking-[0.18em] uppercase text-white/25">
          {item.nota}
        </span>
      )}
    </figcaption>
  );
}

function Plate({ item, index }) {
  // Every fourth registro becomes a full-page Featured Item.
  const isFeatured = (index + 1) % 4 === 0;
  const isVertical = item.orientation === 'vertical';

  let width;
  let aspectClass;
  if (isFeatured) {
    width = '96vw';
    aspectClass = 'aspect-[16/10]';
  } else if (isVertical) {
    width = '48vw';
    aspectClass = 'aspect-[3/4]';
  } else {
    width = '88vw';
    aspectClass = 'aspect-[3/2]';
  }

  // Keep left/right alternation; Featured items center to break the rhythm.
  const alignClass = isFeatured
    ? 'self-center'
    : index % 2 === 0
    ? 'self-start'
    : 'self-end';

  return (
    <motion.figure
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ width }}
      className={`${alignClass} group`}
    >
      <div className="relative overflow-hidden cinematic-vignette">
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className={`w-full ${aspectClass} object-cover grayscale brightness-[0.9] transition-all duration-[1400ms] ease-out group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.03]`}
        />
      </div>
      <Caption item={item} />
    </motion.figure>
  );
}

function ArchivoPage() {
  const [active, setActive] = useState('todos');

  const filtered = useMemo(
    () =>
      active === 'todos'
        ? archiveItems
        : archiveItems.filter((item) => item.category === active),
    [active]
  );

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="min-h-dvh bg-black text-white pt-28 pb-40 overflow-x-hidden"
    >
      <Helmet>
        <title>FIXIETY | Archivo</title>
        <meta name="description" content="Archivo visual del piñón fijo. Visual archive." />
      </Helmet>

      {/* Title + curatorial index — narrow, lets the photography dominate below */}
      <div className="px-6 max-w-3xl mx-auto">
        <header className="mb-4 md:mb-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col items-center gap-2"
          >
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight uppercase">
              Archivo
            </h1>
            <span className="text-xs md:text-sm text-white/30 tracking-[0.3em] uppercase font-light">
              Archive
            </span>
          </motion.div>
        </header>

        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.45 }}
          className="mb-10 md:mb-12 flex flex-wrap justify-center gap-x-7 gap-y-3"
          aria-label="Categorías del archivo"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`text-xs tracking-[0.25em] uppercase transition-colors duration-500 ${
                active === cat.key ? 'text-white' : 'text-white/30 hover:text-white/60'
              }`}
            >
              {cat.es}
            </button>
          ))}
        </motion.nav>
      </div>

      {/* Editorial sequence — full width so vw sizes can dominate */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-28 md:gap-44 px-[2vw]"
        >
          {filtered.map((item, index) => (
            <Plate key={item.id} item={item} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.main>
  );
}

export default ArchivoPage;
