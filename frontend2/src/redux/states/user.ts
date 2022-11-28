import { User } from "../../models/user.model";
import { createSlice } from '@reduxjs/toolkit'

export const UserEmptyState: User = {
  id: '',
  name: '',
  email: '',
  pic: '',
  verified: false,
  token: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState: UserEmptyState,
  reducers: {
    createUser: (state, action) => {
      return action.payload || UserEmptyState
    },
    modifyUser: (state, action) => {
      return { ...state, ...action.payload }
    },
    resetUser: () => {
      return UserEmptyState
    },
  }
})

export const { createUser, modifyUser, resetUser } = userSlice.actions
export default userSlice.reducer