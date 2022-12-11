export const createCommentAdapter = (comment: any) => ({
  id: comment.data[0]._id,
  description: comment.data[0].description,
  likes: comment.data[0].likes,
  createdAt: comment.data[0].createdAt,
  post: comment.data[0].post,
  user: {
    id: comment.data[0].user._id,
    name: comment.data[0].user.name,
    pic: comment.data[0].user.pic,
    email: comment.data[0].user.email,
  },
});

export const getCommentAdapter = (comment:any) => ({
  id: comment.data._id,
  description: comment.data.description,
  likes: comment.data.likes,
  post: comment.data.post,
  user: {
    id: comment.data.user._id,
    name: comment.data.user.name,
    pic: comment.data.user.pic,
    email: comment.data.user.email,
  },
})

export const getCommentsAdapter = (comments: any) => {
  return comments.data.map((comment: any) => ({
    id: comment._id,
    description: comment.description,
    likes: comment.likes,
    post: comment.post,
    user: {
      id: comment.user._id,
      name: comment.user.name,
      pic: comment.user.pic,
      email: comment.user.email,
    },
  }));
};
