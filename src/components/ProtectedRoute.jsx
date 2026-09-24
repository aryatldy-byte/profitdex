import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Wrap a route element with this to require an admin login.
 *
 * <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>
 */
export default function ProtectedRoute({ children, role = 'admin' }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate text-sm">
        Loading…
      </div>
    )
  }

  if (!user || (role && user.role !== role)) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return children
}
