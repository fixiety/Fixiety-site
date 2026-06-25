# OPERATIONS_MANUAL

Manual operativo de Fixiety — cómo operar el proyecto día a día sin depender de ChatGPT Plus ni Cursor avanzado.

**Documentos relacionados:** `FIXIETY_CONTEXT.md` · `FIXID_DELIVERY_CHECKLIST.md` · `SQL_TEMPLATES.md` · `PACKAGING_COPY.md`

---

## 1. Propósito del manual

Este manual explica cómo operar Fixiety: crear registros FixID, subir fotos, asignar propietarios, asignar audio, crear sesiones privadas, probar NFC y entregar piezas.

Fixiety no debe tratarse como ecommerce ni app genérica. Es un **archivo editorial** de fotografía, ciudad, objetos y memoria del piñón fijo.

---

## 2. Repositorio y estructura

**Repo local:**

```
/Users/panda/Desktop/Fixiety Proyect/Fixiety.com/Codigo Base/horizons-export-90802552-2955-43cb-b62b-328449576777
```

**Web:** `apps/web`

**Documentación importante:**

| Archivo | Uso |
|---------|-----|
| `FIXIETY_CONTEXT.md` | Contexto maestro del proyecto |
| `FIXID_DELIVERY_CHECKLIST.md` | Checklist por entrega |
| `SQL_TEMPLATES.md` | SQL copy/paste para Supabase |
| `OPERATIONS_MANUAL.md` | Este manual |
| `PACKAGING_COPY.md` | Textos para packaging físico |

**Archivos clave del código:**

| Archivo | Rol |
|---------|-----|
| `apps/web/src/App.jsx` | Rutas y shell de la app |
| `apps/web/src/components/AudioProvider.jsx` | Audio global + track por página |
| `apps/web/src/pages/FixIdAccessPage.jsx` | Entrada NFC / secret key |
| `apps/web/src/pages/FixIdPage.jsx` | Registro de objeto FixID |
| `apps/web/src/pages/SessionPage.jsx` | Sesión privada, galería, descarga |
| `supabase/fixid_sessions.sql` | Esquema sesiones + RPC |
| `supabase/functions/session-view/index.ts` | Metadata + signed URLs |
| `supabase/functions/session-download/index.ts` | Descarga única de ZIP |

**Dominio en producción:** https://fixiety.com

---

## 3. Comandos base

**Antes de usar npm** (si no está en PATH):

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

**Git:**

```bash
git status
git add ARCHIVO
git commit -m "mensaje"
git push origin main
```

**Limpiar archivo temporal de Supabase** (evita ruido en `git status`):

```bash
git restore supabase/.temp/cli-latest
```

**No correr** `npm audit fix` sin revisar.

---

## 4. Supabase

| Campo | Valor |
|-------|-------|
| Project ref | `edelwrzijrnydxrnqhff` |
| URL | https://edelwrzijrnydxrnqhff.supabase.co |

**Tabla principal:** `public.tokens`  
**Vista pública:** `public.tokens_public` (sin `secret_key` ni `nfc_uid`)

**Tablas privadas:**

- `photo_sessions`
- `session_assets`
- `session_access`

**Buckets:**

| Bucket | Acceso | Uso |
|--------|--------|-----|
| `fixiety-archive` | Público | Home, Archivo, Ediciones, imágenes FixID, audios |
| `fixiety-sessions` | Privado | Sesiones: cover, photos, session.zip |

Operar SQL desde el **SQL Editor** de Supabase. Plantillas en `SQL_TEMPLATES.md`.

---

## 5. Cómo crear un FixID objeto

Flujo paso a paso:

1. Leer UID del tag NFC.
2. Verificar que el UID no exista (`SQL_TEMPLATES.md` §1).
3. Crear registro en `public.tokens` (`type = object`).
4. Subir imagen pública a `fixiety-archive`.
5. Actualizar `image_url` en `public.tokens`.
6. Asignar `owner_handle` si aplica.
7. Asignar `audio_url` y `audio_title` si aplica.
8. Probar acceso por UID.
9. Probar acceso por secret key.
10. Escribir NFC en el tag.
11. Probar tag físico (tap en celular).
12. Entregar pieza.

**Formato NFC (obligatorio en tag físico):**

```
https://fixiety.com/fixid/access?uid={TAG-ID}
```

**Reglas:**

- No usar `/fixid/{public_id}` en el tag.
- No poner espacios después de `?`.
- Usar `uid=` en tag; `k=` solo para pruebas internas con secret key.

Checklist detallado: `FIXID_DELIVERY_CHECKLIST.md` → sección objeto.

---

## 6. Cómo crear una sesión privada FixID

Flujo paso a paso:

