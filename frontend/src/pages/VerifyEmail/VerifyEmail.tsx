import { ButtonTheme } from '@/components/ButtonTheme'
import { CenterVH, Column } from '../App/Home/styled-components/Container'
import {
  BoxVerifyEmail,
  ButtonVerifyEmail,
  IconVerifyEmail,
} from './VerifyEmail.styled'
import verifyEmail_icon from '@/assets/verify_email_icon.png'
import { Icon, Row, Text } from '@/styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'
import { sendEmailToVerify } from '@/services/public.services'
import { resetUser } from '@/redux/states/user.slice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetchAndLoad from '@/hooks/useFetchAndLoad'
import logout_icon from '@/assets/logout_icon.png'
import { PrivateRoutes } from '@/models'

const VerifyEmail = () => {
  const userState = useSelector((state: AppStore) => state.user)
  const { callEndpoint, loading } = useFetchAndLoad()
  const sendEmail = async () => {
    await callEndpoint(sendEmailToVerify(userState.email))
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch(resetUser())
  }

  useEffect(() => {
    if (userState.verified) return navigate(PrivateRoutes.APP)
  }, [userState])

  return (
    <CenterVH>
      <ButtonTheme />
      <BoxVerifyEmail>
        <Column gap={'1.5rem'}>
          <IconVerifyEmail src={verifyEmail_icon}></IconVerifyEmail>
          <Text fontSize="2rem">Verifica tu correo electrónico</Text>
          <Text fontSize="1.2rem">{userState.email || 'undefined'}</Text>
          <Text fontSize="0.8rem">
            Verifique su dirección de correo electrónico para continuar.
            <br />
            Si no le llegó el correo de verificación, vuelva a reenviar.
          </Text>
          <Row>
            <ButtonVerifyEmail disabled={loading} onClick={sendEmail}>
              {loading ? 'Enviando...' : 'Enviar correo'}
            </ButtonVerifyEmail>
          </Row>
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
          src={logout_icon}
          onClick={logout}
        ></Icon>
      </div>
    </CenterVH>
  )
}
export default VerifyEmail
