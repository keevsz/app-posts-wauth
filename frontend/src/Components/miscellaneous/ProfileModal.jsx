import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Center,
  Box,
  Avatar,
  Text,
} from "@chakra-ui/react"
import React from "react"
import { NavLink } from "react-router-dom"

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          d={{ base: "flex" }}
          icon={<i className="fa-solid fa-circle-info"></i>}
          onClick={onOpen}
        ></IconButton>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Center>
            <ModalHeader>Información</ModalHeader>
          </Center>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" p="5">
              <Avatar src={user ? user.users[1].pic : undefined}></Avatar>
              <Box px="5">
                <Text>{user ? user.users[1].name : undefined}</Text>
                <Text>{user ? user.users[1].email : undefined}</Text>
              </Box>
            </Box>
          </ModalBody>
          <Center my="2">
            <NavLink to={`/home/profile/${user.users[1]._id}`}>
              Ver perfil
            </NavLink>
          </Center>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal
