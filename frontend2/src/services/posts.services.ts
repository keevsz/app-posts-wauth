import axios from "axios";
import { loadAbort } from "../utilities/loadAbort.utility";

export const createPost = ({ description, image, user }: any) => {
  const controller = loadAbort();
  const Post = { description, image, user };
  return {
    call: axios.post<any>("http://localhost:5000/api/post", Post, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const getPosts = () => {
  const controller = loadAbort();
  return {
    call: axios.get<any>("http://localhost:5000/api/post", {
      signal: controller.signal,
    }),
    controller,
  };
};

export const alterLike = ({ userId, postId }: any) => {
  const data = { userId, postId };
  return axios.post<any>("http://localhost:5000/api/post/like", data);
};

export const deletePost = ( id : any) => {
  return axios.delete<any>(`http://localhost:5000/api/post/${id}`);
};


export const createComment = ({ description, post }: any) => {
  const data = { description, post };
  const controller = loadAbort();
  return {
    call: axios.post<any>("http://localhost:5000/api/comment", data, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const getComments = () => {
  const controller = loadAbort();
  return {
    call: axios.get<any>("http://localhost:5000/api/comment", {
      signal: controller.signal,
    }),
    controller,
  };
};

export const deleteComment = ({ id }: any) => {
  return axios.delete<any>(`http://localhost:5000/api/comment/${id}`);
};
