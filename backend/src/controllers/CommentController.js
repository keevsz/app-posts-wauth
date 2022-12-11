const commentService = require('../services/CommentService')
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')

const createComment = async (req, res) => {
  try {
    const token = req.user.token
    const { description, post } = matchedData(req)
    const response = await commentService.create({
      description,
      post,
      token
    })
    if (response.error) throw new Error(response.error)

    res.status(201).json(response)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'CommentController_createComment' })
  }
}

//filter by id post sv performance
const getComments = async (req, res) => {
  try {
    const response = await commentService.getAll()
    if (response.error) throw new Error(response.error)

    res.status(201).json(response)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'CommentController_getComments' })
  }
}

const deleteComment = async (req, res) => {
  try {
    const { id } = matchedData(req)
    const response = await commentService.remove({ id })
    if (response.error) throw new Error(response.error)
    res.status(201).json(response)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'CommmentController_deleteComment' })
  }
}

module.exports = { createComment, getComments, deleteComment }
