const logger = require('../utils/handleLogger')
const handleHttpError = ({ res, message = 'Algo sucedió', code = 403, from = 'somewhere' }) => {
  logger.error(`${message} - ${from}`)
  res.status(code)
  res.send({ error: message })
}

module.exports = { handleHttpError }
