const { Router } = require("express")

const { verifyToken } = require("../middlewares/authMiddleware")
const router = Router()

const {
  getPosts,
  createPost,
  deletePost,
  updatedPost,
  getPost,
  setLike,
  unsetLike,
} = require("../controllers/PostController")
const {
  validatorCreatePost,
  validatorGetPost,
} = require("../validators/postValidator")

router.get("/", verifyToken, getPosts)
router.post("/", verifyToken, validatorCreatePost, createPost)
router.get("/:id", verifyToken, validatorGetPost, getPost)
router.put(
  "/:id",
  verifyToken,
  validatorCreatePost,
  validatorGetPost,
  updatedPost
)
router.delete("/:id", verifyToken, validatorGetPost, deletePost)
router.post("/setlike", verifyToken, setLike)
router.post("/unsetlike", verifyToken, unsetLike)

module.exports = router
