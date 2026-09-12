// src/data/newsService.js
//
// Data-access layer for market news. Everything here talks to
// localStorage today (seeded from mockNews.json), so the client
// dashboard and admin dashboard have something real to read and
// write during development.
//
// TODO (Supabase): replace each function's body with a call against
// a `news` table, e.g.:
//   export async function getAllNews() {
//     const { data, error } = await supabase
//       .from('news')
//       .select('*')
//       .order('date', { ascending: false })
//     if (error) throw error
//     return data
//   }
// Keep the function names and shapes the same so the pages that
// call this file don't need to change.

import seedNews from './mockNews.json'

const STORAGE_KEY = 'profitdex_news_v1'

function readStore() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seedNews))
      return [...seedNews]
    }
    return JSON.parse(raw)
  } catch {
    return [...seedNews]
  }
}

function writeStore(items) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

function sortByDateDesc(items) {
  return [...items].sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getAllNews() {
  return sortByDateDesc(readStore())
}

export async function getNewsById(id) {
  return readStore().find((item) => item.id === id) ?? null
}

export async function addNews(entry) {
  const items = readStore()
  const newEntry = {
    id: `n-${Date.now()}`,
    date: entry.date || new Date().toISOString().slice(0, 10),
    headline: entry.headline,
    category: entry.category || 'General',
    body: entry.body,
    author: entry.author || 'Profitdex Research Desk',
    tag: entry.tag || 'normal',
  }
  const next = [newEntry, ...items]
  writeStore(next)
  return newEntry
}

export async function updateNews(id, updates) {
  const items = readStore()
  const next = items.map((item) => (item.id === id ? { ...item, ...updates } : item))
  writeStore(next)
  return next.find((item) => item.id === id)
}

export async function deleteNews(id) {
  const items = readStore()
  const next = items.filter((item) => item.id !== id)
  writeStore(next)
  return true
}

export async function resetToSeed() {
  writeStore(seedNews)
  return sortByDateDesc(seedNews)
}
