import { Avatar, Box, Center, Input } from "@chakra-ui/react"
import axios from "axios"
import React, { useState } from "react"
import { GlobalState } from "../../Context/GlobalProvider"

const CommentForm = ({ post }) => {
  const { user, comments, setComments } = GlobalState()

  const [comment, setComment] = useState("")

  const sendComment = async (event) => {
    if (event.key === "Enter") {
      setComment("")

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }

      const { data } = await axios.post(
        "/api/comment",
        {
          description: comment,
          user: user.id,
          post: post,
        },
        config
      )

      setComments([...comments, data])
      fetchComments()
    }
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
          <Avatar size="sm" src={user.pic}></Avatar>
        </Center>
      </Box>
      <Input
        ml="10px"
        mr="15px"
        w="100%"
        p="2"
        variant="unstyled"
        size="xs"
        style={{ backgroundColor: "#F0F2F5" }}
        borderRadius="lg"
        placeholder="Escribe un comentario..."
        onChange={(e) => {
          setComment(e.target.value)
        }}
        value={comment}
        onKeyDown={sendComment}
      ></Input>
    </div>
  )
}

export default CommentForm
