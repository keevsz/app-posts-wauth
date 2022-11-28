import { Row } from '../../Home/Container'
import { Icon, IconButton } from '../Usual'
import {
  Button,
  LoginForm,
  TextInput,
  Title,
} from '../styled-components/LoginForm'

export const Register = () => {
  return (
    <LoginForm>
      <Title color="#278048">Regitrarse</Title>
      <Row>
        <IconButton href="https://kevsz-sm-backend.onrender.com/api/user/login/google">
          <Icon src="https://cdn.icon-icons.com/icons2/791/PNG/512/google_icon-icons.com_65494.png"></Icon>
        </IconButton>
        <IconButton href="#">
          <Icon src="https://cdn.icon-icons.com/icons2/791/PNG/512/FB_icon-icons.com_65484.png"></Icon>
        </IconButton>
        <IconButton href="#">
          <Icon src="https://cdn.icon-icons.com/icons2/791/PNG/512/TWITTER_icon-icons.com_65486.png"></Icon>
        </IconButton>
      </Row>
      <TextInput placeholder="Nombres" />
      <TextInput placeholder="Correo electrónico" />
      <TextInput type={'password'} placeholder="Contraseña" />
      <TextInput placeholder="Confirmar contraseña" />
      <Button color="#00CC4B" type="submit">
        Registrarse
      </Button>
    </LoginForm>
  )
}
