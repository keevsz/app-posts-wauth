import { Text } from '../../../styled-components/Usual'
import {
  BoxInput,
  Button,
  Form,
  TextInput,
  Title,
  ToolTip,
} from '../styled-components/AuthForm.styled'
import { useForm } from 'react-hook-form'
import useFetchAndLoad from '../../../hooks/useFetchAndLoad'
import { login } from '../../../services/public.services'
import { loadUserToLocalStorageAndCookie } from '../../../utilities/handleStorage.utility'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createUser } from '../../../redux/states/user.slice'
import { createUserAdapter } from '../../../adapters/user.adapters'
import Loading from '../../../components/Loading'
import IconSet from './IconSet'
import { Row } from '@/styled-components'

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
    watch,
  } = useForm<Inputs>()

  const onSubmit = async ({ email, password }: Inputs) => {
    const user = await callEndpoint(login({ email, password }))
    loadUserToLocalStorageAndCookie(user)
    dispatch(createUser(createUserAdapter(user)))
    navigate('/')
  }

  if (loading) return <Loading></Loading>
  return (
    <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Title color="#278048">Ingresar</Title>
      <IconSet />
      <BoxInput>
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
        ></TextInput>
        {errors.email && <ToolTip text={errors.email.message}>⚠</ToolTip>}
      </BoxInput>
      <BoxInput>
        <TextInput
          type={'password'}
          placeholder="Contraseña"
          {...register('password', {
            required: 'Ingrese contraseña',
          })}
        />
        {errors.password && <ToolTip text={errors.password.message}>⚠</ToolTip>}
      </BoxInput>

      <Text fontSize="1rem" color="gray">
        Olvidé mi contraseña
      </Text>
      <Row>
        <Button display="" color="#00CC4B" type="submit">
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
    </Form>
  )
}

export default Login
