import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { resetUser } from '../../redux/states/user'
import { AppStore } from '../../redux/store'
import { Icon, Text } from '../Login/Usual'
import { ButtonTheme } from '../Others/components/ButtonTheme'
import { BoxIn, Column, NavbarH, NavbarV, Space } from './Container'

const AppLayout = () => {
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
      <NavbarH></NavbarH>
      <NavbarV>
        <Column gap="25px">
          <Space w="" h=""></Space>
          <Link to="/">
            <Icon
              type="icon1"
              src="https://cdn-icons-png.flaticon.com/512/3388/3388840.png"
            ></Icon>
          </Link>
          <Link to="/:email">
            <Icon
              type="icon1"
              src="https://cdn-icons-png.flaticon.com/512/70/70854.png"
            ></Icon>
          </Link>
          <Link to="/:email">
            <Icon
              type="icon1"
              src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
            ></Icon>
          </Link>
        </Column>
      </NavbarV>

      <BoxIn>
        <input type="button" onClick={logout} value="salir" />
        <Text fontSize="2rem">
          {JSON.stringify({ email: user.email, name: user.name })}
        </Text>
        <Outlet />
      </BoxIn>
      <ButtonTheme></ButtonTheme>
    </>
  )
}

export default AppLayout
