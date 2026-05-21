import React from 'react';
import { Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ScrollToTop from './components/ScrollToTop.jsx';
import Header from './components/Header.jsx';
import CinematicAtmosphere from './components/CinematicAtmosphere.jsx';
import HomePage from './pages/HomePage.jsx';
import EnteringPage from './pages/EnteringPage.jsx';
import SistemaPage from './pages/SistemaPage.jsx';
import ManifiestoPage from './pages/ManifiestoPage.jsx';
import SignalPage from './pages/SignalPage.jsx';
import ArchivoPage from './pages/ArchivoPage.jsx';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/entering" element={<EnteringPage />} />
        <Route path="/sistema" element={<SistemaPage />} />
        <Route path="/manifiesto" element={<ManifiestoPage />} />
        <Route path="/señal" element={<SignalPage />} />
        <Route path="/archivo" element={<ArchivoPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-dvh bg-black text-white">
        <p
          className="fixed top-3 left-3 z-[9999] m-0 rounded bg-black px-3 py-1.5 text-xs font-bold tracking-[0.2em] text-white ring-1 ring-white/30"
          aria-hidden="true"
        >
          FIXIETY LOADED
        </p>
        <div className="app-shell">
          <CinematicAtmosphere />
          <div className="app-content">
            <ScrollToTop />
            <Header />
            <AnimatedRoutes />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;