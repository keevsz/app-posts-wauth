const router = require('express').Router()
const MessageValidator = require('../validators/messageValidator')
const MessageController = require('../controllers/MessageController')

router.post(
  '/',
  MessageValidator.validatorCreateMessage,
  MessageController.createMessage
)
router.get(
  '/:chatId',
  MessageValidator.validatorGetMessages,
  MessageController.getMessages
)

module.exports = router
