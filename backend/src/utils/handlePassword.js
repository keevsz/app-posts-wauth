const bcryptjs = require('bcryptjs')

const encrypt = async (passwordPlain) => {
  const hash = await bcryptjs.hash(passwordPlain, 10)
  return hash
}
const compare = async (passwordPlain, hashPassword) => {
  return await bcryptjs.compare(passwordPlain, hashPassword)
}

const generatePassword = () => {
  return Math.random().toString(36).slice(-8)
}

module.exports = { encrypt, compare, generatePassword }
