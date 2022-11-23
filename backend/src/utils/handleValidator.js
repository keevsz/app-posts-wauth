const { validationResult } = require('express-validator')
const loggers = require('./handleLogger')

const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (error) {
    loggers.error(error.array())
    res.status(403).send({ errors: error.array() })
  }
}

module.exports = validateResults
