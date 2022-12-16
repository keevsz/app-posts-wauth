const express = require('express')
const passport = require('passport')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('./config/database')()
const app = express()
const path = require('path')
app.use(cors())

const Strategy = require('./config/passportStrategies')
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
app.use('/api', require('./routes/index.routes'))
app.use('/api/user', require('./routes/user.routes'))

const port = process.env.PORT || 5000
app.listen(port, console.log(`Server on: ${port}`))