import React from 'react';
import { motion } from 'framer-motion';

function GalleryImage({ src, alt, index = 0, span = 1 }) {
  const spanClass = span === 2 ? 'md:col-span-2' : '';
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`group relative overflow-hidden rounded-xl ${spanClass}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </motion.div>
  );
}

export default GalleryImage;