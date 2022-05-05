const { Router } = require("express")
const {
  accessChat,
  fetchChats,
  renameGroup,
  createGroup,
  removeFromGroup,
  addToGroup,
} = require("../controllers/ChatController")
const { verifyToken } = require("../middlewares/authMiddleware")
const { validatorAccessChat } = require("../validators/chatValidator")
const router = Router()

router.post("/", verifyToken, validatorAccessChat, accessChat)
router.get("/", verifyToken, fetchChats)

router.post("/group", verifyToken, createGroup)
router.put("/rename", verifyToken, renameGroup)
router.put("/groupadd", verifyToken, addToGroup)
router.put("/groupremove", verifyToken, removeFromGroup)

module.exports = router
