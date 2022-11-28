require('dotenv').config()

let MONGO_URI = process.env.MONGODB_URI
let BASE_URL = process.env.BASE_URL_PRODUCTION
let callbackURL = process.env.CALLBACK_URL_OAUTH2
let BASE_URL_FRONTEND = process.env.BASE_URL_FRONTEND_PRODUCTION

if (process.env.NODE_ENV === 'test') {
  MONGO_URI = process.env.TEST_MONGODB_URI
  BASE_URL = process.env.BASE_URL_DEV
  callbackURL = process.env.CALLBACK_URL_OAUTH2_DEV
}

if (process.env.NODE_ENV === 'development') {
  MONGO_URI = process.env.TEST_MONGODB_URI
  BASE_URL = process.env.BASE_URL_DEV
  callbackURL = process.env.CALLBACK_URL_OAUTH2_DEV
  BASE_URL_FRONTEND = process.env.BASE_URL_FRONTEND_DEV
}

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  DEFAULT_PIC: process.env.DEFAULT_PIC,
  googleStrategyOptions: {
    clientID: process.env.CLIENT_ID_GOOGLE_OAUTH2,
    clientSecret: process.env.CLIENT_SECRET_GOOGLE_OAUTH2,
    callbackURL,
  },
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  GMAIL_SECRET: process.env.GMAIL_SECRET,
  HOST_NODEMAILER: process.env.HOST_NODEMAILER,
  PORT_NODEMAILER: process.env.PORT_NODEMAILER,
  BASE_URL,
  BASE_URL_FRONTEND,
}
