import { Row } from '../../Home/Container'
import { Icon, IconButton, Text } from '../Usual'
import {
  Button,
  LoginForm,
  TextInput,
  Title,
} from '../styled-components/LoginForm'
import { useForm } from 'react-hook-form'
import useFetchAndLoad from '../../../hooks/useFetchAndLoad'
import { login } from '../../../services/public.services'
import { loadUserToLocalStorageAndCookie } from '../../../utilities/handleStorage.utility'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createUser } from '../../../redux/states/user'
import { createUserAdapter } from '../../../adapters/user.adapters'
import Loading from './Loading'

import google_icon from '../../../assets/google_icon.png'
import facebook_icon from '../../../assets/facebook_icon.png'
import twitter_icon from '../../../assets/twitter_icon.png'

interface Props {
  handleForm: () => void
}

interface Inputs {
  email: string
  password: string
}
const Login = ({ handleForm }: Props) => {
  const { loading, callEndpoint } = useFetchAndLoad()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit = async ({ email, password }: Inputs) => {
    const user = await callEndpoint(login({ email, password }))
    loadUserToLocalStorageAndCookie(user)
    dispatch(createUser(createUserAdapter(user)))
    navigate('/')
  }

  if (loading) return <Loading></Loading>

  return (
    <LoginForm autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Title color="#278048">Ingresar</Title>
      <Row>
        <IconButton href="http://localhost:5000/api/user/login/google">
          <Icon
            type={'icon1'}
            width="15rem"
            height="1rem"
            loading="eager"
            alt="google_icon"
            src={google_icon}
          ></Icon>
        </IconButton>
        <IconButton href="#">
          <Icon
            type={'icon1'}
            width="15rem"
            height="1rem"
            loading="eager"
            alt="facebook_icon"
            src={facebook_icon}
          ></Icon>
        </IconButton>
        <IconButton href="#">
          <Icon
            type={'icon1'}
            width="15rem"
            height="1rem"
            loading="eager"
            alt="twitter_icon"
            src={twitter_icon}
          ></Icon>
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
      <TextInput
        type={'password'}
        placeholder="Contraseña"
        {...register('password', {
          required: 'Ingrese contraseña',
        })}
      />
      <Text fontSize="1rem" color="gray">
        Olvidé mi contraseña
      </Text>
      <Row>
        <Button display="null" color="#00CC4B" type="submit">
          Ingresar
        </Button>
        <Button
          display="none"
          onClick={handleForm}
          color="#4a4a4abd"
          type="button"
        >
          Registrarse
        </Button>
      </Row>
    </LoginForm>
  )
}

export default Login
