# FIXID_DELIVERY_CHECKLIST

Checklist operativo para entregar cualquier pieza FixID (objeto o sesión privada) sin olvidar pasos.

Referencia de contexto: `FIXIETY_CONTEXT.md`

---

## Checklist para objeto FixID

### 1. Datos base

- [ ] Definir `public_id`
- [ ] Definir `edition`
- [ ] Definir `piece_name`
- [ ] Definir `series`
- [ ] Definir `city`
- [ ] Definir `year`
- [ ] Escribir `story`
- [ ] Definir `owner_handle` si aplica
- [ ] Definir `audio_url` / `audio_title` si aplica
- [ ] Definir `image_url` si ya tiene foto
- [ ] Confirmar `type = object` (valor por defecto)
- [ ] Confirmar `is_active = true`

### 2. NFC / acceso

- [ ] Leer UID del tag NFC
- [ ] Verificar que el UID no exista en `public.tokens`
- [ ] Crear o actualizar token en `public.tokens`
- [ ] Probar acceso por UID
- [ ] Probar acceso por `secret_key`
- [ ] Escribir NFC con:

```
https://fixiety.com/fixid/access?uid={TAG-ID}
```

**Notas:**

- Nunca escribir directo `/fixid/{public_id}` en el tag.
- No agregar espacios después de `?`.
- Usar `uid=` para tag físico.
- Usar `k=` para secret key (pruebas internas; no va en el tag).

### 3. Contenido visual

- [ ] Subir foto pública al bucket `fixiety-archive`
- [ ] Confirmar que la URL pública abre en navegador
- [ ] Actualizar `image_url` en `public.tokens`
- [ ] Probar imagen en `/fixid/{public_id}` (con acceso verificado)
- [ ] Confirmar que verticales no se corten (`object-contain`)

### 4. Audio

- [ ] Subir MP3 público a `fixiety-archive`
- [ ] Confirmar que la URL abre / reproduce directo
- [ ] Actualizar `audio_url` y `audio_title` en `public.tokens`
- [ ] Probar **SONIDO ON**
- [ ] Confirmar que el título aparece solo cuando suena
- [ ] Si no hay audio personalizado, confirmar que suena el default (`ambient-001.mp3`)

### 5. Propietario

- [ ] Confirmar `owner_handle` (ej. `@usuario`, handle o URL Instagram)
- [ ] Actualizar `owner_handle` en `public.tokens`
- [ ] Verificar que `tokens_public` expone `owner_handle`
- [ ] Probar link de Instagram
- [ ] Confirmar que aparece como **PROPIETARIO**

### 6. Prueba final de objeto

- [ ] Abrir con UID (`/fixid/access?uid=...`)
- [ ] Abrir con secret key (`/fixid/access?k=...`)
- [ ] Probar imagen
- [ ] Probar audio
- [ ] Probar owner
- [ ] Probar en celular
- [ ] Probar en computadora
- [ ] Probar NFC físico (tap real en tag)

---

## Checklist para sesión privada FixID

### 1. Datos base

- [ ] Crear token en `public.tokens` con `type = photo_session`
- [ ] Crear fila en `photo_sessions`
- [ ] Confirmar `token_public_id` apunta al token correcto
- [ ] Confirmar `public_id` de la sesión (ej. `SESSION-...`)
- [ ] Completar metadata: `title`, `piece_name`, `registry_id`, `series`, `status`, `year`, `city`, `story`
- [ ] Confirmar `owner_handle` en `public.tokens`
- [ ] Confirmar `audio_url` / `audio_title` si aplica
- [ ] Registrar assets en `session_assets` (paths relativos al bucket)
- [ ] Confirmar `is_active = true`

### 2. Storage privado

Ruta en bucket `fixiety-sessions`:

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

- [ ] Subir `cover.jpg`
- [ ] Subir fotos a `photos/`
- [ ] Subir `session.zip`
- [ ] Confirmar nombres exactos (case-sensitive)
- [ ] Actualizar `cover_image_url` y filas en `session_assets` con paths correctos
- [ ] Confirmar que `session-view` muestra cover y fotos (signed URLs)

### 3. Edge Functions

- [ ] Si cambió `session-view`, hacer redeploy:

```bash
supabase functions deploy session-view --no-verify-jwt
```

- [ ] Si cambió descarga, hacer redeploy:

```bash
supabase functions deploy session-download --no-verify-jwt
```

### 4. Descarga única

**Antes de entregar**, resetear contador:

```sql
UPDATE public.photo_sessions
SET
  download_count = 0,
  downloaded_at = NULL
WHERE public_id = 'SESSION-ID';
```

- [ ] Confirmar `download_limit = 1`
- [ ] Confirmar `download_count = 0`
- [ ] Confirmar `downloaded_at IS NULL`

### 5. NFC / acceso (sesión)

- [ ] Leer UID del tag NFC
- [ ] Asignar `nfc_uid` al token `photo_session` en `public.tokens`
- [ ] Escribir NFC con:

```
https://fixiety.com/fixid/access?uid={TAG-ID}
```

- [ ] Probar acceso por UID → redirige a `/session/{public_id}`
- [ ] Probar acceso por secret key

### 6. Prueba final de sesión

- [ ] Acceso por UID
- [ ] Acceso por secret key
- [ ] Se ve cover
- [ ] Se ven fotos (proporciones naturales, sin crop)
- [ ] Se abre lightbox al click
- [ ] Suena audio personalizado si aplica
- [ ] Aparece propietario
- [ ] Descarga `session.zip`
- [ ] Descarga solo una vez (segundo intento bloqueado o agotado)
- [ ] Probar en celular
- [ ] Probar en computadora
- [ ] Probar NFC físico
- [ ] Entregar tag

**Referencia entregada:** Cycle Cult — `SESSION-CYCLECULT-ROLL01-001`, UID `04:14:47:7F:BF:2A:81`

---

## Checklist físico de entrega

- [ ] Tag NFC escrito y verificado
- [ ] Tag NFC probado en dispositivo del comprador (si es posible)
- [ ] Pieza limpia / lista
- [ ] Packaging listo
- [ ] Etiqueta incluida
- [ ] Guía NFC / FixID incluida
- [ ] Mini certificado incluido
- [ ] Confirmar propietario con el comprador
- [ ] Entregar pieza

---

## Registro post-entrega

- [ ] Anotar fecha de entrega
- [ ] Confirmar si el comprador quiere `owner_handle` público
- [ ] Confirmar si quiere audio personalizado
- [ ] Confirmar si la pieza puede aparecer en Archivo
- [ ] Guardar backup de fotos (originales + exports)
- [ ] Revisar que el FixID siga activo (`is_active = true`)
- [ ] Anotar `public_id`, UID y contacto del propietario en registro interno

---

## Documentos relacionados (pendientes)

| Documento | Uso |
|-----------|-----|
| `FIXIETY_CONTEXT.md` | Contexto maestro del proyecto |
| `SQL_TEMPLATES.md` | Plantillas SQL para objetos y sesiones |
| `OPERATIONS_MANUAL.md` | Manual operativo Fixiety |
| `PACKAGING_COPY.md` | Textos para etiqueta, guía y certificado |
