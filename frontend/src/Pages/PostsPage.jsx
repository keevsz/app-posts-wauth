import { Box } from "@chakra-ui/react"
import axios from "axios"
import React from "react"
import PostForm from "../Components/Post/PostForm"
import Posts from "../Components/Post/Posts"
import { GlobalState } from "../Context/GlobalProvider"

const PostsPage = () => {
  const { user, setPosts, setComments } = GlobalState()

  const fetchPosts = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.get("/api/post", config)
      setPosts(data)
    } catch (error) {
      console.log(error)
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

  const createPostsRequests = async (post) => {
    try {
      const form = new FormData()

      for (let key in post) {
        form.append(key, post[key])
      }
      form.append("user", user.id)
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      }
      await axios.post("/api/post", form, config)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box
      w="100%"
      maxW="xl"
      className="animate__animated animate__fadeIn animate__delay-0.5s"
    >
      {user && (
        <PostForm
          fetchPosts={fetchPosts}
          createPostsRequests={createPostsRequests}
        ></PostForm>
      )}
      {user && <Posts fetchComments={fetchComments} fetchPosts={fetchPosts} />}
      <hr />
    </Box>
  )
}

export default PostsPage
