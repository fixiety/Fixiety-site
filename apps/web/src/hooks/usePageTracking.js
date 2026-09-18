// =====================================================================
// FIXIETY · Analítica — hook de rutas
// Ubicación en el repo: apps/web/src/hooks/usePageTracking.js
// Requiere react-router-dom v6.
// =====================================================================

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, setEntity } from '../lib/analytics';

// Se monta una sola vez, dentro del <BrowserRouter>.
export function usePageTracking() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    trackPageView(pathname + search);
  }, [pathname, search]);
}

// Para páginas cuyo ID no se deduce de la URL.
// Ejemplo, dentro de RegistroPage:  useTrackEntity('registro', registro.numero);
export function useTrackEntity(type, id) {
  useEffect(() => {
    if (type && id) setEntity(type, id);
  }, [type, id]);
}

// ---------------------------------------------------------------------
// Cómo conectarlo en App.jsx
// ---------------------------------------------------------------------
//
//   import { usePageTracking } from './hooks/usePageTracking';
//
//   function Routes() {
//     usePageTracking();
//     return ( ...tus <Route> ... );
//   }
//
//   export default function App() {
//     return (
//       <BrowserRouter>
//         <Routes />
//       </BrowserRouter>
//     );
//   }
//
// El hook tiene que vivir por debajo de <BrowserRouter>, porque useLocation
// necesita el contexto del router.
