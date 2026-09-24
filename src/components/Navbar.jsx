import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useAccountModal } from '../context/AccountModalContext'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const { openModal } = useAccountModal()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 bg-ink text-paper border-b border-hairline-dark">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-gold text-ink font-display font-semibold text-sm">
              PV
            </span>
            <span className="font-display text-lg tracking-tight">
              Profitdex <span className="text-gold">Ventures</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm tracking-wide transition-colors ${
                    isActive ? 'text-gold' : 'text-paper/80 hover:text-paper'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/admin/dashboard" className="text-sm text-paper/80 hover:text-paper">
                  Admin dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-sm border border-hairline-dark px-3 py-1.5 text-sm text-paper/80 hover:text-paper hover:border-gold transition-colors"
                >
                  Log out
                </button>
              </>
            ) : (
              <button
                onClick={openModal}
                className="rounded-sm bg-gold px-4 py-1.5 text-sm font-medium text-ink hover:bg-gold/90 transition-colors"
              >
                Get started
              </button>
            )}
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-sm p-2 text-paper/90"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-hairline-dark bg-ink">
          <nav className="flex flex-col px-4 py-3">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 border-b border-hairline-dark/60 text-sm ${
                    isActive ? 'text-gold' : 'text-paper/85'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {user ? (
              <>
                <Link
                  to="/admin/dashboard"
                  onClick={() => setOpen(false)}
                  className="py-3 border-b border-hairline-dark/60 text-sm text-paper/85"
                >
                  Admin dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="py-3 text-left text-sm text-paper/85"
                >
                  Log out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setOpen(false)
                  openModal()
                }}
                className="py-3 text-left text-sm text-gold"
              >
                Get started
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
