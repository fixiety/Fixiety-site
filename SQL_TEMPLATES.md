# SQL_TEMPLATES

Plantillas SQL reutilizables para operar Fixiety desde el SQL Editor de Supabase, sin depender de Cursor ni ChatGPT.

**Project ref:** `edelwrzijrnydxrnqhff`  
**Referencia:** `FIXIETY_CONTEXT.md` · `FIXID_DELIVERY_CHECKLIST.md`

Reemplaza los placeholders (`UID_AQUI`, `PUBLIC_ID_AQUI`, etc.) antes de ejecutar.

---

## 1. Verificar UID antes de crear token

```sql
SELECT public_id, nfc_uid
FROM public.tokens
WHERE replace(upper(nfc_uid), ':', '') =
      replace(upper('UID_AQUI'), ':', '');
```

**Uso:** antes de crear cualquier FixID, correr esta consulta para confirmar que el UID del tag NFC no esté usado. Si devuelve filas, el UID ya está ocupado.

---

## 2. Crear nuevo objeto FixID

Molde para Musette u otra pieza física:

```sql
INSERT INTO public.tokens (
  public_id,
  secret_key,
  piece_name,
  edition,
  status,
  year,
  city,
  series,
  story,
  image_url,
  is_active,
  type,
  nfc_uid,
  owner_handle,
  audio_url,
  audio_title
)
VALUES (
  'MUS-CLASSIC-V2-008',
  'mus_V2_008_CAMBIAR_SECRET_KEY',
  'Musette Classic',
  'MUSCLV2-008',
  'Registrado y Autenticado',
  2026,
  'CDMX',
  'Orígenes',
  'MUS-CLASSIC-V2-008 forma parte de la serie Orígenes dentro del archivo Fixiety. La pieza continúa la variación V2 de Musette Classic como objeto físico registrado, vinculado a la movilidad urbana, la fotografía y la cultura contemporánea del piñón fijo.',
  NULL,
  TRUE,
  'object',
  'UID_AQUI',
  NULL,
  NULL,
  NULL
)
ON CONFLICT (public_id) DO UPDATE SET
  secret_key   = EXCLUDED.secret_key,
  piece_name   = EXCLUDED.piece_name,
  edition      = EXCLUDED.edition,
  status       = EXCLUDED.status,
  year         = EXCLUDED.year,
  city         = EXCLUDED.city,
  series       = EXCLUDED.series,
  story        = EXCLUDED.story,
  image_url    = EXCLUDED.image_url,
  is_active    = EXCLUDED.is_active,
  type         = EXCLUDED.type,
  nfc_uid      = EXCLUDED.nfc_uid,
  owner_handle = EXCLUDED.owner_handle,
  audio_url    = EXCLUDED.audio_url,
  audio_title  = EXCLUDED.audio_title;
```

---

## 3. Actualizar imagen de un token

```sql
UPDATE public.tokens
SET image_url = 'URL_PUBLICA_DE_LA_IMAGEN'
WHERE public_id = 'PUBLIC_ID_AQUI';
```

**Ejemplo:**

```sql
UPDATE public.tokens
SET image_url = 'https://edelwrzijrnydxrnqhff.supabase.co/storage/v1/object/public/fixiety-archive/mus-classic-v2-001.jpg'
WHERE public_id = 'MUS-CLASSIC-V2-001';
```

---

## 4. Actualizar propietario

```sql
UPDATE public.tokens
SET owner_handle = '@usuario'
WHERE public_id = 'PUBLIC_ID_AQUI';
```

**Para quitar propietario:**

```sql
UPDATE public.tokens
SET owner_handle = NULL
WHERE public_id = 'PUBLIC_ID_AQUI';
```

---

## 5. Actualizar audio personalizado

```sql
UPDATE public.tokens
SET
  audio_url   = 'URL_PUBLICA_DEL_MP3',
  audio_title = 'TITULO_VISIBLE'
WHERE public_id = 'PUBLIC_ID_AQUI';
```

**Ejemplo:**

```sql
UPDATE public.tokens
SET
  audio_url   = 'https://edelwrzijrnydxrnqhff.supabase.co/storage/v1/object/public/fixiety-archive/mus-v2-007.mp3',
  audio_title = 'Musette V2 007'
WHERE public_id = 'MUS-CLASSIC-V2-007';
```

**Para quitar audio personalizado y volver al ambient global:**

```sql
UPDATE public.tokens
SET
  audio_url   = NULL,
  audio_title = NULL
WHERE public_id = 'PUBLIC_ID_AQUI';
```

---

## 6. Revisar tokens existentes

```sql
SELECT
  public_id,
  type,
  edition,
  nfc_uid,
  owner_handle,
  image_url,
  audio_title,
  is_active
FROM public.tokens
ORDER BY created_at DESC;
```

**Solo Musettes V2:**

```sql
SELECT
  public_id,
  edition,
  nfc_uid,
  owner_handle,
  image_url,
  audio_title
FROM public.tokens
WHERE public_id LIKE 'MUS-CLASSIC-V2-%'
ORDER BY public_id;
```

---

## 7. Crear token para sesión privada

```sql
INSERT INTO public.tokens (
  public_id,
  secret_key,
  piece_name,
  edition,
  status,
  year,
  city,
  series,
  story,
  image_url,
  is_active,
  type,
  nfc_uid,
  owner_handle,
  audio_url,
  audio_title
)
VALUES (
  'SESSION-NOMBRE-001',
  'session_NOMBRE_001_CAMBIAR_SECRET_KEY',
  'Sesión Nombre 001',
  'SESSIONNOMBRE001',
  'Acceso Privado',
  2026,
  'CDMX',
  'Premios Fixiety',
  'Registro fotográfico entregado como pieza física mediante un tag con acceso NFC. La sesión funciona como archivo privado para visualizar y descargar la serie completa.',
  NULL,
  TRUE,
  'photo_session',
  'UID_AQUI',
  '@owner',
  NULL,
  NULL
);
```

