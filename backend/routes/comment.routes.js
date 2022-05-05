const { Router } = require("express")
const {
  getComments,
  createComment,
  deleteComment,
} = require("../controllers/CommentController")

const { verifyToken } = require("../middlewares/authMiddleware")
const { validatorDeleteComment } = require("../validators/commentValidator")
const router = Router()

router.get("/", verifyToken, getComments)
router.post("/", verifyToken, createComment)
router.delete("/:id", verifyToken, validatorDeleteComment, deleteComment)

module.exports = router
