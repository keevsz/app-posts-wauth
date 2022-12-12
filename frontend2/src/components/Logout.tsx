import { resetUser } from "@/redux/states/user.slice";
import { useDispatch } from "react-redux";

const Logout = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(resetUser());
  };
  return <input value="Salir" type="button" onClick={handleLogout}></input>;
};
export default Logout;
