const chatService = require('../services/ChatService')
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')


const accessChat = async (req, res) => {
  try {
    const token = req.user.token
    const { userId } = matchedData(req)
    const response = await chatService.access({ userId, token })
    if (response.error) throw new Error(response.error)

    res.status(201).json(response)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'ChatController_accessChat' })
  }
}

const getChats = async (req, res) => {
  try {
    const token = req.user.token
    const response = await chatService.getAll({ token })
    if (response.error) throw new Error(response.error)

    res.status(201).json(response)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'ChatController_getChats' })
  }
}

const createGroupChat = async (req, res) => {
  try {
    const token = req.user.token
    const { users, name } = matchedData(req)
    const response = await chatService.createGroup({ token, users, name })
    if (response.error) throw new Error(response.error)

    res.status(201).json(response)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'ChatController_createGroupChat' })
  }
}

//validate admin chat_
const renameGroupChat = async (req, res) => {
  try {
    const { chatId, chatName } = matchedData(req)
    const response = chatService.renameGroup({ chatId, chatName })
    if (response.error) throw new Error(response.error)

    res.status(201).json(response)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'ChatController_renameGroupChat' })
  }
}

//validate admin chat_
const addToGroupChat = async (req, res) => {
  try {
    const { chatId, userId } = matchedData(req)

    const response = await chatService.addUser({ chatId, userId })
    if (response.error) throw new Error(response.error)

    res.status(201).json(response)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'ChatController_addToGroupChat' })

  }
}

//validate admin chat_
const removeFromGroupChat = async (req, res) => {
  try {
    const { chatId, userId } = matchedData(req)
    const response = await chatService.removeUser({ chatId, userId })
    if (response.error) throw new Error(response.error)

    res.status(201).json(response)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'ChatController_addToGroupChat' })
  }
}

module.exports = {
  accessChat,
  getChats,
  renameGroupChat,
  createGroupChat,
  removeFromGroupChat,
  addToGroupChat,
}
