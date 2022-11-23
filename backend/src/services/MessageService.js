const { Message, User, Chat } = require('../models')
const { decodedToken } = require('../middlewares/authMiddleware')
const loggers = require('../utils/handleLogger')

const create = async ({ content, chatId, token }) => {
  const user = decodedToken(token)

  let message = await Message.create({
    sender: user.id,
    content: content,
    chat: chatId,
  })
  if (!message) return { error: 'MessageService_create: Error creating message' }

  message = await message.populate('sender', 'name pic')
  message = await message.populate('chat')
  message = await User.populate(message, {
    path: 'chat.users',
    select: 'name pic email',
  })

  const chatUpdated = await Chat.findByIdAndUpdate(chatId, {
    latestMessage: message,
  })

  if (!chatUpdated) return { error: 'MessageService_create: Chat not founded' }

  loggers.info('PostService_create: A message has been created')
  return message
}

const filterByChat = async ({ chatId, token }) => {
  // verify if user can access to these messages
  const user = decodedToken(token)
  const userInChat = await Chat.find({ users: user.id, _id: chatId })
  if (!userInChat) return { error: 'Invalid user' }

  const messages = await Message.find({ chat: chatId })
    .populate('sender', 'name pic email')
    .populate('chat')

  loggers.info('PostService_filterByChat: Messages han been filtered by chat')
  return messages
}

module.exports = { create, filterByChat }
