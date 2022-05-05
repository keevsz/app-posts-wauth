/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Spinner } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { GlobalState } from "../../Context/GlobalProvider"
import Post from "./Post"

const Posts = ({ fetchPosts, fetchComments }) => {
  const { posts } = GlobalState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchPosts()
    fetchComments()
    setLoading(false)
  }, [])

  return (
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      {posts.map((i) => (
        <Box key={i._id}>
          {loading ? (
            <Spinner></Spinner>
          ) : (
            <Post fetchPosts={fetchPosts} post={i}></Post>
          )}
        </Box>
      ))}
      <hr />
    </div>
  )
}

export default Posts
