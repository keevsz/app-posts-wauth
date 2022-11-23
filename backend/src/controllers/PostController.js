const postService = require('../services/PostService')
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')

const createPost = async (req, res) => {
  try {
    const token = req.user.token
    const { title, description, image } = matchedData(req)
    console.log(image)
    const response = await postService.create({
      title,
      description,
      image,
      token,
    })
    if (response.error) throw new Error(response.error)

    res.status(201).json(response)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'PostController_createPost' })
  }
}

const getPosts = async (req, res) => {
  try {
    const response = await postService.getAll()
    if (response.error) throw new Error(response.error)

    res.status(201).json(response)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'PostController_getPosts' })
  }
}

const getPost = async (req, res) => {
  try {
    const { id } = matchedData(req)

    const response = await postService.getOne(id)
    if (response.error) throw new Error(response.error)

    res.status(201).json(response)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'PostController_getPost' })
  }
}

//verify owner of post
const updatedPost = async (req, res) => {
  try {
    const token = req.user.token
    const { id, title, description } = matchedData(req) //handle null title an description
    const response = await postService.update({
      id,
      title,
      description,
      token,
    })
    if (response.error) throw new Error(response.error)

    res.status(201).json(response)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'PostController_updatePost' })
  }
}

const deletePost = async (req, res) => {
  try {
    const token = req.user.token
    const { id } = matchedData(req)
    const response = await postService.remove({ id, token })
    if (response.error) throw new Error(response.error)

    res.status(201).json(response)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'PostController_deletePosts' })
  }
}

const likePost = async (req, res) => {
  try {
    const { userId, postId } = matchedData(req)
    const response = await postService.alterLike({ userId, postId })
    if (response.error) throw new Error(response.error)

    res.status(201).json(response)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'PostController_likePost' })
  }
}

module.exports = {
  createPost,
  getPost,
  deletePost,
  updatedPost,
  getPosts,
  likePost,
}
