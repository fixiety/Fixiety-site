import React from 'react';

/**
 * Site-wide fixed overlay stack: grain, vignette, and atmospheric light leaks.
 * Sits above page content, below chrome (header z-50).
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
