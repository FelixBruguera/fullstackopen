const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  const user = await User.findOne({ username: username })
  if ((user) && await bcrypt.compare(password, user.passwordHash)) {
    const userForToken = {
      username: user.username,
      id: user._id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    response.status(200).json({ token: token, username: user.username, name: user.name })
  }
  else {
    return response.status(401).send('Invalid username or password')
  }

})

module.exports = loginRouter