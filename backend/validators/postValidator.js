const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreatePost = [
  check("user").exists().notEmpty().isString(),
  check("title").exists().notEmpty().isString(),
  check("description").exists().notEmpty().isString(),
  (req, res, next) => {
    return validateResults(req, res, next)
  },
]

const validatorGetPost = [
  check("id").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next)
  },
]

module.exports = { validatorCreatePost, validatorGetPost }
