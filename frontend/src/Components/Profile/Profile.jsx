import { Avatar, Box, Text } from "@chakra-ui/react"
import React from "react"

import Moment from "react-moment"
import "moment-timezone"
import "moment/locale/es"

const Profile = ({ user }) => {
  return (
    <Box
      borderWidth="1px"
      bg="white"
      style={{ marginTop: "10px" }}
      backgroundColor="white"
      w="100%"
    >
      <Box p="10" display={["grid", "flex"]} m="auto" w="100%">
        <Avatar src={user.pic} boxSize={[20, 28]}></Avatar>
        <Box p={[2, 5]} w="auto">
          <Text>{user.name}</Text>
          <Text>{user.email}</Text>
          <Text>
            Se unió en <Moment format="MMMM">{user.createdAt}</Moment> de{" "}
            <Moment format="YYYY">{user.createdAt}</Moment>
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default Profile
