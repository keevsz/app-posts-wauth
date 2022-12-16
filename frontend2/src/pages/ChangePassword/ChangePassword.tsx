import { ButtonTheme } from '@/components/ButtonTheme'
import { sendEmailChangePassword } from '@/services/public.services'
import { Icon, Text } from '@/styled-components'
import { useState } from 'react'
import { CenterVH, Column } from '../App/Home/styled-components/Container'
import { TextInput } from '../Login/styled-components/AuthForm.styled'
import {
  BoxVerifyEmail,
  ButtonVerifyEmail,
} from '../VerifyEmail/VerifyEmail.styled'
import back_icon from '@/assets/back_icon.png'
import { useNavigate } from 'react-router-dom'
import { useFetchAndLoad } from '@/hooks'

const ChangePassword = () => {
  const [email, setEmail] = useState('')
  const { callEndpoint, loading } = useFetchAndLoad()
  const navigate = useNavigate()

  const sendEmail = async () => {
    await callEndpoint(sendEmailChangePassword(email))
  }
  return (
    <>
      <ButtonTheme></ButtonTheme>
      <CenterVH>
        <BoxVerifyEmail>
          <Column gap="2rem">
            <Text fontSize="1.2rem">
              Por favor, ingrese su correo electronico.
              <br />
              Recibiras un link para restablecer su contraseña.
            </Text>
            <TextInput
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
            ></TextInput>
            <ButtonVerifyEmail disabled={loading} onClick={sendEmail}>
              {loading ? 'Enviando...' : 'Enviar correo'}
            </ButtonVerifyEmail>
          </Column>
        </BoxVerifyEmail>
        <div
          style={{
            cursor: 'pointer',
            position: 'absolute',
            width: '10px',
            top: '20px',
            left: '20px',
            zIndex: 100,
          }}
        >
          <Icon
            style={{ width: '3rem', height: '3rem' }}
            type="icon1"
            src={back_icon}
            onClick={() => {navigate('/login')}}
          ></Icon>
        </div>
      </CenterVH>
    </>
  )
}
export default ChangePassword
