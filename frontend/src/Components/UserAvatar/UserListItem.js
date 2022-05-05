import { Avatar, Box, Text } from "@chakra-ui/react"
import React from "react"

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div>
      <Box
        onClick={handleFunction}
        cursor="pointer"
        _hover={{ background: "#38B2AC", color: "white" }}
        w="100%"
        d="flex"
        alignItems="center"
        color="black"
        px={3}
        py={2}
        borderRadius="lg"
      >
        <Avatar
          mr={2}
          size="sm"
          cursor="pointer"
          name={user.name}
          src={user.pic}
        />
        <Box>
          <Text fontSize="small" fontWeight="bold">
            {user.name}
          </Text>
          <Text fontSize="xs">{user.email}</Text>
        </Box>
      </Box>
    </div>
  )
}

export default UserListItem
