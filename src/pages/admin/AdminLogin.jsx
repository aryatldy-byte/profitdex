import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const session = await login(email, password)
      if (session.role !== 'admin') {
        setError('This account does not have admin access.')
        return
      }
      navigate('/admin/dashboard', { replace: true })
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-ink flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-emerald text-paper font-display font-semibold mb-4">
            PV
          </span>
          <h1 className="font-display text-2xl text-paper mb-1">Admin login</h1>
          <p className="text-sm text-paper/60">Manage daily market news updates.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-ink-2 border border-hairline-dark rounded-sm p-6 space-y-4">
          {error && (
            <p className="text-sm text-rose bg-rose/10 border border-rose/30 rounded-sm px-3 py-2">
              {error}
            </p>
          )}
          <div>
            <label htmlFor="email" className="block text-xs uppercase tracking-wide text-paper/60 mb-1.5">
              Admin email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-sm border border-hairline-dark bg-ink px-3 py-2.5 text-sm text-paper focus:border-emerald-light"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs uppercase tracking-wide text-paper/60 mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm border border-hairline-dark bg-ink px-3 py-2.5 text-sm text-paper focus:border-emerald-light"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-sm bg-emerald px-4 py-2.5 text-sm font-medium text-paper hover:bg-emerald-light transition-colors disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center text-xs text-paper/50">
          <Link to="/" className="hover:text-emerald-light">← Back to site</Link>
        </div>
      </div>
    </div>
  )
}
