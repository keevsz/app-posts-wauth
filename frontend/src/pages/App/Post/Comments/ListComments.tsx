import { getCommentsAdapter } from '@/adapters/comment.adapter'
import useFetchAndLoad from '@/hooks/useFetchAndLoad'
import { Post } from '@/models'
import { Comment } from '@/models/comment.model'
import { getComments } from '@/services/posts.services'
import { Loader } from '@/styled-components/Loading.styled'
import { useEffect } from 'react'
import { usePostContext } from '../context/PostProvider'
import CommentCard from './CommentCard'

interface Props {
  post: Post
}

const ListComments = ({ post }: Props) => {
  const { comments, loadComments } = usePostContext()
  const { loading, callEndpoint } = useFetchAndLoad()

  const getData = async () => {
    const response = await callEndpoint(getComments())
    loadComments(getCommentsAdapter(response))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loader></Loader>
        </div>
      ) : (
        comments.map(
          (comment: Comment) =>
            comment.post === post.id && (
              <CommentCard key={comment.id} comment={comment}></CommentCard>
            )
        )
      )}
    </>
  )
}
export default ListComments
