const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const data = await Blog.find({})
  response.json(data)
})

blogsRouter.post('/', async (request, response) => {
  const contents = request.body
  const newBlog = new Blog({
    title: contents.title,
    author: contents.author,
    url: contents.url,
    likes: contents.likes || 0 })

  const data = await newBlog.save()
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
