const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const data = await Blog.find({}).populate('user', { name: 1, id: 1 })
  response.json(data)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const data = await Blog.findById(id).populate('user', { name: 1, id: 1 })
  response.json(data)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const contents = request.body
  const newBlog = new Blog({
    title: contents.title,
    author: contents.author,
    url: contents.url,
    likes: contents.likes || 0,
    user: user.id })
  const blog = await newBlog.save()
  user.blogs = user.blogs.concat(blog._id)
  await user.save()
  const blogForResponse = blog.toJSON()
  blogForResponse.user = { name: user.name, id: user.id }
  response.status(201).json(blogForResponse)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const id = request.params.id
  if (user.blogs.includes(id)) {
    await Blog.findByIdAndDelete(id)
    user.blogs = user.blogs.filter(blogId => blogId.toString() !== id)
    await user.save()
    response.status(204).send()
  }
  else {
    response.status(401).send()
  }
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  if (!user) { response.statusCode(401).end() }
  const id = request.params.id
  const updatedBlog = request.body
  updatedBlog.user = user.id
  const blog = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true })
  const blogForResponse = blog.toJSON()
  blogForResponse.user = { name: user.name, id: user.id }
  response.json(blogForResponse)
})

module.exports = blogsRouter
