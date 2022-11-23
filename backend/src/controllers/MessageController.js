const messageService = require('../services/MessageService')
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')

const createMessage = async (req, res) => {
  try {
    const token = req.user.token
    const { content, chatId } = matchedData(req)
    const response = await messageService.create({
      content,
      chatId,
      token,
    })
    if (response.error) throw new Error(response.error)

    res.status(201).json(response)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'MessageController_createMessage' })
  }
}

const getMessages = async (req, res) => {
  try {
    const token = req.user.token
    const { chatId } = matchedData(req)
    const response = await messageService.filterByChat({ chatId, token })
    if (response.error) throw new Error(response.error)

    res.status(201).json(response)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'MessageController_getMessages' })
  }
}

module.exports = { createMessage, getMessages }
