import axios from 'axios'
import { User, UserCredentials } from '../models/user.model'
import { loadAbort } from '../utilities/loadAbort.utility'

export const login = ({ email, password }: UserCredentials) => {
  const controller = loadAbort()
  const userCredentials = { email, password }
  return {
    call: axios.post<User>(
      'http://localhost:5000/api/user/login',
      userCredentials,
      { signal: controller.signal }
    ),
    controller,
  }
}
