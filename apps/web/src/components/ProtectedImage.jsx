import React from 'react';

/**
 * Imagen con disuasión visual simple. NO impide capturas de pantalla
 * (en web es imposible al 100%); solo desalienta la descarga/copia casual:
 *  - sin menú contextual (click derecho)
 *  - no arrastrable / no seleccionable
 *  - sin links de descarga directos
 *  - watermark tenue opcional
 */
function ProtectedImage({ src, alt, watermark, aspectClass = 'aspect-[3/2]' }) {
  return (
    <div
      className="relative overflow-hidden cinematic-vignette select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        loading="lazy"
        className={`w-full ${aspectClass} object-cover grayscale brightness-[0.9] transition-all duration-[1400ms] ease-out select-none pointer-events-none`}
      />
      {watermark && (
        <div className="pointer-events-none absolute inset-0 flex items-end justify-end p-4 md:p-6">
          <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/20">
            {watermark}
          </span>
        </div>
      )}
    </div>
  );
}

export default ProtectedImage;
