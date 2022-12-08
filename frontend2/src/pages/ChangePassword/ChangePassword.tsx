import { ButtonTheme } from "@/components/ButtonTheme";
import useFetchAndLoad from "@/hooks/useFetchAndLoad";
import { sendEmailChangePassword } from "@/services/public.services";
import { Text } from "@/styled-components";
import { useState } from "react";
import { CenterVH, Column } from "../App/Home/styled-components/Container";
import { TextInput } from "../Login/styled-components/AuthForm.styled";
import {
  BoxVerifyEmail,
  ButtonVerifyEmail,
} from "../VerifyEmail/VerifyEmail.styled";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const { callEndpoint, loading } = useFetchAndLoad();

  const sendEmail = async () => {
    await callEndpoint(sendEmailChangePassword(email));
  };
  return (
    <>
      <ButtonTheme></ButtonTheme>
      <CenterVH>
        <BoxVerifyEmail>
          <Column gap="2rem">
            <Text fontSize="1.2rem">
              Por favor, ingrese su correo electronico.
              <br />
              Recibiras un link para restablecer su contraseña.
            </Text>
            <TextInput
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
            ></TextInput>
            <ButtonVerifyEmail disabled={loading} onClick={sendEmail}>
              {loading ? "Enviando..." : "Enviar correo"}
            </ButtonVerifyEmail>
          </Column>
        </BoxVerifyEmail>
      </CenterVH>
    </>
  );
};
export default ChangePassword;
