import { lazy } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AppStore } from "./redux/store";
import { Suspense } from "react";
import { FullPage } from "./styled-components/FullPage";
import { PrivateRoutes, PublicRoutes } from "./models/routes";
import { AuthGuard } from "./guards/AuthGuard";
import RoutesNotFound from "./utilities/routesNotFound";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import { EmailVerifiedGuard } from "./guards/EmailVerifiedGuard";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import ChangePasswordForm from "./pages/ChangePassword/ChangePasswordForm";

const AuthPage = lazy(() => import("./pages/Login/AuthPage"));
const Private = lazy(() => import("./pages/App/Private"));

const App = () => {
  const theme = useSelector((store: AppStore) => store.theme);
  return (
    <ThemeProvider theme={theme}>
      <FullPage>
        <Suspense fallback={<>Loading...</>}>
          <BrowserRouter>
            <RoutesNotFound>
              <Route path="/" element={<Navigate to={PrivateRoutes.APP} />} />
              <Route path={PublicRoutes.CHANGE_PASSWORD} element={<ChangePassword />} />
              <Route path={`${PublicRoutes.CHANGE_PASSWORD}/:userId/:token`} element={<ChangePasswordForm />} />

              <Route element={<AuthGuard isPrivateRoute={false} />}>
                <Route path={PublicRoutes.LOGIN} element={<AuthPage />} />
              </Route>
              <Route element={<AuthGuard isPrivateRoute={true} />}>
                <Route
                  path={PublicRoutes.VERIFY_EMAIL}
                  element={<VerifyEmail />}
                />
                <Route element={<EmailVerifiedGuard />}>
                  <Route
                    path={`${PrivateRoutes.APP}/*`}
                    element={<Private />}
                  />
                </Route>
              </Route>
            </RoutesNotFound>
          </BrowserRouter>
        </Suspense>
      </FullPage>
    </ThemeProvider>
  );
};

export default App;
