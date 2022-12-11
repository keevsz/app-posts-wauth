import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTheme } from "../redux/states/theme.slice";
import { AppStore } from "../redux/store";
import themes from "../themes";
import {
  Expand,
  Icon,
  ThemeButton,
} from "../styled-components/ButtonTheme.styled";
import darkmode_icon from "../assets/darkmode_icon.png";
import lightmode_icon from "../assets/lightmode_icon.png";
import { FullPage } from "@/styled-components";

export const ButtonTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((store: AppStore) => store.theme);

  const [animation, setAnimation] = useState(false);

  const handleTheme = () => {
    if (animation) return;

    theme.name == themes.DarkTheme.name
      ? dispatch(createTheme(themes.LightTheme))
      : dispatch(createTheme(themes.DarkTheme));

    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 650);
  };

  return (
    <>
      <ThemeButton onClick={handleTheme}>
        <Icon
          width="30rem"
          height="1rem"
          alt="darkmode_icon"
          src={theme.name !== "dark" ? darkmode_icon : lightmode_icon}
          animation={animation}
        ></Icon>
      </ThemeButton>
      <Expand animation={animation}></Expand>
    </>
  );
};
