import { getCommentAdapter } from '@/adapters/comment.adapter'
import { Comment } from '@/models/comment.model'
import { AppStore } from '@/redux/store'
import { deleteComment } from '@/services/posts.services'
import { Image, Row, Text } from '@/styled-components'
import { getFormattedDate } from '@/utilities'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Column } from '../../Home/styled-components/Container'
import { usePostContext } from '../context/PostProvider'
import {
  BoxCommentCard,
  CommentDescription,
  DeleteCommentButton,
} from './Comments.styled'

interface Props {
  comment: Comment
}

const CommentCard = ({ comment }: Props) => {
  const userState = useSelector((state: AppStore) => state.user)
  const { deleteCommentFunc } = usePostContext()

  const handleDeleteComment = async () => {
    const response = await deleteComment(comment.id)
    deleteCommentFunc(getCommentAdapter(response).id)
  }

  return (
    <BoxCommentCard>
      <Row>
        <Link to={`/app/${comment.user.id}`} style={{ zIndex: 20 }}>
          <Image
            style={{
              width: '35px',
              height: '35px',
              marginLeft: '10px',
              marginTop: '5px',
            }}
            src={comment.user.pic}
          ></Image>
        </Link>

        <CommentDescription>
          <Column gap="0rem">
            <Row>
              <Text fontSize="0.67rem" style={{ fontWeight: 'bold' }}>
                {comment.user.name}
              </Text>
              <Text fontSize="0.67rem" style={{marginLeft: "-12px", color:"gray"}}>
                {getFormattedDate(comment.createdAt)}
              </Text>
            </Row>
            <Text fontSize="0.9rem">{comment.description}</Text>
          </Column>
        </CommentDescription>
        {comment.user.id == userState.id && (
          <DeleteCommentButton onClick={handleDeleteComment}>
            <Text fontSize="">-</Text>
          </DeleteCommentButton>
        )}
      </Row>
    </BoxCommentCard>
  )
}
export default CommentCard
