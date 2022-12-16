import { useDispatch } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { resetUser } from '@/redux/states/user.slice'
import { Icon } from '@/styled-components/Usual'
import { ButtonTheme } from '@/components/ButtonTheme'
import {
  Column,
  NavbarH,
  NavBarTop,
  NavbarV,
  Space,
} from '../styled-components/Container'
import home_icon from '@/assets/home_icon.png'
import profile_icon from '@/assets/profile_icon.png'
import logout_icon from '@/assets/logout_icon.png'
import { Row } from '@/styled-components'
import UserList from '../../Others/UserList'

const Home = () => {
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(resetUser())
  }

  return (
    <>
      <NavbarH>
        <UserList></UserList>
      </NavbarH>
      <NavbarV>
        <Column gap="25px" style={{ marginLeft: '25%' }}>
          <Space w="" h="5px"></Space>
          <Link to="/app">
            <Icon type="icon1" alt='home_icon' src={home_icon}></Icon>
          </Link>
          <Link to="/app/profile">
            <Icon type="icon1" alt='profile_icon' src={profile_icon}></Icon>
          </Link>

          <div
            style={{ position: 'absolute', bottom: '20px', cursor: 'pointer' }}
          >
            <Icon type="icon1" alt='logout_icon' src={logout_icon} onClick={logout}></Icon>
          </div>
        </Column>
      </NavbarV>

      <NavBarTop>
        <Row>
          <Space w="" h=""></Space>
          <Link to="/app">
            <Icon type="icon1" alt='home_icon' src={home_icon}></Icon>
          </Link>
          <Link to="/app/profile">
            <Icon type="icon1" alt='profile_icon' src={profile_icon}></Icon>
          </Link>
          <div
            style={{
              position: 'absolute',
              right: '4.5rem',
              cursor: 'pointer',
            }}
          >
            <Icon type="icon1" alt='logout_icon' src={logout_icon} onClick={logout}></Icon>
          </div>
        </Row>
      </NavBarTop>

      <Outlet />
      <ButtonTheme></ButtonTheme>
    </>
  )
}

export default Home
