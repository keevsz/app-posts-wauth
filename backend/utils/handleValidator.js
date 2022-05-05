const { validationResult } = require("express-validator")

const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (error) {
    console.log(error.message)
    res.status(403).send({ errors: error.array() })
  }
}

module.exports = validateResults
