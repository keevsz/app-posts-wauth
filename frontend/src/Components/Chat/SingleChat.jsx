/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { getSender, getSenderFull, isChatGroup } from "../../config/ChatLogics"
import { GlobalState } from "../../Context/GlobalProvider"
import ProfileModal from "../miscellaneous/ProfileModal"
import UpdateGroupChat from "../miscellaneous/UpdateGroupChat"
import ScrollableChat from "./ScrollableChat"
import "../styles.css"
import Lottie from "react-lottie"
import animationData from "../../animations/3759-typing.json"

import { io } from "socket.io-client"
const ENDPOINT = "https://kevs-mern-social-media.herokuapp.com/"
var socket, selectedChatCompare

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    GlobalState()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState()
  const [newMessage, setNewMessage] = useState("")
  const [socketConnected, setSocketConnected] = useState(false)
  const [typing, setTyping] = useState(false)
  const [istyping, setIsTyping] = useState(false)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }
  const toast = useToast()

  const fetchMessages = async () => {
    if (!selectedChat) return
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      setLoading(true)
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      )
      setMessages(data)
      setLoading(false)
      socket.emit("join chat", selectedChat._id)
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      })
      return
    }
  }

  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit("setup", user)
    socket.on("connected", () => setSocketConnected(true))
    socket.on("typing", () => setIsTyping(true))
    socket.on("stop typing", () => setIsTyping(false))
  }, [])

  useEffect(() => {
    fetchMessages()
    selectedChatCompare = selectedChat
  }, [selectedChat])

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification])
          setTimeout(() => {
            setNotification([])
          }, 3000)
          setFetchAgain(!fetchAgain)
        }
      } else {
        setMessages([...messages, newMessageRecieved])
      }
    })
  })

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id)
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }

        setNewMessage("")
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        )

        socket.emit("new message", data)
        setMessages([...messages, data])
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        })
        return
      }
    }
  }

  const typingHandler = (e) => {
    setNewMessage(e.target.value)

    if (!socketConnected) return
    if (!typing) {
      setTyping(true)

      socket.emit("typing", selectedChat._id)
    }

    let lastTypingTime = new Date().getTime()
    var timerLength = 3000

    setTimeout(() => {
      var timeNow = new Date().getTime()
      var timeDifference = timeNow - lastTypingTime
      if (timeDifference >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id)
        setTyping(false)
      }
    }, timerLength)
  }

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "18px", md: "20px" }}
            textAlign="center"
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<i className="fa-solid fa-angle-left"></i>}
              onClick={() => setSelectedChat("")}
            ></IconButton>
            {isChatGroup(selectedChat) ? (
              <>
                {getSenderFull(null, selectedChat).chatName.toUpperCase()}
                <UpdateGroupChat
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                ></UpdateGroupChat>
              </>
            ) : (
              <>
                {getSender(user, selectedChat)}
                <ProfileModal user={getSenderFull(user, selectedChat)} />
              </>
            )}
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              ></Spinner>
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages}></ScrollableChat>
              </div>
            )}
            {istyping ? (
              <div>
                <Lottie options={defaultOptions} width={40} />
              </div>
            ) : (
              <></>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input
                variant="filled"
                bg="#FFFFF"
                border="1px"
                borderColor={"gray.200"}
                placeholder="Escriba un mensaje..."
                onChange={typingHandler}
                value={newMessage}
              ></Input>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="2xl" textAlign="center" p={10} fontFamily="Work sans">
            Click en un usuario para comenzar a chatear!
          </Text>
        </Box>
      )}
    </>
  )
}

export default SingleChat
