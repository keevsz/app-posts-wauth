import { useAuthenticated } from "@/hooks";
import { PrivateRoutes, PublicRoutes } from "@/models/routes";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  isPrivateRoute: boolean;
}

const PrivateRoute = <Navigate replace to={PrivateRoutes.APP} />;
const PublicRoute = <Navigate replace to={PublicRoutes.LOGIN} />;

export const AuthGuard = ({ isPrivateRoute }: Props) => {
  const { isAuthenticated } = useAuthenticated();

  return isAuthenticated ? (
    isPrivateRoute ? (
      <Outlet />
    ) : (
      PrivateRoute
    )
  ) : isPrivateRoute ? (
    PublicRoute
  ) : (
    <Outlet />
  );
};
