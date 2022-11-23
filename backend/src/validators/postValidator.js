const { check } = require('express-validator')
const validateResults = require('../utils/handleValidator')

const validatorCreatePost = [
  check('title').isString(),
  check('description').isString(),
  check('image').optional().isString(),
  (req, res, next) => {
    return validateResults(req, res, next)
  },
]

const validatorGetPosts = [
  (req, res, next) => {
    return validateResults(req, res, next)
  },
]

const validatorGetPost = [
  check('id').exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next)
  },
]

const validatorUpdatePost = [
  check('id').exists().notEmpty(),
  check('title').exists().notEmpty().isString(),
  check('description').exists().notEmpty().isString(),
  (req, res, next) => {
    return validateResults(req, res, next)
  },
]

const validatorDeletePost = [
  check('id').exists().notEmpty().isString(),
  (req, res, next) => {
    return validateResults(req, res, next)
  },
]

const validatorLikePost = [
  check('userId').exists().notEmpty(),
  check('postId').exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next)
  },
]

module.exports = {
  validatorCreatePost,
  validatorGetPost,
  validatorLikePost,
  validatorDeletePost,
  validatorGetPosts,
  validatorUpdatePost
}
