import { Row } from '../../Home/Container'
import { Icon, IconButton } from '../Usual'
import {
  Button,
  LoginForm,
  TextInput,
  Title,
} from '../styled-components/LoginForm'
import useFetchAndLoad from '../../../hooks/useFetchAndLoad'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { loadUserToLocalStorageAndCookie } from '../../../utilities/handleStorage.utility'
import { createUser } from '../../../redux/states/user'
import { createUserAdapter } from '../../../adapters/user.adapters'
import { registerUser, uploadImg } from '../../../services/public.services'
import { Avatar, Image, InputImage } from '../../../styled-components/Globals'
import google_icon from '../../../assets/google_icon.png'
import facebook_icon from '../../../assets/facebook_icon.png'
import twitter_icon from '../../../assets/twitter_icon.png'
import { lazy, useState } from 'react'
const Loading = lazy(() => import('./Loading'))
import pic_change from '../../../assets/pic_change.png'

interface Props {
  handleForm: () => void
}

interface Inputs {
  name: string
  email: string
  password: string
}

const Register = ({ handleForm }: Props) => {
  const { loading, callEndpoint } = useFetchAndLoad()
  const [pic, setPic] = useState(pic_change)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit = async ({ email, password, name }: Inputs) => {
    const user = await callEndpoint(
      registerUser({ email, password, name, pic })
    )
    loadUserToLocalStorageAndCookie(user)
    dispatch(createUser(createUserAdapter(user)))
    navigate('/')
  }

  const uploadImage = async (files: any) => {
    const response = await callEndpoint(uploadImg(files))
    setPic(response.data.url)
  }

  if (loading) return <Loading></Loading>

  return (
    <LoginForm autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Title color="#278048">Registrarse</Title>
      <Row>
        <IconButton href="http://localhost:5000/api/user/login/google">
          <Icon
            type={'icon1'}
            width="15rem"
            height="1rem"
            alt="google_icon"
            src={google_icon}
          ></Icon>
        </IconButton>
        <IconButton href="#">
          <Icon
            type={'icon1'}
            width="15rem"
            height="1rem"
            alt="facebook_icon"
            src={facebook_icon}
          ></Icon>
        </IconButton>
        <IconButton href="#">
          <Icon
            type={'icon1'}
            width="15rem"
            height="1rem"
            alt="twitter_icon"
            src={twitter_icon}
          ></Icon>
        </IconButton>
      </Row>
      <Avatar htmlFor="input">
        <InputImage
          id="input"
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={(e: any) => uploadImage(e.target.files[0])}
        ></InputImage>
        <Image src={pic}></Image>
      </Avatar>
      <TextInput
        placeholder="Nombres"
        {...register('name', {
          required: 'Ingrese nombres',
        })}
      />
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
      <TextInput placeholder="Confirmar contraseña" />
      <Row>
        <Button display="null" color="#00CC4B" type="submit">
          Registrarse
        </Button>
        <Button
          display="none"
          onClick={handleForm}
          color="#4a4a4abd"
          type="button"
        >
          Ingresar
        </Button>
      </Row>
    </LoginForm>
  )
}

export default Register
