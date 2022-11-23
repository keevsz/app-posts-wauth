const { check } = require('express-validator')
const validateResults = require('../utils/handleValidator')

const validatorCreateMessage = [
  check('content').exists().notEmpty().isString(),
  check('chatId').exists().notEmpty().isString(),
  (req, res, next) => {
    return validateResults(req, res, next)
  },
]

const validatorGetMessages = [
  check('chatId').exists().notEmpty().isString(),
  (req, res, next) => {
    return validateResults(req, res, next)
  },
]

module.exports = { validatorCreateMessage, validatorGetMessages }
