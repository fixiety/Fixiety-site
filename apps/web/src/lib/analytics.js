// =====================================================================
// FIXIETY · Analítica — cliente
// Ubicación en el repo: apps/web/src/lib/analytics.js
// =====================================================================

const ENDPOINT = '/api/track';
const SESSION_KEY = 'fx_sid';
const SESSION_TTL = 30 * 60 * 1000; // 30 min de inactividad cierran la sesión
const RESPECT_DNT = false;          // ponlo en true si quieres honrar "Do Not Track"

// --- Rutas → entidad ------------------------------------------------
// Ajusta estas expresiones a tus rutas reales. Sirven para que el ranking
// de registros y ediciones se llene solo, sin tocar cada página.
const ENTITY_PATTERNS = [
  // /fixid/:token — la pieza registrada. Se excluye /fixid/access, que es
  // la pantalla de entrada por NFC, no una pieza.
  { re: /^\/fixid\/(?!access\b)([\w-]+)/i, type: 'fixid' },
  // /session/:sessionId — sesiones de archivo.
  { re: /^\/session\/([\w-]+)/i, type: 'session' },
];

let current = null;   // { id, path, start, sent, timer }
let listening = false;

// ---------------------------------------------------------------------
// API pública
// ---------------------------------------------------------------------

export function trackPageView(path, entity) {
  if (!enabled()) return;

  endCurrentView();
  attachListeners();

  const id = crypto.randomUUID();
  const payload = {
    t: 'view',
    id,
    sid: sessionId(),
    path,
    ref: document.referrer || null,
    utm: readUtm(),
    entity: entity || entityFromPath(path),
    lang: navigator.language,
    sw: window.screen?.width,
  };

  // Se envía con 60 ms de retraso para que una página que declara su
  // entidad al montar (setEntity) alcance a hacerlo antes del envío.
  const timer = setTimeout(() => send(payload), 60);
  current = { id, path, start: Date.now(), sent: false, timer, payload };
}

// Llámalo desde una página cuando el ID no se puede deducir de la ruta.
export function setEntity(type, id) {
  if (!current || !current.payload) return;
  current.payload.entity = { type, id: String(id) };
}

// Registra un tap de FixID. Esto sí queda ligado a una persona.
export function trackFixidTap({ tokenUid, ownerHandle }) {
  if (!enabled() || !tokenUid) return;
  send({
    t: 'fixid',
    id: crypto.randomUUID(),
    sid: sessionId(),
    token_uid: tokenUid,
    owner_handle: ownerHandle || null,
  });
}

// ---------------------------------------------------------------------
// Interno
// ---------------------------------------------------------------------

function enabled() {
  if (typeof window === 'undefined') return false;
  if (RESPECT_DNT && navigator.doNotTrack === '1') return false;
  return true;
}

function sessionId() {
  const now = Date.now();
  let stored = null;

  try {
    stored = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  } catch {
    stored = null;
  }

  const fresh = stored && now - stored.ts < SESSION_TTL;
  const value = { id: fresh ? stored.id : crypto.randomUUID(), ts: now };

  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(value));
  } catch {
    // Modo privado sin almacenamiento: la sesión dura lo que dure la carga.
  }

  return value.id;
}

function readUtm() {
  const q = new URLSearchParams(window.location.search);
  return {
    source: q.get('utm_source'),
    medium: q.get('utm_medium'),
    campaign: q.get('utm_campaign'),
  };
}

function entityFromPath(path) {
  for (const { re, type } of ENTITY_PATTERNS) {
    const match = path.match(re);
    if (match) return { type, id: match[1] };
  }
  return null;
}

function endCurrentView() {
  if (!current || current.sent) return;
  current.sent = true;

  // Si la persona se fue antes de que saliera el alta, la mandamos ya.
  clearTimeout(current.timer);
  if (Date.now() - current.start < 60) send(current.payload);

  send({ t: 'end', id: current.id, ms: Date.now() - current.start });
  current = null;
}

function attachListeners() {
  if (listening) return;
  listening = true;

  // pagehide cubre el cierre y la navegación; visibilitychange cubre
  // el caso real en móvil: cambiar de app sin cerrar la pestaña.
  window.addEventListener('pagehide', endCurrentView);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') endCurrentView();
  });
}

function send(payload) {
  const body = JSON.stringify(payload);

  // sendBeacon sobrevive al cierre de la pestaña; fetch es el respaldo.
  if (navigator.sendBeacon) {
    const ok = navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' }));
    if (ok) return;
  }

  fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {});
}
