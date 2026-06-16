import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

// Track global por defecto. Reemplaza por el archivo real en un bucket PÚBLICO.
// Recomendado: MP3 128–192 kbps, optimizado / no pesado.
export const DEFAULT_AUDIO = {
  src: 'https://edelwrzijrnydxrnqhff.supabase.co/storage/v1/object/public/fixiety-archive/ambient-001.mp3',
  title: '',
};

const VOLUME = 0.3;
const PREF_KEY = 'fixiety_audio_on';

const AudioCtx = createContext(null);

export function useGlobalAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) {
    // Fallback no-op por si se usa fuera del provider (no rompe la página).
    return {
      setTrack: () => {},
      resetTrack: () => {},
      toggle: () => {},
      isPlaying: false,
      currentTrack: DEFAULT_AUDIO,
    };
  }
  return ctx;
}

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
 * Audio ambiental global de Fixiety con track por página.
 * - public.tokens.audio_url / audio_title son la fuente del audio personalizado.
 * - Si una página no define track, se usa DEFAULT_AUDIO.
 * - Sin autoplay con sonido: inicia tras click. Loop, volumen bajo, sin controles nativos.
 * - Persiste la preferencia on/off en localStorage; si el navegador bloquea play(),
 *   no rompe la página (queda apagado).
 */
export function AudioProvider({ children }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(DEFAULT_AUDIO);

  const setTrack = useCallback((track) => {
    if (!track || !track.src) {
      setCurrentTrack(DEFAULT_AUDIO);
      return;
    }
    setCurrentTrack((prev) =>
      prev.src === track.src ? prev : { src: track.src, title: track.title || '' }
    );
  }, []);

  const resetTrack = useCallback(() => setCurrentTrack(DEFAULT_AUDIO), []);

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
      .catch(() => setIsPlaying(false));
  }, []);

  // Al cambiar de track, si el audio está encendido, continuar reproduciendo el nuevo.
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !isPlaying) return;
    el.play().catch(() => setIsPlaying(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack.src]);

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

  const value = { setTrack, resetTrack, toggle, isPlaying, currentTrack };

  return (
    <AudioCtx.Provider value={value}>
      {children}

      <audio ref={audioRef} src={currentTrack.src} loop preload="none" />

      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? 'Apagar sonido' : 'Encender sonido'}
        aria-pressed={isPlaying}
        title={currentTrack.title || undefined}
        className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[60] flex items-center gap-2 px-3 py-2 text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/35 hover:text-white/80 transition-colors duration-500 select-none"
      >
        {isPlaying && currentTrack.title && (
          <span className="hidden sm:inline max-w-[40vw] truncate text-white/30 normal-case tracking-[0.15em]">
            {currentTrack.title}
          </span>
        )}
        <span
          className={`inline-block h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
            isPlaying ? 'bg-white/80' : 'bg-white/20'
          }`}
        />
        Sonido {isPlaying ? 'On' : 'Off'}
      </button>
    </AudioCtx.Provider>
  );
}

export default AudioProvider;
