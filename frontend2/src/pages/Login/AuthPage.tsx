import { lazy, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { createUserAdapter } from '../../adapters/user.adapters'
import { createUser } from '../../redux/states/user.slice'
import { verifyTokenAndGetUser } from '../../services/public.services'
import {
  getFromLocalStorage,
  loadUserToLocalStorageAndCookie,
} from '../../utilities/handleStorage.utility'
import { CenterVH } from '../Home/styled-components/Container'
import { Auth } from './styled-components/AuthForm.styled'
import { Loader } from '../../components/Loading.styled'
import { ButtonTheme } from '../../components/ButtonTheme'
import Register from './components/Register'
import { Right } from './components/Right'
const Login = lazy(() => import('./components/Login'))

const AuthPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loaded, setLoadad] = useState(false)
  const [form, setForm] = useState(true)

  const getData = async (cookie: string) => {
    const user = await verifyTokenAndGetUser(cookie)
    loadUserToLocalStorageAndCookie(user)
    dispatch(createUser(createUserAdapter(user)))
    navigate('/')
  }

  const user = getFromLocalStorage('user')
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
      <CenterVH>
        <Loader></Loader>
      </CenterVH>
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
            <Right form={form} handleForm={handleForm}></Right>
          </Auth>
        )}
      </CenterVH>
    </>
  )
}

export default AuthPage
