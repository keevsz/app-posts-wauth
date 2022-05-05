const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")
const Comment = require("../models/Comment")

const createComment = async (req, res) => {
  try {
    const { user, description, post } = req.body

    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, JWT_SECRET)

    if (decoded.id !== user) {
      throw new Error("Usuario invalido")
    }

    const comment = await Comment.create({ user, description, post })

    const fullComment = await Comment.find({ _id: comment._id }).populate(
      "user",
      "name pic email"
    )

    return res.json(fullComment)
  } catch (error) {
    console.log(error.message)
    handleHttpError(res, error.message, 500)
  }
}

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate("user", "name pic email")

    if (comments.length === 0) throw new Error("No se encontraron comentarios")

    return res.send(comments)
  } catch (error) {
    console.log(error.message)
    handleHttpError(res, error.message, 500)
  }
}

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id)
    if (!comment) return res.sendStatus(404)

    return res.sendStatus(204)
  } catch (error) {
    console.log(error.message)
    handleHttpError(res, error.message, 500)
  }
}

module.exports = { createComment, getComments, deleteComment }
