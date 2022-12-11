import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { resetUser } from "../../../../redux/states/user.slice";
import { AppStore } from "../../../../redux/store";
import { Icon, Text } from "../../../../styled-components/Usual";
import { ButtonTheme } from "../../../../components/ButtonTheme";
import {
  BoxIn,
  Column,
  NavbarH,
  NavbarV,
  Space,
} from "../styled-components/Container";
import home_icon from "@/assets/home_icon.png";
import messages_icon from "@/assets/messages_icon.png";
import profile_icon from "@/assets/profile_icon.png";


const Home = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(resetUser());
  };

  return (
    <>
      <NavbarH></NavbarH>
      <NavbarV>
        <Column gap="25px" style={{marginLeft:"25%"}}>
          <Space w="" h="5px"></Space>
          <Link to="/app">
            <Icon
              type="icon1"
              src={home_icon}
            ></Icon>
          </Link>
          <Link to="/app/messages">
            <Icon
              type="icon1"
              src={messages_icon}
            ></Icon>
          </Link>
          <Link to="/app/profile">
            <Icon
              type="icon1"
              src={profile_icon}
            ></Icon>
          </Link>
        </Column>
      </NavbarV>

        {/* <input type="button" onClick={logout} value="salir" />         */}
        <Outlet />
      <ButtonTheme></ButtonTheme>
    </>
  );
};

export default Home;
