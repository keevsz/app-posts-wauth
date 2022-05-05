const express = require("express")
const { PORT } = require("./config")
const connectdb = require("./config/db")
const { notFound, errorHandler } = require("./middlewares/errorMiddleware")
const fileUpload = require("express-fileupload")
const app = express()
const path = require("path")
require("colors")
require("dotenv").config()

console.log("...........................................................")

app.use(express.json())

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
)

app.use("/api/chat", require("./routes/chat.routes"))
app.use("/api/user", require("./routes/user.routes"))
app.use("/api/message", require("./routes/message.routes"))
app.use("/api/post", require("./routes/post.routes"))
app.use("/api/comment", require("./routes/comment.routes"))

const __dirname1 = path.resolve()
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  })
} else {
  app.get("/", (req, res) => {
    res.send("API is Running Successfully")
  })
}

app.use(notFound)
app.use(errorHandler)

const server = app.listen(
  PORT,
  console.log(`Server on: `.blue, PORT.yellow.bold)
)

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    creadentials: true,
  },
})

io.on("connection", (socket) => {
  console.log("Connected to socket.io")

  socket.on("setup", (userData) => {
    socket.join(userData.id)
    socket.emit("connected")
  })

  socket.on("join chat", (room) => {
    socket.join(room)
    console.log("User Joined Room: " + room)
  })

  socket.on("typing", (room) => socket.in(room).emit("typing"))

  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"))

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat
    if (!chat.users) return console.log("chat.users not defined")

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return
      socket.in(user._id).emit("message recieved", newMessageRecieved)
    })
  })

  socket.off("setup", () => {
    {
      console.log("User disconnected")
      socket.leave(userData._id)
    }
  })
})

connectdb()
