// src/context/AuthContext.jsx
//
<<<<<<< HEAD
// PLACEHOLDER authentication for the admin area. Credentials are
// checked against a hard-coded account below purely so the admin
// dashboard has something to log into during development — this is
// NOT secure and must not be used in production.
//
// TODO (Supabase): swap `login()` for
//   const { data, error } = await supabase.auth.signInWithPassword({ email, password })
// and read the role from a `profiles` table (id, role) keyed to
// `data.user.id`, rather than from this local list.

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'profitdex_session_v1'

// Placeholder admin account. Password lives here only because there
// is no backend auth yet — replace entirely once Supabase auth is
// connected, and remove this file's local credential list.
const DEMO_ACCOUNTS = [
  { email: 'admin@profitdexventures.com', password: 'admin123', role: 'admin', name: 'Profitdex Admin' },
]
=======
// Admin authentication backed by real Supabase Auth. Create the admin
// user under Supabase Dashboard > Authentication > Users — there are
// no hard-coded credentials here. Every signed-in Supabase user is
// treated as an admin; add a `profiles` table with a `role` column
// later if you need more than one access level.

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext(null)

function mapSupabaseUser(user) {
  if (!user) return null
  return {
    id: user.id,
    email: user.email,
    name: user.user_metadata?.name || user.email,
    role: 'admin',
  }
}
>>>>>>> 068ee71 (Initial commit of updated Profitdex project)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
<<<<<<< HEAD
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch {
      // ignore corrupt session data
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // TODO (Supabase): replace with supabase.auth.signInWithPassword
    await new Promise((resolve) => setTimeout(resolve, 400)) // simulate network
    const account = DEMO_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
    )
    if (!account) {
      throw new Error('Invalid email or password.')
    }
    const session = { email: account.email, role: account.role, name: account.name }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
=======
    if (!supabase) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      setUser(mapSupabaseUser(data.session?.user))
      setLoading(false)
    })

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(mapSupabaseUser(session?.user))
    })

    return () => subscription.subscription.unsubscribe()
  }, [])

  const login = async (email, password) => {
    if (!supabase) {
      throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    if (error) throw new Error(error.message)
    const session = mapSupabaseUser(data.user)
>>>>>>> 068ee71 (Initial commit of updated Profitdex project)
    setUser(session)
    return session
  }

<<<<<<< HEAD
  const logout = () => {
    // TODO (Supabase): await supabase.auth.signOut()
    window.localStorage.removeItem(STORAGE_KEY)
=======
  const logout = async () => {
    if (supabase) await supabase.auth.signOut()
>>>>>>> 068ee71 (Initial commit of updated Profitdex project)
    setUser(null)
  }

  const value = useMemo(
    () => ({ user, loading, login, logout, isAuthenticated: !!user }),
    [user, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
