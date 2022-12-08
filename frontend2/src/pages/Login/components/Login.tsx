import {
  BoxInput,
  Button,
  Form,
  TextInput,
  Title,
  ToolTip,
} from "../styled-components/AuthForm.styled";
import { useForm } from "react-hook-form";
import useFetchAndLoad from "../../../hooks/useFetchAndLoad";
import { login } from "../../../services/public.services";
import { loadUserToLocalStorageAndCookie } from "../../../utilities/handleStorage.utility";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "../../../redux/states/user.slice";
import { createUserAdapter } from "../../../adapters/user.adapters";
import Loading from "../../../components/Loading";
import IconSet from "./IconSet";
import { Row, Text } from "@/styled-components";
import { EmailRegex } from "@/models";
import { sharingInformationService } from "@/services/sharingInfo.services";
import { PrivateRoutes, PublicRoutes } from "@/models/routes";

interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async ({ email, password }: Inputs) => {
    const user = await callEndpoint(login({ email, password }));
    dispatch(createUser(createUserAdapter(user)));
    navigate(PrivateRoutes.APP, { replace: true });
  };

  if (loading) return <Loading></Loading>;

  return (
    <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Title color="#278048">Ingresar</Title>
      <IconSet />
      <BoxInput>
        <TextInput
          placeholder="Correo electrónico"
          {...register("email", {
            required: "Ingrese email",
            pattern: {
              value: EmailRegex,
              message: "Email invalido",
            },
          })}
        ></TextInput>
        {errors.email && <ToolTip text={errors.email.message}>⚠</ToolTip>}
      </BoxInput>
      <BoxInput>
        <TextInput
          type={"password"}
          placeholder="Contraseña"
          {...register("password", {
            required: "Ingrese contraseña",
          })}
        />
        {errors.password && <ToolTip text={errors.password.message}>⚠</ToolTip>}
      </BoxInput>

      <Link to={PublicRoutes.CHANGE_PASSWORD} style={{textDecoration:"none", color:"#278048"}}>¿Olvidaste tu contraseña?</Link>
      <Row>
        <Button display="" color="#00CC4B" type="submit">
          Ingresar
        </Button>
        <Button
          display="none"
          onClick={() => {
            sharingInformationService.setSubject(false);
          }}
          color="#4a4a4abd"
          type="button"
        >
          Registrarse
        </Button>
      </Row>
    </Form>
  );
};

export default Login;
