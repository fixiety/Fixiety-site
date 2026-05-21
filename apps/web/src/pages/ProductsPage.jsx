import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProductCard from '@/components/ProductCard.jsx';

function ProductsPage() {
  const products = [
    {
      image: 'https://images.unsplash.com/photo-1690090903100-af3c92904c9f',
      title: 'FixID',
      description: 'A 3D printed NFC tag that transforms your bike into a digital identity. Tap with your phone to instantly open your rider profile, showcase your build, and connect with the community.',
      features: [
        'Custom 3D printed design',
        'NFC technology for instant profile access',
        'Weather-resistant construction',
        'Easy installation on any frame'
      ]
    },
    {
      image: 'https://images.unsplash.com/photo-1546045425-19a1e590ffc5',
      title: 'Custom Musettes',
      description: 'Handmade cycling musettes crafted with attention to detail. Each piece is unique, featuring premium materials and thoughtful construction for riders who value craftsmanship.',
      features: [
        'Hand-stitched construction',
        'Multiple color variations available',
        'Durable canvas and leather materials',
        'Limited production runs'
      ]
    },
    {
      image: 'https://images.unsplash.com/photo-1678524036151-e732770689fa',
      title: 'Pro Cycling Photography',
      description: 'Cinematic photography services for riders and their machines. From intimate portraits to editorial bike shots, we capture the essence of cycling culture with a premium visual approach.',
      features: [
        'Rider portrait sessions',
        'Professional bike photography',
        'Editorial and lifestyle shoots',
        'High-resolution digital delivery'
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Products - Fixiety</title>
        <meta name="description" content="Explore Fixiety's premium products: FixID NFC tags, custom musettes, and professional cycling photography services." />
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
                  Products
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Premium offerings for riders who see their bike as more than transportation. Each product is designed to enhance your cycling identity and connect you with the culture.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Products Grid */}
          <section className="pb-20 md:pb-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {products.map((product, index) => (
                  <ProductCard
                    key={index}
                    {...product}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Photography Portfolio Preview */}
          <section className="py-20 md:py-32 bg-secondary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                  Photography portfolio
                </h2>
                <p className="text-muted-foreground max-w-2xl">
                  A glimpse into our visual approach. Cinematic lighting, urban environments, and the raw energy of fixed gear culture.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3]"
                >
                  <img
                    src="https://images.unsplash.com/photo-1678524036151-e732770689fa"
                    alt="Cyclist performing trick on fixed gear bike in urban setting"
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3]"
                >
                  <img
                    src="https://images.unsplash.com/photo-1677459373647-c295eb2b4e5e"
                    alt="Close-up detail shot of fixed gear bicycle components"
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
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

export default ProductsPage;