const nodemailer = require('nodemailer')
const {
  GOOGLE_SECRET,
  GMAIL_SECRET,
  HOST_NODEMAILER,
  PORT_NODEMAILER,
} = require('.')

let transporter = nodemailer.createTransport({
  host: HOST_NODEMAILER,
  port: PORT_NODEMAILER,
  secure: true,
  auth: {
    user: GMAIL_SECRET,
    pass: GOOGLE_SECRET,
  },
})

module.exports = { transporter }
