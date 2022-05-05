import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import axios from "axios"
import React, { useState } from "react"
import { getSenderFull } from "../../config/ChatLogics"
import { GlobalState } from "../../Context/GlobalProvider"
import UserBadgeItem from "../UserAvatar/UserBadgeItem"
import UserListItem from "../UserAvatar/UserListItem"

const UpdateGroupChat = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [groupChatName, setGroupChatName] = useState()
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [renameLoading, setRenameLoading] = useState(false)
  const toast = useToast()

  const { selectedChat, setSelectedChat, user } = GlobalState()

  const toObjFix = selectedChat.users ? selectedChat : selectedChat[0]
  setSelectedChat(toObjFix)

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user.id && user1._id !== user.id) {
      toast({
        title: "No eres administrador",
        status: "error",
        duration: 5000,
        isclosable: true,
        position: "bottom",
      })
      return
    }
    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      )
      user1._id === user.id ? setSelectedChat() : setSelectedChat(data)
      setFetchAgain(!fetchAgain)
      fetchMessages()
      setLoading(false)
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isclosable: true,
        position: "bottom",
      })
      setRenameLoading(false)
    }
  }

  const handleRename = async () => {
    if (!groupChatName) return
    try {
      setRenameLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.put(
        "/api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      )
      setSelectedChat(data)
      setFetchAgain(!fetchAgain)
      setRenameLoading(false)
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isclosable: true,
        position: "bottom",
      })
      setRenameLoading(false)
    }
    setGroupChatName("")
  }

  const handleSearch = async (query) => {
    setSearch(query)
    if (!query) {
      return
    }

    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.get(`/api/user?search=${search}`, config)
      setLoading(false)
      setSearchResult(data)
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      })
      setLoading(false)
    }
  }

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) return
    if (selectedChat.groupAdmin._id !== user.id) {
      toast({
        title: "No eres administrador",
        status: "error",
        duration: 5000,
        isclosable: true,
        position: "bottom",
      })
      return
    }
    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.put(
        `/api/chat/groupadd`,
        { chatId: selectedChat._id, userId: user1._id },
        config
      )
      setSelectedChat(data)
      setFetchAgain(!fetchAgain)
      setLoading(false)
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isclosable: true,
        position: "bottom",
      })
      setLoading(false)
    }
  }

  return (
    <>
      <IconButton
        d={{ base: "flex" }}
        icon={<i className="fa-solid fa-circle-info"></i>}
        onClick={onOpen}
      >
        Open Modal
      </IconButton>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            {getSenderFull(null, selectedChat).chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="100%" d="flex" flexWrap="wrap" pb={3}>
              {getSenderFull(null, selectedChat).users.map((user) => (
                <UserBadgeItem
                  key={user._id}
                  admin={selectedChat.groupAdmin._id}
                  user={user}
                  handleFunction={() => handleRemove(user)}
                ></UserBadgeItem>
              ))}
            </Box>

            <FormControl d="flex">
              <Input
                placeholder="Nombre del grupo"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isloading={renameLoading}
                onClick={handleRename}
                Update
              >
                Actualizar
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Añadir usuario"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupChat
