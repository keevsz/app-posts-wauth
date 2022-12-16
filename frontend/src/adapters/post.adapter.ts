import { Post } from "@/models";

export const createPostAdapter = (post: any) => ({
  id: post.data[0]._id,
  description: post.data[0].description,
  image: post.data[0].image,
  likes: post.data[0].likes,
  createdAt: post.data[0].createdAt,
  user: {
    id: post.data[0].user._id,
    name: post.data[0].user.name,
    pic: post.data[0].user.pic,
    email: post.data[0].user.email,
  },
});

export const getPostAdapter = (post:any) => ({
  id: post.data._id,
  description: post.data.description,
  image: post.data.image,
  likes: post.data.likes,
  createdAt: post.data.createdAt,
  user: {
    id: post.data.user._id,
    name: post.data.user.name,
    pic: post.data.user.pic,
    email: post.data.user.email,
  },
})

export const getPostsAdapter = (posts: any) => {
  return posts.data.map((post: any) => ({
    id: post._id,
    description: post.description,
    image: post.image,
    likes: post.likes,
    createdAt: post.createdAt,
    user: {
      id: post.user._id,
      name: post.user.name,
      pic: post.user.pic,
      email: post.user.email,
    },
  }));
};
