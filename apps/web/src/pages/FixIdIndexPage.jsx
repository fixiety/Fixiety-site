import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { supabase } from '@/lib/supabaseClient.js';
import { parseInstagram } from '@/lib/instagram.js';

/**
 * Índice público de piezas FixID registradas.
 * Lee solo desde tokens_public (sin secret_key ni nfc_uid) y excluye
 * sesiones privadas: la vista puede no exponer `type`, así que también
 * se descartan los public_id con prefijo SESSION-.
 */
function isObjectToken(token) {
  if (token.type && token.type !== 'object') return false;
  return !String(token.public_id || '').startsWith('SESSION-');
}

function PieceCard({ token, index }) {
  const owner = parseInstagram(token.owner_handle);
  const meta = [token.series, token.year, token.city].filter(Boolean).join(' — ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 1.2, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link to={`/fixid/${token.public_id}`} className="block">
        <div className="relative overflow-hidden cinematic-vignette bg-black/40">
          {token.image_url ? (
            <img
              src={token.image_url}
              alt={token.piece_name || token.public_id}
              loading="lazy"
              draggable={false}
              className="fx-photo w-full aspect-[3/4] object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full aspect-[3/4] border border-white/10 flex items-center justify-center px-6">
              <span className="text-xs tracking-[0.3em] uppercase text-white/25 text-center break-all">
                {token.public_id}
              </span>
            </div>
          )}
        </div>

        <figcaption className="mt-5 flex flex-col gap-1.5">
          <span className="text-sm tracking-[0.32em] uppercase text-white/70 group-hover:text-white transition-colors duration-500">
            {token.piece_name || token.public_id}
          </span>
          <span className="text-xs tracking-[0.18em] uppercase text-white/35">
            {token.public_id}
          </span>
          {meta && (
            <span className="text-xs tracking-[0.18em] uppercase text-white/25">{meta}</span>
          )}
          {owner && (
            <span className="text-xs tracking-[0.18em] text-white/25">{owner.display}</span>
          )}
        </figcaption>
      </Link>
    </motion.div>
  );
}

function FixIdIndexPage() {
  const [tokens, setTokens] = useState(null); // null = cargando

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!supabase) {
        if (!cancelled) setTokens([]);
        return;
      }
      const { data, error } = await supabase.from('tokens_public').select('*');
      if (cancelled) return;
      if (error || !data) {
        setTokens([]);
        return;
      }
      setTokens(
        data.filter(isObjectToken).sort((a, b) => String(a.public_id).localeCompare(String(b.public_id)))
      );
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="min-h-dvh bg-black text-white pt-28 pb-40 overflow-x-hidden"
    >
      <Helmet>
        <title>FIXIETY | FixID</title>
        <meta
          name="description"
          content="FixID. Índice de piezas registradas en el archivo Fixiety. Registered pieces."
        />
      </Helmet>

      <div className="px-6 max-w-3xl mx-auto">
        <header className="mb-14 md:mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col items-center gap-2"
          >
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight uppercase">FixID</h1>
            <span className="text-xs md:text-sm text-white/30 tracking-[0.3em] uppercase font-light">
              Registered Pieces
            </span>
          </motion.div>
        </header>
      </div>

      {tokens === null && (
        <p className="text-center text-xs tracking-[0.35em] uppercase text-white/25">
          Consultando registro…
        </p>
      )}

      {tokens !== null && tokens.length === 0 && (
        <p className="text-center text-xs tracking-[0.35em] uppercase text-white/25">
          Sin piezas registradas
        </p>
      )}

      {tokens !== null && tokens.length > 0 && (
        <div className="px-6 md:px-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16 md:gap-y-20">
          {tokens.map((token, index) => (
            <PieceCard key={token.public_id} token={token} index={index} />
          ))}
        </div>
      )}
    </motion.main>
  );
}

export default FixIdIndexPage;
