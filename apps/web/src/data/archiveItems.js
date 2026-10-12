// Archivo — fuente única de registros.
// Las fotos viven en el bucket público `fixiety-archive` (Supabase Storage).
// Para añadir un registro: sube la foto al bucket y agrega un objeto abajo.
// "Por documentar" = lugar/fecha pendientes de confirmar (buscar: PENDIENTE).

const BUCKET =
  'https://edelwrzijrnydxrnqhff.supabase.co/storage/v1/object/public/fixiety-archive/';
const img = (file) => `${BUCKET}${file}`;

export const categories = [
  { key: 'todos', es: 'Todos', en: 'All' },
  { key: 'ciudad', es: 'Ciudad', en: 'City' },
  { key: 'nocturno', es: 'Nocturno', en: 'Night' },
  { key: 'objetos', es: 'Objetos', en: 'Objects' },
  { key: 'movimiento', es: 'Movimiento', en: 'Movement' },
  { key: 'colabs', es: 'Colabs', en: 'Collabs' },
  { key: 'secuencias', es: 'Secuencias', en: 'Sequences' },
];

// Orden de lectura en "Todos". Cada 4.ª placa horizontal se vuelve Featured.
// El número de registro es permanente: no se reasigna.
export const archiveItems = [
  {
    id: 'reg-009',
    src: img('bici-amarilla-neon-001.jpg'),
    alt: 'Bici de pista amarilla recargada en un muro bajo un letrero rojo luminoso, de noche, con el reflejo de un coche en primer plano',
    category: 'nocturno',
    orientation: 'vertical',
    registro: 'Registro 009',
    lugar: 'Por documentar', // PENDIENTE: lugar y fecha
  },
  {
    id: 'reg-002',
    src: img('ciudad-torreon-2024-001.jpg'),
    alt: 'Rider caminando su bici fija rosa neón por un callejón con grafitis, visto entre dos cortinas metálicas',
    category: 'ciudad',
    orientation: 'vertical',
    registro: 'Registro 002',
    lugar: 'Torreón',
    temporada: '2024',
  },
  {
    id: 'reg-011',
    src: img('sugino75-detalle-001.jpg'),
    alt: 'Detalle de un plato y una biela Sugino 75 negros, mojados de lluvia, sobre un cuadro plateado',
    category: 'objetos',
    orientation: 'vertical',
    registro: 'Registro 011',
    lugar: 'Por documentar', // PENDIENTE: lugar y fecha
    nota: 'Sugino 75 — detalle',
  },
  {
    id: 'reg-010',
    src: img('riders-muro-verde-001.jpg'),
    alt: 'Un rider de pie bajo una luz verde junto a dos bicis recargadas en un muro, de noche',
    category: 'nocturno',
    orientation: 'horizontal',
    registro: 'Registro 010',
    lugar: 'Por documentar', // PENDIENTE: lugar y fecha
  },
  {
    id: 'reg-005',
    src: img('ciudad-torreon-2024-006.jpg'),
    alt: 'Pasillo oscuro entre cortinas metálicas con un árbol y una bici rosa que apenas asoma al fondo',
    category: 'ciudad',
    orientation: 'vertical',
    registro: 'Registro 005',
    lugar: 'Torreón',
    temporada: '2024',
  },
  {
    id: 'reg-012',
    src: img('bici-plata-posters-001.jpg'),
    alt: 'Bici plateada colgada contra una pared, junto a un poste cubierto de carteles',
    category: 'objetos',
    orientation: 'vertical',
    registro: 'Registro 012',
    lugar: 'Por documentar', // PENDIENTE: lugar y fecha
  },
  {
    id: 'reg-006',
    src: img('ciudad-torreon-2024-007.jpg'),
    alt: 'Rider sentado en la banqueta con casco y gafas, junto a su bici rosa recargada en un muro de cantera',
    category: 'ciudad',
    orientation: 'vertical',
    registro: 'Registro 006',
    lugar: 'Torreón',
    temporada: '2024',
  },
  {
    id: 'reg-001',
    src: img('ciudad-bellas-artes-cdmx-2023-001.jpg'),
    alt: 'Tres bicis de pista sobre unos escalones frente a edificios, en blanco y negro',
    category: 'ciudad',
    orientation: 'horizontal',
    registro: 'Registro 001',
    lugar: 'Bellas Artes, CDMX',
    temporada: '2023',
  },
  {
    id: 'reg-003',
    src: img('ciudad-torreon-2024-004.jpg'),
    alt: 'Rider pedaleando a lo lejos en un túnel iluminado, con un auto plateado al fondo',
    category: 'movimiento',
    orientation: 'vertical',
    registro: 'Registro 003',
    lugar: 'Torreón',
    temporada: '2024',
  },
  {
    id: 'reg-013',
    src: img('anchor-track-blanca-001.jpg'),
    alt: 'Bici de pista Anchor blanca recargada en un poste, con macetas al fondo y luz cálida',
    category: 'objetos',
    orientation: 'horizontal',
    registro: 'Registro 013',
    lugar: 'Por documentar', // PENDIENTE: lugar y fecha
    nota: 'Anchor — pista',
  },
  {
    id: 'reg-004',
    src: img('ciudad-torreon-2024-005.jpg'),
    alt: 'Rider caminando su bici rosa al fondo de un callejón, enmarcado por dos cortinas metálicas',
    category: 'ciudad',
    orientation: 'vertical',
    registro: 'Registro 004',
    lugar: 'Torreón',
    temporada: '2024',
  },
  {
    id: 'reg-014',
    src: img('cinelli-noche-pavimento-001.jpg'),
    alt: 'Bici Cinelli negra tirada sobre el pavimento de noche, rodeada de otras bicis y sus sombras',
    category: 'objetos',
    orientation: 'horizontal',
    registro: 'Registro 014',
    lugar: 'Por documentar', // PENDIENTE: lugar y fecha
    nota: 'Cinelli — noche',
  },
  {
    id: 'reg-008',
    src: img('colabs-cnbn-cdmx-2026-001.jpg'),
    alt: 'Bici de pista plateada recargada contra una pared de tablones de madera, en blanco y negro',
    category: 'colabs',
    orientation: 'horizontal',
    registro: 'Registro 008',
    lugar: 'CDMX',
    temporada: '2026',
    nota: 'Colab — CNBN',
  },
  {
    id: 'reg-007',
    src: img('ciudad-torreon-2024-008.jpg'),
    alt: 'Rider de espaldas pedaleando por un túnel iluminado, con su sombra proyectada en la pared',
    category: 'movimiento',
    orientation: 'horizontal',
    registro: 'Registro 007',
    lugar: 'Torreón',
    temporada: '2024',
  },

  // ── Secuencias ─────────────────────────────────────────────────────────
  // Fotogramas de una misma escena. No aparecen en "Todos", solo en su pestaña.
  // Secuencia 01 — Callejón, Torreón 2024
  {
    id: 'seq-01-1',
    src: img('ciudad-torreon-2024-001.jpg'),
    alt: 'Rider caminando su bici fija rosa neón por un callejón, fotograma 1',
    category: 'secuencias',
    orientation: 'vertical',
    registro: 'Secuencia 01',
    lugar: 'Torreón',
    temporada: '2024',
    nota: 'Fotograma 1 de 4',
  },
  {
    id: 'seq-01-2',
    src: img('ciudad-torreon-2024-002.jpg'),
    alt: 'Rider caminando su bici fija rosa neón por un callejón, fotograma 2, encuadre más cerrado',
    category: 'secuencias',
    orientation: 'vertical',
    registro: 'Secuencia 01',
    lugar: 'Torreón',
    temporada: '2024',
    nota: 'Fotograma 2 de 4',
  },
  {
    id: 'seq-01-3',
    src: img('ciudad-torreon-2024-003.jpg'),
    alt: 'Rider caminando su bici fija rosa neón por un callejón, fotograma 3',
    category: 'secuencias',
    orientation: 'vertical',
    registro: 'Secuencia 01',
    lugar: 'Torreón',
    temporada: '2024',
    nota: 'Fotograma 3 de 4',
  },
  {
    id: 'seq-01-4',
    src: img('ciudad-torreon-2024-005.jpg'),
    alt: 'Rider caminando su bici rosa al fondo del callejón, fotograma 4, encuadre abierto',
    category: 'secuencias',
    orientation: 'vertical',
    registro: 'Secuencia 01',
    lugar: 'Torreón',
    temporada: '2024',
    nota: 'Fotograma 4 de 4',
  },
  // Secuencia 02 — Muro verde, de noche
  {
    id: 'seq-02-1',
    src: img('riders-calle-wide-001.jpg'),
    alt: 'Un rider de pie bajo una luz verde junto a dos bicis recargadas en un muro, plano abierto',
    category: 'secuencias',
    orientation: 'horizontal',
    registro: 'Secuencia 02',
    lugar: 'Por documentar', // PENDIENTE: lugar y fecha
    nota: 'Fotograma 1 de 3',
  },
  {
    id: 'seq-02-2',
    src: img('riders-muro-verde-001.jpg'),
    alt: 'Un rider de pie bajo una luz verde junto a dos bicis recargadas en un muro, plano medio',
    category: 'secuencias',
    orientation: 'horizontal',
    registro: 'Secuencia 02',
    lugar: 'Por documentar', // PENDIENTE: lugar y fecha
    nota: 'Fotograma 2 de 3',
  },
  {
    id: 'seq-02-3',
    src: img('riders-calle-close-001.jpg'),
    alt: 'Un rider de pie junto a dos bicis recargadas en un muro verde, plano cerrado con grano',
    category: 'secuencias',
    orientation: 'horizontal',
    registro: 'Secuencia 02',
    lugar: 'Por documentar', // PENDIENTE: lugar y fecha
    nota: 'Fotograma 3 de 3',
  },
];
