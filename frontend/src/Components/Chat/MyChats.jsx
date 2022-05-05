/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Box,
  Button,
  Center,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { getPic, getSender, getSenderFull } from "../../config/ChatLogics"
import { GlobalState } from "../../Context/GlobalProvider"
import ChatLoading from "./ChatLoading"
import GroupChatModal from "../miscellaneous/GroupChatModal"
import UserListItem from "../UserAvatar/UserListItem"

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState()
  const { user, selectedChat, setSelectedChat, chats, setChats } = GlobalState()
  const toast = useToast()
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState(false)

  const [isOpen, setIsOpen] = useState(false)

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.get("/api/chat", config)
      setChats(data)
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      })
      return
    }
  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
    fetchChats()
  }, [fetchAgain])

  const handleSearch = async (query) => {
    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.get(`/api/user?search=${query}`, config)
      setLoading(false)
      setSearchResult(data)
    } catch (error) {
      toast({
        title: "Ocurrió un error",
        warning: "Error al cargar resultados",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      })
      return
    }
  }

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true)
      const config = {
        "Content-type": "application/json",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.post("/api/chat", { userId }, config)

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats])

      setSelectedChat(data)
      setLoadingChat(false)
      setIsOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      })
      return
    }
  }

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={1}
      bg="white"
      w={{ base: "2xs", md: "41%" }}
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Popover isOpen={isOpen}>
          <PopoverTrigger>
            <Button
              onClick={() => {
                setIsOpen(true)
              }}
              mx="10px"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
          </PopoverTrigger>

          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton
              onClick={() => {
                setIsOpen(false)
              }}
            />
            <PopoverHeader fontSize="lg" fontWeight="bold">
              Buscar amigos ...
            </PopoverHeader>
            <PopoverBody>
              <Box d="flex" pb={2}>
                <Input
                  placeholder="Nombre o correo"
                  mr={2}
                  onChange={(e) => {
                    handleSearch(e.target.value)
                  }}
                />
              </Box>
              <Box h="6.5em" overflowY="auto">
                {loading ? (
                  <ChatLoading />
                ) : (
                  searchResult?.map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => accessChat(user._id)}
                    ></UserListItem>
                  ))
                )}
                {loadingChat && (
                  <Spinner ml="auto" textAlign={"center"} d="flex"></Spinner>
                )}
              </Box>
            </PopoverBody>
            <PopoverFooter border="0" alignItems="center">
              <Center>
                <i className="fa-solid fa-caret-down fa-2xs"></i>
              </Center>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
        <GroupChatModal>
          <Button d="flex" ml="15px">
            Grupo
          </Button>
        </GroupChatModal>
      </Box>

      <Box d="flex" flexDir="column" h="100%" overflowY="hidden">
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => {
                  setSelectedChat(getSenderFull(null, chat))
                }}
                cursor="pointer"
                bg={
                  selectedChat === getSenderFull(null, chat)
                    ? "#EFEFEF"
                    : "#FFFFFF"
                }
                key={chat._id}
              >
                <Box display="flex" my="5px" ml="10px">
                  <Avatar src={getPic(chat)}></Avatar>
                  <Box mx="10px" my="5px">
                    <Text fontSize="xs" fontWeight="bold">
                      {getSender(loggedUser, chat)}
                    </Text>
                    {chat.latestMessage && (
                      <Text fontSize="xs">
                        <b>{chat.latestMessage.sender.name} : </b>
                        {chat.latestMessage.content.length > 20
                          ? chat.latestMessage.content.substring(0, 10) + "..."
                          : chat.latestMessage.content}
                      </Text>
                    )}
                    {!chat.latestMessage ? (
                      <Text fontSize="xs">...</Text>
                    ) : null}
                  </Box>
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  )
}

export default MyChats
