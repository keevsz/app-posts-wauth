const express = require('express')
const passport = require('passport')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('./src/config/database')()
const app = express()

app.use(cors())

const Strategy = require('./src/config/passportStrategies')
app.use(passport.initialize())
passport.use(Strategy.google)
app.use(express.json())
console.log(__dirname+'\\dist')
app.use('/login', express.static(__dirname+'\\dist'))
app.use('/app', express.static(__dirname+'\\dist'))
app.use('/', express.static(__dirname+'\\dist'))

app.use(morgan('tiny'))
app.use(cookieParser())
// app.use(cache('2 minutes')) //*redis
app.use('/api', require('./src/routes/index.routes'))
app.use('/api/user', require('./src/routes/user.routes'))

const port = process.env.PORT || 5000
app.listen(port, console.log(`Server on: ${port}`))
