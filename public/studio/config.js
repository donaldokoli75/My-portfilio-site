// Studio configuration

export const SUPABASE_URL = 'https://hejpyhpxrigesqfquywn.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlanB5aHB4cmlnZXNxZnF1eXduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1MzAyOTgsImV4cCI6MjEwMjEwNjI5OH0.2AQFOVGTXt1zjiMebLEVDRrc_6o_sS8WKLh1uwrVWeY';

// Optional but recommended: a Netlify build hook URL. Create one at
// Netlify → Site configuration → Build & deploy → Build hooks → Add
// build hook. Paste the URL below and the "Rebuild site" button (and
// every save) will trigger a fresh deploy automatically.
export const NETLIFY_BUILD_HOOK_URL = 'https://api.netlify.com/build_hooks/6a7d00ebaa2fdce9ec4c1e52';

// Name of the public Supabase Storage bucket used for uploaded images
// and the CV PDF. Matches the bucket created in supabase/schema.sql.
export const STORAGE_BUCKET = 'portfolio-media';
