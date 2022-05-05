const { v2: cloudinary } = require("cloudinary")
const { API_KEY, API_SECRET, CLOUD_NAME } = require("../config")

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
})

const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "postsImages",
  })
}

const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id)
}
module.exports = { uploadImage, deleteImage }
