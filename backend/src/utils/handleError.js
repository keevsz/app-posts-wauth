const logger = require('../utils/handleLogger')
const handleHttpError = ({
  res,
  message = 'Error...',
  code = 403,
  from = 'somewhere',
}) => {
  const getOnlyMessage = message.split(': ')[1]
  logger.error(`${message} - ${from}`)
  res.status(code)
  res.send(getOnlyMessage )
}

module.exports = { handleHttpError }
