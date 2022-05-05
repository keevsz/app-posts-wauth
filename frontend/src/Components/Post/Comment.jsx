import { Avatar, Box, Center, Text, Tooltip } from "@chakra-ui/react"
import React from "react"
import { GlobalState } from "../../Context/GlobalProvider"

import Moment from "react-moment"
import "moment-timezone"
import "moment/locale/es"
import axios from "axios"

const Comment = ({ comment }) => {
  const { user, setComments } = GlobalState()

  const deleteComment = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }

    await axios.delete(`/api/comment/${comment._id}`, config)

    fetchComments()
  }

  const fetchComments = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.get("/api/comment", config)
      setComments(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div
        style={{
          width: "85%",
          margin: "auto",
          display: "flex",
          paddingTop: "10px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <Box>
          <Center>
            <Avatar size="sm" src={comment.user.pic}></Avatar>
          </Center>
        </Box>
        <Box
          ml="10px"
          mr="15px"
          w="auto"
          style={{ backgroundColor: "#F0F2F5" }}
          borderRadius="lg"
        >
          <Box ml="15px" mr="15px" mt="5px" mb="5px">
            <Text fontSize="xs" style={{ fontWeight: "bold" }}>
              {comment.user.name}
            </Text>
            <Text fontSize="sm">{comment.description}</Text>
          </Box>
        </Box>
        {comment.user._id === user.id ? (
          <Tooltip label="Eliminar comentario" placement="right">
            <button
              variant="ghost"
              style={{ margin: -10 }}
              onClick={deleteComment}
            >
              <Box color="gray.500" _hover={{ color: "gray.700" }}>
                <i className="fa-solid fa-trash-can"></i>
              </Box>
            </button>
          </Tooltip>
        ) : null}
      </div>
      <div
        style={{
          width: "60%",
          margin: "auto",
          display: "flex",
          paddingRight: "20px",
          paddingBottom: "2.5px",
        }}
      >
        <Text
          style={{
            fontSize: "12px",
            marginRight: "10px",
          }}
        >
          Me gusta
        </Text>
        <Text style={{ fontSize: "12px", fontWeight: "1", color: "gray" }}>
          <Moment fromNow>{comment.createdAt}</Moment>
        </Text>
      </div>
    </div>
  )
}

export default Comment
