import { createClient } from '@supabase/supabase-js';

/**
 * Cliente Supabase para el front (solo anon/publishable key).
 *
 * Variables de entorno (Vite):
 *  - VITE_SUPABASE_URL
 *  - VITE_SUPABASE_ANON_KEY
 *
 * La secret_key de cada pieza NUNCA se consulta desde aquí: se resuelve
 * server-side vía la función RPC `fixid_resolve_secret`, y la lectura pública
 * usa la vista `tokens_public` (que no incluye secret_key).
 *
 * Si faltan las variables, `supabase` es null y las páginas degradan a
 * "registro no reconocido" sin romper.
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
