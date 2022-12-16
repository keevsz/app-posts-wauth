import { Theme } from '@/models'
import { createSlice } from '@reduxjs/toolkit'
import themes from '@/themes'
import { getFromLocalStorage } from '@/utilities'

const getSystemTheme = () => {
  const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? themes.DarkTheme
    : themes.LightTheme
  localStorage.setItem('theme', JSON.stringify(defaultTheme))
  return defaultTheme

}
export const DefaultTheme: Theme = getFromLocalStorage('theme') || getSystemTheme()

export const themeSlice = createSlice({
  name: 'user',
  initialState: DefaultTheme,
  reducers: {
    createTheme: (state, action) => {
      localStorage.setItem('theme', JSON.stringify(action.payload))
      return action.payload || DefaultTheme
    }
  }
})

export const { createTheme } = themeSlice.actions
export default themeSlice.reducer