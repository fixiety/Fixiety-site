/**
 * FixID — mock de tokens (local, sin base de datos).
 *
 * Sistema de verificación editorial. Cada token representa una pieza catalogada
 * dentro del archivo Fixiety. Las imágenes son placeholders de Unsplash; para
 * reemplazarlas por fotografía propia basta con cambiar `src`.
 *
 * Etiqueta de la red, centralizada para renombrar en un solo lugar.
 */
export const NETWORK_LABEL = 'Registro Fixiety';

const UNSPLASH = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

/**
 * Cada token contiene:
 *  - token    identificador, p. ej. "FX-001"
 *  - pieza    nombre de la pieza
 *  - edicion  edición a la que pertenece
 *  - estado   estado de archivo
 *  - anio     año de registro
 *  - historia historia breve de la pieza (registro editorial)
 *  - src/alt  fotografía placeholder
 */
const tokens = {
  'FX-001': {
    token: 'FX-001',
    pieza: 'Musette',
    edicion: 'Edición 001',
    estado: 'Archivo físico',
    anio: '2026',
    historia:
      'Primera pieza textil del archivo. Cortada y cosida a mano en lona y correa, pensada para cruzar la ciudad sin equipaje extra. Cada musette lleva una costura irregular que la vuelve única e irrepetible.',
    src: UNSPLASH('photo-1540749046540-b7d8f98c7e4c'),
    alt: 'Musette de ciclismo sobre fondo oscuro',
  },
  'FX-002': {
    token: 'FX-002',
    pieza: 'FixID',
    edicion: 'Edición 002',
    estado: 'Registro activo',
    anio: '2026',
    historia:
      'Objeto de registro del archivo. Una etiqueta física que, al tocarla, abre la ficha de su pieza dentro de Fixiety. No guarda datos: solo confirma que el objeto existe y pertenece a una serie. Es la llave entre lo físico y la memoria visual.',
    src: UNSPLASH('photo-1643294778211-a5873bd93f12'),
    alt: 'Objeto físico con tecnología NFC',
  },
  'FX-003': {
    token: 'FX-003',
    pieza: 'Fotociclismo Pro',
    edicion: 'Edición 003',
    estado: 'En proceso',
    anio: '2026',
    historia:
      'Serie fotográfica del archivo. Tomas nocturnas del piñón fijo registradas en calle, sin pose ni producción. Película y sensor capturan el movimiento tal como ocurre: borroso, encontrado, real. El registro permanece abierto: la serie sigue creciendo.',
    src: UNSPLASH('photo-1556924145-957f113191fd'),
    alt: 'Fotografía nocturna de ciclismo urbano',
  },
};

/**
 * Resuelve un token (case-insensitive). Devuelve el registro o null si no existe.
 */
export function getToken(raw) {
  if (!raw) return null;
  return tokens[raw.trim().toUpperCase()] || null;
}

export default tokens;
