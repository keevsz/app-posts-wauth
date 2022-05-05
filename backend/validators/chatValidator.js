const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorAccessChat = [
  check("userId").exists().notEmpty().isString(),
  (req, res, next) => {
    return validateResults(req, res, next)
  },
]

const validatorDeleteComment = [
  check("id").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next)
  },
]

module.exports = { validatorAccessChat }
