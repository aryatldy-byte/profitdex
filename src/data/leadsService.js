// src/data/leadsService.js
//
// Handles SIP/Mutual Fund, Insurance and Hedging enquiries from the
// "Get started" modal — inserts into the `leads` table in Supabase
// (see supabase/schema.sql) and builds a WhatsApp deep link so the
// enquiry can be forwarded straight to the owner's WhatsApp Business
// number.

import { supabase } from '../lib/supabaseClient'

// Profitdex Ventures' WhatsApp Business number (country code + number,
// no "+" or spaces, as required by the wa.me deep-link format).
export const OWNER_WHATSAPP_NUMBER = '919633776456'

export async function submitLead({ name, email, mobile, pan, interest }) {
  if (!supabase) {
    throw new Error(
      'This form is not connected yet. Please reach us directly using the details below.'
    )
  }

  const { data, error } = await supabase
    .from('leads')
    .insert([
      {
        name: name.trim(),
        email: email?.trim() || null,
        mobile: mobile.trim(),
        pan: pan?.trim().toUpperCase() || null,
        interest,
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Builds a wa.me link pre-filled with the lead's details, so a single
 * tap forwards the enquiry to the owner's WhatsApp Business number.
 */
export function buildWhatsAppForwardUrl({ name, email, mobile, pan, interest }) {
  const lines = [
    `New ${interest} enquiry from the Profitdex Ventures website:`,
    `Name: ${name}`,
    `Mobile: ${mobile}`,
    email ? `Email: ${email}` : null,
    pan ? `PAN: ${pan}` : null,
  ].filter(Boolean)

  const text = encodeURIComponent(lines.join('\n'))
  return `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${text}`
}
