import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { supabase } from '@/lib/supabaseClient.js';
import { NETWORK_LABEL, grantAccess } from '@/lib/fixid.js';

const reveal = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

function FixIdAccessPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // 'loading' | 'denied'

  useEffect(() => {
    let cancelled = false;

    async function resolve() {
      const k = params.get('k');

      if (!k || !supabase) {
        if (!cancelled) setStatus('denied');
        return;
      }

      const { data, error } = await supabase.rpc('fixid_resolve_secret', { k });
      if (cancelled) return;

      const publicId = Array.isArray(data) ? data[0] : data;

      if (error || !publicId) {
        setStatus('denied');
        return;
      }

      grantAccess(publicId);
      // URL final limpia, sin la secret key:
      navigate(`/fixid/${publicId}`, { replace: true });
    }

    resolve();
    return () => {
      cancelled = true;
    };
  }, [params, navigate]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="min-h-dvh bg-black text-white pt-28 pb-40 px-6 flex items-center justify-center overflow-x-hidden"
    >
      <Helmet>
        <title>FIXIETY | FixID</title>
      </Helmet>

      {status === 'loading' ? (
        <motion.div
          {...reveal}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-center text-center"
        >
          <span className="text-xs tracking-[0.4em] uppercase text-white/30">
            {NETWORK_LABEL}
          </span>
          <span className="mt-8 text-sm tracking-[0.3em] uppercase text-white/45">
            Verificando acceso
          </span>
        </motion.div>
      ) : (
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
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
            Clave no reconocida dentro del archivo actual.
          </motion.p>
        </div>
      )}
    </motion.main>
  );
}

export default FixIdAccessPage;
