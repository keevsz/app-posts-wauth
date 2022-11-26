import { useDispatch, useSelector } from 'react-redux'
import { createUserAdapter } from '../../adapters/user.adapters'
import useFetchAndLoad from '../../hooks/useFetchAndLoad'
import { createUser } from '../../redux/states/user'
import { login } from '../../services/public.services'
import {
  getFromLocalStorage,
  setUserToLocalStorage,
} from '../../utilities/localStorage.utility'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AppStore } from '../../redux/store'

interface Inputs {
  email: string
  password: string
}

export const Login = () => {
  console.log('login')
  const { loading, callEndpoint } = useFetchAndLoad()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = async () => {
    const user = await callEndpoint(
      login({ email: watch('email'), password: watch('password') })
    )
    setUserToLocalStorage(createUserAdapter(user))
    dispatch(createUser(createUserAdapter(user)))
    navigate('/')
  }

  const user = getFromLocalStorage('user')
  useEffect(() => {
    if (user) return navigate('/')
  }, [])

  return (
    <>
      {loading ? (
        <div>
          <h3>Loading</h3>
        </div>
      ) : (
        !user && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="email"
              {...register('email', {
                required: 'Ingrese email',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Email invalido',
                },
              })}
            />
            <p>{errors.email?.message}</p>
            <input
              placeholder="password"
              {...register('password', {
                required: 'Ingrese contraseña',
              })}
            />
            <p>{errors.password?.message}</p>
            <input type="submit" />
          </form>
        )
      )}
    </>
  )
}

export default Login
