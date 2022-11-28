import { Text } from '../GoogleButton'
import { BoxRight, Button, Title } from '../LoginForm'

interface Props {
  form: boolean
  handleForm: () => void
}

export const Right = ({ form, handleForm }: Props) => {
  return (
    <BoxRight color="#00CC4B">
      <Title color="white"> {form ? 'Registrarse' : 'Ingresar'}</Title>
      <Text color="white" fontSize="1rem">
        {form
          ? 'Registrate si no tienes una cuenta'
          : 'Ingresa si ya tienes una cuenta'}
      </Text>
      <Button onClick={handleForm} color="#00CC4B" type="submit">
        {form ? 'Registrarse' : 'Ingresar'}
      </Button>
    </BoxRight>
  )
}
