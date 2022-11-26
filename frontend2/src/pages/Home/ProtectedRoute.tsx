import { Navigate } from 'react-router-dom'
import { User } from '../../models/user.model'

interface Props {
  children: JSX.Element
  user?: User
}

export const ProtectedRoute = ({ children, user }: Props) => {
  if (!user) return <Navigate to="/login" />
  return children
}
