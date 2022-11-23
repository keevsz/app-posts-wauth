const { User, Chat } = require('../models')
const { decodedToken } = require('../middlewares/authMiddleware')
const loggers = require('../utils/handleLogger')


const access = async ({ userId, token }) => {
  const user = decodedToken(token)
  //searching chat
  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: user.id } } }, //user: me
      { users: { $elemMatch: { $eq: userId } } }, //user: friend
    ],
  })
    .populate('users', '-password')
    .populate('latestMessage')

  isChat = await User.populate(isChat, {
    path: 'latestMessage.sender',
    select: 'name pic email',
  })

  if (isChat.length > 0) {
    loggers.info('ChatService_access: A chat has been loaded ')
    return isChat[0]
  } else {
    const createdChat = await Chat.create({
      chatName: 'sender',
      isGroupChat: false,
      users: [user.id, userId],
    })
    if (!createdChat) return { error: 'ChatService_access: Error creating chat' }

    const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      'users',
      '-password'
    )

    if (!FullChat) return { error: 'ChatService_access: Chat not found' }

    loggers.info('ChatService_access: A chat has been created')
    return FullChat
  }
}

const getAll = async ({ token }) => {
  const user = decodedToken(token)
  const chats = await Chat.find({ users: user.id })
    .populate('users', '-password')
    .populate('groupAdmin', '-password')
    .populate('latestMessage')
    .sort({ updatedAt: -1 })

  const fullChats = await User.populate(chats, {
    path: 'latestMessage.sender',
    select: 'name pic email',
  })
  loggers.info('ChatService_getAll: Getting all chats')
  return fullChats
}

const createGroup = async ({ users, name, token }) => {
  const user = decodedToken(token)

  let usersArray = JSON.parse(users)
  if (usersArray.length < 2) return { error: 'ChatService_createGroup: Invalid numbers of users' }

  usersArray.push(user.id)

  const groupChat = await Chat.create({
    chatName: name,
    users: usersArray,
    isGroupChat: true,
    groupAdmin: user.id,
  })

  const fullGroupChat = await Chat.find({ _id: groupChat._id })
    .populate('users', '-password')
    .populate('groupAdmin', '-password')

  loggers.info('ChatService_createGroup: A group chat has been created')
  return fullGroupChat
}

const renameGroup = async ({ chatId, chatName }) => {
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    { new: true }
  )
    .populate('users', '-password')
    .populate('groupAdmin', '-password')

  if (!updatedChat) return { error: 'ChatService_renameGroup: Chat not found' }

  loggers.info('ChatService_renameGroup: A group chat has been updated')
  return updatedChat
}

const addUser = async ({ userId, chatId }) => {
  const isUserInChat = await Chat.findOne({
    users: userId,
    _id: chatId,
  })
  if (isUserInChat) return { error: 'ChatService_addUser: Users already in chat' }

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate('users', '-password')
    .populate('groupAdmin', '-password')
  if (!added) return { error: 'ChatService_addUser: Chat not found' }

  loggers.info('ChatService_addUser: A user has been added to chat')
  return added
}

const removeUser = async ({ userId, chatId }) => {
  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate('users', '-password')
    .populate('groupAdmin', '-password')

  if (!removed) return { error: 'ChatService_removeUser: Chat not found' }

  loggers.info('ChatService_removeUser: A user has been removed from a chat')
  return removed
}

module.exports = {
  access,
  getAll,
  createGroup,
  renameGroup,
  addUser,
  removeUser,
}
