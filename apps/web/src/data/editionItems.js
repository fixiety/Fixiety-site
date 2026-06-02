/**
 * Ediciones Fixiety — fuente única de datos.
 *
 * Objetos archivados, no productos. Las imágenes son placeholders de Unsplash.
 * Para reemplazarlas por fotografía propia basta con cambiar `src` (idealmente a
 * rutas locales en /public, p. ej. "/ediciones/edicion-001.jpg"). La página no
 * se debe tocar: toda la curaduría vive aquí.
 *
 * Campos:
 *  - id           identificador estable
 *  - edicion      caption principal, p. ej. "Edición 001"
 *  - titulo       nombre de la pieza
 *  - descripcion  descripción mínima, editorial (no comercial)
 *  - estado       estado de archivo, p. ej. "Archivo físico" / "En proceso"
 *  - src          URL o ruta de la imagen
 *  - alt          texto alternativo (accesibilidad)
 *  - orientation  'vertical' | 'horizontal'
 */

const UNSPLASH = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const editionItems = [
  {
    id: 'ed-001',
    edicion: 'Edición 001',
    titulo: 'Musette',
    descripcion: 'Pieza textil para atravesar la ciudad. Construida a mano, una a una.',
    estado: 'Archivo físico',
    src: UNSPLASH('photo-1540749046540-b7d8f98c7e4c'),
    alt: 'Musette de ciclismo sobre fondo oscuro',
    orientation: 'horizontal',
  },
  {
    id: 'ed-002',
    edicion: 'Edición 002',
    titulo: 'FixID',
    descripcion: 'Objeto físico ligado a un rastro digital. Se toca, se accede.',
    estado: 'Registro activo',
    src: UNSPLASH('photo-1643294778211-a5873bd93f12', 1200),
    alt: 'Objeto físico con tecnología NFC',
    orientation: 'vertical',
  },
  {
    id: 'ed-003',
    edicion: 'Edición 003',
    titulo: 'Fotociclismo Pro',
    descripcion: 'Registro visual del movimiento fijo. Mirada nocturna, evidencia urbana.',
    estado: 'En proceso',
    src: UNSPLASH('photo-1556924145-957f113191fd'),
    alt: 'Fotografía nocturna de ciclismo urbano',
    orientation: 'horizontal',
  },
];
