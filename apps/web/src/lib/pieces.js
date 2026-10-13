// Pieza activada: objeto FixID activo, con foto (vendida y entregada).
// La usan la lista /fixid y el contador del inicio, para que cuenten lo mismo.
export function isActivatedPiece(token) {
  if (!token) return false;
  if (token.type && token.type !== 'object') return false;
  if (String(token.public_id || '').startsWith('SESSION-')) return false;
  if (token.is_active === false) return false;
  return Boolean(String(token.image_url || '').trim());
}
