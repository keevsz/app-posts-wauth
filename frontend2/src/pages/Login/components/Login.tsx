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
import { Loading } from './Loading'

interface Props {
  handleForm: () => void
}

interface Inputs {
  email: string
  password: string
}

export const Login = ({ handleForm }: Props) => {
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
            src="https://cdn.icon-icons.com/icons2/791/PNG/512/google_icon-icons.com_65494.png"
          ></Icon>
        </IconButton>
        <IconButton href="#">
          <Icon
            type={'icon1'}
            src="https://cdn.icon-icons.com/icons2/791/PNG/512/FB_icon-icons.com_65484.png"
          ></Icon>
        </IconButton>
        <IconButton href="#">
          <Icon
            type={'icon1'}
            src="https://cdn.icon-icons.com/icons2/791/PNG/512/TWITTER_icon-icons.com_65486.png"
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
