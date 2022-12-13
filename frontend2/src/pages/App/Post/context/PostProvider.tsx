import { getPostsAdapter } from "@/adapters/post.adapter";
import useFetchAndLoad from "@/hooks/useFetchAndLoad";
import { getPosts } from "@/services/posts.services";
import { createContext, useContext, useEffect, useState } from "react";

export const PostContext = createContext([] as any);

export const PostProvider = ({ children }: any) => {
  const { loading, callEndpoint } = useFetchAndLoad();

  const [posts, setPosts] = useState([] as any);
  const [comments, setComments] = useState([] as any);

  const setPostsFunc = (value: never) => setPosts([value, ...posts]);

  const setCommentsFunc = (value: never) => setComments([value, ...comments]);

  const updateLike = ({ post }: any) => {
    const updatedPosts = posts.map((postOfThis: any) =>
      post.id === postOfThis.id ? post : postOfThis
    );
    setPosts(updatedPosts);
  };

  const deletePostFunc = (id: any) => {
    const updatedPosts = posts.filter(
      (postOfThis: any) => id !== postOfThis.id
    );
    setPosts(updatedPosts);
  };

  const deleteCommentFunc = (id: string) => {
    const deleteCommentOfMap = comments.filter(
      (comment: any) => comment.id !== id
    );
    setComments(deleteCommentOfMap);
  };

  const getData = async () => {
    const response = await callEndpoint(getPosts());
    setPosts(getPostsAdapter(response));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        setPostsFunc,
        loading,
        updateLike,
        comments,
        setCommentsFunc,
        setComments,
        deleteCommentFunc,
        deletePostFunc,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePostContext undefined here");
  }
  return context;
};
