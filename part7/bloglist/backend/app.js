const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware.js')
const morgan = require('morgan')
morgan.token('body', (req) => JSON.stringify(req.body))

mongoose.set('strictQuery', false)
mongoose.set('debug', true)
const mongoUrl = config.DB_URL

mongoose.connect(mongoUrl)
  .then(() => {
    console.log(`Connected to MongoDB in ${process.env.NODE_ENV}`)
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })


app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(morgan(':body'))
app.use('/api/blogs', middleware.tokenExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}
app.get('/api/env', async (request, response) => {
  response.json({ env: process.env.NODE_ENV })
})
app.use(middleware.errorHandler)

module.exports = app