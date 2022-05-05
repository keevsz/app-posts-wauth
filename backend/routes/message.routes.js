const { Router } = require("express")
const { sendMessage, allMessages } = require("../controllers/MessageController")

const { verifyToken } = require("../middlewares/authMiddleware")
const { validatorSendMessage } = require("../validators/messageValidator")
const router = Router()

router.post("/", verifyToken, validatorSendMessage, sendMessage)
router.get("/:chatId", verifyToken, allMessages)

module.exports = router