1. Crear token en `public.tokens` con `type = photo_session`.
2. Crear fila en `photo_sessions` (`token_public_id` = `public_id` del token).
3. Subir archivos al bucket privado `fixiety-sessions`.
4. Registrar assets en `session_assets` y `cover_image_url` si aplica.
5. Probar `session-view` (cover + fotos + owner + audio).
6. Probar descarga de `session.zip`.
7. Resetear descarga antes de entregar (§11).
8. Escribir NFC con formato `uid=`.
9. Probar tag físico.
10. Entregar pieza.

**Estructura de Storage:**

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

Las rutas en `session_assets.image_url` y `cover_image_url` son **paths relativos** dentro del bucket, no URLs públicas.

Checklist detallado: `FIXID_DELIVERY_CHECKLIST.md` → sección sesión.

---

## 7. Cómo subir fotos públicas

**Bucket:** `fixiety-archive`

**Usos:**

- Home
- Archivo
- Ediciones
- Imágenes de FixID objects
- Audios públicos

**Export recomendado:**

| Uso | Formato / tamaño |
|-----|------------------|
| Home | JPG 1800–2400 px, calidad 85–92, sRGB |
| Archivo | JPG/WEBP 1800–2400 px |
| FixID object | JPG/WEBP 2000–2400 px |
| Audio | MP3 128–192 kbps |

**Nombres recomendados:**

```
home-hero-002.jpg
archive-001.jpg
editions-musette-001.jpg
mus-classic-v2-008.jpg
mus-v2-008.mp3
```

**Después de subir:** copiar URL pública y actualizar `image_url` o `audio_url` en `public.tokens`. Confirmar que abre en navegador.

---

## 8. Cómo subir fotos privadas

**Bucket:** `fixiety-sessions`

**Para fotos visibles en sesión** (`photos/`):

- JPG
- 1800–2400 px si se quiere carga rápida
- Calidad 85–90
- Nombres: `01.jpg`, `02.jpg`, `03.jpg`

**Para entrega original:**

- Meter alta calidad dentro de `session.zip`
- El ZIP puede pesar más

**Regla:**

- `photos/` → visualización web (signed URLs vía `session-view`)
- `session.zip` → entrega descargable (descarga única vía `session-download`)

---

## 9. Audio

**Audio global default:**

```
https://edelwrzijrnydxrnqhff.supabase.co/storage/v1/object/public/fixiety-archive/ambient-001.mp3
```

**Regla:**

- Si `audio_url` existe en el token → suena esa canción.
- Si no existe → suena el ambient global.

**Fuentes:**

- Objetos → `tokens_public` (`FixIdPage`)
- Sesiones privadas → `session-view` (lee desde `public.tokens` vía `token_public_id`)

**UI del botón:** estado inicial apagado; `SONIDO OFF` / `SONIDO ON`; auto-hide al reproducir; título solo cuando suena.

**Si se cambia `session-view`**, desplegar:

```bash
supabase functions deploy session-view --no-verify-jwt
```

---

## 10. Propietarios

**Campo:** `owner_handle`  
**Vive en:** `public.tokens` (fuente única)

**Puede tener:**

- `@usuario`
- `usuario`
- URL de Instagram

El frontend lo normaliza y lo muestra como **PROPIETARIO** (link a Instagram).

**Lectura:**

- Objetos normales → `tokens_public`
- Sesiones privadas → `session-view` (join vía `photo_sessions.token_public_id`)

---

## 11. Descarga única

**Antes de entregar una sesión privada**, resetear contador:

```sql
UPDATE public.photo_sessions
SET
  download_count = 0,
  downloaded_at = NULL
WHERE public_id = 'SESSION-ID';
```

**Revisar estado:**

```sql
SELECT
  public_id,
  download_limit,
  download_count,
  downloaded_at,
  is_active
FROM public.photo_sessions
WHERE public_id = 'SESSION-ID';
```

**Debe quedar:**

| Campo | Valor |
|-------|-------|
| `download_limit` | `1` |
| `download_count` | `0` |
| `downloaded_at` | `NULL` |
| `is_active` | `true` |

Si consumiste la descarga durante pruebas, volver a resetear antes de entregar.

---

## 12. Edge Functions

**Funciones:**

| Función | Rol |
|---------|-----|
| `session-view` | Metadata, cover signed, assets signed, owner, audio |
| `session-download` | Descarga única, signed URL del ZIP |

**Deploy:**

```bash
supabase functions deploy session-view --no-verify-jwt
supabase functions deploy session-download --no-verify-jwt
```

**`session-view` entrega:**

- Metadata de sesión
- `cover_url` (signed)
- `assets[]` (signed URLs)
- `owner_handle`
- `audio_url`
- `audio_title`

**`session-download` controla:**

