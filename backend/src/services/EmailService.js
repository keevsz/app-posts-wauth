const { transporter } = require('../config/nodemailer')
const userService = require('./UserService')
const loggers = require('../utils/handleLogger')
const reset_password = require('../models/Reset_password')
const { generatePassword } = require('../utils/handlePassword')
const user_verification = require('../models/User_verification')
const { BASE_URL } = require('../config')

const getEmailHtml = ({ userId, token, type }) => {
  //reset password -> redirect to frontend page https://frontend.com/reset-password/2312313123123213/123123
  const stringType =
    type === 'password-reset' ? 'reset your password' : 'verify your email'
  const html = `<div> Click <a href='${BASE_URL}/api/user/${type}/${userId}/${token}'>here</a> to ${stringType}</div>`
  return html
}

const send = async ({ userEmail, type }) => {
  const userExists = await userService.findByEmail(userEmail)
  if (!userExists) return { error: 'EmailService: User does not exist' }

  if (type === 'password-reset') {
    let token = await reset_password.findOne({ userId: userExists._id })
    if (!token) {
      token = await reset_password.create({
        userId: userExists,
        token: generatePassword(),
      })
    }
    await transporter.sendMail({
      from: 'keviv1q2@gmail.com',
      to: userEmail,
      subject: 'Hello ✔',
      text: 'Reset password',
      html: getEmailHtml({ userId: userExists._id, token: token.token, type }),
    })
    loggers.info('EmailService_send: Email sended to recovery password')
    return `Email type ${type}, sended to ${userEmail}`
  }

  if (type === 'email-verify') {
    if (userExists.verified)
      return { error: 'EmailService: User already verified' }

    let token = await user_verification.findOne({ userId: userExists._id })
    if (!token) {
      token = await user_verification.create({
        userId: userExists,
        token: generatePassword(),
      })
    }
    await transporter.sendMail({
      from: 'keviv1q2@gmail.com',
      to: userEmail,
      subject: 'Hello ✔',
      text: 'Verify your email',
      html: getEmailHtml({ userId: userExists._id, token: token.token, type }),
    })
    loggers.info('EmailService_send: Email sended to verify email')
    return `Email type ${type}, sended to ${userEmail}`
  }
  return { error: 'EmailService: Invalid type' }
}

module.exports = { send }
