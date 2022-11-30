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
import { CenterVH, FullPage } from '../Home/Container'
import { Auth, BoxRight, Button, Title } from './styled-components/LoginForm'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Loader } from './BoxLoading'
import { ButtonTheme } from '../Home/ButtonTheme'

export const AuthPage = () => {
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

  if (loaded)
    return (
      <FullPage>
        <CenterVH>
          <Loader></Loader>
        </CenterVH>
      </FullPage>
    )

  return (
    <>
      <ButtonTheme />
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
