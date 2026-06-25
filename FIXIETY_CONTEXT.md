# FIXIETY_CONTEXT

Documento maestro del estado real de Fixiety (junio 2026).  
Úsalo para pasar contexto a Claude, Cursor u otro asistente sin perder el hilo.

---

## 1. Qué es Fixiety

Fixiety es una plataforma editorial y archivo contemporáneo del piñón fijo. Combina fotografía, ciudad, objetos físicos, memoria visual, registros digitales, NFC, propietarios, audio y sesiones privadas.

No debe sentirse como ecommerce, NFT ni app genérica. Debe sentirse como **archivo / museo / editorial**.

**Dirección estética:** negro profundo, fotografía protagonista, mucho espacio negativo, tipografía fuerte, animaciones lentas, ritmo cinematográfico. Español principal; inglés como capa editorial secundaria.

**Evitar:** UI startup, dashboards, ecommerce típico, exceso de botones, estética hacker/gamer.

---

## 2. Stack

| Capa | Tecnología |
|------|------------|
| Frontend | React + Vite en `apps/web` |
| Backend / DB | Supabase (Postgres, Auth, Storage, RPC) |
| Edge Functions | Supabase (`session-view`, `session-download`) |
| Hosting | Vercel |
| Storage | Buckets público (`fixiety-archive`) y privado (`fixiety-sessions`) |
| Dominio | https://fixiety.com |

**Repo:** monorepo npm workspaces. Raíz con scripts `dev`, `build`, `lint`; app principal en `apps/web`.

**Rutas frontend** (`apps/web/src/App.jsx`):

| Ruta | Página |
|------|--------|
| `/` | Home |
| `/entering` | Entering (transición) |
| `/archivo` | Archivo |
| `/ediciones` | Ediciones |
| `/cargando-pelicula` | Cargando Película |
| `/fixid/access` | FixID Access (NFC / secret key) |
| `/fixid/:token` | FixID Object (registro público) |
| `/session/:sessionId` | FixID Session (privada) |

**Archivos clave:**

| Archivo | Rol |
|---------|-----|
| `apps/web/src/pages/FixIdAccessPage.jsx` | Resuelve `?k=` / `?uid=` vía RPC |
| `apps/web/src/pages/FixIdPage.jsx` | Registro de objeto FixID |
| `apps/web/src/pages/SessionPage.jsx` | Sesión privada, galería, descarga |
| `apps/web/src/components/AudioProvider.jsx` | Audio global + track por página |
| `apps/web/src/components/ProtectedImage.jsx` | Imagen con disuasión + prop `natural` |
| `apps/web/src/lib/fixid.js` | sessionStorage (`fixid_access_`, `fixid_session_`) |
| `apps/web/src/lib/instagram.js` | Normaliza `owner_handle` → Instagram |
| `supabase/fixid_sessions.sql` | Esquema sesiones + RPC |
| `supabase/functions/session-view/` | Metadata + signed URLs |
| `supabase/functions/session-download/` | Descarga única de ZIP |

---

## 3. Supabase

**Project ref:** `edelwrzijrnydxrnqhff`  
**URL:** https://edelwrzijrnydxrnqhff.supabase.co

**Tabla principal:** `public.tokens`  
**Vista pública:** `public.tokens_public` (sin `secret_key` ni `nfc_uid`)

**Tablas de sesiones:**

- `photo_sessions`
- `session_assets`
- `session_access`

---

## 4. `public.tokens`

Campos importantes:

| Campo | Uso |
|-------|-----|
| `public_id` | ID público del FixID |
| `secret_key` | Clave privada; nunca exponer al cliente |
| `piece_name` | Nombre de la pieza |
| `edition` | Edición |
| `status` | Estado (ej. CERRADO, ENTREGADO) |
| `year` | Año |
| `city` | Ciudad |
| `series` | Serie |
| `story` | Historia editorial |
| `image_url` | Imagen en bucket público |
| `is_active` | Activo / visible |
| `type` | `object` \| `photo_session` |
| `nfc_uid` | UID del tag NFC (único) |
| `owner_handle` | Propietario (fuente única) |
| `audio_url` | Audio personalizado por FixID |
| `audio_title` | Título del audio personalizado |

