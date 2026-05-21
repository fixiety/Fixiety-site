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

  const navLinks = [
    { path: '/entering', es: 'Acceder', en: 'Enter' },
    { path: '/sistema', es: 'Sistema', en: 'System' },
    { path: '/archivo', es: 'Archivo', en: 'Archive' },
    { path: '/señal', es: 'Señal', en: 'Signal' },
    { path: '/manifiesto', es: 'Manifiesto', en: 'Manifesto' }
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
            <nav className="flex flex-col items-center justify-center space-y-12 w-full max-w-2xl px-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                  className="text-center group"
                >
                  <Link to={link.path} className="flex flex-col items-center">
                    <span className="text-4xl md:text-6xl font-bold tracking-tight text-white group-hover:text-white/70 transition-colors duration-500">
                      {link.es}
                    </span>
                    <span className="text-sm md:text-base text-muted font-medium tracking-widest uppercase mt-2 group-hover:text-muted/70 transition-colors duration-500">
                      {link.en}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;