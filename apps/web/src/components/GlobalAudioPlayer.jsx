import React, { useEffect, useRef, useState, useCallback } from 'react';

// Audio ambiental global. Reemplaza por el archivo real en un bucket PÚBLICO.
// Recomendado: MP3 128–192 kbps, optimizado / no pesado.
const GLOBAL_AUDIO_SRC =
  'https://edelwrzijrnydxrnqhff.supabase.co/storage/v1/object/public/fixiety-archive/ambient-001.mp3';

const VOLUME = 0.3;
const PREF_KEY = 'fixiety_audio_on';

function readPref() {
  try {
    return localStorage.getItem(PREF_KEY) === 'on';
  } catch (e) {
    return false;
  }
}

function writePref(on) {
  try {
    localStorage.setItem(PREF_KEY, on ? 'on' : 'off');
  } catch (e) {
    // localStorage no disponible — preferencia no persistente
  }
}

/**
 * Reproductor de audio ambiental global de Fixiety.
 * - No autoplay con sonido (los navegadores lo bloquean): inicia tras click.
 * - Loop, volumen bajo, sin controles nativos.
 * - Persiste la preferencia en localStorage; si el navegador bloquea la
 *   reanudación, se queda apagado sin romper la página.
 */
function GlobalAudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Volumen inicial.
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = VOLUME;
  }, []);

  // Intento de reanudar si el usuario ya había activado el audio antes.
  useEffect(() => {
    if (!readPref() || !audioRef.current) return;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false)); // bloqueado por el navegador: queda apagado
  }, []);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;

    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
      writePref(false);
      return;
    }

    el.play()
      .then(() => {
        setIsPlaying(true);
        writePref(true);
      })
      .catch(() => {
        setIsPlaying(false);
        writePref(false);
      });
  }, [isPlaying]);

  return (
    <>
      <audio ref={audioRef} src={GLOBAL_AUDIO_SRC} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? 'Apagar sonido' : 'Encender sonido'}
        aria-pressed={isPlaying}
        className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[60] flex items-center gap-2 px-3 py-2 text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/35 hover:text-white/80 transition-colors duration-500 select-none"
      >
        <span
          className={`inline-block h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
            isPlaying ? 'bg-white/80' : 'bg-white/20'
          }`}
        />
        Sonido {isPlaying ? 'On' : 'Off'}
      </button>
    </>
  );
}

export default GlobalAudioPlayer;
