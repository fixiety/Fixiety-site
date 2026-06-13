import React from 'react';
import { parseInstagram } from '@/lib/instagram.js';

/**
 * Link discreto al Instagram del propietario (owner_handle).
 * Lee desde public.tokens.owner_handle (fuente única) y normaliza la forma.
 * Devuelve null si no hay handle válido.
 */
function OwnerHandleLink({ value }) {
  const ig = parseInstagram(value);
  if (!ig) return null;

  return (
    <a
      href={ig.href}
      target="_blank"
      rel="noopener noreferrer"
      className="normal-case text-white/90 hover:text-white border-b border-white/20 hover:border-white/80 transition-colors duration-500"
    >
      {ig.display}
    </a>
  );
}

export default OwnerHandleLink;
