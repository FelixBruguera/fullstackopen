const errorHandler = (error, request, response, next) => {
  console.log(error.name)

  if (error.name === 'CastError') {
    return response.status(400).send('Malformed ID')
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send(error.message)
  }

  next(error)
}

module.exports = errorHandler