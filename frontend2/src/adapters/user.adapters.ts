export const createUserAdapter = (user: any) => ({
  id: user.data.id,
  name: user.data.name,
  email: user.data.email,
  pic: user.data.pic,
  verified: user.data.verified,
  token: user.data.token
})