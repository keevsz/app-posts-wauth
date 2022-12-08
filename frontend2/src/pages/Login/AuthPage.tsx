import { lazy, useEffect, useState } from "react";
import { CenterVH } from "../App/Home/styled-components/Container";
import { Auth } from "./styled-components/AuthForm.styled";
import { ButtonTheme } from "../../components/ButtonTheme";
import { Right } from "./components/Right";
import { sharingInformationService } from "@/services/sharingInfo.services";
import Register from "./components/Register";

const Login = lazy(() => import("./components/Login"));

const AuthPage = () => {
  const [form, setForm] = useState(true);
  const subscription$ = sharingInformationService.getSubject();

  useEffect(() => {
    subscription$.subscribe((data: any) => {
      setForm(data);
    });
  }, []);

  return (
    <>
      <ButtonTheme />
      <CenterVH>
        {
          <Auth>
            {form ? <Login></Login> : <Register></Register>}
            <Right></Right>
          </Auth>
        }
      </CenterVH>
    </>
  );
};

export default AuthPage;
