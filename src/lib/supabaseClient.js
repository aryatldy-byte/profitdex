// src/lib/supabaseClient.js
//
// Supabase client for the public site. Uses the "anon" key, which is
// safe to expose in client-side code by design — actual data access
// is controlled by the Row Level Security policies in the database
// (see supabase/schema.sql).

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

if (!supabase && import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.warn(
    'Supabase is not configured — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  )
}
