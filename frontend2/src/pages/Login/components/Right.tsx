import { Text } from '../Usual'
import { BoxRight, Button, Title } from '../styled-components/LoginForm'

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
      <Button onClick={handleForm} display="null" color="#00CC4B" type="submit">
        {form ? 'Registrarse' : 'Ingresar'}
      </Button>
    </BoxRight>
  )
}
