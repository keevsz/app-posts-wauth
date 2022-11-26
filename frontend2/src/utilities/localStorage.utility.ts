import { User } from "../models/user.model";

export const setUserToLocalStorage = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const getFromLocalStorage = (key: string) => {
  const getData = localStorage.getItem(key)
  return getData ? JSON.parse(getData) : null
}