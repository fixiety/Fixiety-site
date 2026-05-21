import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

function SistemaPage() {
  const sections = [
    {
      id: "fixid",
      titleEs: "FIXID",
      textEs: ["Toca.", "Accede.", "Identidad."],
      textEn: ["Tap.", "Access.", "Identity."],
      image: "https://images.unsplash.com/photo-1643294778211-a5873bd93f12?q=80&w=2670&auto=format&fit=crop",
      descEs: "Un objeto físico conectado a tu rastro digital.",
      descEn: "A physical object linked to your digital trace."
    },
    {
      id: "musettes",
      titleEs: "MUSETTES",
      textEs: ["Hechas en movimiento.", "Construidas a mano."],
      textEn: ["Carried in motion.", "Built by hand."],
      image: "https://images.unsplash.com/photo-1540749046540-b7d8f98c7e4c?q=80&w=2574&auto=format&fit=crop",
      descEs: "Artefactos para atravesar la ciudad.",
      descEn: "Artifacts for traversing the city."
    },
    {
      id: "archivo",
      titleEs: "ARCHIVO",
      titleEn: "Archive",
      textEs: ["Fragmentos de movimiento."],
      textEn: ["Fragments of movement."],
      image: "https://images.unsplash.com/photo-1678524036151-e732770689fa?q=80&w=2670&auto=format&fit=crop",
      descEs: "Registro visual de nuestra existencia.",
      descEn: "Visual record of our existence."
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
        <title>FIXIETY | Sistema</title>
        <meta name="description" content="El sistema Fixiety. The Fixiety system." />
      </Helmet>

      {/* Page Header */}
      <header className="container mx-auto px-6 max-w-5xl mb-32 md:mb-48">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col space-y-4"
        >
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase">
            Sistema
          </h1>
          <span className="text-xl md:text-2xl text-muted tracking-widest uppercase font-light">
            System
          </span>
        </motion.div>
      </header>

      {/* Abstract Sections */}
      <div className="container mx-auto px-6 max-w-5xl space-y-48 md:space-y-64">
        {sections.map((section, index) => (
          <motion.section 
            key={section.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center"
          >
            {/* Image (alternating layout) */}
            <div className={`col-span-1 lg:col-span-7 ${index % 2 !== 0 ? 'lg:order-last' : ''}`}>
              <div className="aspect-[4/5] md:aspect-video lg:aspect-[3/4] overflow-hidden relative group cinematic-vignette">
                <img 
                  src={section.image} 
                  alt={section.titleEs} 
                  className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className={`col-span-1 lg:col-span-5 flex flex-col justify-center space-y-16 ${index % 2 !== 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
              <div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  {section.titleEs}
                </h2>
                {section.titleEn && (
                  <p className="text-lg text-muted tracking-widest uppercase">
                    {section.titleEn}
                  </p>
                )}
              </div>

              <div className="space-y-12">
                <div className="space-y-2">
                  {section.textEs.map((line, i) => (
                    <p key={i} className="text-2xl md:text-3xl font-medium tracking-tight">
                      {line}
                    </p>
                  ))}
                </div>

                <div className="space-y-1">
                  {section.textEn.map((line, i) => (
                    <p key={i} className="text-base md:text-lg text-muted font-light">
                      {line}
                    </p>
                  ))}
                </div>
                
                {section.descEs && (
                  <div className="pt-8 border-t border-white/10 space-y-2">
                    <p className="text-sm md:text-base text-white/80">{section.descEs}</p>
                    <p className="text-xs md:text-sm text-muted">{section.descEn}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        ))}
      </div>
    </motion.main>
  );
}

export default SistemaPage;