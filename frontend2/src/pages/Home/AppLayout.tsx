import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { resetUser } from '../../redux/states/user'
import { AppStore } from '../../redux/store'
import { Text } from '../Login/Usual'
import { ButtonTheme } from './ButtonTheme'
import { Navbar } from './Container'

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
    <>
      <Navbar>
        <Text fontSize="1rem">Alternate bg colors</Text>
      </Navbar>
      <nav>
        {/* <ul>
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
        </ul> */}
      </nav>
      <Text fontSize="1.6rem">
        {JSON.stringify({ name: user.name, email: user.email })}
      </Text>
      <Outlet />
      <ButtonTheme></ButtonTheme>
    </>
  )
}
