const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")
const User = require("../models/User")

const verifyToken = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, JWT_SECRET)
      req.user = await User.findById(decoded.id).select("-password")

      next()
    } catch (error) {
      return res.status(401)
    }
  } else {
    res.send("Missing token")
  }
}

module.exports = { verifyToken }
