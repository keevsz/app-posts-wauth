import axios from 'axios'
const baseURL = import.meta.env.VITE_APP_URL_BACKEND

export const getChatService = (userId: string) => {
  const data = { userId }
  const response = axios.post<any>(`${baseURL}/api/chat/`, data)
  return response
}
