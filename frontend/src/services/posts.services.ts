import { Comment } from '@/models'
import axios from 'axios'
import { loadAbort } from '../utilities/loadAbort.utility'
const baseURL = import.meta.env.VITE_APP_URL_BACKEND


export const createPost = ({ description, image, user }: any) => {
  const controller = loadAbort()
  const Post = { description, image, user }
  return {
    call: axios.post<any>(`${baseURL}/api/post`, Post, {
      signal: controller.signal,
    }),
    controller,
  }
}

export const getPosts = () => {
  const controller = loadAbort()
  return {
    call: axios.get<any>(`${baseURL}/api/post`, {
      signal: controller.signal,
    }),
    controller,
  }
}

export const alterLike = ({ userId, postId }: any) => {
  const data = { userId, postId }
  return axios.post<any>('/api/post/like', data)
}

export const deletePost = (id: string) => {
  return axios.delete<any>(`/api/post/${id}`)
}

export const createComment = ({ description, post }: Partial<Comment>) => {
  const data = { description, post }
  const controller = loadAbort()
  return {
    call: axios.post<any>('/api/comment', data, {
      signal: controller.signal,
    }),
    controller,
  }
}

export const getComments = () => {
  const controller = loadAbort()
  return {
    call: axios.get<any>('/api/comment', {
      signal: controller.signal,
    }),
    controller,
  }
}

export const deleteComment = (id: string) => {
  return axios.delete<any>(`/api/comment/${id}`)
}
