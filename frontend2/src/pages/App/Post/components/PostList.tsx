import Loading from "@/components/Loading";
import { Post } from "@/models/post.model";
import { AppStore } from "@/redux/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { usePostContext } from "../context/PostProvider";
import PostCard from "./PostCard";

const PostList = () => {
  const { posts, loading } = usePostContext();
  const userState = useSelector((store: AppStore) => store.user);
  const params = useParams();
  if (loading) return <Loading></Loading>;

  const getArray = () => {
    if (params["*"] == "profile")
      return posts.filter((post: any) => post.user.id == userState.id);
    return posts;
  };

  return (
    <>
      {getArray().map((post: Post) => {
        return <PostCard post={post} key={post.id}></PostCard>;
      })}
    </>
  );
};
export default PostList;
