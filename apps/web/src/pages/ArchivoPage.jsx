import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

function ArchivoPage() {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1678524036151-e732770689fa?q=80&w=2670&auto=format&fit=crop",
      alt: "Archive fragment 01",
      aspect: "aspect-[3/4]"
    },
    {
      src: "https://images.unsplash.com/photo-1570148757044-121c3e1120bb?q=80&w=2670&auto=format&fit=crop",
      alt: "Archive fragment 02",
      aspect: "aspect-square"
    },
    {
      src: "https://images.unsplash.com/photo-1677359833064-e751eee4be50?q=80&w=2670&auto=format&fit=crop",
      alt: "Archive fragment 03",
      aspect: "aspect-[4/3]"
    },
    {
      src: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=2671&auto=format&fit=crop",
      alt: "Archive fragment 04",
      aspect: "aspect-[3/4]"
    },
    {
      src: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=2622&auto=format&fit=crop",
      alt: "Archive fragment 05",
      aspect: "aspect-video"
    },
    {
      src: "https://images.unsplash.com/photo-1566371510328-9706bb4899da?q=80&w=2670&auto=format&fit=crop",
      alt: "Archive fragment 06",
      aspect: "aspect-square"
    }
  ];

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="min-h-dvh bg-black text-white pt-32 pb-32"
    >
      <Helmet>
        <title>FIXIETY | Archivo</title>
        <meta name="description" content="Archivo visual. Visual archive." />
      </Helmet>

      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <header className="mb-24 md:mb-40 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col space-y-4 items-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-widest uppercase">
              Archivo
            </h1>
            <span className="text-lg md:text-xl text-muted tracking-[0.3em] uppercase font-light">
              Archive
            </span>
          </motion.div>
        </header>

        {/* Cinematic Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 md:gap-16 space-y-8 md:space-y-16">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.2, delay: (i % 3) * 0.2 }}
              className="break-inside-avoid relative group overflow-hidden"
            >
              <div className="relative cinematic-vignette w-full h-full">
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  loading="lazy"
                  className={`w-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105 ${img.aspect}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </motion.main>
  );
}

export default ArchivoPage;