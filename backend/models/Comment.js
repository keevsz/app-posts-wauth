// comment: user id - description - likes:[{users}]
const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    description: { type: String, required: true, trim: true },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
)

const Comment = mongoose.model("Comment", commentSchema)
module.exports = Comment
