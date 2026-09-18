// =====================================================================
// FIXIETY · Analítica — endpoint de captura
// Ubicación en el repo: apps/web/api/track.js
// Corre en el Edge de Vercel. La service_role key nunca sale del servidor.
// =====================================================================

export const config = { runtime: 'edge' };

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SALT = process.env.ANALYTICS_SALT || '';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const BOT_RE = /bot|crawler|spider|crawling|headless|lighthouse|preview|facebookexternalhit|bingpreview|slurp|curl|wget|python-requests|axios/i;

const MAX_DURATION_MS = 1000 * 60 * 60; // una hora: más que eso es una pestaña olvidada

export default async function handler(request) {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204 });
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  if (!SUPABASE_URL || !SERVICE_KEY) return new Response(null, { status: 204 });

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(null, { status: 204 });
  }

  if (!body || !UUID_RE.test(body.id || '')) return new Response(null, { status: 204 });

  try {
    if (body.t === 'end') {
      await closeView(body);
    } else {
      await openView(body, request);
    }
  } catch (err) {
    // La analítica nunca debe romper el sitio. Se registra y se sigue.
    console.error('track:', err);
  }

  return new Response(null, { status: 204 });
}

// ---------------------------------------------------------------------
// Alta de la visita
// ---------------------------------------------------------------------
async function openView(body, request) {
  const h = request.headers;
  const ua = h.get('user-agent') || '';
  const ip = h.get('x-forwarded-for')?.split(',')[0].trim() || '';

  const row = {
    id: body.id,
    session_id: String(body.sid || '').slice(0, 64),
    visitor_hash: await visitorHash(ip, ua),

    path: String(body.path || '/').slice(0, 512),
    referrer: clean(body.ref, 512),
    source: sourceFrom(body.ref, body.utm?.source),
    utm_source: clean(body.utm?.source, 128),
    utm_medium: clean(body.utm?.medium, 128),
    utm_campaign: clean(body.utm?.campaign, 128),

    entity_type: clean(body.entity?.type, 32),
    entity_id: clean(body.entity?.id, 128),

    country: h.get('x-vercel-ip-country') || null,
    region: h.get('x-vercel-ip-country-region') || null,
    city: decodeCity(h.get('x-vercel-ip-city')),

    ...parseUA(ua),
    language: clean(body.lang, 16),
    screen_w: Number.isFinite(body.sw) ? Math.trunc(body.sw) : null,

    is_bot: BOT_RE.test(ua),
  };

  await supabase('POST', '/rest/v1/page_views', row);
}

// ---------------------------------------------------------------------
// Cierre: cuánto tiempo estuvo en la página
// ---------------------------------------------------------------------
async function closeView(body) {
  const ms = Number(body.ms);
  if (!Number.isFinite(ms) || ms <= 0) return;

  await supabase(
    'PATCH',
    `/rest/v1/page_views?id=eq.${body.id}&duration_ms=is.null`,
    { duration_ms: Math.min(Math.trunc(ms), MAX_DURATION_MS) }
  );
}

// ---------------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------------
function supabase(method, path, payload) {
  return fetch(SUPABASE_URL + path, {
    method,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(payload),
  });
}

// Identifica visitantes recurrentes sin guardar datos personales.
// La sal cambia cada día, así que el hash de ayer no se puede cruzar con el de hoy.
async function visitorHash(ip, ua) {
  if (!ip) return null;
  const day = new Date().toISOString().slice(0, 10);
  const data = new TextEncoder().encode(`${ip}|${ua}|${SALT}|${day}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function sourceFrom(referrer, utmSource) {
  if (utmSource) return String(utmSource).toLowerCase().slice(0, 32);
  if (!referrer) return 'directo';

  let host;
  try {
    host = new URL(referrer).hostname.replace(/^www\./, '');
  } catch {
    return 'otro';
  }

  if (host.includes('fixiety.com')) return 'interno';
  if (/instagram|l\.instagram|ig\.me/.test(host)) return 'instagram';
  if (/tiktok/.test(host)) return 'tiktok';
  if (/youtube|youtu\.be/.test(host)) return 'youtube';
  if (/facebook|fb\.me|fb\.com/.test(host)) return 'facebook';
  if (/google/.test(host)) return 'google';
  if (/t\.co|twitter|x\.com/.test(host)) return 'x';
  if (/whatsapp|wa\.me/.test(host)) return 'whatsapp';
  return 'otro';
}

function parseUA(ua) {
  const device = /tablet|ipad|playbook|silk/i.test(ua)
    ? 'tablet'
    : /mobi|iphone|ipod|android.*mobile/i.test(ua)
      ? 'mobile'
      : 'desktop';

  const os = /iphone|ipad|ipod|ios/i.test(ua) ? 'iOS'
    : /android/i.test(ua) ? 'Android'
    : /mac os x/i.test(ua) ? 'macOS'
    : /windows/i.test(ua) ? 'Windows'
    : /linux/i.test(ua) ? 'Linux'
    : null;

  // El orden importa: Edge y Chrome mienten diciendo que son Safari.
  const browser = /edg\//i.test(ua) ? 'Edge'
    : /opr\/|opera/i.test(ua) ? 'Opera'
    : /chrome|crios/i.test(ua) ? 'Chrome'
    : /firefox|fxios/i.test(ua) ? 'Firefox'
    : /safari/i.test(ua) ? 'Safari'
    : null;

  return { device_type: device, os, browser };
}

function decodeCity(value) {
  if (!value) return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function clean(value, max) {
  if (value === undefined || value === null || value === '') return null;
  return String(value).slice(0, max);
}
