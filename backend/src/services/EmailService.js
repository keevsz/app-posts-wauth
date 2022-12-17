const { transporter } = require('../config/nodemailer')
const userService = require('./UserService')
const loggers = require('../utils/handleLogger')
const reset_password = require('../models/Reset_password')
const { generatePassword } = require('../utils/handlePassword')
const user_verification = require('../models/User_verification')
const { BASE_URL } = require('../config') | ''

const getEmailHtml = ({ userId, token, type }) => {
  if (type === 'password-reset') {
    const html = `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Cambio de contraseña</title>
        <style>
            body {
                text-align: center;
            }
            a {
              text-decoration: none;
              background-color: #9ACD32;
              color: white;
              padding: 15px 32px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 16px;
              margin: 4px 2px;
              cursor: pointer;
          }
        </style>
    </head>
    <body>
        <h1>Cambio de contraseña</h1>
        <p>Click en el botón de abajo para cambiar su contraseña:</p>
        <a href='${BASE_URL}/changepassword/${userId}/${token}'>Cambiar contraseña</a>
        <footer>
            <p>Si usted no ha solicitado un cambio de contraseña, ignore este correo.</p>
        </footer>
    </body>
    </html>`
    return html
  }

  const html = `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <title>Verificación de correo electrónico</title>
      <style>
    body {
        text-align: center;
        background-color: #444;
        color: white;
    }
    a {
        text-decoration: none;
        background-color: #9ACD32;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
    }
</style>
  </head>
  <body>
      <h1>Verificación de correo electrónico</h1>
      <p>Click en el botón de abajo para verificar su correo electrónico:</p>
      <a href='${BASE_URL}/api/user/${type}/${userId}/${token}'>Verificar</a>
      <footer>
          <p>Si usted no ha solicitado ninguna petición, ignore este correo.</p>
      </footer>
  </body>
  </html>
  `
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
      from: 'keviiv1q2@gmail.com',
      to: userEmail,
      subject: 'Kevsz App',
      text: 'Reset password',
      html: getEmailHtml({ userId: userExists._id, token: token.token, type }),
    })
    loggers.info('EmailService_send: Email sended to recovery password')
    return `Email sended to ${userEmail}`
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
      from: 'keviiv1q2@gmail.com',
      to: userEmail,
      subject: 'Kevsz App',
      text: 'Verify your email',
      html: getEmailHtml({ userId: userExists._id, token: token.token, type }),
    })
    loggers.info('EmailService_send: Email sended to verify email')
    return `Email sended to ${userEmail}`
  }
  return { error: 'EmailService: Invalid type' }
}

module.exports = { send }
