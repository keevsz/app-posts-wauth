import React, { useState } from "react"
import {
  Box,
  Button,
  Center,
  FormControl,
  Image,
  Input,
  InputRightElement,
  useToast,
} from "@chakra-ui/react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const toast = useToast()

  const [show, setShow] = useState()
  const [loading, setLoading] = useState()
  const navigate = useNavigate()

  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic: "",
  }

  const [user, setUser] = useState(initialState)

  const postDetails = (pics) => {
    setLoading(true)
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData()
      data.append("file", pics)
      data.append("upload_preset", "chat-app")
      data.append("cloud_name", "dalp4xrqs")
      fetch("https://api.cloudinary.com/v1_1/dalp4xrqs/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUser((old) => ({ ...old, pic: data.url.toString() }))
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
    } else {
      toast({
        title: "Seleccione una imagen",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      setLoading(false)
      return
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { name, email, password, confirmPassword } = user
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Complete todos los campos",
        status: "warning",
        duration: 5000,
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

      const { data } = await axios.post("/api/user/register", user, config)

      toast({
        title: "Registrado",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })

      localStorage.setItem("userInfo", JSON.stringify(data))
      setLoading(false)
      navigate("/home/posts")
    } catch (error) {
      console.log(error.message)
      if (error.message === "Request failed with status code 406") {
        toast({
          title: "El correo ya existe",
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
    <div>
      <FormControl
        className="custom-input-file"
        id="rpic"
        isRequired
        mt="10px"
        _hover={{ opacity: "0.5" }}
      >
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          tabIndex="-1"
          id="fichero-tarifas"
          name="image"
          className="input-file"
          onChange={(e) => {
            postDetails(e.target.files[0])

            let reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])

            reader.onload = function () {
              let preview = document.getElementById("preview")
              preview.src = reader.result
              let divimg = document.getElementById("imagediv")
              divimg.removeAttribute("hidden")
            }
          }}
        ></Input>
        <Center mb="4" mt="4">
          <Image
            src="https://www.kindpng.com/picc/m/307-3076999_foto-imagen-persona-icono-imgenes-hd-png-download.png"
            id="preview"
            objectFit="cover"
            boxSize="28"
            borderRadius={100}
            mb={"10px"}
          ></Image>
        </Center>
      </FormControl>
      <FormControl id="rfirst-name" isRequired>
        <Input
          placeholder="Nombre"
          variant="filled"
          className="ph-center"
          onChange={(e) => {
            setUser((old) => ({ ...old, name: e.target.value }))
          }}
        ></Input>
      </FormControl>

      <FormControl id="remail" isRequired mt="10px">
        <Input
          placeholder="Email"
          variant="filled"
          className="ph-center"
          onChange={(e) => {
            setUser((old) => ({ ...old, email: e.target.value }))
          }}
        ></Input>
      </FormControl>

      <FormControl id="rpassword" isRequired mt="10px">
        <Input
          type={show ? "text" : "password"}
          placeholder="Contraseña"
          variant="filled"
          className="ph-center"
          onChange={(e) => {
            setUser((old) => ({ ...old, password: e.target.value }))
          }}
        />
      </FormControl>

      <FormControl id="rrepeatpassword" isRequired mt="10px">
        <Input
          type={show ? "text" : "password"}
          placeholder="Contraseña"
          variant="filled"
          className="ph-center"
          onChange={(e) => {
            setUser((old) => ({ ...old, confirmPassword: e.target.value }))
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

      <Center>
        <Button
          colorScheme="blue"
          color="white"
          width="40%"
          style={{ marginTop: 15 }}
          onClick={handleSubmit}
          isLoading={loading}
        >
          Registrar
        </Button>
      </Center>
    </div>
  )
}

export default Register
