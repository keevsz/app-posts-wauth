require('dotenv').config()

let MONGO_URI = process.env.MONGODB_URI
if (process.env.NODE_ENV === 'test') MONGO_URI = process.env.TEST_MONGODB_URI
if (process.env.NODE_ENV === 'development')
  MONGO_URI = process.env.TEST_MONGODB_URI

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
    callbackURL: process.env.CALLBACK_URL_OAUTH2,
  },
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  GMAIL_SECRET: process.env.GMAIL_SECRET,
}
