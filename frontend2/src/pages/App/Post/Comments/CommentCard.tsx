import { getCommentAdapter } from "@/adapters/comment.adapter";
import { AppStore } from "@/redux/store";
import { deleteComment } from "@/services/posts.services";
import { Image, Row, Text } from "@/styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "../../Home/styled-components/Container";
import { usePostContext } from "../context/PostProvider";
import {
  BoxCommentCard,
  CommentDescription,
  DeleteCommentButton,
} from "./Comments.styled";

const CommentCard = ({ comment }: any) => {
  const userState = useSelector((state: AppStore) => state.user);
  const { deleteCommentFunc } = usePostContext();

  const handleDeleteComment = async () => {
    const response = await deleteComment({ id: comment.id });
    deleteCommentFunc(getCommentAdapter(response).id);
  };

  return (
    <BoxCommentCard>
      <Row>
        <Link to={`/app/${comment.user?.id}`} style={{ zIndex: 20 }}>
          <Image
            style={{ width: "35px", height: "35px", marginLeft: "10px" }}
            src={comment.user.pic}
          ></Image>
        </Link>

        <CommentDescription>
          <Column gap="0rem">
            <Text fontSize="0.67rem" style={{ fontWeight: "bold" }}>
              {comment.user.name}
            </Text>
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
  );
};
export default CommentCard;
