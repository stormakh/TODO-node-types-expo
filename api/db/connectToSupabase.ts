import { SupabaseClient } from "@supabase/supabase-js";

export  function connectToSupabase() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL and key must be provided");
  }

  return new SupabaseClient(supabaseUrl, supabaseKey);
}
