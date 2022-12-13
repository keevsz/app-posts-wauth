import { getCommentsAdapter } from "@/adapters/comment.adapter";
import Loading from "@/components/Loading";
import useFetchAndLoad from "@/hooks/useFetchAndLoad";
import { getComments } from "@/services/posts.services";
import { Loader } from "@/styled-components/Loading.styled";
import { useEffect } from "react";
import { usePostContext } from "../context/PostProvider";
import CommentCard from "./CommentCard";

const ListComments = ({ post }: any) => {
  const { comments, setComments } = usePostContext();
  const { loading, callEndpoint } = useFetchAndLoad();

  const getData = async () => {
    const response = await callEndpoint(getComments());
    setComments(getCommentsAdapter(response));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader></Loader>
      </div>
      ) : (
        comments.map(
          (comment: any) =>
            comment.post === post.id && (
              <CommentCard key={comment.id} comment={comment}></CommentCard>
            )
        )
      )}
    </>
  );
};
export default ListComments;
