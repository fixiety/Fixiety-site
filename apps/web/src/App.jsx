import React from 'react';
import { Route, Routes, BrowserRouter as Router, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ScrollToTop from './components/ScrollToTop.jsx';
import Header from './components/Header.jsx';
import HomePage from './pages/HomePage.jsx';
import EnteringPage from './pages/EnteringPage.jsx';
import ArchivoPage from './pages/ArchivoPage.jsx';
import EdicionesPage from './pages/EdicionesPage.jsx';
import CargandoPeliculaPage from './pages/CargandoPeliculaPage.jsx';
import FixIdPage from './pages/FixIdPage.jsx';
import FixIdAccessPage from './pages/FixIdAccessPage.jsx';
import SessionPage from './pages/SessionPage.jsx';
import GlobalAudioPlayer from './components/GlobalAudioPlayer.jsx';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/entering" element={<EnteringPage />} />
        <Route path="/archivo" element={<ArchivoPage />} />
        <Route path="/ediciones" element={<EdicionesPage />} />
        <Route path="/cargando-pelicula" element={<CargandoPeliculaPage />} />
        <Route path="/fixid/access" element={<FixIdAccessPage />} />
        <Route path="/fixid/:token" element={<FixIdPage />} />
        <Route path="/session/:sessionId" element={<SessionPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="app-shell">
        <div className="app-content">
          <ScrollToTop />
          <Header />
          <AnimatedRoutes />
          <GlobalAudioPlayer />
        </div>
      </div>
    </Router>
  );
}

export default App;
