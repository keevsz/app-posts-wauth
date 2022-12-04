import { Theme, User } from '@/models'
import { configureStore } from '@reduxjs/toolkit'
import { themeSlice } from './states/theme.slice'
import { userSlice } from './states/user.slice'

export interface AppStore {
  user: User
  theme: Theme
}

export default configureStore<AppStore>({
  reducer: {
    user: userSlice.reducer,
    theme: themeSlice.reducer,
  },
})
