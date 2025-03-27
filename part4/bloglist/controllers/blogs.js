const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const data = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(data)
})

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)
  const contents = request.body
  const newBlog = new Blog({
    title: contents.title,
    author: contents.author,
    url: contents.url,
    likes: contents.likes || 0,
    user: user.id })
  const data = await newBlog.save()
  user.blogs = user.blogs.concat(data._id)
  await user.save()
  response.status(201).json(data)
})

blogsRouter.delete('/', async (request, response) => {
  const id = request.body.id
  await Blog.findByIdAndDelete(id)
  response.status(204).send()
})

blogsRouter.put('/', async (request, response) => {
  const { title, url, author, likes, id } = request.body
  const data = await Blog.findByIdAndUpdate(id, { title: title, url: url, author: author, likes: likes }, { new: true })
  response.json(data)
})

module.exports = blogsRouter
