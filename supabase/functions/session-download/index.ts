// Edge Function: session-download
// Valida el token efímero, consume la descarga única (atómico vía RPC) y
// devuelve una signed URL de corta duración al ZIP en el bucket privado.
// Deploy sin verificación de JWT:
//   supabase functions deploy session-download --no-verify-jwt
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
const ZIP_TTL = 300; // 5 minutos

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

    // 2) Consumir descarga única (atómico)
    const { data: consumed, error: rpcError } = await supabase.rpc('session_consume_download', {
      p_session: session_public_id,
    });

    if (rpcError) return json({ error: 'server_error' }, 500);
    if (!consumed) return json({ ok: false, used: true });

    // 3) Signed URL del ZIP (descarga forzada)
    const { data: signed, error: signError } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(`${session_public_id}/session.zip`, ZIP_TTL, { download: true });

    if (signError || !signed?.signedUrl) {
      // La descarga ya se contabilizó; informamos al cliente del problema de archivo.
      return json({ ok: false, error: 'file_unavailable' }, 500);
    }

    return json({ ok: true, url: signed.signedUrl });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
