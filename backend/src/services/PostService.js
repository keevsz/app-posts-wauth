const { Post } = require('../models')
const { decodedToken } = require('../middlewares/authMiddleware')
const loggers = require('../utils/handleLogger')


const create = async ({  image, description, token }) => {
  const user = decodedToken(token)
  const post = await Post.create({
    user: user.id,
    description,
    image,
  })

  const fullPost = await Post.find({ _id: post._id }).populate(
    'user',
    'name pic email'
  )
  loggers.info('PostService_create: A post has been created')
  return fullPost
}

const getAll = async () => {
  const posts = await Post.find()
    .populate('user', 'name pic email')
    .sort({ createdAt: -1 })
  loggers.info('PostService_getAll: Getting all posts')
  return posts
}

const getOne = async (id) => {
  const post = await Post.findById(id).populate('user', 'name pic email')
  loggers.info('PostService_getOne: Getting a post')
  return post
}

const update = async ({ id, title, description, token }) => {
  const user = decodedToken(token)

  const updatedPost = { id, user: user.id, title, description }
  const post = await Post.findByIdAndUpdate(id, updatedPost, {
    new: true,
  })

  if (!post) return { error: 'PostService_update: Post not found' }

  loggers.info('PostService_update: A post has been updated')
  return post
}

const remove = async ({ id, token }) => {
  const user = decodedToken(token)

  const foundedPost = await Post.find({ _id: id, user: user.id })
  console.log(foundedPost)
  if (!foundedPost) return { error: 'PostService_remove: Invalid user to delete post' }

  const post = await Post.findByIdAndDelete(id)
  if (!post) return { error: 'PostService_remove: Post not founded' }


  loggers.info('PostService_remove: A post has been deleted')
  return 'Ok'
}

const alterLike = async ({ userId, postId }) => {
  const isLiked = await Post.findOne({ likes: userId, _id: postId }) // post is liked by user
  let query = {}

  if (isLiked) {
    query = {
      $pull: { likes: userId },
    }
  } else {
    query = {
      $push: { likes: userId },
    }
  }

  const post = await Post.findByIdAndUpdate(postId, query, {
    new: true,
  }).populate('user', 'name pic email')

  if (!post) return { error: 'PostService_alterLike: Post not founded' }

  loggers.info('PostService_alterLike: Post like has been changed')
  return post
}

module.exports = { create, getAll, getOne, update, remove, alterLike }
