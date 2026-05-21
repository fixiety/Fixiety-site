import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About - Fixiety</title>
        <meta name="description" content="Fixiety is a cultural platform exploring identity, cycling culture, and visual storytelling through fixed gear bikes." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Image */}
          <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
            <div className="absolute inset-0 cinematic-overlay">
              <img
                src="https://images.unsplash.com/photo-1623160055201-3ff4805a4e13"
                alt="Urban cyclist embodying fixed gear culture and identity"
                className="h-full w-full object-cover"
              />
            </div>
          </section>

          {/* Manifesto */}
          <section className="py-20 md:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-12">
                  About Fixiety
                </h1>

                <div className="space-y-8 text-lg md:text-xl leading-relaxed">
                  <p className="text-muted-foreground">
                    Fixiety exists at the intersection of cycling culture, personal identity, and visual storytelling. We're not just about bikes — we're about what they represent.
                  </p>

                  <p className="text-muted-foreground">
                    Fixed gear cycling is more than a mode of transportation. It's a deliberate choice, a statement of intent, a connection to the machine beneath you. Every component, every modification, every scratch tells a story.
                  </p>

                  <p className="text-muted-foreground">
                    Through premium products, cinematic photography, and editorial content, we explore the culture that emerges when riders see their bikes as extensions of themselves. When the relationship between human and machine becomes something deeper.
                  </p>

                  <p className="text-foreground font-medium">
                    This is Fixiety. Not just bikes. Identity.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Values */}
          <section className="py-20 md:py-32 bg-secondary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-2xl font-semibold mb-4">Craftsmanship</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every product we create is designed with intention. From 3D printed NFC tags to handmade musettes, quality and attention to detail define our work.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h3 className="text-2xl font-semibold mb-4">Visual storytelling</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Photography is how we document the culture. Cinematic lighting, urban environments, and the raw energy of riders and their machines.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-2xl font-semibold mb-4">Community</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Fixed gear culture thrives on connection. We build products and create content that brings riders together and celebrates shared identity.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default AboutPage;