**Tipos:**

- `object` — objeto físico FixID (musettes, piezas archivadas)
- `photo_session` — token puerta a sesión privada de fotos

`owner_handle` es la **fuente única** del propietario.  
`audio_url` y `audio_title` permiten canción personalizada por FixID.

---

## 5. `tokens_public`

Debe exponer (en este orden al hacer `CREATE OR REPLACE VIEW`):

```
public_id,
piece_name,
edition,
status,
year,
city,
series,
story,
image_url,
is_active,
owner_handle,
audio_url,
audio_title
```

Con filtro:

```sql
WHERE is_active = true
```

**Importante:** preservar el orden de columnas al recrear la vista. El frontend (`FixIdPage`) lee desde esta vista, no desde `tokens` directamente.

---

## 6. FixID access

**Rutas de acceso:**

```
https://fixiety.com/fixid/access?uid=UID
https://fixiety.com/fixid/access?k=SECRET_KEY
```

**NFC — escribir siempre:**

```
https://fixiety.com/fixid/access?uid={TAG-ID}
```

**Nunca:**

- escribir directo `/fixid/{public_id}` en el tag
- agregar espacios después de `?`

**RPC:**

```sql
fixid_begin_access(k text default null, uid text default null)
```

Debe resolver:

- `secret_key` si viene `k`
- `nfc_uid` si viene `uid`
- normaliza UID quitando `:` y usando `UPPER`

**Flujo:**

1. `FixIdAccessPage` llama al RPC.
2. Si `type = photo_session` → crea token efímero en `session_access`, guarda en `sessionStorage` (`fixid_session_{sessionId}`), redirige a `/session/{public_id}`.
3. Si `type = object` → guarda acceso temporal (`fixid_access_{publicId}`, TTL 2 h), redirige a `/fixid/{public_id}`.

SQL en: `supabase/fixid_sessions.sql`

---

## 7. Audio

**Sistema actual:**

- `AudioProvider` global en `App.jsx`
- Audio global default:

```
https://edelwrzijrnydxrnqhff.supabase.co/storage/v1/object/public/fixiety-archive/ambient-001.mp3
```

**Regla:**

- Si un FixID tiene `audio_url`, usa esa canción.
- Si no tiene `audio_url`, usa `ambient-001.mp3`.

**Botón de sonido:**

- Estado inicial apagado
- `SONIDO OFF` visible
- `SONIDO ON` al activar
- Auto-hide a los 4.5 s cuando está encendido
- Tocar la zona del botón lo vuelve a mostrar
- Título del track solo aparece cuando el sonido está encendido
- Preferencia on/off persistida en `localStorage` (`fixiety_audio_on`)

**Fuentes de audio:**

- Objetos FixID → `tokens_public.audio_url` / `audio_title` (`FixIdPage`)
- Sesiones privadas → `session-view` devuelve `audio_url` / `audio_title` desde `public.tokens` (`SessionPage`)

Si se modifica lo que `session-view` devuelve:

```bash
supabase functions deploy session-view --no-verify-jwt
```

---

## 8. Owner / Propietario

`owner_handle` vive en `public.tokens`.  
Se muestra como **PROPIETARIO** en la UI.

Puede ser:

- `@usuario`
- `usuario`
- URL de Instagram

Frontend normaliza y linkea vía `apps/web/src/lib/instagram.js` + `OwnerHandleLink.jsx`.

**Funciona en:**

- FixID objects (`FixIdPage`)
- FixID Sessions (`session-view` → `SessionPage`)

**Permiso necesario (ya aplicado):**

```sql
GRANT SELECT ON public.tokens TO service_role;
```

(`session-view` lee `owner_handle` con service role.)

---

## 9. Sesiones privadas FixID

