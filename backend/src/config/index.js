require('dotenv').config()
module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  DEFAULT_PIC: process.env.DEFAULT_PIC,
  clientIDGoogleOAUTH2: process.env.clientIDGoogleOAUTH2,
  clientSecretGoogleOAUTH2: process.env.clientSecretGoogleOAUTH2,
  callbackURLOAUTH2: process.env.callbackURLOAUTH2,
  googleStrategyOptions: {
    clientID: process.env.clientIDGoogleOAUTH2,
    clientSecret: process.env.clientSecretGoogleOAUTH2,
    callbackURL: process.env.callbackURLOAUTH2,
  },
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  GMAIL_SECRET: process.env.GMAIL_SECRET
}
