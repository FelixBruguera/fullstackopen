const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const initialBlogs = require('./blogList')

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const commentsInDb = async () => {
  return await Comment.find({})
}

const invalidId = async () => {
  const createdBlog = new Blog({ title: 'Test', url: 'test.com' })
  const response = await createdBlog.save()
  const id = response.body.id
  await Blog.findByIdAndDelete(id)
  return id
}

module.exports = { blogsInDb, initialBlogs, invalidId, usersInDb, commentsInDb }
