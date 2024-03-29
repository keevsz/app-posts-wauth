const { check } = require('express-validator')
const validateResults = require('../utils/handleValidator')

const validatorCreateComment = [
  check('description').exists().notEmpty().isString(),
  check('post').exists().notEmpty().isString(),
  (req, res, next) => {
    return validateResults(req, res, next)
  },
]

const validatorDeleteComment = [
  check('id').exists().notEmpty().isString(),
  (req, res, next) => {
    return validateResults(req, res, next)
  },
]

const validatorGetComments = [
  (req, res, next) => {
    return validateResults(req, res, next)
  },
]

module.exports = { validatorCreateComment, validatorDeleteComment, validatorGetComments }
