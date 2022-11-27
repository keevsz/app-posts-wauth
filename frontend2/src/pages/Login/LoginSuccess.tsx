import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createUserAdapter } from '../../adapters/user.adapters'
import { createUser } from '../../redux/states/user'
import { verifyTokenAndGetUser } from '../../services/public.services'
import { loadUserToLocalStorageAndCookie } from '../../utilities/handleStorage.utility'

interface Props {
  render: any
}

export const LoginSuccess = ({ render }: Props) => {
  let valor = document.cookie.split('token=')
  const [cookie] = useState(valor[1])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getUser = async () => {
    const user = await verifyTokenAndGetUser(cookie)
    loadUserToLocalStorageAndCookie(user)
    dispatch(createUser(createUserAdapter(user)))
    return user.data
  }

  useEffect(() => {
    render(getUser())
    navigate('/')
  }, [cookie])

  return <div>Gracias por logearte</div>
}
