import { useEffect, useState } from "react"
import themes from "../redux/themes"
import { getFromLocalStorage } from "../utilities/handleStorage.utility"

const getSystemTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? themes.DarkTheme : themes.LightTheme
}

const useThemeHandler = () => {
  const [theme, setTheme] = useState(
    getFromLocalStorage('theme') || getSystemTheme()
  )

  const handleTheme = () => {
    theme.name == themes.DarkTheme.name
      ? setTheme(themes.LightTheme)
      : setTheme(themes.DarkTheme)
  }

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme))
  }, [theme])

  return {
    handleTheme, theme
  }
}

export default useThemeHandler