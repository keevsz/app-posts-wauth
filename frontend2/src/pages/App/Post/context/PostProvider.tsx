import { getPostsAdapter } from '@/adapters/post.adapter'
import useFetchAndLoad from '@/hooks/useFetchAndLoad'
import { Post } from '@/models'
import { Comment } from '@/models/comment.model'
import { getPosts } from '@/services/posts.services'
import { createContext, useContext, useEffect, useState } from 'react'

type PostContextProps = {
  posts: Post[]
  setPostsFunc: (post: Post) => void
  loading: boolean
  updateLike: (post: Post) => void
  comments: Comment[]
  setCommentsFunc: (comment: Comment) => void
  deleteCommentFunc: (id: string) => void
  deletePostFunc: (id: string) => void
  loadComments: (comments: Comment[]) => void
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const PostContext = createContext<PostContextProps>(
  {} as PostContextProps
)

export const PostProvider = ({ children }: Props) => {
  const { loading, callEndpoint } = useFetchAndLoad()

  const [posts, setPosts] = useState<Post[]>([])
  const [comments, setComments] = useState<Comment[]>([])

  const setPostsFunc = (post: Post) => setPosts([post, ...posts])

  const setCommentsFunc = (comment: Comment) =>
    setComments([comment, ...comments])

  const loadComments = (comments: Comment[]) => setComments(comments)

  const updateLike = (post: Post) => {
    const updatedPosts = posts.map((postOfThis: Post) =>
      post.id === postOfThis.id ? post : postOfThis
    )
    setPosts(updatedPosts)
  }

  const deletePostFunc = (id: string) => {
    const updatedPosts = posts.filter(
      (postOfThis: Post) => id !== postOfThis.id
    )
    setPosts(updatedPosts)
  }

  const deleteCommentFunc = (id: string) => {
    const deleteCommentOfMap = comments.filter(
      (comment: Comment) => comment.id !== id
    )
    setComments(deleteCommentOfMap)
  }

  const getData = async () => {
    const response = await callEndpoint(getPosts())
    setPosts(getPostsAdapter(response))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <PostContext.Provider
      value={{
        posts,
        setPostsFunc,
        loading,
        updateLike,
        comments,
        setCommentsFunc,
        deleteCommentFunc,
        deletePostFunc,
        loadComments,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export const usePostContext = () => {
  const context = useContext(PostContext)
  if (context === undefined) {
    throw new Error('usePostContext undefined here')
  }
  return context
}
