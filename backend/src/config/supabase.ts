import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from './env';

// The backend uses the anon key + SECURITY DEFINER RPC functions.
// All privileged operations (admin auth, submission management) are performed
// through Postgres functions that validate admin sessions internally, so no
// service role key is needed. This keeps the backend's Supabase access scoped
// to the least privilege possible.
export const supabase: SupabaseClient = createClient(
  config.supabaseUrl,
  config.supabaseAnonKey,
  {
    auth: { persistSession: false, autoRefreshToken: false },
  }
);
