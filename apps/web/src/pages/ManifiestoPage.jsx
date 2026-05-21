import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

function ManifiestoPage() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="min-h-dvh bg-black flex flex-col"
    >
      <Helmet>
        <title>FIXIETY | Manifiesto</title>
        <meta name="description" content="Manifiesto Fixiety. Fixiety Manifesto." />
      </Helmet>

      {/* Cinematic Hero Image */}
      <div className="relative h-[60vh] w-full cinematic-overlay cinematic-vignette">
        <motion.img 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 2 }}
          src="https://images.unsplash.com/photo-1609452200190-0352d82453cb?q=80&w=2670&auto=format&fit=crop" 
          alt="City lights movement" 
          className="w-full h-full object-cover grayscale"
        />
      </div>

      {/* Manifest Content */}
      <div className="flex-1 flex items-center justify-center py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto space-y-16 text-center md:text-left">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="space-y-12"
          >
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-medium tracking-tight text-white leading-tight">
              Fixiety explora la identidad a través del movimiento, los objetos y la luz de la ciudad.
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-muted font-light leading-relaxed max-w-3xl">
              Fixiety explores identity through movement, objects and city light.
            </p>
          </motion.div>
          
        </div>
      </div>
    </motion.main>
  );
}

export default ManifiestoPage;