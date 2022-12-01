import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTheme } from '../../redux/states/theme'
import { AppStore } from '../../redux/store'
import themes from '../../themes'
import { Expand, Icon, Unexpand } from '../Login/Usual'
import { ThemeButton, ThemeButton2 } from './ThemeButton'

export const ButtonTheme = () => {
  const theme = useSelector((store: AppStore) => store.theme)
  const dispatch = useDispatch()

  const [animation, setAnimation] = useState(false)

  const handleTheme = () => {
    theme.name == themes.DarkTheme.name
      ? dispatch(createTheme(themes.LightTheme))
      : dispatch(createTheme(themes.DarkTheme))
    console.log('activar animacion')
    setAnimation(true)
  }

  return (
    <>
      {theme.name !== 'dark' ? (
        <ThemeButton onClick={handleTheme}>
          <Icon
            type="icon2"
            style={{
              width: '1.8rem',
            }}
            src="https://cdn-icons-png.flaticon.com/512/6714/6714978.png"
          ></Icon>
        </ThemeButton>
      ) : (
        <ThemeButton2 onClick={handleTheme}>
          <Icon
            type="icon2"
            style={{
              width: '1.8rem',
            }}
            src="https://cdn-icons-png.flaticon.com/512/66/66275.png"
          ></Icon>
        </ThemeButton2>
      )}
      {animation ? (
        <>{theme.name !== 'dark' ? <Expand></Expand> : <Unexpand></Unexpand>}</>
      ) : null}
    </>
  )
}
