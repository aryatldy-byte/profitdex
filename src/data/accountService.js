// src/data/accountService.js
//
// Handles "Open an account" popup submissions — inserts into the
// `account_requests` table in Supabase (see supabase/schema.sql).

import { supabase } from '../lib/supabaseClient'

export async function submitAccountRequest({ name, phone, email, message }) {
  if (!supabase) {
    throw new Error(
      'This form is not connected yet. Please reach us directly using the details below.'
    )
  }

  const { data, error } = await supabase
    .from('account_requests')
    .insert([
      {
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        message: message?.trim() || null,
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data
}
