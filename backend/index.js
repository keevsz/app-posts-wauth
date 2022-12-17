const express = require('express')
const passport = require('passport')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('./src/config/database')()
const app = express()
const path = require('path')

const corsOptions = {
  //To allow requests from client
  origin: [BASE_URL, 'http://127.0.0.1', 'http://104.142.122.231'],
  credentials: true,
  exposedHeaders: ['set-cookie'],
}
app.use(cors(corsOptions))

const Strategy = require('./src/config/passportStrategies')
const { BASE_URL } = require('./src/config')
app.use(passport.initialize())
passport.use(Strategy.google)
app.use(express.json())

app.use(express.static(__dirname + '/dist'))
app.use('/login', express.static(path.join(__dirname, 'dist')))
app.use('/app', express.static(path.join(__dirname, 'dist')))
app.use('/', express.static(path.join(__dirname, 'dist')))

app.use(morgan('tiny'))
app.use(cookieParser())
// app.use(cache('2 minutes')) //*redis
app.use('/api', require('./src/routes/index.routes'))
app.use('/api/user', require('./src/routes/user.routes'))

const port = process.env.PORT || 5000
app.listen(port, console.log(`Server on: ${port}`))
