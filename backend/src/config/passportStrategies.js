const GoogleStrategy = require('passport-google-oauth20').Strategy
const { googleStrategyOptions } = require('.')
const UserService = require('../services/UserService')
const { generatePassword } = require('../utils/handlePassword')
const generateToken = require('./generateToken')
const passport = require('passport')
const { uploadImage } = require('../services/CloudinaryService')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await UserService.getOne(id)
  done(null, user)
})

const google = new GoogleStrategy(googleStrategyOptions, async function (
  accessToken,
  refreshToken,
  profile,
  done
) {
  try {
    const { displayName, emails, photos } = profile
    const userExists = await UserService.findByEmail(emails[0].value)
    if (userExists) {
      if (!userExists.verified) {
        console.log('error: not verified') // LINK ACCOUNT WITH GOOGLE
        return done(
          'THIS EMAIL ACCOUNT HAS ALREADY BEEN REGISTERED, VERIFY YOUR EMAIL. IF YOU THINK ITS AN ERROR, CONTACT WITH US: keviiv1q2@gmail.com',
          null
        )
      }
      const user = {
        id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        pic: userExists.pic,
        token: generateToken(userExists._id),
      }
      return done(null, user)
    }

    const { url } = await uploadImage(photos[0].value)
    const newUser = await UserService.create({
      email: emails[0].value,
      name: displayName,
      pic: url,
      password: generatePassword(),
      verified: true,
    })
    return done(null, newUser)
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = { google }
