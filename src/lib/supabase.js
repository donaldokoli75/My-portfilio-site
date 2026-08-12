import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_ANON_KEY. Set these in Netlify → Site configuration → Environment variables (see README section G).'
  );
}

// Read-only anon client — used only at build time to pull published
// content. Writes happen exclusively from /studio, authenticated.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
