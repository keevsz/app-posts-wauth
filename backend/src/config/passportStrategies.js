const GoogleStrategy = require('passport-google-oauth20').Strategy
const { googleStrategyOptions } = require('.')
const UserService = require('../services/UserService')
const { generatePassword } = require('../utils/handlePassword')
const generateToken = require('./generateToken')

const google = new GoogleStrategy(
  googleStrategyOptions,
  async (accessToken, refreshToken, profile, done) => {
    const { displayName, emails, photos } = profile

    const userExists = await UserService.findByEmail(emails[0].value)
    if (userExists) {
      const user = {
        id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        pic: userExists.pic,
        token: generateToken(userExists._id),
      }
      return done(null, user)
    }

    const newUser = await UserService.create({
      email: emails[0].value,
      name: displayName,
      pic: photos[0].value,
      password: generatePassword(),
    })
    return done(null, newUser)
  }
)

module.exports = { google }
