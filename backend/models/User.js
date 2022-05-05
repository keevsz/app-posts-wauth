const mongoose = require("mongoose")

//Pais - cumpleaños - estado civil - redes sociales - De donde es - foto portada - friends [userids]
const userSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema)
module.exports = User
