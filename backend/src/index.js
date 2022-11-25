const express = require('express')
const passport = require('passport')
const morgan = require('morgan')
// const apicache = require('apicache')
const app = express()
require('./config/database')()
// const cache = apicache.middleware
const Strategy = require('./config/passportStrategies')

passport.use(Strategy.google)
app.use(express.json())
app.use(morgan('tiny'))
// app.use(cache('2 minutes')) //*redis

app.use('/api', require('./routes/index.routes'))
app.use('/api/user', require('./routes/user.routes'))

const port = process.env.PORT || 5000
const server = app.listen(port, console.log(`Server on: ${port}`))

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000', //frontend...
    creadentials: true,
  },
})

io.on('connection', (socket) => {
  console.log('Connected to socket.io')

  socket.on('setup', (userData) => {
    socket.join(userData.id)
    socket.emit('connected')
  })

  socket.on('join chat', (room) => {
    socket.join(room)
    console.log('User Joined Room: ' + room)
  })

  socket.on('typing', (room) => socket.in(room).emit('typing'))

  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'))

  socket.on('new message', (newMessageRecieved) => {
    var chat = newMessageRecieved.chat
    if (!chat.users) return console.log('chat.users not defined')

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return
      socket.in(user._id).emit('message recieved', newMessageRecieved)
    })
  })

  socket.off('setup', (userData) => {
    {
      console.log('User disconnected')
      socket.leave(userData._id)
    }
  })
})
