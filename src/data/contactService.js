// src/data/contactService.js
//
// Handles Contact page form submissions — inserts into the
// `contact_messages` table in Supabase (see supabase/schema.sql).

import { supabase } from '../lib/supabaseClient'

export async function submitContactMessage({ name, email, message }) {
  if (!supabase) {
    throw new Error(
      'This form is not connected yet. Please reach us directly using the details below.'
    )
  }

  const { data, error } = await supabase
    .from('contact_messages')
    .insert([{ name: name.trim(), email: email.trim(), message: message.trim() }])
    .select()
    .single()

  if (error) throw error
  return data
}
