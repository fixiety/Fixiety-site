-- =====================================================================
-- FixID Sessions — esquema (Opción B: token efímero + gate server-side)
-- Ejecutar en el SQL editor de Supabase. No expone secret_key al cliente.
-- Requiere el FixID de objetos ya existente (tabla `tokens`).
-- =====================================================================

create extension if not exists pgcrypto;

-- 1) Distinguir el tipo de token --------------------------------------
alter table public.tokens
  add column if not exists type text not null default 'object';
  -- valores: 'object' | 'photo_session'

-- 2) Sesiones fotográficas --------------------------------------------
create table if not exists public.photo_sessions (
  id uuid primary key default gen_random_uuid(),
  public_id        text unique not null,
  token_public_id  text references public.tokens(public_id),
  title            text not null,
  registry_id      text,
  piece_name       text,
  series           text,
  status           text,
  year             text,
  city             text,
  story            text,
  cover_image_url  text,
  download_limit   integer not null default 1,
  download_count   integer not null default 0,
  downloaded_at    timestamptz,
  is_active        boolean not null default true,
  created_at       timestamptz default now()
);

-- 3) Assets de la sesión (rutas dentro del bucket privado) ------------
create table if not exists public.session_assets (
  id uuid primary key default gen_random_uuid(),
  session_public_id text references public.photo_sessions(public_id),
  image_url text not null,   -- RUTA en el bucket (no URL pública), p.ej. 'SESSION-.../photos/01.jpg'
  position  integer default 0,
  filename  text,
  created_at timestamptz default now()
);

-- 4) Tokens de acceso efímeros (emitidos al validar la secret_key) ----
create table if not exists public.session_access (
  token text primary key,
  session_public_id text references public.photo_sessions(public_id),
  expires_at timestamptz not null,
  created_at timestamptz default now()
);

-- RLS: activado y SIN políticas para anon en las tablas privadas.
-- El acceso ocurre vía RPC security definer y Edge Functions (service role).
alter table public.photo_sessions enable row level security;
alter table public.session_assets enable row level security;
alter table public.session_access enable row level security;

-- 5) RPC: iniciar acceso (objetos y sesiones) -------------------------
-- Objetos: devuelve (type='object', target=public_id, sin token).
-- Sesiones: crea token efímero y devuelve (type='photo_session', target=session.public_id, access_token, expires_at).
create or replace function public.fixid_begin_access(k text)
returns table(type text, target text, access_token text, expires_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
declare
  t public.tokens%rowtype;
  sess public.photo_sessions%rowtype;
  new_token text;
  exp timestamptz;
begin
  select * into t from public.tokens
    where secret_key = k and is_active = true limit 1;
  if not found then
    return; -- vacío => denegado
  end if;

  if coalesce(t.type, 'object') = 'photo_session' then
    select * into sess from public.photo_sessions
      where token_public_id = t.public_id and is_active = true limit 1;
    if not found then
      return;
    end if;
    new_token := encode(gen_random_bytes(24), 'hex');
    exp := now() + interval '2 hours';
    insert into public.session_access(token, session_public_id, expires_at)
      values (new_token, sess.public_id, exp);
    return query select 'photo_session'::text, sess.public_id, new_token, exp;
  else
    return query select 'object'::text, t.public_id, null::text, null::timestamptz;
  end if;
end;
$$;
grant execute on function public.fixid_begin_access(text) to anon;

-- 6) RPC: consumir descarga única (atómico) ---------------------------
-- Lo invoca la Edge Function (service role) tras validar el token.
create or replace function public.session_consume_download(p_session text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  updated integer;
begin
  update public.photo_sessions
     set download_count = download_count + 1,
         downloaded_at = now()
   where public_id = p_session
     and is_active = true
     and download_count < download_limit;
  get diagnostics updated = row_count;
  return updated = 1;
end;
$$;
grant execute on function public.session_consume_download(text) to service_role;

-- =====================================================================
-- SEED — Sesión Cycle Cult 001 (cambia la secret key)
-- =====================================================================
insert into public.tokens (public_id, secret_key, piece_name, type, is_active)
values ('SESSION-CYCLECULT-ROLL01-001', 'CAMBIA-ESTA-CLAVE-SESSION', 'Sesión Cycle Cult 001', 'photo_session', true)
on conflict (public_id) do nothing;

insert into public.photo_sessions
  (public_id, token_public_id, title, registry_id, piece_name, series, status, year, city, story, cover_image_url, download_limit)
values
  ('SESSION-CYCLECULT-ROLL01-001', 'SESSION-CYCLECULT-ROLL01-001',
   'Sesión Cycle Cult 001', 'SESSCCROLL01-001', 'Sesión Cycle Cult 001', 'Premios Fixiety',
   'Acceso Privado', '2026', 'CDMX',
   'Registro fotográfico entregado como pieza física mediante un llavero con acceso NFC. La sesión documenta una sesión ganada por competir y funciona como archivo privado para visualizar la serie completa en alta calidad.',
   'SESSION-CYCLECULT-ROLL01-001/cover.jpg', 1)
on conflict (public_id) do nothing;

-- Assets: subir las fotos al bucket privado y registrar sus RUTAS aquí.
insert into public.session_assets (session_public_id, image_url, position, filename) values
  ('SESSION-CYCLECULT-ROLL01-001', 'SESSION-CYCLECULT-ROLL01-001/photos/01.jpg', 1, '01.jpg'),
  ('SESSION-CYCLECULT-ROLL01-001', 'SESSION-CYCLECULT-ROLL01-001/photos/02.jpg', 2, '02.jpg'),
  ('SESSION-CYCLECULT-ROLL01-001', 'SESSION-CYCLECULT-ROLL01-001/photos/03.jpg', 3, '03.jpg')
on conflict do nothing;

-- =====================================================================
-- STORAGE
--  - Crea un bucket PRIVADO llamado: fixiety-sessions
--  - Sube las fotos en:  <session_public_id>/photos/*.jpg
--  - Sube el ZIP en:     <session_public_id>/session.zip
--  - No agregues políticas públicas: las Edge Functions firman URLs con service role.
-- =====================================================================
