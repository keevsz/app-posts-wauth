import { Box, Button, Image, Text } from "@chakra-ui/react"
import React from "react"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <Box mt="30px" display="flex" w="xl" h="xl" alignItems="center">
      <Image
        boxSize="2xs"
        src="https://www.pngplay.com/wp-content/uploads/12/Surprised-Pikachu-PNG-HD-Quality.png"
      ></Image>
      <Box h="xs" display="flex" alignItems="center">
        <Box>
          <Text textAlign="center" fontSize="2xl" fontWeight="bold">
            OOPS! PÁGINA NO ENCONTRADA.
          </Text>
          <Text textAlign="justify">
            Debes de haber escodigo la puerta incorrecta, ya que no he podido
            echarle el ojo a la página que estás buscando.
          </Text>
          <Text textAlign="center" mt="3">
            <Button variant="link">
              <Link to="/home/posts" className="btn btn-success">
                Volver al inicio
              </Link>
            </Button>
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default NotFound
