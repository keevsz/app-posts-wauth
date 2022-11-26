const { Comment } = require('../models')
const { decodedToken } = require('../middlewares/authMiddleware')
const loggers = require('../utils/handleLogger')

const create = async ({ description, post, token }) => {
  const user = decodedToken(token)
  const comment = await Comment.create({ user: user.id, description, post })
  const fullComment = await Comment.find({ _id: comment._id }).populate(
    'user',
    'name pic email'
  )
  loggers.info('CommentService_create: A comment has been created')
  return fullComment
}

const getAll = async () => {
  const comments = await Comment.find().populate('user', 'name pic email')
  loggers.info('CommentService_getAll: Getting comments')
  return comments
}

const remove = async ({ id }) => {
  const comment = await Comment.findByIdAndDelete(id)
  if (!comment) return { error: 'CommentService_remove: Comment not found' }
  loggers.info('CommentService_remove: A comment has been deleted')
  return 'Ok'
}

module.exports = { create, getAll, remove }
