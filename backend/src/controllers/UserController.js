const userServices = require('../services/UserService')
const emailService = require('../services/EmailService')
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')
const { decodedToken } = require('../middlewares/authMiddleware')
const { BASE_URL } = require('../config')

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
    const response = await userServices.userVerification({
      token,
      userId,
    })
    if (response.error) throw new Error(response.error)

    res.redirect(BASE_URL)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'UserController_verifyEmail' })
  }
}

const sendCookie = (req, res) => {
  if (req.user) {
    res.clearCookie('token')
    res.cookie('token', req.user.token)
    res.redirect(BASE_URL)
  } else {
    res.redirect(BASE_URL)
  }
}

const verifyTokenUrl = async (req, res) => {
  try {
    const token = req.params.token
    const decoded = decodedToken(token) // verifyToken
    if (decoded === 'invalid signature') throw new Error('Invalid token')
    if (decoded === 'invalid token') throw new Error('Invalid token')
    if (decoded === 'jwt must be provided') throw new Error('Missing token')
    const user = await userServices.getOne(decoded.id)
    res.send(user)
  } catch ({ message }) {
    handleHttpError({ res, message, from: 'VerifyToken_sendToken' })
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
  sendCookie,
  verifyTokenUrl,
}
