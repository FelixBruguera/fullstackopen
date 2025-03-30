const jwt = require('jsonwebtoken')
const User = require('../models/user')

const errorHandler = (error, request, response, next) => {
  console.log(error.name)

  if (error.name === 'CastError') {
    return response.status(400).send('Malformed ID')
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).send(error.message)
  }
  else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }
  else if (error.name === 'JsonWebTokenError') {
    return response.status(401).send(error.message)
  }

  next(error)
}

const getToken = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

const tokenExtractor = async (request, response, next) => {
  const token = getToken(request)
  if (token) {
    request.token = token
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  request.user = await User.findById(decodedToken.id)
  next()
}

module.exports = { errorHandler, tokenExtractor, userExtractor }