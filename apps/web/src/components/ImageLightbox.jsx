import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Estado simple para un lightbox por página.
 *   const lightbox = useLightbox();
 *   lightbox.open(src, alt);
 *   <ImageLightbox image={lightbox.image} onClose={lightbox.close} />
 */
export function useLightbox() {
  const [image, setImage] = useState(null); // { src, alt } | null
  const open = useCallback((src, alt = '') => setImage({ src, alt }), []);
  const close = useCallback(() => setImage(null), []);
  return { image, open, close };
}

/**
 * Lightbox global de Fixiety. Abre una imagen a pantalla completa sobre fondo
 * negro, centrada, con cierre por click fuera, tecla ESC y botón discreto.
 * Bloquea el scroll del body mientras está abierto. Sin carousel ni UI comercial.
 */
function ImageLightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [image, onClose]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] bg-black flex items-center justify-center cursor-zoom-out"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-5 right-5 md:top-7 md:right-8 z-10 text-white/40 hover:text-white transition-colors duration-500 text-sm tracking-[0.3em] uppercase"
          >
            Cerrar
          </button>

          <motion.img
            key={image.src}
            src={image.src}
            alt={image.alt}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fx-photo-full select-none object-contain"
            style={{ maxWidth: '96vw', maxHeight: '92vh' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ImageLightbox;
