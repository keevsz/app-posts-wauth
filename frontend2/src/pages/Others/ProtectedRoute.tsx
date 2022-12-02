import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { AppStore } from '../../redux/store'

interface Props {
  children: JSX.Element
}

const ProtectedRoute = ({ children }: Props) => {
  const user = useSelector((store: AppStore) => store.user)
  if (user.id === '') {
    return <Navigate to="/login"></Navigate>
  }
  return children
}

export default ProtectedRoute
