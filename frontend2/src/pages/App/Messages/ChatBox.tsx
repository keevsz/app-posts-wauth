import { Text } from "@/styled-components"
import { useChatContext } from "./context/ChatProvider"

const ChatBox = () => {
  const {selectedChat} = useChatContext()
  return (
    <Text fontSize="1rem">
      {selectedChat}
    </Text>
  )
}
export default ChatBox