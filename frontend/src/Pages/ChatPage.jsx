import { GlobalState } from "../Context/GlobalProvider"
import { Box } from "@chakra-ui/react"
import MyChats from "../Components/Chat/MyChats"
import ChatBox from "../Components/Chat/ChatBox"
import { useState } from "react"

const ChatPage = () => {
  const { user } = GlobalState()

  const [fetchAgain, setFetchAgain] = useState(false)

  return (
    <Box w="100%" maxW="2xl">
      <Box
        justifyContent="space-between"
        p="10px"
        className="animate__animated animate__fadeIn animate__delay-0.5s"
        d="flex"
        w="100%"
        h="91.5vh"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </Box>
  )
}

export default ChatPage
