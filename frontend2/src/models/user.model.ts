export interface User {
  id?: String
  name: String
  email: String
  pic: String
  verified: boolean
  token: String
}

export interface UserCredentials {
  email: String
  password: String
}

export interface UserDataForRegistration {
  email: String
  password: String
  name: String
  pic?: String
}
