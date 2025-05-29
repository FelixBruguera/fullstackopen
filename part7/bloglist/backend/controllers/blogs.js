const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const data = await Blog.find({})
  response.json(data)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const data = await Blog.findById(id).populate('user', { name: 1, id: 1 }).populate('comments')
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
  const blogForResponse = blog.toJSON()
  blogForResponse.user = { name: user.name, id: user.id }
  response.status(201).json(blogForResponse)
})

blogsRouter.post('/:id/comments', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const contents = request.body
  const blogId = request.params.id
  const newComment = new Comment({
    content: contents.comment,
    blog: blogId })
  await newComment.save()
  const blog = await Blog.findById(blogId).populate('comments')
  const blogForResponse = blog.toJSON()
  blogForResponse.user = { name: user.name, id: user.id }
  response.status(201).json(blogForResponse)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const id = request.params.id
  const blog = await Blog.findById(id)
  if (blog.user.equals(user.id)) {
    await Blog.findByIdAndDelete(id)
    await Comment.deleteMany({ 'blog': id })
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
  blogForResponse.comments = updatedBlog.comments
  response.json(blogForResponse)
})

module.exports = blogsRouter
