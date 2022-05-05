import {
  Avatar,
  Box,
  Button,
  Center,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import React from "react"

import Moment from "react-moment"
import "moment-timezone"
import "moment/locale/es"
import Comment from "./Comment"
import { GlobalState } from "../../Context/GlobalProvider"
import CommentForm from "./CommentForm"
import axios from "axios"
import { NavLink } from "react-router-dom"

const Post = ({ post, fetchPosts }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { comments, user } = GlobalState()

  const handleLike = async (id) => {
    let element = document.getElementById(id)
    let elementStyle = window.getComputedStyle(element, "hover")
    let elementColor = elementStyle.getPropertyValue("color")
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
    let count = document.getElementById(`count-${post._id}`).textContent

    if (elementColor === "rgb(255, 0, 0)") {
      const data = { postId: post._id, userId: user.id }
      await axios.post("/api/post/unsetlike", data, config)
      document.getElementById(id).style.color = "gray"
      document.getElementById(`count-${post._id}`).innerHTML =
        parseInt(count) - 1
      console.log("Dislike")
    } else {
      const data = { postId: post._id, userId: user.id }
      await axios.post("/api/post/setlike", data, config)
      document.getElementById(id).style.color = "red"
      document.getElementById(`count-${post._id}`).innerHTML =
        parseInt(count) + 1
      console.log("Like")
    }
  }

  const hidden = (id) => {
    let box = document.getElementById(id)
    let hidden = box.hasAttribute("hidden")

    //"" esta oculto
    if (hidden === true) {
      box.removeAttribute("hidden")
    } else {
      box.setAttribute("hidden", "true")
    }
  }

  const deletepost = async (post) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }

    await axios.delete(`/api/post/${post._id}`, config)
    console.log("Borrado")
    fetchPosts()
  }

  let count = 0

  comments.map((c) => (c.post === post._id ? (count = count + 1) : null))

  return (
    <Box
      borderWidth="1px"
      bg="white"
      borderBottom
      borderBottomColor={"white"}
      className="animate__animated animate__bounceIn "
    >
      <Box m={4}>
        <Box d="flex" alignContent="space-between">
          <Box d="flex" w="full">
            <NavLink to={`/home/profile/${post.user._id}`}>
              <Avatar src={post.user.pic} />
            </NavLink>
            <Box>
              <NavLink to={`/home/profile/${post.user._id}`}>
                <Text style={{ fontWeight: "600" }} ml={3}>
                  {post.user.name}
                </Text>
              </NavLink>
              <Text fontSize="xs" style={{ fontWeight: "100" }} ml={3}>
                <Moment fromNow>{post.createdAt}</Moment>
                <br />
              </Text>
            </Box>
          </Box>
          {post.user._id === user.id ? (
            <Box w="full">
              <Box float="right">
                <Menu>
                  <MenuButton as={Button} variant="unestyled">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        deletepost(post)
                      }}
                    >
                      Eliminar
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Box>
          ) : null}
        </Box>

        <Box mx="16">
          <Box mt={1}></Box>
          <Box mb={2}>
            <Text style={{ fontWeight: "400" }} as="i">
              {post.title}
            </Text>
            <Text style={{ fontWeight: "200" }}>{post.description}</Text>
          </Box>
        </Box>
        <Box mx="auto" mb="8px">
          {post.image ? (
            <Center>
              <Image
                onClick={onOpen}
                boxSize={445}
                borderRadius={15}
                src={post.image.url}
                objectFit="cover"
                _hover={{ bg: "#F7F7F7", cursor: "pointer" }}
              ></Image>
            </Center>
          ) : (
            ""
          )}
        </Box>

        <Box
          mx="16"
          d="flex"
          alignItems="center"
          color="gray.500"
          justifyContent="space-between"
        >
          <Box
            d="flex"
            id={`liked-${post._id}`}
            color={post.likes.includes(user.id) ? "red" : "gray.500"}
            onClick={() => {
              handleLike(`liked-${post._id}`)
            }}
            _hover={{ cursor: "pointer" }}
            ml="3"
          >
            <div>
              <i className="fa-solid fa-heart"></i>
            </div>
            <Box ml="10px" id={`count-${post._id}`}>
              {post.likes.length}
            </Box>
          </Box>
          <Box
            _hover={{ cursor: "pointer" }}
            d="flex"
            onClick={() => {
              hidden(`comment-${post._id}`)
            }}
            ml="3"
          >
            <Box>
              <i className="fa-solid fa-comment"></i>
            </Box>
            <Box ml="10px">{count}</Box>
          </Box>
        </Box>

        <Box
          id={`comment-${post._id}`}
          hidden={true}
          className="animate__animated animate__bounceIn "
        >
          <hr width="80%" style={{ margin: "auto" }}></hr>
          <CommentForm post={post}></CommentForm>
          {comments.map((c) =>
            c.post === post._id ? (
              <Comment key={c._id} comment={c}></Comment>
            ) : null
          )}
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {post.image ? (
            <div>
              <Center>
                <Image onClick={onOpen} src={post.image.url}></Image>
              </Center>

              <a
                width="full"
                href={post.image.url}
                target="_blank"
                rel="noreferrer"
              >
                <Button width="full" height="25px">
                  <i class="fa-solid fa-eye"></i>
                </Button>
              </a>
            </div>
          ) : (
            ""
          )}
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Post
