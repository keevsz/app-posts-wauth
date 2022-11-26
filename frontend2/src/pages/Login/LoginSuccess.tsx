import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  render: any
}

export const LoginSuccess = ({ render }: Props) => {
  let valor = document.cookie.split('token=')
  const [cookie] = useState(valor[1])
  const navigate = useNavigate()

  useEffect(() => {
    async function getUser() {
      const response = await axios.get(
        `http://localhost:5000/api/user/verify-token/${cookie}`
      )
      return response
    }
    getUser()
    render(getUser())
    navigate('/')
  }, [cookie])

  return <div>Gracias por logearte</div>
}
