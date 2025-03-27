const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const data = await User.find({})
  response.status(200).json(data)
})

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (!password) { return response.status(400).json({ error: 'User validation failed: username: Path `password` is required.' })}
  if (password.length < 3) { return response.status(400).json({ error: 'User validation failed: password: Path `password` is shorter than the minimum allowed length (3)' })}
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const newUser = new User( { username: username, name: name, passwordHash: passwordHash })
  const data = await newUser.save()
  response.status(201).send(data)
})

module.exports = userRouter
