import { createUserAdapter } from "@/adapters/user.adapters"

export const loadUserToLocalStorageAndCookie = (user: any) => {
  localStorage.setItem('user', JSON.stringify(createUserAdapter(user)))
  document.cookie = 'token=' + createUserAdapter(user).token
}

export const getFromLocalStorage = (key: string) => {
  const getData = localStorage.getItem(key)
  return getData ? JSON.parse(getData) : null
}

