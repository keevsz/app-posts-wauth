import { Center, Container } from "@chakra-ui/react"
import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import SideDrawer from "../Components/miscellaneous/SideDrawer"
import { GlobalState } from "../Context/GlobalProvider"

const ContentPage = () => {
  const { user } = GlobalState()
  const [fetchAgain, setFetchAgain] = useState(false)

  return (
    <Container maxW="full">
      {user && <SideDrawer />}
      {user && (
        <Center style={{ marginTop: "35px" }}>
          <Outlet
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
          ></Outlet>
        </Center>
      )}
    </Container>
  )
}

export default ContentPage
