import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTheme } from '../../../redux/states/theme'
import { AppStore } from '../../../redux/store'
import themes from '../../../themes'
import { Expand, Icon, Unexpand } from '../../Login/Usual'
import { ThemeButton, ThemeButton2 } from '../styled-components/ThemeButton'
import darkmode_icon from '../../../assets/darkmode_icon.png'
import lightmode_icon from '../../../assets/lightmode_icon.png'

export const ButtonTheme = () => {
  const theme = useSelector((store: AppStore) => store.theme)
  const dispatch = useDispatch()

  const [animation, setAnimation] = useState(false)

  const handleTheme = () => {
    theme.name == themes.DarkTheme.name
      ? dispatch(createTheme(themes.LightTheme))
      : dispatch(createTheme(themes.DarkTheme))
    setAnimation(true)
  }

  return (
    <>
      {theme.name !== 'dark' ? (
        <ThemeButton onClick={handleTheme}>
          <Icon
            type="icon2"
            width="30rem"
            height="1rem"
            loading="eager"
            alt="darkmode_icon"
            src={darkmode_icon}
          ></Icon>
        </ThemeButton>
      ) : (
        <ThemeButton2 onClick={handleTheme}>
          <Icon
            type="icon2"
            width="30rem"
            height="1rem"
            loading="eager"
            alt="lightmode_icon"
            src={lightmode_icon}
          ></Icon>
        </ThemeButton2>
      )}
      {animation &&
        (theme.name !== 'dark' ? <Expand></Expand> : <Unexpand></Unexpand>)}
    </>
  )
}
