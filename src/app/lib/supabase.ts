import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://uxfynvdyginufrsvkzmb.supabase.co";

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4ZnludmR5Z2ludWZyc3Zrem1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NTcyMDcsImV4cCI6MjA2NDUzMzIwN30.R_XW7FvL3796N6p75Ww5Gg3iZ4xH4wS0-kQz6u6v3Yg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
