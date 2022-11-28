import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { resetUser } from '../../redux/states/user'
import { AppStore } from '../../redux/store'

export const AppLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logout = () => {
    localStorage.removeItem('user')
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    dispatch(resetUser)
    navigate('/login')
  }

  const user = useSelector((store: AppStore) => store.user)

  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              style={({ isActive }) => ({ color: isActive ? 'red' : 'black' })}
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => ({ color: isActive ? 'red' : 'black' })}
              to="/:email"
            >
              Mi perfil
            </NavLink>
          </li>
          <li>
            <input type="button" onClick={logout} value="salir" />
          </li>
        </ul>
      </nav>
      {JSON.stringify({ name: user.name, email: user.email })}
      <Outlet />
    </div>
  )
}
