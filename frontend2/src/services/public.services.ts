import axios from 'axios'
import {
  User,
  UserCredentials,
  UserDataForRegistration,
} from '../models/user.model'
import { loadAbort } from '../utilities/loadAbort.utility'

export const login = ({ email, password }: UserCredentials) => {
  const controller = loadAbort()
  const userCredentials = { email, password }
  return {
    call: axios.post<User>('/api/user/login', userCredentials, {
      signal: controller.signal,
    }),
    controller,
  }
}

export const registerUser = ({
  email,
  password,
  name,
  pic,
}: UserDataForRegistration) => {
  const controller = loadAbort()
  const userData = { email, password, name, pic }
  return {
    call: axios.post<User>('/api/user/register', userData, {
      signal: controller.signal,
    }),
    controller,
  }
}

export const verifyTokenAndGetUser = (token: string) => {
  const response = axios.get<any>(`/api/user/verify-token/${token}`)
  return response
}

export const uploadImg = (files: any) => {
  const controller = loadAbort()
  const data = new FormData()
  data.append('file', files)
  data.append('upload_preset', 'chat-app')
  data.append('cloud_name', 'dalp4xrqs')
  return {
    call: axios.post(
      'https://api.cloudinary.com/v1_1/dalp4xrqs/image/upload',
      data,
      {
        signal: controller.signal,
      }
    ),
    controller,
  }
}
