const nodemailer = require('nodemailer')
const { GOOGLE_SECRET, GMAIL_SECRET } = require('.')

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: GMAIL_SECRET, // generated ethereal user
    pass: GOOGLE_SECRET, // generated ethereal password
  },
})

module.exports = { transporter }