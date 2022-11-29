import { useDispatch } from 'react-redux'
import { createUserAdapter } from '../../adapters/user.adapters'
import { createUser } from '../../redux/states/user'
import { verifyTokenAndGetUser } from '../../services/public.services'
import {
  getFromLocalStorage,
  loadUserToLocalStorageAndCookie,
} from '../../utilities/handleStorage.utility'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Expand, Icon, Text, Unexpand } from './Usual'
import { CenterVH } from '../Home/Container'
import { Auth, BoxRight, Button, Title } from './styled-components/LoginForm'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Loading } from './components/Loading'
import { ThemeButton, ThemeButton2 } from '../Home/ThemeButton'

interface Props {
  handleTheme: () => void
  theme: any
}

export const AuthPage = ({ handleTheme, theme }: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loaded, setLoadad] = useState(false)
  const [form, setForm] = useState(true)

  const user = getFromLocalStorage('user')
  const getData = async (cookie: string) => {
    const user = await verifyTokenAndGetUser(cookie)
    loadUserToLocalStorageAndCookie(user)
    dispatch(createUser(createUserAdapter(user)))
    navigate('/')
  }

  useEffect(() => {
    let cookie = document.cookie.split('token=')[1]
    console.log('cookie=', cookie)
    if (cookie) {
      setLoadad(true)
      getData(cookie)
    }
    if (user) return navigate('/')
  }, [])

  const handleForm = () => setForm(!form)

  if (loaded) return <Loading></Loading> //would be complete page loading
  return (
    <>
      {theme.name !== 'dark' ? (
        <ThemeButton onClick={handleTheme}>
          <Icon
            style={{
              width: '3rem',
            }}
            src="https://cdn-icons-png.flaticon.com/512/6714/6714978.png"
          ></Icon>
        </ThemeButton>
      ) : (
        <ThemeButton2 onClick={handleTheme}>
          <Icon
            style={{
              width: '3rem',
            }}
            src="https://cdn-icons-png.flaticon.com/512/66/66275.png"
          ></Icon>
        </ThemeButton2>
      )}

      {theme.name !== 'dark' ? <Expand></Expand> : <Unexpand></Unexpand>}
      <CenterVH>
        {!user && (
          <Auth>
            {form ? (
              <Login handleForm={handleForm}></Login>
            ) : (
              <Register handleForm={handleForm}></Register>
            )}
            <BoxRight color="#00CC4B">
              <Title color="white"> {form ? 'Registrarse' : 'Ingresar'}</Title>
              <Text color="white" fontSize="1rem">
                {form
                  ? 'Registrate si no tienes una cuenta'
                  : 'Ingresa si ya tienes una cuenta'}
              </Text>
              <Button
                onClick={handleForm}
                display="null"
                color="#00CC4B"
                type="button"
              >
                {form ? 'Registrarse' : 'Ingresar'}
              </Button>
            </BoxRight>
          </Auth>
        )}
      </CenterVH>
    </>
  )
}

export default Login
