import React from 'react';

/**
 * Site-wide atmosphere behind .app-content (z-index 0).
 * Transparent layers only — no mix-blend-mode (avoids white wash in production).
 */
function CinematicAtmosphere() {
  return (
    <div className="cinematic-atmosphere" aria-hidden="true">
      <div className="cinematic-atmosphere__lights" />
      <div className="cinematic-atmosphere__vignette" />
      <div className="cinematic-atmosphere__grain" />
    </div>
  );
}

export default CinematicAtmosphere;
