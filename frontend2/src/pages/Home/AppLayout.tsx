import { useDispatch } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { resetUser } from '../../redux/states/user'

export const AppLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logout = () => {
    localStorage.removeItem('user')
    dispatch(resetUser)
    navigate('/login')
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
  }

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
      <Outlet />
    </div>
  )
}
