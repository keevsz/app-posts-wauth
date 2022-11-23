const mongoose = require('mongoose')

const reset_passwordSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600,
    },
  }
)

const reset_password = mongoose.model('reset_password', reset_passwordSchema)
module.exports = reset_password
