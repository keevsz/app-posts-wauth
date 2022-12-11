import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const ChatContext = createContext()

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [selectedChat, setSelectedChat] = useState()
  const [chats, setChats] = useState()
  const [posts, setPosts] = useState([])
  const [notification, setNotification] = useState([])
  const [comments, setComments] = useState([])
  const [soundNotification, setSoundNotification] = useState(false)
  const [userProfile, setUserProfile] = useState()

  const navigate = useNavigate()

  const handleSound = () => {
    setSoundNotification(!soundNotification)
  }
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    setUser(userInfo)
    if (!userInfo) {
      navigate("/")
    }
  }, [navigate])
  
  return (
    <ChatContext.Provider
      value={{
        posts,
        setPosts,
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
        comments,
        setComments,
        handleSound,
        userProfile,
        setUserProfile,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const GlobalState = () => {
  return useContext(ChatContext)
}

export default GlobalProvider
