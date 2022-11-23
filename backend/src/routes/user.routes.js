const router = require('express').Router()
const AuthValidator = require('../validators/authValidator')
const UserController = require('../controllers/UserController')
const { verifyToken } = require('../middlewares/authMiddleware')
const passport = require('passport')

router.get('/login/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'] }))

router.get('/login/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login', session: false
  }),
  (req, res) => {
    const user = req.user
    res.status(201).json(user)
  })

router.post('/recoverypassword', AuthValidator.validatorRecoveryPassword, UserController.sendEmail)


router.post(
  '/register',
  AuthValidator.validatorRegister,
  UserController.registerUser
)

router.post('/login',
  AuthValidator.validatorLogin,
  UserController.loginUser
)


router.get('/',
  verifyToken,
  AuthValidator.validatorGetUsers,
  UserController.getUsers
)

router.get('/:id',
  verifyToken,
  AuthValidator.validatorGetUser,
  UserController.getUser
)

module.exports = router
