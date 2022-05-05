const Message = require("../models/Message")
const User = require("../models/User")
const Chat = require("../models/Chat")
const res = require("express/lib/response")

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body
  if (!content || !chatId) {
    console.log("Datos invalidos")
    return res.sendStatus(400)
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  }
  try {
    var message = await Message.create(newMessage)
    message = await message.populate("sender", "name pic")
    message = await message.populate("chat")
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    })
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message,
    })
    res.json(message)
  } catch (error) {
    console.log(error.message)
    handleHttpError(res, error.message, 400)
  }
}

const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat")
    res.json(messages)
  } catch (error) {
    console.log(error.message)
    handleHttpError(res, error.message, 400)
  }
}

module.exports = { sendMessage, allMessages }
