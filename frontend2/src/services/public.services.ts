import axios from 'axios'
import { User, UserCredentials } from '../models/user.model'
import { loadAbort } from '../utilities/loadAbort.utility'

export const login = ({ email, password }: UserCredentials) => {
  const controller = loadAbort()
  const userCredentials = { email, password }
  return {
    call: axios.post<User>(
      'https://kevsz-sm-backend.onrender.com/api/user/login',
      userCredentials,
      { signal: controller.signal }
    ),
    controller,
  }
}

export const verifyTokenAndGetUser = (token: string) => {
  const response = axios.get<any>(
    `https://kevsz-sm-backend.onrender.com/api/user/verify-token/${token}`,
  )

  return response

}