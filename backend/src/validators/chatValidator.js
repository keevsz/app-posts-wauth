const { check } = require('express-validator')
const validateResults = require('../utils/handleValidator')

const validatorAccessChat = [
  check('userId').exists().notEmpty().isString(),
  (req, res, next) => {
    return validateResults(req, res, next)
  },
]

const validatorGetChats = [
  (req, res, next) => {
    return validateResults(req, res, next)
  },
]

const validatorCreateGroup = [
  check('users').exists().notEmpty().isString(),
  check('name').exists().notEmpty().isString(),
  (req, res, next) => {
    return validateResults(req, res, next)
  },
]

const validatorRenameGroup = [
  check('chatId').exists().notEmpty().isString(),
  check('chatName').exists().notEmpty().isString(),
  (req, res, next) => {
    return validateResults(req, res, next)
  },
]

const validatorAddToGroup = [
  check('chatId').exists().notEmpty().isString(),
  check('userId').exists().notEmpty().isString(),
  (req, res, next) => {
    return validateResults(req, res, next)
  },
]

const validatorRemoveFromGroup = [
  check('chatId').exists().notEmpty().isString(),
  check('userId').exists().notEmpty().isString(),
  (req, res, next) => {
    return validateResults(req, res, next)
  },
]

module.exports = {
  validatorAccessChat,
  validatorCreateGroup,
  validatorRenameGroup,
  validatorAddToGroup,
  validatorRemoveFromGroup,
  validatorGetChats,
}
