import {
  BoxInput,
  Button,
  Form,
  TextInput,
  Title,
  ToolTip,
} from "../styled-components/AuthForm.styled";
import useFetchAndLoad from "../../../hooks/useFetchAndLoad";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createUser } from "../../../redux/states/user.slice";
import { createUserAdapter } from "../../../adapters/user.adapters";
import { registerUser, uploadImg } from "../../../services/public.services";
import { Avatar, Image, InputImage } from "../../../styled-components/Globals";
import { lazy, useState } from "react";
const Loading = lazy(() => import("../../../components/Loading"));
import pic_change from "../../../assets/pic_change.png";
import IconSet from "./IconSet";
import { Row } from "@/styled-components";
import { sharingInformationService } from "@/services/sharingInfo.services";
import { EmailRegex, PasswordRegex } from "@/models";

interface Inputs {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const Register = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const [pic, setPic] = useState(pic_change);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();

  const onSubmit = async ({ email, password, name }: Inputs) => {
    let setPic = pic === pic_change ? "" : pic;
    const user = await callEndpoint(
      registerUser({ email, password, name, pic:setPic })
    );
    dispatch(createUser(createUserAdapter(user)));
    navigate("/");
  };

  const uploadImage = async (files: any) => {
    const response = await callEndpoint(uploadImg(files));
    setPic(response.data.url);
  };

  if (loading) return <Loading></Loading>;

  return (
    <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Title color="#278048">Registrarse</Title>
      <IconSet />
      <Avatar htmlFor="input">
        <InputImage
          id="input"
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={(e: any) => uploadImage(e.target.files[0])}
        ></InputImage>
        <Image src={pic}></Image>
      </Avatar>
      <BoxInput>
        <TextInput
          placeholder="Nombres"
          {...register("name", {
            required: "Ingrese nombres",
          })}
        ></TextInput>
        {errors.name && <ToolTip text={errors.name.message}>⚠</ToolTip>}
      </BoxInput>
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
            pattern: {
              value: PasswordRegex,
              message:
                "Password invalido, 6 - 50 caracteres, una letra mayúscula, una letra minúscula y un dígito numérico.",
            },
          })}
        />
        {errors.password && <ToolTip text={errors.password.message}>⚠</ToolTip>}
      </BoxInput>
      <BoxInput>
        <TextInput
          type={"password"}
          placeholder="Confirmar contraseña"
          {...register("confirm_password", {
            required: "Ingrese contraseña",
            validate: (val: string) => {
              if (watch("password") != val) {
                return "Las contraseñas no coinciden";
              }
            },
          })}
        />
        {errors.confirm_password && (
          <ToolTip text={errors.confirm_password.message}>⚠</ToolTip>
        )}
      </BoxInput>
      <Row style={{ marginTop: "10px" }}>
        <Button display="" color="#00CC4B" type="submit">
          Registrarse
        </Button>
        <Button
          display="none"
          onClick={() => {
            sharingInformationService.setSubject(true);
          }}
          color="#4a4a4abd"
          type="button"
        >
          Ingresar
        </Button>
      </Row>
    </Form>
  );
};

export default Register;
