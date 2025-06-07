const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const blogDetails = require('../models/views/blogDetails')

blogsRouter.get('/', async (request, response) => {
  const data = await Blog.find({})
  if (data) {
    response.json(data)
  }
  else {
    return response.status(404).send()
  }
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await blogDetails.findById(id)
  if (blog) {
    response.json(blog.toJSON())
  }
  else {
    response.status(404).send()
  }
})

blogsRouter.post('/', async (request, response) => {
  const user = request.token
  const contents = request.body
  const newBlog = new Blog({
    title: contents.title,
    author: contents.author,
    url: contents.url,
    likes: contents.likes || 0,
    user: user.id })
  const blog = await newBlog.save()
  const blogForResponse = blog.toJSON()
  delete blogForResponse.user
  blogForResponse.userInfo = { name: user.name, id: user.id }
  return response.status(201).json(blogForResponse)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const contents = request.body
  const blogId = request.params.id
  if (await Blog.findById(blogId)) {
    const newComment = new Comment({
      content: contents.comment,
      blog: blogId })
    const comment = await newComment.save()
    if (comment) {
      response.status(201).json(comment)
    }
    else {
      response.status(400).send()
    }
  }
  else {
    response.status(404).send()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.token
  const id = request.params.id
  const dbResponse = await Blog.findOneAndDelete({ _id: id, user: user.id })
  if (dbResponse) {
    await Comment.deleteMany({ 'blog': id })
    response.status(204).send()
  }
  else {
    response.status(401).send()
  }
})

blogsRouter.patch('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    { new: true }
  )
  if (blog) {
    response.send({ likes: blog.likes })
  }
  else {
    response.status(400).send()
  }
})

module.exports = blogsRouter
