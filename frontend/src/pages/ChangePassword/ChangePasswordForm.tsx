import { ButtonTheme } from "@/components/ButtonTheme";
import useFetchAndLoad from "@/hooks/useFetchAndLoad";
import { PublicRoutes } from "@/models/routes";
import {
  changePasswordService,
} from "@/services/public.services";
import { Text } from "@/styled-components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CenterVH, Column } from "../App/Home/styled-components/Container";
import { TextInput } from "../Login/styled-components/AuthForm.styled";
import {
  BoxVerifyEmail,
  ButtonVerifyEmail,
} from "../VerifyEmail/VerifyEmail.styled";

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const { callEndpoint, loading } = useFetchAndLoad();

  const [password, setPassword] = useState("");
  const { userId, token } = useParams();

  const changePassword = async () => {
    await callEndpoint(changePasswordService(password, userId, token));
    navigate(PublicRoutes.LOGIN);   
  };
  return (
    <>
      <ButtonTheme />
      <CenterVH>
        <BoxVerifyEmail>
          <Column gap="2rem">
            <Text fontSize="1.2rem">Ingrese su nueva contraseña</Text>
            <TextInput
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nueva contraseña"
            ></TextInput>
             <ButtonVerifyEmail disabled={loading} onClick={changePassword}>
              {loading ? "..." : "Cambiar contraseña"}
            </ButtonVerifyEmail>
          </Column>
        </BoxVerifyEmail>
      </CenterVH>
    </>
  );
};
export default ChangePasswordForm;
