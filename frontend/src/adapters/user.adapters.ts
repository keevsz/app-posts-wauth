import { User } from "@/models"

export const createUserAdapter = (user: any) => ({
  id: user.data.id,
  name: user.data.name,
  email: user.data.email,
  pic: user.data.pic,
  verified: user.data.verified,
  token: user.data.token,
})

export const getUsersAdapter = (users: any):[User] => {
  return users.data.map((user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    pic: user.pic,
    verified: user.verified,
    token: user.token,
  }))
}
