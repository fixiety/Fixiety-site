import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import GalleryImage from '@/components/GalleryImage.jsx';

function PhotographyPage() {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1556924145-957f113191fd',
      alt: 'Fixed gear cyclist riding through urban streets at night',
      span: 2
    },
    {
      src: 'https://images.unsplash.com/photo-1551887293-297ce7d00177',
      alt: 'Close-up of fixed gear bike wheel and frame details',
      span: 1
    },
    {
      src: 'https://images.unsplash.com/photo-1678524036151-e732770689fa',
      alt: 'Cyclist performing skid on fixed gear bike',
      span: 1
    },
    {
      src: 'https://images.unsplash.com/photo-1677459373647-c295eb2b4e5e',
      alt: 'Artistic shot of bicycle components and mechanics',
      span: 1
    },
    {
      src: 'https://images.unsplash.com/photo-1585174757517-77d9b0c0700d',
      alt: 'Urban cyclist navigating city environment',
      span: 1
    },
    {
      src: 'https://images.unsplash.com/photo-1620362577783-fb856dfa253d',
      alt: 'Night photography of fixed gear bike in urban setting',
      span: 2
    },
    {
      src: 'https://images.unsplash.com/photo-1583407089395-a820b3ae1541',
      alt: 'Cinematic portrait of cyclist with their fixed gear bike',
      span: 1
    }
  ];

  return (
    <>
      <Helmet>
        <title>Photography - Fixiety</title>
        <meta name="description" content="Cinematic fixed gear photography exploring urban cycling culture, lighting, and visual storytelling." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-20 md:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Photography
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Visual narratives from the streets. Capturing the raw energy, technical precision, and cultural identity of fixed gear cycling through cinematic photography.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Gallery Grid */}
          <section className="pb-20 md:pb-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image, index) => (
                  <GalleryImage
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    span={image.span}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-20 md:py-32 bg-secondary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl mx-auto"
              >
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
                  Book a session
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Interested in professional photography for your bike or a rider portrait session? We work with cyclists who value premium visual documentation of their builds and riding style.
                </p>
                <a
                  href="mailto:hello@fixiety.com"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:bg-primary/90 hover:scale-105 active:scale-[0.98]"
                >
                  Get in touch
                </a>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default PhotographyPage;