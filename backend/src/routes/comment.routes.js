const router = require('express').Router()
const CommentValidator = require('../validators/commentValidator')
const CommentController = require('../controllers/CommentController')

router.get('/',
  CommentValidator.validatorGetComments,
  CommentController.getComments
)

router.post(
  '/',
  CommentValidator.validatorCreateComment,
  CommentController.createComment
)

router.delete(
  '/:id',
  CommentValidator.validatorDeleteComment,
  CommentController.deleteComment
)

module.exports = router
