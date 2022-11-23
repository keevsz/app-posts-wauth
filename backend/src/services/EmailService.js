const { transporter } = require('../config/nodemailer')
const userService = require('./UserService')
const loggers = require('../utils/handleLogger')
const reset_password = require('../models/Reset_password')
const { generatePassword } = require('../utils/handlePassword')

const getEmailHtml = ({ userId, token }) => {
  const html = `<div> Click <a href='http://localhost:5000/changepassword/${userId}/${token}'>here</a> to reset password </div>`
  return html
}

const send = async ({ userEmail, type }) => {
  if (type === 'recovery_password') {
    const userExists = await userService.findByEmail(userEmail)
    if (!userExists) return { error: 'EmailService: User does not exist' }

    let token = await reset_password.findOne({ userId: userExists._id })
    if (!token) {
      token = await reset_password.create({ userId: userExists, token: generatePassword() })
    }
    await transporter.sendMail({
      from: '"kevsz" <keviv1q2@gmail.com>',
      to: userEmail,
      subject: 'Hello ✔',
      text: 'Reset password',
      html: getEmailHtml({ userId: userExists._id, token: token.token }),
    })
    loggers.info('EmailService_send: Email sended to recovery password')
    return `Email type ${type}, sended to ${userEmail}`
  }
  return { error: 'EmailService: Invalid type' }
}

module.exports = { send }