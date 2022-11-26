const router = require('express').Router()
const AuthValidator = require('../validators/authValidator')
const UserController = require('../controllers/UserController')
const { verifyToken, decodedToken } = require('../middlewares/authMiddleware')
const passport = require('passport')
const userService = require('../services/UserService')

router.get(
  '/login/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  })
)

router.get(
  '/login/google/callback',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
    session: false,
  }),
  (req, res) => {
    if (req.user) {
      res.cookie('token', req.user.token)
      res.redirect('http://localhost:5173/login/success')
    } else {
      res.redirect('http://localhost:3000/login')
    }
  }
)

router.get('/verify-token/:token', async (req, res) => {
  const token = req.params.token
  const decoded = decodedToken(token) // verifyToken
  const user = await userService.getOne(decoded.id)
  res.send(user)
})

router.post(
  '/password-reset',
  AuthValidator.validtorSendEmail,
  UserController.sendEmail
)

router.post(
  '/password-reset/:userId/:token',
  AuthValidator.validatorChangePasswordWithToken,
  UserController.changePassword
)

router.post(
  '/email-verify',
  AuthValidator.validtorSendEmail,
  UserController.sendEmail
)

router.get(
  '/email-verify/:userId/:token',
  AuthValidator.validatorVerifyEmail,
  UserController.verifyEmail
)

router.post(
  '/register',
  AuthValidator.validatorRegister,
  UserController.registerUser
)

router.post('/login', AuthValidator.validatorLogin, UserController.loginUser)

router.get(
  '/',
  verifyToken,
  AuthValidator.validatorGetUsers,
  UserController.getUsers
)

router.get(
  '/:id',
  verifyToken,
  AuthValidator.validatorGetUser,
  UserController.getUser
)

module.exports = router
