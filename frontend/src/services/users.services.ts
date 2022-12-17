import axios from 'axios'
const baseURL = import.meta.env.VITE_APP_URL_BACKEND || ''

export const getUsersFiltered = (search: string) => {
  const response = axios.get<any>(`${baseURL}/api/user?search=${search}`)
  return response
}

export const getUserService = (id: string) => {
  const response = axios.get<any>(`${baseURL}/api/user/${id}`)
  return response
}
