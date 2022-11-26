import { User } from "../models/user.model";

export const setUserToLocalStorage = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const getFromLocalStorage = (user: string) => {
  const getUser = localStorage.getItem(user)
  console.log(getUser)
  return getUser ? JSON.parse(getUser) : null
}