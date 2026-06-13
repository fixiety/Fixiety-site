/**
 * Normaliza un owner_handle a su forma de Instagram.
 *
 * Acepta cualquiera de estas formas:
 *   @aiko.coop
 *   aiko.coop
 *   https://www.instagram.com/aiko.coop/
 *   https://instagram.com/aiko.coop/
 *
 * Devuelve { display, href } o null si está vacío/ inválido.
 *   display -> siempre "@usuario"
 *   href    -> "https://www.instagram.com/usuario/"
 */
export function parseInstagram(raw) {
  if (!raw) return null;

  let s = String(raw).trim();
  if (!s) return null;

  // Si viene como URL de instagram, extraer el handle del path.
  const urlMatch = s.match(/instagram\.com\/([^/?#]+)/i);
  if (urlMatch) {
    s = urlMatch[1];
  }

  // Quitar @ inicial y barras/espacios sobrantes.
  s = s.replace(/^@+/, '').replace(/\/+$/, '').trim();

  if (!s) return null;

  return {
    display: `@${s}`,
    href: `https://www.instagram.com/${s}/`,
  };
}
