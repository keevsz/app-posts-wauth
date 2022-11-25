const nodemailer = require('nodemailer')
const { GOOGLE_SECRET, GMAIL_SECRET } = require('.')

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: GMAIL_SECRET,
    pass: GOOGLE_SECRET,
  },
})

module.exports = { transporter }
