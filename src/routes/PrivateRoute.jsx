import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Loading } from '../components/Loading'

export function PrivateRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <Loading />

  return user ? children : <Navigate to="/" replace />
}
