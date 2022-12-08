import { createUserAdapter } from "@/adapters/user.adapters";
import { createUser, resetUser } from "@/redux/states/user.slice";
import { AppStore } from "@/redux/store";
import { verifyTokenAndGetUser } from "@/services/public.services";
import { getFromCookie } from "@/utilities";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAuthenticated = () => {
  const dispatch = useDispatch();

  const userState = useSelector((state: AppStore) => state.user);

  const getData = async (cookie: string) => {
    try {
      const user = await verifyTokenAndGetUser(cookie);
      dispatch(createUser(createUserAdapter(user)));
    } catch (error) {
      dispatch(resetUser());
    }
  };

  useEffect(() => {
    const cookie = getFromCookie("token");
    if (cookie) getData(cookie);
    if (userState.token && !cookie) dispatch(resetUser());
  }, []);

  return {
    isAuthenticated: userState.token ? true : false,
  };
};

export default useAuthenticated;
