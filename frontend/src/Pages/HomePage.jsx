/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import {
  Box,
  Center,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react"
import Login from "../Components/Auth/Login"
import Register from "../Components/Auth/Register"
import { useNavigate } from "react-router-dom"
import "../Components/styles.css"

const HomePage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"))
    if (user) return navigate("/home/posts")
  }, [])

  return (
    <Container
      maxW="97vm"
      centerContent
      h="97vm"
      backgroundColor="gray"
      position="relative"
    >
      <Center position="absolute" top="50%" transform="translate(0, -50%)">
        <Box
          bg="white"
          h="lg"
          p={4}
          className="login-resp"
          width={[
            80, // 0-30em
            "sm", // 30em-48em
            "md", // 48em-62em
            "md", // 62em+
          ]}
          w=""
          minW="40px"
          borderWidth="1px"
          color="black"
        >
          <Tabs>
            <Center>
              <TabList variant="ghost">
                <Tab>Ingresar</Tab>
                <Tab>Registrarse</Tab>
              </TabList>
            </Center>
            <TabPanels>
              <TabPanel>
                <Login></Login>
              </TabPanel>
              <TabPanel>
                <Register></Register>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Center>
    </Container>
  )
}

export default HomePage
