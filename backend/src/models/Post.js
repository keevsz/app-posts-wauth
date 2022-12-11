// post = userid- titulo - description - pic - updated
//        created - likes:[usersid] - comments:[{comment}]

const mongoose = require('mongoose')

const postSchemma = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, trim: true },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchemma)
module.exports = Post
