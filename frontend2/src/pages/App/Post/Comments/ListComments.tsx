import { getCommentsAdapter } from "@/adapters/comment.adapter";
import { getComments } from "@/services/posts.services";
import { useEffect } from "react";
import { usePostContext } from "../context/PostProvider";
import CommentCard from "./CommentCard";

const ListComments = ({ post }: any) => {
  const { comments, setComments } = usePostContext();

  const getData = async () => {
    const response = await getComments();
    setComments(getCommentsAdapter(response));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <br />
      {comments.map(
        (comment: any) =>
          comment.post === post.id && (
            <CommentCard key={comment.id} comment={comment} ></CommentCard>
          )
      )}
    </div>
  );
};
export default ListComments;
