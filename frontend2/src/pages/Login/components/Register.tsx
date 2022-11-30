import { Row } from '../../Home/Container'
import { Icon, IconButton, Text } from '../Usual'
import {
  BoxRight,
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
import { Loading } from './Loading'
import { registerUser, uploadImg } from '../../../services/public.services'
import { Avatar, Image, InputImage } from '../../../styled-components/Globals'
import axios from 'axios'
import { useState } from 'react'

interface Props {
  handleForm: () => void
}

interface Inputs {
  name: string
  email: string
  password: string
}

export const Register = ({ handleForm }: Props) => {
  const { loading, callEndpoint } = useFetchAndLoad()
  const [pic, setPic] = useState(
    'https://cdn-icons-png.flaticon.com/512/685/685686.png'
  )
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
            type="icon1"
            src="https://cdn.icon-icons.com/icons2/791/PNG/512/google_icon-icons.com_65494.png"
          ></Icon>
        </IconButton>
        <IconButton href="#">
          <Icon
            type="icon1"
            src="https://cdn.icon-icons.com/icons2/791/PNG/512/FB_icon-icons.com_65484.png"
          ></Icon>
        </IconButton>
        <IconButton href="#">
          <Icon
            type="icon1"
            src="https://cdn.icon-icons.com/icons2/791/PNG/512/TWITTER_icon-icons.com_65486.png"
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
