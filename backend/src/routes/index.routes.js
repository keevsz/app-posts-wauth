const router = require('express').Router()
const fs = require('fs')
const { verifyToken } = require('../middlewares/authMiddleware')

const removeExtension = (fileName) => {
  return fileName.split('.').shift()
}

fs.readdirSync(__dirname).filter((file) => {
  const name = removeExtension(file)
  if (name !== 'index' && name !== 'user') {
    router.use(`/${name}`, verifyToken, require(`./${file}`))
  }
})

module.exports = router
