import { Post } from '@/models/post.model'
import { AppStore } from '@/redux/store'
import { Text } from '@/styled-components'
import { Loader } from '@/styled-components/Loading.styled'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { usePostContext } from '../context/PostProvider'
import PostCard from './PostCard'

const PostList = () => {
  const { posts, loading } = usePostContext()
  const userState = useSelector((store: AppStore) => store.user)
  const params = useParams()

  if (loading)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loader></Loader>
      </div>
    )

  const getArray = ()=> {
    if (params['*'] == 'profile')
      return posts.filter((post: Post) => post.user.id == userState.id)

    if (params.id) return posts.filter((post: Post) => post.user.id == params.id)

    return posts as [Post]
  }

  return (
    <>
      {getArray().length == 0 ? (
        <Text fontSize="1.5rem" style={{ position: 'absolute', zIndex: 40 }}>
          No hay publicaciones
        </Text>
      ) : (
        ''
      )}
      {getArray().map((post: Post) => {
        return <PostCard post={post} key={post.id}></PostCard>
      })}
    </>
  )
}
export default PostList
