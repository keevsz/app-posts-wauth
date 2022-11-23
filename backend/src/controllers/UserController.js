const userServices = require('../services/UserService')
const emailService = require('../services/EmailService')
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')

const registerUser = async (req, res) => {
  try {
    const { name, email, password, pic } = matchedData(req)
    const response = await userServices.create({ name, email, password, pic })
    if (response.error) throw new Error(response.error)

    res.status(201).json(response)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'UserController_registerUser' })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = matchedData(req)
    const response = await userServices.login({ email, password })
    if (response.error) throw new Error(response.error)

    res.status(201).json(response)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'UserController_loginUser' })
  }
}

const getUsers = async (req, res) => {
  try {
    const { search } = matchedData(req)
    const response = await userServices.filter({ search })
    if (response.error) throw new Error(response.error)

    res.status(201).json(response)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'UserController_getUsers' })
  }
}

const getUser = async (req, res) => {
  try {
    const { id } = matchedData(req)
    const response = await userServices.getOne(id)
    if (response.error) throw new Error(response.error)

    res.status(201).json(response)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'UserController_getUser' })
  }
}

const sendUser = async (req, res) => {
  const user = req.user
  res.status(201).json(user)
}

const sendEmail = async (req, res) => {
  try {
    console.log('hola')
    const { userEmail, type } = matchedData(req)
    const response = await emailService.send({ userEmail, type })
    if (response.error) throw new Error(response.error)

    res.status(201).json(response)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'UserController_sendEmail' })
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  sendUser,
  sendEmail,
}
