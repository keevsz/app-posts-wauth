const { transporter } = require('../config/nodemailer')
const userService = require('./UserService')
const loggers = require('../utils/handleLogger')

const send = async ({ userEmail, type }) => {
  console.log(userEmail, type)
  if (type === 'recovery_password') {
    const userExists = await userService.findByEmail(userEmail)
    if (!userExists) return { error: 'EmailService: User does not exist' }
    await transporter.sendMail({
      from: '"kevsz" <keviv1q2@gmail.com>',
      to: userEmail,
      subject: 'Hello ✔',
      text: 'Hello world?',
      html: '<b>Hello world?</b>',
    })
    loggers.info('EmailService_send: Email sended to recovery password')
  }
  return 'Email sended'
}

module.exports = { send }