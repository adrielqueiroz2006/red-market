import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function PrivateRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return null

  return user ? children : <Navigate to="/" replace />
}
