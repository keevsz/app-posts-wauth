import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { User } from '../../models/user.model'
import { AppStore } from '../../redux/store'

interface Props {
  children: JSX.Element
}

export const ProtectedRoute = ({ children }: Props) => {
  const user = useSelector((store: AppStore) => store.user)
  if (user.id === '') {
    return <Navigate to="/login"></Navigate>
  }
  return children
}
