import { createUserAdapter } from "@/adapters";
import { Loading } from "@/components";
import { useFetchAndLoad } from "@/hooks";
import { EmailRegex, PrivateRoutes, PublicRoutes } from "@/models";
import { createUser } from "@/redux/states/user.slice";
import { login } from "@/services/public.services";
import { sharingInformationService } from "@/services/sharingInfo.services";
import { Row, Text } from "@/styled-components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BoxInput, Button, Form, TextInput, Title, ToolTip } from "../styled-components/AuthForm.styled";
import IconSet from "./IconSet";


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
      <Title>Ingresar</Title>
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

      <Link to={PublicRoutes.CHANGE_PASSWORD} style={{textDecoration:"none", marginTop: "30px"}}>
        <Text fontSize="15px">¿Olvidaste tu contraseña?</Text>
      </Link>
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
