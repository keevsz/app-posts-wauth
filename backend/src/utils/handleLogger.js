const info = (...params) => {
  console.log('Info: ', ...params)
}

const error = (...params) => {
  console.error('Error: ', ...params)
}

module.exports = {
  info,
  error,
}
