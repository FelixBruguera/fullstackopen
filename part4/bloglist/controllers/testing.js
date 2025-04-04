const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  console.log(await Blog.find({}))
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router