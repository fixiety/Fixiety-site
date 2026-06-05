import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { supabase } from '@/lib/supabaseClient.js';
import { NETWORK_LABEL, getSessionToken, clearSessionToken } from '@/lib/fixid.js';
import ProtectedImage from '@/components/ProtectedImage.jsx';
import ImageLightbox, { useLightbox } from '@/components/ImageLightbox.jsx';

const reveal = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

function RegistroRow({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-white/10 py-4">
      <span className="text-xs tracking-[0.3em] uppercase text-white/35">{label}</span>
      <span className="text-sm md:text-base tracking-[0.15em] uppercase text-white/90 text-right">
        {value}
      </span>
    </div>
  );
}

function Shell({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="min-h-dvh bg-black text-white pt-28 pb-40 flex items-center justify-center overflow-x-hidden"
    >
      <Helmet>
        <title>FIXIETY | Sesión</title>
      </Helmet>
      {children}
    </motion.main>
  );
}

function Denied() {
  return (
    <div className="px-6 max-w-2xl mx-auto flex flex-col items-center text-center">
      <motion.span
        {...reveal}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-xs tracking-[0.4em] uppercase text-white/30"
      >
        {NETWORK_LABEL}
      </motion.span>
      <motion.h1
        {...reveal}
        transition={{ duration: 1, delay: 0.35 }}
        className="mt-8 text-3xl md:text-5xl font-bold tracking-tight uppercase"
      >
        Acceso no verificado
      </motion.h1>
      <motion.p
        {...reveal}
        transition={{ duration: 1, delay: 0.55 }}
        className="mt-10 max-w-sm text-base md:text-lg leading-relaxed text-white/45"
      >
        Esta sesión requiere acceso mediante NFC.
      </motion.p>
    </div>
  );
}

function Loading() {
  return (
    <motion.div
      {...reveal}
      transition={{ duration: 1, delay: 0.2 }}
      className="px-6 flex flex-col items-center text-center"
    >
      <span className="text-xs tracking-[0.4em] uppercase text-white/30">{NETWORK_LABEL}</span>
      <span className="mt-8 text-sm tracking-[0.3em] uppercase text-white/45">Abriendo sesión</span>
    </motion.div>
  );
}

