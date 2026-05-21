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
      <CinematicAtmosphere />
      <ScrollToTop />
      <Header />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;