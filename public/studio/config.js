// Studio configuration
//
// Fill these in with your own project's values, then upload this file
// back to public/studio/config.js (or edit it directly in your GitHub
// repo). The anon key is safe to expose publicly — it can only do what
// your Row Level Security policies in supabase/schema.sql allow, which
// is: read everything, write nothing unless logged in.

export const SUPABASE_URL = 'https://hejpyhpxrigesqfquywn.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlanB5aHB4cmlnZXNxZnF1eXduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1MzAyOTgsImV4cCI6MjEwMjEwNjI5OH0.2AQFOVGTXt1zjiMebLEVDRrc_6o_sS8WKLh1uwrVWeY';

// Optional but recommended: a Netlify build hook URL. Create one at
// Netlify → Site configuration → Build & deploy → Build hooks → Add
// build hook. Paste the URL below and the "Rebuild site" button (and
// every save) will trigger a fresh deploy automatically.
export const NETLIFY_BUILD_HOOK_URL = '';

// Name of the public Supabase Storage bucket used for uploaded images
// and the CV PDF. Matches the bucket created in supabase/schema.sql.
export const STORAGE_BUCKET = 'portfolio-media';