**Bucket privado:** `fixiety-sessions`

**Estructura:**

```
fixiety-sessions/
  SESSION-ID/
    cover.jpg
    session.zip
    photos/
      01.jpg
      02.jpg
      03.jpg
```

**Edge Functions:**

| Función | Rol |
|---------|-----|
| `session-view` | Metadata, cover signed, assets signed, owner/audio desde tokens |
| `session-download` | Descarga única de `session.zip` |

**`session-view` devuelve:**

- Metadata de sesión (`photo_sessions`)
- `cover_url` (signed, TTL ~1 h)
- `assets[]` con URLs signed
- `owner_handle`, `audio_url`, `audio_title` desde `public.tokens` vía `token_public_id`
- **No** expone `secret_key` ni `nfc_uid`

**`session-download`:**

- Valida token efímero
- Controla descarga única vía RPC `session_consume_download`
- Sirve `session.zip`

**sessionStorage:** prefijo `fixid_session_` (ver `apps/web/src/lib/fixid.js`)

**Ruta frontend:** `/session/:sessionId`

---

## 10. Cycle Cult

| Campo | Valor |
|-------|-------|
| Estado | CERRADO / ENTREGADO |
| `public_id` | `SESSION-CYCLECULT-ROLL01-001` |
| `type` | `photo_session` |
| UID | `04:14:47:7F:BF:2A:81` |
| Owner | `@danirckx` |
| Audio | Cycle Cult 001 |

**Funciona:**

- Tag NFC entregado
- Acceso por UID
- Sesión privada
- Fotos
- Cover
- Audio
- Owner
- Descarga reseteable

**NFC escrito:**

```
https://fixiety.com/fixid/access?uid=04:14:47:7F:BF:2A:81
```

**SQL reset descarga:**

```sql
UPDATE public.photo_sessions
SET
  download_count = 0,
  downloaded_at = NULL
WHERE public_id = 'SESSION-CYCLECULT-ROLL01-001';
```

---

## 11. Musettes existentes

| public_id | UID | Notas |
|-----------|-----|-------|
| `MUS-CLASSIC-V1-001` | `5A:51:2C:8D:55:41:89` | owner: `@pandandy420`, audio: `mus-v1-001.mp3` |
| `MUS-CLASSIC-V2-001` | `5A:A1:11:8F:55:41:89` | owner: `@aiko.coop`, image: `mus-classic-v2-001.jpg` |
| `MUS-CLASSIC-V2-002` | `5A:E1:9A:91:55:41:89` | |
| `MUS-CLASSIC-V2-003` | `5A:F1:9A:91:55:41:89` | |
| `MUS-CLASSIC-V2-004` | `5A:D1:1A:90:55:41:89` | owner: `@pandandy420` |
| `MUS-CLASSIC-V2-005` | `5A:A1:07:8C:55:41:89` | |
| `MUS-CLASSIC-V2-006` | `04:DF:F2:10:BF:2A:81` | |
| `MUS-CLASSIC-V2-007` | `04:DE:F2:10:BF:2A:81` | audio personalizado probado |

Todos los tags NFC deben apuntar a `/fixid/access?uid=...`, no a `/fixid/{public_id}`.

---

## 12. Home

Home usa foto real:

```
fixiety-archive/home-hero-001.jpg
```

La Home se maneja como pieza editorial con scroll y foto real (`HomePage.jsx`):

- **Mobile:** hero sticky `object-cover`, fade intermedio
- **Desktop:** foto completa en scroll (`object-contain`, altura generosa), contenido (FIXIETY + ENTRAR) después de la foto

**Intención visual:**

- negro
- archivo
- fotografía protagonista
- no ecommerce
- no tech genérico

El degradado fuerte puede integrarse desde Lightroom en cada foto, no necesariamente por CSS.

---

## 13. Galerías / imágenes

### FixID object (`FixIdPage`)

Las fotos verticales deben verse **completas**, no recortadas:

