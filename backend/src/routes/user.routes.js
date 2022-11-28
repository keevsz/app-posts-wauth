const router = require('express').Router()
const AuthValidator = require('../validators/authValidator')
const UserController = require('../controllers/UserController')
const { verifyToken } = require('../middlewares/authMiddleware')
const passport = require('passport')

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
  UserController.sendCookie
)

router.get('/verify-token/:token', UserController.verifyTokenUrl)

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
