import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Don't show header on entering page
  if (location.pathname === '/entering') return null;

  const isHomePage = location.pathname === '/';

  const indexEntries = [
    { path: '/archivo', primary: 'Archivo', secondary: 'Archive' },
    { path: '/ediciones', primary: 'Ediciones', secondary: 'Editions' },
    { path: '/fixid', primary: 'FixID', secondary: 'Registered Pieces' },
    { path: '/cargando-pelicula', primary: '001', secondary: 'Developing Film' }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 p-6 mix-blend-difference flex justify-between items-start transition-opacity duration-1000 ${isHomePage && !isOpen ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
        <Link 
          to="/" 
          className="text-xl font-bold tracking-tighter uppercase z-50 text-white"
        >
          Fixiety
        </Link>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="z-50 text-white p-2 -mr-2 transition-transform duration-500 hover:scale-105"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex items-center justify-center"
          >
            <nav className="flex flex-col items-start w-full max-w-2xl px-10 md:px-16">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.8 }}
                className="mb-12 text-[0.7rem] tracking-[0.45em] uppercase text-white/25"
              >
                Índice
              </motion.span>

              <div className="flex flex-col items-start space-y-10 md:space-y-12">
                {indexEntries.map((entry, index) => (
                  <motion.div
                    key={entry.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.25, duration: 0.8 }}
                    className="group"
                  >
                    <Link to={entry.path} className="flex flex-col items-start">
                      <span className="text-3xl md:text-5xl font-bold tracking-tight uppercase text-white group-hover:text-white/70 transition-colors duration-500">
                        {entry.primary}
                      </span>
                      <span className="mt-1 text-xs md:text-sm text-white/35 tracking-[0.3em] uppercase group-hover:text-white/50 transition-colors duration-500">
                        {entry.secondary}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;