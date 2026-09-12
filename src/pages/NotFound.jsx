import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-3">404</p>
      <h1 className="font-display text-3xl text-ink mb-3">This page isn't on the ledger.</h1>
      <p className="text-slate text-sm mb-6 max-w-sm">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        to="/"
        className="rounded-sm bg-ink px-6 py-3 text-sm font-medium text-paper hover:bg-ink-2 transition-colors"
      >
        Back to home
      </Link>
    </div>
  )
}
