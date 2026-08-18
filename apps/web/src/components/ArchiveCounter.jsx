import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient.js';

function getVisitorId() {
  try {
    let id = localStorage.getItem('fixiety_visitor_id');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('fixiety_visitor_id', id);
    }
    return id;
  } catch {
    return null;
  }
}

function ArchiveCounter() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function register() {
      if (!supabase) return;
      const vid = getVisitorId();
      if (!vid) return;

      try {
        const { data, error } = await supabase.rpc('register_visit', { vid });
        if (cancelled || error || !data) return;
        const row = Array.isArray(data) ? data[0] : data;
        if (row) setStats(row);
      } catch {
        // silencio intencional
      }
    }

    register();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!stats) return null;

  const pieces = Number(stats.total_pieces || 0).toLocaleString();
  const visitors = Number(stats.total_visitors || 0).toLocaleString();

  return (
    <div className="flex flex-col items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-white/25">
      <span>Registros · {pieces}</span>
      <span>Accesos · {visitors}</span>
    </div>
  );
}

export default ArchiveCounter;
