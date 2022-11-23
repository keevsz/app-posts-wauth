const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const userService = require('../services/UserService')
const { handleHttpError } = require('../utils/handleError')
const logger = require('../utils/handleLogger')

const decodedToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return error.message
  }
}

const verifyToken = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = decodedToken(token)

      if (decoded === 'invalid signature') throw new Error('Invalid token')
      if (decoded === 'jwt must be provided') throw new Error('Missing token')

      req.user = await userService.getOne(decoded.id)
      next()
    } catch ({ message }) {
      handleHttpError({ res, message, from: 'authMiddleware_verifyToken' })
    }
  } else {
    logger.error('Missing Token - authMidleWare_verifyToken')
    res.send('Missing token')
  }
}

module.exports = { verifyToken, decodedToken }
