const router = require('express').Router()
const PostValidator = require('../validators/postValidator')
const PostController = require('../controllers/PostController')

router.get('/',
  PostValidator.validatorGetPosts,
  PostController.getPosts
)

router.post('/',
  PostValidator.validatorCreatePost,
  PostController.createPost
)

router.get('/:id',
  PostValidator.validatorGetPost,
  PostController.getPost
)

router.put(
  '/:id',
  PostValidator.validatorCreatePost,
  PostValidator.validatorGetPost,
  PostController.updatedPost
)

router.delete(
  '/:id',
  PostValidator.validatorDeletePost,
  PostController.deletePost
)

router.post('/like',
  PostValidator.validatorLikePost,
  PostController.likePost
)

module.exports = router
