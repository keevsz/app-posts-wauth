import { configureStore } from '@reduxjs/toolkit'
import { themeSlice } from './states/theme'
import { userSlice } from './states/user'

export interface AppStore {
  user: any
  theme: any
}

export default configureStore<AppStore>({
  reducer: {
    user: userSlice.reducer,
    theme: themeSlice.reducer,
  },
})
