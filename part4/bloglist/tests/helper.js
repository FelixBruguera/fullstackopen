const Blog = require('../models/blog')
const initialBlogs = require('./blogList')

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const invalidId = async () => {
  const createdBlog = new Blog({ title: 'Test', url: 'test.com' })
  const response = await createdBlog.save()
  const id = response.body.id
  await Blog.findByIdAndDelete(id)
  return id
}

module.exports = { blogsInDb, initialBlogs, invalidId }
