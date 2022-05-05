import { Box } from "@chakra-ui/react"
import React from "react"
import { GlobalState } from "../../Context/GlobalProvider"
import SingleChat from "./SingleChat"

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = GlobalState()
  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
      ></SingleChat>
    </Box>
  )
}

export default ChatBox
