import { createClient } from "@supabase/supabase-js";

// Read from .env.local — must be NEXT_PUBLIC_-prefixed since forms insert
// directly from the browser (client components) using the anon key.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// createClient() throws synchronously if the URL is missing — that would crash every page
// at import time before a real Supabase project is connected. Fall back to placeholder values
// so the module loads; actual queries still fail (caught by each call site), but pages render.
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
