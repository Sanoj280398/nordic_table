import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

// Route guard: kun admins må se indholdet – ellers videre til login
export default function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (user?.role !== 'admin') return <Navigate to="/login" replace />
  return children
}