---

## 8. Crear fila en photo_sessions

```sql
INSERT INTO public.photo_sessions (
  public_id,
  token_public_id,
  title,
  registry_id,
  piece_name,
  series,
  status,
  year,
  city,
  story,
  cover_image_url,
  download_limit,
  download_count,
  is_active
)
VALUES (
  'SESSION-NOMBRE-001',
  'SESSION-NOMBRE-001',
  'Sesión Nombre 001',
  'SESSIONNOMBRE001-001',
  'Sesión Nombre 001',
  'Premios Fixiety',
  'Acceso Privado',
  2026,
  'CDMX',
  'Registro fotográfico entregado como pieza física mediante un tag con acceso NFC. La sesión funciona como archivo privado para visualizar y descargar la serie completa.',
  NULL,
  1,
  0,
  TRUE
);
```

**Nota:** `token_public_id` debe coincidir con `public.tokens.public_id`.

**Registrar assets** (paths relativos en bucket `fixiety-sessions`):

```sql
INSERT INTO public.session_assets (session_public_id, image_url, position, filename)
VALUES
  ('SESSION-NOMBRE-001', 'SESSION-NOMBRE-001/photos/01.jpg', 1, '01.jpg'),
  ('SESSION-NOMBRE-001', 'SESSION-NOMBRE-001/photos/02.jpg', 2, '02.jpg'),
  ('SESSION-NOMBRE-001', 'SESSION-NOMBRE-001/photos/03.jpg', 3, '03.jpg');
```

**Actualizar cover** (después de subir `cover.jpg`):

```sql
UPDATE public.photo_sessions
SET cover_image_url = 'SESSION-NOMBRE-001/cover.jpg'
WHERE public_id = 'SESSION-NOMBRE-001';
```

---

## 9. Revisar sesión privada

```sql
SELECT
  public_id,
  token_public_id,
  title,
  download_limit,
  download_count,
  downloaded_at,
  is_active
FROM public.photo_sessions
WHERE public_id = 'SESSION_ID_AQUI';
```

**Ver assets de la sesión:**

```sql
SELECT session_public_id, image_url, position, filename
FROM public.session_assets
WHERE session_public_id = 'SESSION_ID_AQUI'
ORDER BY position;
```

---

## 10. Resetear descarga única

```sql
UPDATE public.photo_sessions
SET
  download_count = 0,
  downloaded_at = NULL
WHERE public_id = 'SESSION_ID_AQUI';
```

**Ejemplo Cycle Cult:**

```sql
UPDATE public.photo_sessions
SET
  download_count = 0,
  downloaded_at = NULL
WHERE public_id = 'SESSION-CYCLECULT-ROLL01-001';
```

---

## 11. Verificar Cycle Cult

```sql
SELECT
  t.public_id,
  t.type,
  t.nfc_uid,
  t.owner_handle,
  t.audio_title,
  ps.download_limit,
  ps.download_count,
  ps.downloaded_at,
  ps.is_active
FROM public.tokens t
LEFT JOIN public.photo_sessions ps
  ON ps.token_public_id = t.public_id
WHERE t.public_id = 'SESSION-CYCLECULT-ROLL01-001';
```

---

## 12. Recrear tokens_public

**Importante:** preservar este orden de columnas.

```sql
CREATE OR REPLACE VIEW public.tokens_public AS
SELECT
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
FROM public.tokens
WHERE is_active = TRUE;
```

No usar `DROP VIEW` salvo que sea necesario.

---

## 13. Permiso necesario para session-view

```sql
GRANT SELECT ON public.tokens TO service_role;
```

Este permiso permite que `session-view` lea `owner_handle`, `audio_url` y `audio_title` desde `public.tokens`.

---

## 14. URLs de prueba

**Formato UID:**

```
https://fixiety.com/fixid/access?uid=UID_AQUI
```

**Formato secret key:**

```
https://fixiety.com/fixid/access?k=SECRET_KEY_AQUI
```

**Cycle Cult:**

```
https://fixiety.com/fixid/access?uid=04:14:47:7F:BF:2A:81
```

**Musette V1 001:**

```
https://fixiety.com/fixid/access?uid=5A:51:2C:8D:55:41:89
```

**Musette V2 004:**

```
https://fixiety.com/fixid/access?uid=5A:D1:1A:90:55:41:89
```

**Musette V2 007:**

```
https://fixiety.com/fixid/access?uid=04:DE:F2:10:BF:2A:81
```

---

## 15. Notas importantes

- No reutilizar UID.
- No reutilizar `secret_key`.
- No escribir NFC con `/fixid/{public_id}`.
- Escribir NFC con `/fixid/access?uid={TAG_ID}`.
- No poner espacios después de `?`.
- Para sesiones privadas, si cambia lo que devuelve `session-view`, hay que hacer redeploy:

```bash
supabase functions deploy session-view --no-verify-jwt
```

- Para objetos normales, cambios en `public.tokens` se reflejan vía `tokens_public`.
- Para sesiones privadas, owner/audio se entregan vía `session-view`.
- No correr SQL destructivo sin backup.
- No tocar `fixid_begin_access` si no es necesario.

---

## 16. Desactivar un FixID (sin borrar)

```sql
UPDATE public.tokens
SET is_active = FALSE
WHERE public_id = 'PUBLIC_ID_AQUI';
```

Al desactivar, deja de aparecer en `tokens_public` y el RPC `fixid_begin_access` lo ignora.
