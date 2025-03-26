const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const errorHandler = require('./utils/middleware.js')

mongoose.set('strictQuery', false)
const mongoUrl = config.DB_URL

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use(errorHandler)

module.exports = app