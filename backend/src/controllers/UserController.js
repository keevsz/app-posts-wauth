const userServices = require('../services/UserService')
const emailService = require('../services/EmailService')
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')

const registerUser = async (req, res) => {
  try {
    const { name, email, password, pic, verified } = matchedData(req)
    const response = await userServices.create({
      name,
      email,
      password,
      pic,
      verified,
    })
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
  try {
    console.log('pass by here')
    const user = req.user
    console.log(req.error)

    res.status(201).json(user)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'UserController_sendUser' })
  }
}

const sendEmail = async (req, res) => {
  try {
    const { userEmail, type } = matchedData(req)
    const response = await emailService.send({ userEmail, type })
    if (response.error) throw new Error(response.error)

    res.status(201).json(response)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'UserController_sendEmail' })
  }
}

const changePassword = async (req, res) => {
  try {
    const { userId, token, newPassword } = matchedData(req)
    const response = await userServices.changePassword({
      newPassword,
      token,
      userId,
    })
    if (response.error) throw new Error(response.error)

    res.status(201).json(response)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'UserController_changePassword' })
  }
}

const verifyEmail = async (req, res) => {
  try {
    const { userId, token } = matchedData(req)
    console.log(userId, token)
    const response = await userServices.userVerification({
      token,
      userId,
    })
    if (response.error) throw new Error(response.error)

    res.status(201).json(response)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'UserController_verifyEmail' })
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  sendUser,
  sendEmail,
  changePassword,
  verifyEmail,
}