- Validación de token efímero
- Descarga única (`session_consume_download`)
- Signed URL de `session.zip`

No modificar sin revisar flujo completo (acceso NFC → RPC → sessionStorage → Edge Function).

---

## 13. Pruebas antes de entregar

### Para objeto FixID

- [ ] Probar UID (`/fixid/access?uid=...`)
- [ ] Probar secret key (`/fixid/access?k=...`)
- [ ] Ver imagen (verticales sin crop)
- [ ] Ver owner (si aplica)
- [ ] Probar audio (SONIDO ON)
- [ ] Probar en celular
- [ ] Probar en computadora
- [ ] Probar NFC físico

### Para sesión privada

- [ ] Probar UID
- [ ] Probar secret key
- [ ] Ver cover
- [ ] Ver fotos (proporciones naturales)
- [ ] Probar lightbox
- [ ] Probar audio
- [ ] Probar owner
- [ ] Probar descarga única (`session.zip`)
- [ ] Resetear descarga si se consumió durante prueba
- [ ] Probar en celular
- [ ] Probar en computadora
- [ ] Probar NFC físico

---

## 14. Cycle Cult (referencia entregada)

| Campo | Valor |
|-------|-------|
| Estado | Cerrado / entregado |
| `public_id` | `SESSION-CYCLECULT-ROLL01-001` |
| UID | `04:14:47:7F:BF:2A:81` |
| Owner | `@danirckx` |
| Audio | Cycle Cult 001 |

**NFC:**

```
https://fixiety.com/fixid/access?uid=04:14:47:7F:BF:2A:81
```

**Checklist de referencia:**

- [x] Tag entregado
- [x] Sesión funcionando
- [x] Cover funcionando
- [x] Fotos funcionando
- [x] Audio funcionando
- [x] Owner funcionando
- [x] Descarga reseteada

Usar como molde para futuras sesiones privadas.

---

## 15. Qué NO tocar sin cuidado

No tocar sin revisar todo el flujo:

- `fixid_begin_access`
- `session-download`
- Lógica de descarga única
- `session-view`
- `tokens_public` (preservar orden de columnas)
- Permisos `service_role`
- Rutas FixID (`/fixid/access`, `/fixid/:token`, `/session/:sessionId`)
- Formato URL NFC
- Storage privado (`fixiety-sessions`)
- Supabase RLS / policies

**No correr** `npm audit fix` sin revisar.

---

## 16. Qué hacer si algo falla

### Si owner no aparece en sesión

1. Revisar `owner_handle` en `public.tokens`.
2. Revisar `photo_sessions.token_public_id` apunta al token correcto.
3. Revisar permiso: `GRANT SELECT ON public.tokens TO service_role;`
4. Redeploy `session-view`.

### Si audio no aparece en sesión

1. Revisar `audio_url` y `audio_title` en `public.tokens`.
2. Revisar `photo_sessions.token_public_id`.
3. Confirmar que el MP3 abre directo en navegador.
4. Redeploy `session-view`.

### Si audio no aparece en objeto

1. Revisar que `tokens_public` expone `audio_url` / `audio_title`.
2. Revisar `audio_url` en `public.tokens`.
3. Recargar página FixID.
4. Apagar / prender **SONIDO**.

### Si NFC no abre

1. Revisar URL escrita en el tag (debe ser `/fixid/access?uid=...`).
2. Confirmar que no tenga espacio después de `?`.
3. Confirmar UID en `public.tokens` (`nfc_uid`).
4. Verificar que `is_active = true`.
5. Revisar RPC `fixid_begin_access` (normalización UID: upper, sin `:`).

### Si build falla por `supabase/.temp/cli-latest`

```bash
git restore supabase/.temp/cli-latest
```

### Si las fotos de sesión no cargan

1. Revisar paths en `session_assets` y `cover_image_url`.
2. Confirmar archivos en bucket `fixiety-sessions`.
3. Probar `session-view` con token efímero válido.
4. Redeploy `session-view` si cambió la función.

---

## 17. Pendientes actuales

- Vestir body con fotos reales.
- Actualizar Archivo.
- Actualizar Ediciones.
- Actualizar imágenes reales por token.
- Actualizar propietarios reales.
- Terminar packaging físico:
  - Etiqueta
  - Guía NFC / FixID
  - Mini certificado

Ver también `PACKAGING_COPY.md` (pendiente).

---

## 18. Regla general

**Prioridad:**

1. Que funcione.
2. Que cargue rápido.
3. Que se vea editorial.
4. Que sea fácil de operar.
5. Que sea fácil de entregar.

**No sacrificar estabilidad por diseño experimental.**

Para cada entrega nueva: seguir `FIXID_DELIVERY_CHECKLIST.md` y usar SQL de `SQL_TEMPLATES.md`.
