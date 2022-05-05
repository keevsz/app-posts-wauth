const generateToken = require("../config/generateToken")
const User = require("../models/User")
const { handleHttpError } = require("../utils/handleError")
const { encrypt, compare } = require("../utils/handlePassword")

const registerUser = async (req, res) => {
  try {
    let { name, email, password, pic } = req.body
    if (!name || !email || !password) throw new Error("Enter all the fields")

    const userExists = await User.findOne({ email })
    if (userExists) throw new Error("User already exists")

    if (pic === "") {
      pic =
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    }

    password = await encrypt(password)
    const user = await User.create({ name, email, password, pic })
    if (user) {
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      })
    } else {
      throw new Error("Failed to create the user")
    }
  } catch (error) {
    console.log(error.message)
    if (error.message === "User already exists") {
      return handleHttpError(res, error.message, 406)
    }
    handleHttpError(res, error.message)
  }
}

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      res.status(400)
      throw new Error("User does not exist")
    }

    const check = await compare(password, user.get("password"))
    if (user && check) {
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      })
    } else {
      throw new Error("Invalid email or password")
    }
  } catch (error) {
    console.log(error.message)
    if (error.message === "User does not exist") {
      handleHttpError(res, error.message, 404)
    }
    if (error.message === "Invalid email or password") {
      handleHttpError(res, error.message, 400)
    }
  }
}

const getUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {}
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } })
  res.send(users)
}

const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findOne({ _id: id })
    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token: generateToken(user._id),
    })
  } catch (error) {
    console.log(error.message)
    handleHttpError(res, error.message)
  }
}

module.exports = { registerUser, authUser, getUsers, getUser }