function SessionPage() {
  const { sessionId } = useParams();
  const [view, setView] = useState('loading'); // 'loading' | 'denied' | 'ready'
  const [session, setSession] = useState(null);
  const [coverUrl, setCoverUrl] = useState(null);
  const [assets, setAssets] = useState([]);
  const [downloaded, setDownloaded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const lightbox = useLightbox();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const token = getSessionToken(sessionId);

      if (!token || !supabase) {
        if (!cancelled) setView('denied');
        return;
      }

      const { data, error } = await supabase.functions.invoke('session-view', {
        body: { session_public_id: sessionId, access_token: token },
      });

      if (cancelled) return;

      if (error || !data || data.error || !data.session) {
        clearSessionToken(sessionId);
        setView('denied');
        return;
      }

      setSession(data.session);
      setCoverUrl(data.cover_url ?? null);
      setAssets(Array.isArray(data.assets) ? data.assets : []);
      setDownloaded(data.session.download_count >= data.session.download_limit);
      setView('ready');
    }

    setView('loading');
    load();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const handleDownload = useCallback(async () => {
    if (downloading || downloaded) return;
    const token = getSessionToken(sessionId);
    if (!token) return;

    setDownloading(true);
    const { data, error } = await supabase.functions.invoke('session-download', {
      body: { session_public_id: sessionId, access_token: token },
    });
    setDownloading(false);

    if (error || !data || (!data.ok && !data.used)) return;

    if (data.used) {
      setDownloaded(true);
      return;
    }

    if (data.ok && data.url) {
      const a = document.createElement('a');
      a.href = data.url;
      a.rel = 'noopener';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setDownloaded(true);
    }
  }, [downloading, downloaded, sessionId]);

  if (view === 'loading') return <Shell><Loading /></Shell>;
  if (view === 'denied') return <Shell><Denied /></Shell>;

  return (
    <Shell>
      <div className="w-full">
        {/* Header */}
        <div className="px-6 max-w-xl mx-auto text-center">
          <motion.span
            {...reveal}
            transition={{ duration: 1, delay: 0.2 }}
            className="block text-xs tracking-[0.4em] uppercase text-white/30"
          >
            {NETWORK_LABEL}
          </motion.span>

          <motion.h1
            {...reveal}
            transition={{ duration: 1, delay: 0.35 }}
            className="mt-8 text-3xl md:text-5xl font-bold tracking-tight uppercase"
          >
            {session.piece_name}
          </motion.h1>

          <motion.span
            {...reveal}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-4 block text-xs md:text-sm tracking-[0.32em] uppercase text-white/30 font-light"
          >
            {session.series}
          </motion.span>
        </div>

        {/* Cover dominante */}
        {coverUrl && (
          <motion.figure
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 md:mt-20 mx-auto px-[2vw]"
            style={{ width: '92vw' }}
          >
            <ProtectedImage
              src={coverUrl}
              alt={session.piece_name}
              watermark={session.registry_id}
              aspectClass="aspect-[16/10]"
              onClick={() => lightbox.open(coverUrl, session.piece_name)}
            />
          </motion.figure>
        )}

        {/* Ficha */}
        <motion.div
          {...reveal}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-16 md:mt-20 px-6 max-w-xl mx-auto flex flex-col"
        >
          <RegistroRow label="Sesión" value={session.public_id} />
          <RegistroRow label="Registro" value={session.registry_id} />
          <RegistroRow label="Serie" value={session.series} />
          <RegistroRow label="Estado" value={session.status} />
          <RegistroRow label="Año" value={session.year} />
          <RegistroRow label="Ciudad" value={session.city} />
        </motion.div>

        {/* Registro editorial */}
        {session.story && (
          <motion.div
            {...reveal}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-20 md:mt-28 px-6 max-w-xl mx-auto flex flex-col items-center text-center"
          >
            <div className="h-px w-24 bg-white/10" />
            <span className="mt-10 text-xs tracking-[0.35em] uppercase text-white/35">Registro</span>
            <p className="mt-6 max-w-md text-base md:text-lg leading-relaxed text-white/60">
              {session.story}
            </p>
          </motion.div>
        )}

        {/* Galería */}
        {assets.length > 0 && (
          <div className="mt-24 md:mt-32 flex flex-col items-center gap-24 md:gap-36 px-[2vw]">
            {assets.map((asset, i) => (
              <motion.figure
                key={asset.url + i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-12%' }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: '84vw' }}
              >
                <ProtectedImage
                  src={asset.url}
                  alt={`${session.piece_name} — ${asset.position ?? i + 1}`}
                  watermark={session.registry_id}
                  onClick={() => lightbox.open(asset.url, `${session.piece_name} — ${asset.position ?? i + 1}`)}
                />
              </motion.figure>
            ))}
          </div>
        )}

        {/* Descarga única */}
        <div className="mt-28 md:mt-36 px-6 flex flex-col items-center text-center">
          <div className="h-px w-24 bg-white/10" />
          {downloaded ? (
            <>
              <span className="mt-10 text-lg md:text-xl tracking-[0.25em] uppercase text-white/80">
                Descarga utilizada
              </span>
              <p className="mt-4 max-w-sm text-sm md:text-base leading-relaxed text-white/40">
                La sesión permanece visible, pero la descarga única ya fue registrada.
              </p>
            </>
          ) : (
            <>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="mt-10 text-base md:text-lg font-bold uppercase tracking-widest text-white border-b border-transparent hover:border-white transition-colors duration-500 pb-1 disabled:opacity-40"
              >
                {downloading ? 'Preparando' : 'Descargar serie'}
              </button>
              <span className="mt-3 text-xs text-white/25 uppercase tracking-[0.25em]">
                Descarga única
              </span>
            </>
          )}
        </div>
      </div>
      <ImageLightbox image={lightbox.image} onClose={lightbox.close} />
    </Shell>
  );
}

export default SessionPage;
