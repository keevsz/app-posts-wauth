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

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((store: AppStore) => store.user);
  const logout = () => {
    dispatch(resetUser());
  };

  return (
    <>
      <NavbarH></NavbarH>
      <NavbarV>
        <Column gap="25px">
          <Space w="" h=""></Space>
          <Link to="/">
            <Icon
              type="icon1"
              src="https://cdn-icons-png.flaticon.com/512/3388/3388840.png"
            ></Icon>
          </Link>
          <Link to="/app/messages">
            <Icon
              type="icon1"
              src="https://cdn-icons-png.flaticon.com/512/70/70854.png"
            ></Icon>
          </Link>
          <Link to="/app/profile">
            <Icon
              type="icon1"
              src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
            ></Icon>
          </Link>
        </Column>
      </NavbarV>

      <BoxIn>
        <input type="button" onClick={logout} value="salir" />
        <Text fontSize="2rem">
          {JSON.stringify({ email: user.email, name: user.name })}
        </Text>
        <Outlet />
      </BoxIn>
      <ButtonTheme></ButtonTheme>
    </>
  );
};

export default Home;
