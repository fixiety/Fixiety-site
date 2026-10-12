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
    src: 'https://edelwrzijrnydxrnqhff.supabase.co/storage/v1/object/public/fixiety-archive/musette-bosque-001.jpg',
    alt: 'Rider de espaldas con la musette Fixiety cruzada al pecho, en un bosque',
    orientation: 'horizontal',
  },
  {
    id: 'ed-002',
    edicion: 'Edición 002',
    titulo: 'FixID',
    descripcion: 'Objeto físico ligado a un rastro digital. Se toca, se accede.',
    estado: 'Registro activo',
    src: 'https://edelwrzijrnydxrnqhff.supabase.co/storage/v1/object/public/fixiety-archive/fixid-pendiente.jpg',
    alt: 'FixID — registro fotográfico en proceso',
    orientation: 'vertical',
  },
  {
    id: 'ed-003',
    edicion: 'Edición 003',
    titulo: 'Fotociclismo Pro',
    descripcion: 'Registro visual del movimiento fijo. Mirada nocturna, evidencia urbana.',
    estado: 'En proceso',
    src: 'https://edelwrzijrnydxrnqhff.supabase.co/storage/v1/object/public/fixiety-archive/fotociclismo-pro-2026-002.jpg',
    alt: 'Manos de un rider sobre el manubrio de una bici de pista, de noche, con luces de tráfico desenfocadas',
    orientation: 'vertical',
  },
];
