import { Row } from '../../Home/Container'
import { Icon, IconButton, Text } from '../GoogleButton'
import { Button, LoginForm, TextInput, Title } from '../LoginForm'
import { SubmitHandler, useForm } from 'react-hook-form'
import useFetchAndLoad from '../../../hooks/useFetchAndLoad'
import { login } from '../../../services/public.services'
import { loadUserToLocalStorageAndCookie } from '../../../utilities/handleStorage.utility'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createUser } from '../../../redux/states/user'
import { createUserAdapter } from '../../../adapters/user.adapters'

interface Inputs {
  email: string
  password: string
}

export const Login = () => {
  const { loading, callEndpoint } = useFetchAndLoad()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit = async ({ email, password }: Inputs) => {
    const user = await callEndpoint(login({ email, password }))
    loadUserToLocalStorageAndCookie(user)
    dispatch(createUser(createUserAdapter(user)))
    navigate('/')
  }

  if (loading) {
    return (
      <div>
        <h3>Loading</h3>
      </div>
    )
  }

  return (
    <LoginForm onSubmit={handleSubmit(onSubmit)}>
      <Title color="#278048">Ingresar</Title>
      <Row>
        <IconButton href="http://localhost:5000/api/user/login/google">
          <Icon src="https://cdn.icon-icons.com/icons2/791/PNG/512/google_icon-icons.com_65494.png"></Icon>
        </IconButton>
        <IconButton href="http://localhost:5000/api/user/login/google">
          <Icon src="https://cdn.icon-icons.com/icons2/791/PNG/512/FB_icon-icons.com_65484.png"></Icon>
        </IconButton>
        <IconButton href="http://localhost:5000/api/user/login/google">
          <Icon src="https://cdn.icon-icons.com/icons2/791/PNG/512/TWITTER_icon-icons.com_65486.png"></Icon>
        </IconButton>
      </Row>
      <TextInput
        placeholder="Correo electrónico"
        {...register('email', {
          required: 'Ingrese email',
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Email invalido',
          },
        })}
      />
      {/* <p>{errors.email?.message}</p> */}
      <TextInput
        type={'password'}
        placeholder="Contraseña"
        {...register('password', {
          required: 'Ingrese contraseña',
        })}
      />
      {/* <p>{errors.password?.message}</p> */}
      <Text fontSize="1rem" color="gray">
        Olvidé mi contraseña
      </Text>
      <Button color="#00CC4B" type="submit">
        Ingresar
      </Button>
    </LoginForm>
  )
}
