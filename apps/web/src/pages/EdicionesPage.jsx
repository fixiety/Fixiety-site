import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { editionItems } from '@/data/editionItems.js';
import ImageLightbox, { useLightbox } from '@/components/ImageLightbox.jsx';

function EditionCaption({ item }) {
  return (
    <figcaption className="mt-6 flex flex-col gap-3">
      <span className="text-xs tracking-[0.34em] uppercase text-white/40">
        {item.edicion}
      </span>
      <span className="text-2xl md:text-4xl font-bold tracking-tight text-white">
        {item.titulo}
      </span>
      <span className="max-w-md text-sm md:text-base leading-relaxed text-white/55">
        {item.descripcion}
      </span>
      <span className="mt-1 text-xs tracking-[0.25em] uppercase text-white/30">
        {item.estado}
      </span>
    </figcaption>
  );
}

function EditionPlate({ item, index, onOpen }) {
  const isVertical = item.orientation === 'vertical';
  const width = isVertical ? '48vw' : '88vw';
  const aspectClass = isVertical ? 'aspect-[3/4]' : 'aspect-[3/2]';
  const alignClass = index % 2 === 0 ? 'self-start' : 'self-end';

  return (
    <motion.figure
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ width }}
      className={`${alignClass} group`}
    >
      <div
        className="relative overflow-hidden cinematic-vignette cursor-zoom-in"
        onClick={() => onOpen(item.src, item.alt)}
      >
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className={`fx-photo w-full ${aspectClass} object-cover`}
        />
      </div>
      <EditionCaption item={item} />
    </motion.figure>
  );
}

function EdicionesPage() {
  const lightbox = useLightbox();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="min-h-dvh bg-black text-white pt-28 pb-40 overflow-x-hidden"
    >
      <Helmet>
        <title>FIXIETY | Ediciones</title>
        <meta name="description" content="Ediciones. Objetos archivados. Archived objects." />
      </Helmet>

      {/* Title — narrow, lets the photography dominate below */}
      <div className="px-6 max-w-3xl mx-auto mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-center gap-2 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight uppercase">
            Ediciones
          </h1>
          <span className="text-xs md:text-sm text-white/30 tracking-[0.3em] uppercase font-light">
            Editions
          </span>
          <span className="mt-5 text-xs tracking-[0.25em] uppercase text-white/25">
            Objetos archivados
          </span>
        </motion.div>
      </div>

      {/* Editorial sequence — full width so the photography dominates */}
      <div className="flex flex-col gap-32 md:gap-48 px-[2vw]">
        {editionItems.map((item, index) => (
          <EditionPlate key={item.id} item={item} index={index} onOpen={lightbox.open} />
        ))}
      </div>

      <ImageLightbox image={lightbox.image} onClose={lightbox.close} />
    </motion.main>
  );
}

export default EdicionesPage;
