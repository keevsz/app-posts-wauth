import { Post } from '@/models/post.model'
import { Image, Row, Text } from '@/styled-components'
import { Column, Space } from '../../Home/styled-components/Container'
import {
  DeleteImgButton,
  FormPost,
  ImageUploaded,
} from '../styled-components/PostForm.styled'
import {
  ActionsSection,
  IconLike,
  PostContent,
} from '../styled-components/PostList.styled'
import liked_icon from '@/assets/liked_icon.png'
import unliked_icon from '@/assets/unliked_icon.png'
import comments_icon from '@/assets/comments_icon.png'
import { AppStore } from '@/redux/store'
import { useSelector } from 'react-redux'
import { alterLike, deletePost } from '@/services/posts.services'
import { usePostContext } from '../context/PostProvider'
import { getPostAdapter } from '@/adapters/post.adapter'
import { useState } from 'react'
import Comments from '../Comments/Comments'
import { getFormattedDate } from '@/utilities/localDate.utility'
import { Link } from 'react-router-dom'
import { PrivateRoutes } from '@/models'

interface Props {
  post: Post
}

const PostCard = ({ post }: Props) => {
  const userState = useSelector((state: AppStore) => state.user)
  const [showComments, setShowComments] = useState(false)
  const { updateLike, deletePostFunc } = usePostContext()

  const handleLike = async () => {
    const response = await alterLike({ userId: userState.id, postId: post.id })
    updateLike(getPostAdapter(response))
  }

  const handleShowComments = async () => setShowComments(!showComments)
  
  const handleDelete = async () => {
    await deletePost(post.id)
    deletePostFunc(post.id)
  }

  return (
    <>
      <Row>
        <Column gap="2px">
          <Link to={`${PrivateRoutes.APP}/${post.user.id}`} style={{ zIndex: 20 }}>
            <Image
              style={{ width: '60px', height: '60px' }}
              alt={post.user.email}
              src={post.user.pic}
            ></Image>
          </Link>
        </Column>
        <FormPost>
          <PostContent>
            <Text fontSize="0.9rem">{post.user.name}</Text>
            <Text fontSize="0.9rem">
              {' ' + getFormattedDate(post.createdAt)}
            </Text>
            <Space h="5px" w="" />
            <Text fontSize="1rem">{post.description}</Text>
            <Space h="10px" w="" />

            {post.image && <ImageUploaded src={post.image} alt='image_upload_icon'></ImageUploaded>}
            <ActionsSection>
              <div
                style={{
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                <IconLike
                  width={'20px'}
                  height={'20px'}
                  alt='icon_like'
                  src={
                    post.likes.includes(userState.id as never)
                      ? liked_icon
                      : unliked_icon
                  }
                  onClick={handleLike}
                ></IconLike>
              </div>
              <div
                style={{
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                <IconLike
                  onClick={handleShowComments}
                  width={'20px'}
                  height={'20px'}
                  alt='comment_icon'
                  src={comments_icon}
                ></IconLike>
              </div>
            </ActionsSection>
          </PostContent>

          {showComments ? <Comments post={post}></Comments> : null}

          {post.user.id == userState.id ? (
            <DeleteImgButton
              onClick={() => {
                handleDelete()
              }}
            >
              x
            </DeleteImgButton>
          ) : (
            ''
          )}
        </FormPost>
      </Row>
      <br />
    </>
  )
}
export default PostCard
