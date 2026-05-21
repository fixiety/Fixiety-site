import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function MagazinePage() {
  return (
    <>
      <Helmet>
        <title>Magazine - Fixiety</title>
        <meta name="description" content="Fixiety Magazine - A digital editorial platform exploring fixed gear culture, coming soon." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 flex items-center justify-center py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-muted"
              >
                <BookOpen size={48} className="text-muted-foreground" />
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Magazine
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                A digital editorial platform exploring the culture, stories, and visual narratives of fixed gear cycling.
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-block"
              >
                <span className="inline-flex items-center gap-2 bg-muted text-foreground px-6 py-3 rounded-xl font-medium">
                  Coming soon
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-16 pt-16 border-t border-border/40"
              >
                <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  We're building something different. Long-form features, rider profiles, technical deep-dives, and visual essays that capture the essence of fixed gear culture. Stay tuned.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default MagazinePage;