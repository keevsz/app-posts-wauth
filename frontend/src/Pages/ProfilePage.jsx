import React, { useEffect, useState } from "react"
import Profile from "../Components/Profile/Profile"
import { useParams } from "react-router-dom"
import { GlobalState } from "../Context/GlobalProvider"
import axios from "axios"
import { Box, Center, Spinner, Text } from "@chakra-ui/react"
import Post from "../Components/Post/Post"

export const ProfilePage = () => {
  const { user, setPosts, posts } = GlobalState()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [userdata, setUserdata] = useState([])

  const fetchUser = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      }
      const { data } = await axios.get(`/api/user/${params.id}`, config)
      setUserdata(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setLoading(true)

    fetchUser()
    fetchPosts()

    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

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

  return (
    <>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <Box h="100%" w="98%" maxW="xl">
          <Profile user={userdata}></Profile>
          {posts.map((i) => (
            <Box key={i._id} backgroundColor="white" mt={2}>
              {i.user._id === userdata.id ? (
                <>
                  <Post post={i}></Post>
                  <hr />
                </>
              ) : null}
            </Box>
          ))}
          {posts.filter((i) => i.user._id === userdata.id).length === 0 ? (
            <Center h="2xl" backgroundColor="white" mt={2}>
              <Text fontSize="2xl" color="GrayText">
                No ha realizado ninguna publicación
              </Text>
            </Center>
          ) : null}
        </Box>
      )}
    </>
  )
}
