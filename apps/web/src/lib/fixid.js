/**
 * FixID — configuración y acceso temporal.
 *
 * No hay base de datos de usuarios ni login. El "acceso completo" a una ficha
 * se concede de forma temporal vía sessionStorage cuando se entra por la ruta
 * /fixid/access?k=SECRET_KEY (la clave se resuelve server-side y nunca queda en
 * la URL final). Si se copia la URL limpia /fixid/PUBLIC_ID sin acceso temporal,
 * se muestra la versión pública limitada.
 */
export const NETWORK_LABEL = 'Registro Fixiety';

const PREFIX = 'fixid_access_';
const TTL_MS = 1000 * 60 * 60 * 2; // acceso temporal: 2 horas

export function grantAccess(publicId) {
  if (!publicId) return;
  try {
    sessionStorage.setItem(PREFIX + publicId, String(Date.now()));
  } catch (e) {
    // sessionStorage no disponible (modo privado u otros) — quedará como público
  }
}

export function hasAccess(publicId) {
  if (!publicId) return false;
  try {
    const ts = sessionStorage.getItem(PREFIX + publicId);
    if (!ts) return false;
    return Date.now() - Number(ts) < TTL_MS;
  } catch (e) {
    return false;
  }
}

/* --- FixID Sessions (Opción B): token efímero emitido por el servidor --- */
const SESSION_PREFIX = 'fixid_session_';

export function storeSessionToken(sessionId, token) {
  if (!sessionId || !token) return;
  try {
    sessionStorage.setItem(SESSION_PREFIX + sessionId, token);
  } catch (e) {
    // sessionStorage no disponible
  }
}

export function getSessionToken(sessionId) {
  if (!sessionId) return null;
  try {
    return sessionStorage.getItem(SESSION_PREFIX + sessionId);
  } catch (e) {
    return null;
  }
}

export function clearSessionToken(sessionId) {
  if (!sessionId) return;
  try {
    sessionStorage.removeItem(SESSION_PREFIX + sessionId);
  } catch (e) {
    // noop
  }
}
