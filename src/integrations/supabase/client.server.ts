import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  (import.meta.env.VITE_SUPABASE_URL as string | undefined);
const SERVICE_ROLE = process.env.SHUWAZ_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE) {
  // eslint-disable-next-line no-console
  console.warn(
    "[supabase.server] Missing SUPABASE_URL or SHUWAZ_SERVICE_ROLE_KEY",
  );
}

export const supabaseAdmin = createClient(
  SUPABASE_URL ?? "",
  SERVICE_ROLE ?? "",
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  },
);
