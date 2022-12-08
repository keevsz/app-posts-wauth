import { PublicRoutes } from "@/models/routes";
import { AppStore } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const EmailVerifiedGuard = () => {
  const user = useSelector((state: AppStore) => state.user);

  return user.verified ? (
    <Outlet />
  ) : (
    <Navigate to={PublicRoutes.VERIFY_EMAIL} />
  );
};
