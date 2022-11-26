import { NavLink, Outlet } from 'react-router-dom'

export const AppLayout = () => {
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
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}