```
max-h-[80vh] object-contain
```

### SessionPage (galería privada)

Estado actual (jun 2026):

- Masonry CSS: `columns-1 md:columns-2`
- `ProtectedImage` con prop `natural` → `h-auto object-contain` (proporciones naturales, sin crop)
- Lightbox al click
- Watermark con `registry_id`
- **Mobile:** espaciado amplio (`mb-10`, `gap-10`) para que respire
- **Desktop:** `md:mb-6`, `md:gap-6`, dos columnas

Se probó un layout editorial “museo” por orientación; **se revirtió en desktop** (`git revert acc8483`). Solo quedó el ajuste de espaciado mobile.

**Regla actual:** prioridad en fluidez y estabilidad sobre layout experimental. No recortar imágenes.

---

## 14. Storage

### Bucket público: `fixiety-archive`

Usos:

- imágenes públicas
- Home (`home-hero-001.jpg`)
- Archivo
- Ediciones
- imágenes de tokens
- audios públicos (`ambient-001.mp3`, tracks por FixID)

### Bucket privado: `fixiety-sessions`

Usos:

- sesiones privadas
- `cover.jpg`
- `photos/`
- `session.zip`

Las rutas en `session_assets.image_url` son **paths relativos** dentro del bucket, no URLs públicas.

---

## 15. Comandos importantes

**Node PATH** (si `npm` no está en PATH):

```bash
export PATH="$HOME/.local/node-v22.14.0-darwin-arm64/bin:$PATH"
```

**Build:**

```bash
cd apps/web
npm install
npm run build
cd ../..
```

**Deploy Edge Functions:**

```bash
supabase functions deploy session-view --no-verify-jwt
supabase functions deploy session-download --no-verify-jwt
```

**Git:**

```bash
git status
git push origin main
```

**Limpiar archivo temporal Supabase:**

```bash
git restore supabase/.temp/cli-latest
```

---

## 16. Qué NO tocar sin cuidado

No modificar sin revisar todo el flujo:

- `fixid_begin_access`
- `session-download`
- lógica de descarga única
- storage privado (`fixiety-sessions`)
- lógica UID / `secret_key`
- `tokens_public` (preservar orden de columnas)
- permisos `service_role`
- rutas existentes
- formato URL NFC (`/fixid/access?uid=...`)

No correr `npm audit fix` sin revisar.

---

## 17. Pendientes actuales

1. Vestir body de página con fotos reales.
2. Subir fotos reales a `fixiety-archive`.
3. Actualizar Home / Archivo / Ediciones.
4. Actualizar `image_url` de tokens importantes.
5. Actualizar `owner_handle` reales.
6. Crear checklist maestro de entrega FixID.
7. Crear SQL base para nuevos objetos.
8. Crear SQL base para nuevas sesiones privadas.
9. Crear manual operativo Fixiety.
10. Preparar packaging:
    - etiqueta
    - guía / tríptico
    - mini certificado de registro

---

## 18. Prioridad antes de terminar suscripción

Dejar documentación y moldes:

| Documento | Estado |
|-----------|--------|
| `FIXIETY_CONTEXT.md` | Este archivo |
| `FIXID_DELIVERY_CHECKLIST.md` | Pendiente |
| `SQL_TEMPLATES.md` | Pendiente |
| `OPERATIONS_MANUAL.md` | Pendiente |
| `PACKAGING_COPY.md` | Pendiente |

**No meter features grandes nuevas hasta documentar.**

Otros docs en repo (referencia, no sustituyen este contexto): `FIXIETY_PRINCIPLES.md`, `ROADMAP.md`, `PRO_MONTH_SPRINT.md`.

---

## Commits recientes relevantes (galería / home / audio)

```
e17be7b improve mobile session gallery spacing
cdac06b Revert "refine session gallery museum layout"
167cf4c improve session gallery image proportions
d014e3a auto hide audio controls while playing
5853c74 make home hero full photo scroll
6b4e8c8 show FixID owner Instagram links
```
