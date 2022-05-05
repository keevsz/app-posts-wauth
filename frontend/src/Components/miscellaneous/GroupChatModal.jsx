import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import axios from "axios"
import React, { useState } from "react"
import { GlobalState } from "../../Context/GlobalProvider"
import UserBadgeItem from "../UserAvatar/UserBadgeItem"
import UserListItem from "../UserAvatar/UserListItem"

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [groupChatName, setGroupChatName] = useState()
  const [selectedUsers, setSelectedUsers] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState()

  const toast = useToast()

  const { user, chats, setChats } = GlobalState()

  const handleSearch = async (query) => {
    if (!query) {
      return
    }

    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      }
      const { data } = await axios.get(`/api/user?search=${query}`, config)
      setLoading(false)
      setSearchResult(data)
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      })
    }
  }

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) return

    setSelectedUsers([...selectedUsers, userToAdd])
  }

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id))
  }

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Datos invalidos",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      })
      return
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.post(
        "/api/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      )
      setChats([data, ...chats])
      onClose()
      toast({
        title: "Chat creado",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      })
      setSelectedUsers([])
      setSearchResult([])
      setGroupChatName([])
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            Nuevo grupo
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Nombre del chat"
                mb={3}
                onChange={(e) => {
                  setGroupChatName(e.target.value)
                }}
              ></Input>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Añadir usuarios"
                mb={1}
                onChange={(e) => {
                  handleSearch(e.target.value)
                }}
              ></Input>
            </FormControl>
            <Box d="flex">
              {selectedUsers.map((user) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleDelete(user)}
                ></UserBadgeItem>
              ))}
            </Box>
            <FormControl>
              {loading ? (
                <div>loading</div>
              ) : (
                searchResult
                  ?.slice(0, 4)
                  .map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleGroup(user)}
                    ></UserListItem>
                  ))
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Crear chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModal
