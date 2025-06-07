const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const userList = require('../models/views/userLists')
const middleware = require('../utils/middleware')
const userDetails = require('../models/views/userDetails')

userRouter.get('/', middleware.tokenExtractor, async (request, response) => {
  try {
    const data = await userList.find({})
    response.status(200).json(data)
  }
  catch {
    response.status(500).send()
  }
})

userRouter.get('/:id', middleware.tokenExtractor, async (request, response) => {
  try {
    const id = request.params.id
    const data = await userDetails.findById(id)
    if (data) {
      response.status(200).json(data)
    }
    else {
      response.status(404).send()
    }
  }
  catch {
    response.status(500).send()
  }
})

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (!password) { return response.status(400).json('User validation failed: username: Path `password` is required.' )}
  if (password.length < 3) { return response.status(400).json('User validation failed: password: Path `password` is shorter than the minimum allowed length (3)' )}
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const newUser = new User( { username: username, name: name, passwordHash: passwordHash })
  await newUser.save()
  response.status(201).send()
})

module.exports = userRouter
