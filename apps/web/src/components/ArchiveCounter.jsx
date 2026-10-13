import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient.js';
import { isActivatedPiece } from '@/lib/pieces.js';

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
  const [visitors, setVisitors] = useState(null);
  const [pieces, setPieces] = useState(null);

  useEffect(() => {
    let cancelled = false;

    // Accesos: RPC existente (ventana de 12 h por visitante).
    async function registerVisit() {
      if (!supabase) return;
      const vid = getVisitorId();
      if (!vid) return;
      try {
        const { data, error } = await supabase.rpc('register_visit', { vid });
        if (cancelled || error || !data) return;
        const row = Array.isArray(data) ? data[0] : data;
        if (row) setVisitors(Number(row.total_visitors || 0));
      } catch {
        // silencio intencional
      }
    }

    // Registros: solo piezas activadas (objeto activo con foto).
    async function countPieces() {
      if (!supabase) return;
      try {
        const { data, error } = await supabase.from('tokens_public').select('*');
        if (cancelled || error || !Array.isArray(data)) return;
        setPieces(data.filter(isActivatedPiece).length);
      } catch {
        // silencio intencional
      }
    }

    registerVisit();
    countPieces();
    return () => {
      cancelled = true;
    };
  }, []);

  if (visitors === null && pieces === null) return null;

  return (
    <div className="flex flex-col items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-white/25">
      {pieces !== null && <span>Registros · {pieces.toLocaleString()}</span>}
      {visitors !== null && <span>Accesos · {visitors.toLocaleString()}</span>}
    </div>
  );
}

export default ArchiveCounter;
