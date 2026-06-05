// Edge Function: session-view
// Valida el token efímero y devuelve la ficha + signed URLs (TTL corto) de los
// assets del bucket privado `fixiety-sessions`. Usa service role (secreto, solo
// en el entorno de la función). Deploy sin verificación de JWT:
//   supabase functions deploy session-view --no-verify-jwt
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  });

const BUCKET = 'fixiety-sessions';
const ASSET_TTL = 3600; // 1 hora

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  try {
    const { session_public_id, access_token } = await req.json();
    if (!session_public_id || !access_token) return json({ error: 'bad_request' }, 400);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // 1) Validar token efímero
    const { data: acc } = await supabase
      .from('session_access')
      .select('session_public_id, expires_at')
      .eq('token', access_token)
      .maybeSingle();

    if (!acc || acc.session_public_id !== session_public_id || new Date(acc.expires_at) < new Date()) {
      return json({ error: 'unauthorized' }, 401);
    }

    // 2) Ficha de la sesión
    const { data: session } = await supabase
      .from('photo_sessions')
      .select('public_id, title, registry_id, piece_name, series, status, year, city, story, cover_image_url, download_limit, download_count')
      .eq('public_id', session_public_id)
      .eq('is_active', true)
      .maybeSingle();

    if (!session) return json({ error: 'not_found' }, 404);

    // 2.1) Cover => signed URL temporal (no exponer la ruta cruda del bucket)
    let cover_url: string | null = null;
    if (session.cover_image_url) {
      const { data: signedCover } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(session.cover_image_url, ASSET_TTL);
      cover_url = signedCover?.signedUrl ?? null;
    }
    const { cover_image_url: _coverPath, ...sessionPublic } = session;

    // 3) Assets => signed URLs temporales
    const { data: rows } = await supabase
      .from('session_assets')
      .select('image_url, position, filename')
      .eq('session_public_id', session_public_id)
      .order('position', { ascending: true });

    const assets: Array<{ url: string; position: number; filename: string | null }> = [];
    for (const a of rows ?? []) {
      const { data: signed } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(a.image_url, ASSET_TTL);
      if (signed?.signedUrl) {
        assets.push({ url: signed.signedUrl, position: a.position, filename: a.filename });
      }
    }

    return json({ session: sessionPublic, cover_url, assets });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
