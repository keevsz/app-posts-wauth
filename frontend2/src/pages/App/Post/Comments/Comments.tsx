import { createCommentAdapter } from "@/adapters/comment.adapter";
import { createComment } from "@/services/posts.services";
import { useState } from "react";
import { usePostContext } from "../context/PostProvider";
import {
  BoxComments,
  CommentsAnimation,
  InputNewComment,
} from "./Comments.styled";
import ListComments from "./ListComments";

const Comments = ({ post }: any) => {
  const { setCommentsFunc, comments } = usePostContext();
  const [comment, setComment] = useState("");

  const onSuubmit = async (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const response = await createComment({
        description: comment,
        post: post.id,
      });
      setCommentsFunc(createCommentAdapter(response));
      setComment("");
    }
  };

  return (
    <CommentsAnimation>
      <BoxComments>
        <InputNewComment
          placeholder="Nuevo comentario"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          onKeyDown={onSuubmit}
        ></InputNewComment>
        <ListComments post={post}></ListComments>
      </BoxComments>
    </CommentsAnimation>
  );
};
export default Comments;
