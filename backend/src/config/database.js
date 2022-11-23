const mongoose = require('mongoose')
const { MONGO_URI } = require('.')
const logger = require('../utils/handleLogger')

const connectdb = () => {
  try {
    mongoose.connect(MONGO_URI).then(() => logger.info('Mongo DB connected'))
  } catch (error) {
    logger.error(error.message)
  }
}

module.exports = connectdb
