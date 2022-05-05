const mongoose = require("mongoose")
const { MONGO_URI } = require("../config")

const connectdb = async () => {
  try {
    console.log("Trying to connect to MongoDB...".blue)
    const con = await mongoose.connect(MONGO_URI)
    console.log(`Connected`.blue + ` ${con.connection.host}`.yellow.bold)
  } catch (error) {
    console.log(`${error.message}`.red.bold)
    process.exit()
  }
}

module.exports = connectdb
