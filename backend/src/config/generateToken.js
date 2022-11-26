const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('.')

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: 60 * 60 * 24,
  })
}

module.exports = generateToken
