const { Router } = require("express")
const {
  registerUser,
  authUser,
  getUsers,
  getUser,
} = require("../controllers/UserController")
const { verifyToken } = require("../middlewares/authMiddleware")
const router = Router()

router.post("/register", registerUser)
router.post("/login", authUser)
router.get("/", verifyToken, getUsers)
router.get("/:id", verifyToken, getUser)

module.exports = router
