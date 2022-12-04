import { getFromLocalStorage } from '@/utilities'
import { Navigate } from 'react-router-dom'

interface Props {
  children: JSX.Element
}

const ProtectedRoute = ({ children }: Props) => {
  if (!getFromLocalStorage('user')) {
    return <Navigate to="/login"></Navigate>
  }
  return children
}

export default ProtectedRoute
