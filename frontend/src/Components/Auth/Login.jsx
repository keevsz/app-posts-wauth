import React, { useState } from "react"
import {
  Box,
  Button,
  Center,
  FormControl,
  Image,
  Input,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [show, setShow] = useState()
  const [loading, setLoading] = useState()

  const toast = useToast()
  const navigate = useNavigate()

  const initialState = {
    email: "",
    password: "",
  }

  const [credentials, setCredentials] = useState(initialState)

  const handleSubmit = async (e) => {
    setLoading(true)
    const { email, password } = credentials
    if (!email || !password) {
      toast({
        title: "Complete todos los campos",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      })
      setLoading(false)
      return
    }

    try {
      const config = {
        headers: { "Content-type": "application/json" },
      }
      const userData = {
        email,
        password,
      }
      const { data } = await axios.post("api/user/login", userData, config)

      toast({
        title: "Logeado",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      })
      localStorage.setItem("userInfo", JSON.stringify(data))
      setLoading(false)
      navigate("/home/posts")
    } catch (error) {
      console.log(error.message)
      if (error.message === "Request failed with status code 404") {
        toast({
          title: "Usuario no encontrado",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        })
      }

      if (error.message === "Request failed with status code 400") {
        toast({
          title: "Correo o contraseña invalida",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        })
      }
      setLoading(false)
    }
  }

  return (
    <Box>
      <Center mb="14" mt="10">
        <Image
          boxSize="28"
          src="https://perfilespro.com/user/images/2021/06/03/1622731314_3957.png"
        ></Image>
      </Center>
      <FormControl id="lemail" isRequired my="2">
        <Input
          placeholder="Email"
          variant="filled"
          onChange={(e) => {
            setCredentials((old) => ({ ...old, email: e.target.value }))
          }}
          className="ph-center"
        ></Input>
      </FormControl>
      <FormControl id="lpassword" isRequired my="2">
        <Input
          className="ph-center"
          type={show ? "text" : "password"}
          placeholder="Contraseña"
          variant="filled"
          onChange={(e) => {
            setCredentials((old) => ({ ...old, password: e.target.value }))
          }}
        />
        <InputRightElement mt="7px">
          <Button
            h="1.75rem"
            size="sm"
            onClick={() => {
              setShow(!show)
            }}
            variant="unestyled"
          >
            {show ? (
              <Box color="gray">
                <i className="fa-solid fa-eye-slash"></i>
              </Box>
            ) : (
              <Box color="gray">
                <i className="fa-solid fa-eye"></i>
              </Box>
            )}
          </Button>
        </InputRightElement>
      </FormControl>
      <Center mt="25px">
        <Button
          colorScheme="blue"
          color="white"
          width="40%"
          style={{ marginTop: 15 }}
          onClick={handleSubmit}
          isLoading={loading}
        >
          Ingresar
        </Button>
      </Center>
    </Box>
  )
}

export default Login
