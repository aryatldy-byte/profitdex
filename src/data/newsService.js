// src/data/newsService.js
//
// Data-access layer for market/company updates published from the
// Admin Dashboard. Backed by the `news` table in Supabase (see
// supabase/schema.sql) — no local mock data or seeding, so nothing
// here is placeholder content.

import { supabase } from '../lib/supabaseClient'

function requireSupabase() {
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
    )
  }
  return supabase
}

export async function getAllNews() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('date', { ascending: false })
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getNewsById(id) {
  const client = requireSupabase()
  const { data, error } = await client.from('news').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data
}

export async function addNews(entry) {
  const client = requireSupabase()
  const { data, error } = await client
    .from('news')
    .insert([
      {
        date: entry.date || new Date().toISOString().slice(0, 10),
        headline: entry.headline,
        category: entry.category || 'General',
        body: entry.body,
        author: entry.author || 'Profitdex Research Desk',
        tag: entry.tag || 'normal',
      },
    ])
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateNews(id, updates) {
  const client = requireSupabase()
  const { data, error } = await client.from('news').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteNews(id) {
  const client = requireSupabase()
  const { error } = await client.from('news').delete().eq('id', id)
  if (error) throw error
  return true
}
