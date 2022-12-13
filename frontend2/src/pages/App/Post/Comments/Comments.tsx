import { createCommentAdapter } from "@/adapters/comment.adapter";
import Loading from "@/components/Loading";
import useFetchAndLoad from "@/hooks/useFetchAndLoad";
import { createComment } from "@/services/posts.services";
import { Loader } from "@/styled-components/Loading.styled";
import { useState } from "react";
import { usePostContext } from "../context/PostProvider";
import {
  BoxComments,
  CommentFormAnimation,
  InputNewComment,
} from "./Comments.styled";
import ListComments from "./ListComments";

const Comments = ({ post }: any) => {
  const { setCommentsFunc } = usePostContext();
  const { loading, callEndpoint } = useFetchAndLoad();
  const [comment, setComment] = useState("");

  const onSubmit = async (e: any) => {
    if (loading) return;
    if (e.key === "Enter") {
      e.preventDefault();
      if (comment === "") return;
      const response = await callEndpoint(
        createComment({
          description: comment,
          post: post.id,
        })
      );
      setComment("");
      setCommentsFunc(createCommentAdapter(response));
    }
  };

  return (
    <CommentFormAnimation>
      <BoxComments>
        <InputNewComment
          placeholder="Nuevo comentario"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          onKeyDown={onSubmit}
        ></InputNewComment>
        <br />
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader></Loader>
          </div>
        )}
        <ListComments post={post}></ListComments>
      </BoxComments>
    </CommentFormAnimation>
  );
};
export default Comments;
