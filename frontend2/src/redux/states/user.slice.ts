import { createSlice } from '@reduxjs/toolkit'
import { UserEmptyState } from '../../models'
import { getFromLocalStorage } from '../../utilities'

export const userSlice = createSlice({
  name: 'user',
  initialState: getFromLocalStorage('user') || UserEmptyState,
  reducers: {
    createUser: (state, action) => {
      return action.payload || UserEmptyState
    },
    modifyUser: (state, action) => {
      return { ...state, ...action.payload }
    },
    resetUser: () => {
      //localstorage.removeitem
      return UserEmptyState
    },
  }
})

export const { createUser, modifyUser, resetUser } = userSlice.actions
export default userSlice.reducer