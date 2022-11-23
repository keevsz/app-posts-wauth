const router = require('express').Router()
const ChatValidator = require('../validators/chatValidator')
const ChatController = require('../controllers/ChatController')

router.post('/',
  ChatValidator.validatorAccessChat,
  ChatController.accessChat
)

router.get('/',
  ChatValidator.validatorGetChats,
  ChatController.getChats
)

router.post(
  '/group',
  ChatValidator.validatorCreateGroup,
  ChatController.createGroupChat
)

router.put(
  '/rename',
  ChatValidator.validatorRenameGroup,
  ChatController.renameGroupChat
)

router.put(
  '/groupadd',
  ChatValidator.validatorAddToGroup,
  ChatController.addToGroupChat
)

router.put(
  '/groupremove',
  ChatValidator.validatorRemoveFromGroup,
  ChatController.removeFromGroupChat
)

module.exports = router
