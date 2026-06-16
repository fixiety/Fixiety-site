import React from 'react';

/**
 * Imagen con disuasión visual simple. NO impide capturas de pantalla
 * (en web es imposible al 100%); solo desalienta la descarga/copia casual:
 *  - sin menú contextual (click derecho)
 *  - no arrastrable / no seleccionable
 *  - sin links de descarga directos
 *  - watermark tenue opcional
 */
function ProtectedImage({ src, alt, watermark, aspectClass = 'aspect-[3/2]', onClick, natural = false, onLoad }) {
  return (
    <div
      className={`group relative overflow-hidden cinematic-vignette select-none ${
        onClick ? 'cursor-zoom-in' : ''
      }`}
      onContextMenu={(e) => e.preventDefault()}
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        loading="lazy"
        onLoad={onLoad}
        className={`fx-photo w-full select-none pointer-events-none ${
          natural ? 'h-auto object-contain block' : `${aspectClass} object-cover`
        }`}
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
