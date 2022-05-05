const { matchedData } = require("express-validator")
const Chat = require("../models/Chat")
const User = require("../models/User")

const accessChat = async (req, res) => {
  const _id = req.user._id
  req = matchedData(req)

  if (!req.userId) throw new Error("UserId param not sent with request")

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: _id } } }, //usuarios: req.user and friend
      { users: { $elemMatch: { $eq: req.userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage")

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  })

  if (isChat.length > 0) {
    res.send(isChat[0])
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [_id, req.userId],
    }

    try {
      const createdChat = await Chat.create(chatData)
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      )

      res.status(200).send(FullChat)
    } catch (error) {
      console.log(error.message)
      handleHttpError(res, error.message, 400)
    }
  }
}

const fetchChats = async (req, res) => {
  const id = req.user._id
  try {
    Chat.find({ users: id }) // busca chats
      .populate("users", "-password") // populate con los datos del user
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 }) // ordena por actualizacion de chat
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        })
        res.status(200).send(results)
      })
  } catch (error) {
    console.log(error.message)
    handleHttpError(res, error.message, 400)
  }
}

const createGroup = async (req, res) => {
  if (!req.body.users || !req.body.name) throw new Error("Not params")

  let users = JSON.parse(req.body.users)
  if (users.length < 2) throw new Error("Invalid numbers of users")

  users.push(req.user)

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    })

    const fullGroupChat = await Chat.find({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")

    res.status(200).json(fullGroupChat)
  } catch (error) {
    console.log(error.message)
    handleHttpError(res, error.message, 400)
  }
}

const renameGroup = async (req, res) => {
  try {
    const { chatId, chatName } = req.body
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password")

    if (!updatedChat) throw new Error("Chat not found")

    res.json(updatedChat)
  } catch (error) {
    console.log(error.message)
    handleHttpError(res, error.message, 400)
  }
}

const addToGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body

    const isUserInChat = await Chat.findOne({
      users: userId,
      _id: chatId,
    })

    if (isUserInChat) throw new Error("Users already in chat")

    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password")

    if (!added) throw new Error("Chat not found")

    res.json(added)
  } catch (error) {
    console.log(error.message)
    handleHttpError(res, error.message, 400)
  }
}

const removeFromGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password")

    if (!removed) throw new Error("Chat not found")

    res.json(removed)
  } catch (error) {
    console.log(error.message)
    handleHttpError(res, error.message, 400)
  }
}

module.exports = {
  accessChat,
  fetchChats,
  renameGroup,
  createGroup,
  removeFromGroup,
  addToGroup,
}
