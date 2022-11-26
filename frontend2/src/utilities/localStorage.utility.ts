import { User } from "../models/user.model";

export const setUserToLocalStorage = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const getUserToLocalStorage = (user: String) => {
  return localStorage.getItem('user')
}