const { User } = require('../models')
const { DEFAULT_PIC } = require('../config')
const generateToken = require('../config/generateToken')
const { compare } = require('bcryptjs')
const { encrypt } = require('../utils/handlePassword')
const loggers = require('../utils/handleLogger')

const create = async ({ name, email, password, pic }) => {
  const userExists = await findByEmail(email)
  if (userExists) return { error: 'UserService: User already exists' }

  const hashedPassword = await encrypt(password)
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    pic: pic || DEFAULT_PIC,
  })

  loggers.info('UserService: User has been registered')
  return {
    id: newUser._id,
    name,
    email,
    pic: newUser.pic,
    token: generateToken(newUser._id),
  }
}

const login = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if (!user) return { error: 'UserService_login: User does not exist' }

  const check = await compare(password, user.get('password'))

  if (user && check) {
    loggers.info('UserService_login: The user has logged in')
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    }
  }
  return { error: 'UserService_login: Invalid email or password' }
}

const findByEmail = async (email) => {
  const userExists = await User.findOne({ email })
  loggers.info('UserService_findByEmail: User search by email')
  return userExists
}


const filter = async ({ search }) => {
  const filter = {
    $or: [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ],
  }
  const users = await User.find(search ? filter : {})
    .select('-password')

  loggers.info('UserService_filter: User has been filtered by email or name')
  return users
}

const getOne = async (id) => {
  const user = await User.findOne({ _id: id })
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    pic: user.pic,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    token: generateToken(user._id),
  }
}

module.exports = { create, findByEmail, login, filter, getOne }
