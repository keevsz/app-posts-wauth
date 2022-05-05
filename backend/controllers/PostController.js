const jwt = require("jsonwebtoken")
const fs = require("fs-extra")
const Post = require("../models/Post")
const { JWT_SECRET } = require("../config")
const { uploadImage, deleteImage } = require("../libs/cloudinary")
const { handleHttpError } = require("../utils/handleError")
const { matchedData } = require("express-validator")

const createPost = async (req, res) => {
  try {
    const img = req.files ? req.files.image : undefined
    req = matchedData(req)

    let image
    if (img) {
      const results = await uploadImage(img.tempFilePath)
      await fs.remove(img.tempFilePath)

      image = {
        url: results.secure_url,
        public_id: results.public_id,
      }
    }

    const post = await Post.create({
      user: req.user,
      title: req.title,
      description: req.description,
      image: image,
    })

    const fullPost = await Post.find({ _id: post._id }).populate(
      "user",
      "name pic email"
    )

    return res.json(fullPost)
  } catch (error) {
    console.log(error.message)
    handleHttpError(res, error.message, 500)
  }
}

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name pic email")
      .sort({ createdAt: -1 })

    if (posts.length === 0) throw new Error("No results found")

    return res.send(posts)
  } catch (error) {
    console.log(error.message)
    handleHttpError(res, error.message, 500)
  }
}

const getPost = async (req, res) => {
  try {
    req = matchedData(req)
    const { id } = req

    const post = await Post.findById(id)
    if (!post) throw new Error("Post not found")

    return res.send(post)
  } catch (error) {
    console.log(error.message)
    handleHttpError(res, error.message, 404)
  }
}

const updatedPost = async (req, res) => {
  try {
    req = matchedData(req)
    const { id, ...body } = matchedData(req)

    const post = await Post.findByIdAndUpdate(id, body, {
      new: true,
    })

    if (!post) throw new Error("Not found")

    return res.json(post)
  } catch (error) {
    console.log(error.message)
    handleHttpError(res, error.message, 404)
  }
}

const deletePost = async (req, res) => {
  try {
    req = matchedData(req)

    const post = await Post.findByIdAndDelete(req.id)
    if (!post) throw new Error("Not found")

    if (post.image.public_id) await deleteImage(post.image.public_id)

    return res.sendStatus(204)
  } catch (error) {
    console.log(error.message)
    handleHttpError(res, error.message, 404)
  }
}

const setLike = async (req, res) => {
  try {
    const { userId, postId } = req.body

    const isLiked = await Post.findOne({ likes: userId, _id: postId })
    if (isLiked) throw new Error("Already liked")

    const added = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: userId },
      },
      {
        new: true,
      }
    ).populate("likes", "-password")

    if (!added) throw new Error("Post not found")

    res.json(added)
  } catch (error) {
    console.log(error.message)
    handleHttpError(res, error.message, 400)
  }
}

const unsetLike = async (req, res) => {
  try {
    const { userId, postId } = req.body

    const removed = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: userId },
      },
      {
        new: true,
      }
    ).populate("likes", "-password")

    if (!removed) throw new Error("Post not found")

    res.json(removed)
  } catch (error) {
    console.log(error.message)
    handleHttpError(res, error.message, 400)
  }
}

module.exports = {
  createPost,
  getPost,
  deletePost,
  updatedPost,
  getPosts,
  setLike,
  unsetLike,
}
