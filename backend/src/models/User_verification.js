const mongoose = require('mongoose')

const user_verificationSchema = mongoose.Schema({
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
})

const user_verification = mongoose.model(
  'user_verification',
  user_verificationSchema
)
module.exports = user_verification
