import Loading from "@/components/Loading";
import { Post } from "@/models/post.model";
import { usePostContext } from "../context/PostProvider";
import PostCard from "./PostCard";

const PostList = () => {
  const { posts, loading } = usePostContext();

  if (loading) return <Loading></Loading>;

  return (
    <>
      {posts.map((post: Post) => {
        return <PostCard post={post} key={post.id}></PostCard>;
      })}
    </>
  );
};
export default PostList;
