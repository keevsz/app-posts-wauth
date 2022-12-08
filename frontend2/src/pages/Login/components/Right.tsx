import { sharingInformationService } from "@/services/sharingInfo.services";
import { useEffect, useState } from "react";
import { Text } from "@/styled-components/Usual";
import { BoxRight, Button, Title } from "../styled-components/AuthForm.styled";

export const Right = () => {
  const subscription$ = sharingInformationService.getSubject();
  const [form, setForm] = useState(true);
  
  useEffect(() => {
    subscription$.subscribe((data:any) => setForm(data));
  });

  return (
    <BoxRight color="#00CC4B">
      <Title color="white"> {form ? "Registrarse" : "Ingresar"}</Title>
      <Text style={{ color: "white" }} fontSize="1rem">
        {form
          ? "Registrate si no tienes una cuenta"
          : "Ingresa si ya tienes una cuenta"}
      </Text>
      <Button
        onClick={() => {
          sharingInformationService.setSubject(!form);
        }}
        display="null"
        color="#00CC4B"
        type="submit"
      >
        {form ? "Registrarse" : "Ingresar"}
      </Button>
    </BoxRight>
  );
};
