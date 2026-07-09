/**
 * Archivo Fixiety — fuente única de datos.
 *
 * Las imágenes son placeholders de Unsplash. Para reemplazarlas por fotografía
 * propia, basta con cambiar el campo `src` (idealmente a rutas locales en
 * /public, p. ej. "/archivo/registro-014.jpg"). No se debe tocar la página:
 * toda la curaduría vive aquí.
 *
 * Campos:
 *  - id          identificador estable
 *  - src         URL o ruta de la imagen
 *  - alt         texto alternativo (accesibilidad)
 *  - category    una de: 'ciudad' | 'nocturno' | 'objetos' | 'movimiento'
 *  - orientation 'vertical' | 'horizontal' (controla el formato en pantalla)
 *  - registro    caption principal, p. ej. "Registro 014"
 *  - lugar        lugar/hora, p. ej. "CDMX — 02:13 AM"
 *  - temporada    p. ej. "Invierno 2026" (opcional)
 *  - nota         caption editorial breve, p. ej. "Objeto encontrado" (opcional)
 */

const UNSPLASH = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const categories = [
  { key: 'todos', es: 'Todos', en: 'All' },
  { key: 'ciudad', es: 'Ciudad', en: 'City' },
  { key: 'nocturno', es: 'Nocturno', en: 'Night' },
  { key: 'objetos', es: 'Objetos', en: 'Objects' },
  { key: 'movimiento', es: 'Movimiento', en: 'Motion' },
  { key: 'colabs', es: 'Colabs', en: 'Collabs' },
];

export const archiveItems = [
  {
    id: 'reg-014',
    src: UNSPLASH('photo-1551887293-297ce7d00177'),
    alt: 'Calle urbana al anochecer',
    category: 'ciudad',
    orientation: 'horizontal',
    registro: 'Registro 014',
    lugar: 'CDMX — 18:40',
    temporada: 'Invierno 2026',
  },
  {
    id: 'reg-021',
    src: UNSPLASH('photo-1620362577783-fb856dfa253d', 1200),
    alt: 'Piñón fijo bajo luz nocturna',
    category: 'nocturno',
    orientation: 'vertical',
    registro: 'Registro 021',
    lugar: 'CDMX — 02:13 AM',
    temporada: 'Invierno 2026',
  },
  {
    id: 'reg-007',
    src: UNSPLASH('photo-1643294778211-a5873bd93f12', 1200),
    alt: 'Detalle de objeto en taller',
    category: 'objetos',
    orientation: 'vertical',
    registro: 'Registro 007',
    lugar: 'Taller',
    temporada: 'Otoño 2025',
    nota: 'Objeto encontrado',
  },
  {
    id: 'reg-033',
    src: UNSPLASH('photo-1678524036151-e732770689fa'),
    alt: 'Ciclista en movimiento sobre piñón fijo',
    category: 'movimiento',
    orientation: 'horizontal',
    registro: 'Registro 033',
    lugar: 'Periférico — 23:50',
    temporada: 'Invierno 2026',
  },
  {
    id: 'reg-045',
    src: UNSPLASH('photo-1556924145-957f113191fd'),
    alt: 'Atravesando la ciudad de noche',
    category: 'nocturno',
    orientation: 'horizontal',
    registro: 'Registro 045',
    lugar: 'CDMX — 03:02 AM',
    temporada: 'Invierno 2026',
  },
  {
    id: 'reg-011',
    src: UNSPLASH('photo-1585174757517-77d9b0c0700d', 1200),
    alt: 'Cuadro urbano matutino',
    category: 'ciudad',
    orientation: 'vertical',
    registro: 'Registro 011',
    lugar: 'Centro — 07:15',
    temporada: 'Otoño 2025',
  },
  {
    id: 'reg-052',
    src: UNSPLASH('photo-1677459373647-c295eb2b4e5e'),
    alt: 'Componentes sobre mesa de trabajo',
    category: 'objetos',
    orientation: 'horizontal',
    registro: 'Registro 052',
    lugar: 'Mesa de trabajo',
    nota: 'Objeto encontrado',
  },
  {
    id: 'reg-028',
    src: UNSPLASH('photo-1583407089395-a820b3ae1541', 1200),
    alt: 'Cuerpo y máquina en tensión',
    category: 'movimiento',
    orientation: 'vertical',
    registro: 'Registro 028',
    lugar: 'Velódromo',
    temporada: 'Invierno 2026',
  },
  {
    id: 'reg-060',
    src: UNSPLASH('photo-1609452200190-0352d82453cb'),
    alt: 'Luces de ciudad en movimiento',
    category: 'nocturno',
    orientation: 'horizontal',
    registro: 'Registro 060',
    lugar: 'Calzada — 01:44 AM',
    temporada: 'Invierno 2026',
  },
];
