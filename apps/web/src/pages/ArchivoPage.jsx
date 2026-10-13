import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { archiveItems, categories } from '@/data/archiveItems.js';
import ImageLightbox, { useLightbox } from '@/components/ImageLightbox.jsx';

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

// Celular: etiqueta vertical (se lee de arriba a abajo) en el espacio libre
// al costado de la foto. Se recorta con "…" si no cabe en el alto de la foto.
function SideLabel({ item }) {
  const parts = [item.registro, item.lugar, item.temporada, item.nota].filter(
    (t) => t && t !== 'Por documentar'
  );
  return (
    <div className="md:hidden relative flex-1 min-w-0">
      <span
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 overflow-hidden text-ellipsis whitespace-nowrap text-[10px] leading-none tracking-[0.34em] uppercase"
        style={{ writingMode: 'vertical-rl' }}
      >
        {parts.map((t, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="text-white/20 mx-[0.6em]">—</span>}
            <span className={i === 0 ? 'text-white/65' : 'text-white/35'}>{t}</span>
          </React.Fragment>
        ))}
      </span>
    </div>
  );
}

function Plate({ item, index, onOpen }) {
  const [loaded, setLoaded] = useState(false);
  // Every fourth registro becomes a full-page Featured Item.
  const isVertical = item.orientation === 'vertical';
  // Solo las placas horizontales pueden ser Featured (una vertical se recortaría).
  const isFeatured = (index + 1) % 4 === 0 && !isVertical;

  // Celular: todas las placas ocupan casi todo el ancho (96vw).
  // Desktop (md+): se conservan los anchos editoriales de antes.
  let widthClass;
  let aspectClass;
  if (isFeatured) {
    widthClass = 'w-[96vw]';
    aspectClass = 'aspect-[16/10]';
  } else if (isVertical) {
    widthClass = 'w-[96vw] md:w-[48vw]';
    aspectClass = 'aspect-[3/4]';
  } else {
    widthClass = 'w-[96vw] md:w-[88vw]';
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
      className={`${widthClass} ${alignClass} group`}
    >
      <div
        className={`flex items-stretch gap-[1vw] md:block ${
          index % 2 === 0 ? '' : 'flex-row-reverse'
        }`}
      >
      <div
        className="relative overflow-hidden cinematic-vignette cursor-zoom-in w-[88vw] shrink-0 md:w-full"
        onClick={() => onOpen(item.src, item.alt)}
      >
        <img
          ref={(el) => {
            if (el && el.complete && el.naturalWidth > 0) setLoaded(true);
          }}
          src={item.src}
          alt={item.alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 900ms ease, filter 500ms ease, transform 500ms ease',
          }}
          className={`fx-photo w-full ${aspectClass} object-cover`}
        />
      </div>
      <SideLabel item={item} />
      </div>
      <div className="hidden md:block">
        <Caption item={item} />
      </div>
    </motion.figure>
  );
}

function ArchivoPage() {
  const [active, setActive] = useState('todos');
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const lastPointer = useRef('mouse');
  const lightbox = useLightbox();
  const activeCategory = categories.find((c) => c.key === active);

  // En táctil: tocar fuera del menú lo cierra.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [menuOpen]);

  const filtered = useMemo(
    () =>
      active === 'todos'
        ? archiveItems.filter((item) => item.category !== 'secuencias')
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
          ref={navRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.45 }}
          className="relative z-20 mb-10 md:mb-12 flex justify-center"
          aria-label="Categorías del archivo"
          onPointerEnter={(e) => {
            if (e.pointerType === 'mouse') setMenuOpen(true);
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === 'mouse') setMenuOpen(false);
          }}
        >
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded={menuOpen}
            onPointerDown={(e) => {
              lastPointer.current = e.pointerType;
            }}
            onClick={() =>
              setMenuOpen((open) => (lastPointer.current === 'mouse' ? true : !open))
            }
            className="text-xs tracking-[0.25em] uppercase text-white"
          >
            {activeCategory ? activeCategory.es : ''}
            <span className="ml-3 text-white/30">{menuOpen ? '–' : '+'}</span>
          </button>

          <AnimatePresence>
            {menuOpen && (
              <div className="absolute inset-x-0 top-full flex justify-center pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                  className="pointer-events-auto w-[min(92vw,44rem)] bg-black pt-5 pb-3 flex flex-wrap justify-center gap-x-7 gap-y-4"
                >
                  {categories
                    .filter((cat) => cat.key !== active)
                    .map((cat) => (
                      <button
                        key={cat.key}
                        type="button"
                        onClick={() => {
                          setActive(cat.key);
                          setMenuOpen(false);
                        }}
                        className="text-xs tracking-[0.25em] uppercase text-white/30 hover:text-white transition-colors duration-500"
                      >
                        {cat.es}
                      </button>
                    ))}
                </motion.div>
              </div>
            )}
          </AnimatePresence>
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
            <Plate key={item.id} item={item} index={index} onOpen={lightbox.open} />
          ))}
        </motion.div>
      </AnimatePresence>

      <ImageLightbox image={lightbox.image} onClose={lightbox.close} />
    </motion.main>
  );
}

export default ArchivoPage;
