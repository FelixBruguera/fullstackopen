const supertest = require('supertest')
const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const testBlogs = require('./blogList')
const helper = require('./helper')
const blog = require('../models/blog')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await blog.deleteMany({})
  for (const testBlog of testBlogs) {
    await new blog(testBlog).save()
  }
})

describe('with some blogs in the database', () => {

  test('responds with the correct status code and content-type', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns all blogs', async() => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('the response includes the correct unique identifier field', async() => {
    const response = await api.get('/api/blogs')
    const contents = response.body
    assert(contents.every(blog => Object.keys(blog).includes('id')))
  })

  describe('when the request has valid data', () => {
    test('it is saved to the database', async() => {
      const newBlog = { title: 'Test', author: 'Developer', url: 'test.com', likes: 0 }
      const response = await api.post('/api/blogs').send(newBlog)
      const blogsAfter = await helper.blogsInDb()
      assert.strictEqual(response.statusCode, 201)
      assert.strictEqual(blogsAfter.length, (helper.initialBlogs.length + 1))
    })

    test('it has the correct data', async() => {
      const newBlog = { title: 'Test', author: 'Developer', url: 'test.com', likes: 0 }
      const response = await api.post('/api/blogs').send(newBlog)
      const { id, ...responseBody } = response.body
      assert.deepStrictEqual(responseBody, newBlog)
    })

    test('it defaults to 0 when likes are missing', async () => {
      const newBlog = { title: 'Test without likes', author: 'Developer', url: 'test.com' }
      const response = await api.post('/api/blogs').send(newBlog)
      assert.strictEqual(response.body['likes'], 0)
    })

    test('it deletes an existing blog', async() => {
      const blogs = await helper.blogsInDb()
      const deletedBlog = blogs[1]
      const response = await api.delete('/api/blogs').send({ id: deletedBlog.id })
      const blogsAfter = await helper.blogsInDb()
      const titles = blogsAfter.map(blog => blog.title)
      assert.strictEqual(response.statusCode, 204)
      assert.strictEqual(blogsAfter.length, (helper.initialBlogs.length-1))
      assert(!titles.includes(deletedBlog.title))
    })

    test('it updates an existing blog', async() => {
      const blogs = await helper.blogsInDb()
      const editedBlog = { ...blogs[2], likes: 10000 }
      await api.put('/api/blogs').send(editedBlog)
      const blogsAfter = await helper.blogsInDb()
      const blogAfter = blogsAfter.find(blog => blog.id === editedBlog.id)
      assert.deepStrictEqual(blogAfter, editedBlog)
    })
  })

  describe('when the request has invalid data', () => {

    test('it returns 400 and doesnt save to the database when the title is missing', async () => {
      const newBlog = { author: 'Developer', likes: 100, url: 'test.com' }
      const response = await api.post('/api/blogs').send(newBlog)
      const blogsAfter = await helper.blogsInDb()
      assert.strictEqual(response.statusCode, 400)
      assert.strictEqual(blogsAfter.length, helper.initialBlogs.length)
    })

    test('it returns 400 and doesnt save to the database when the url is missing', async () => {
      const newBlog = { author: 'Developer', likes: 100, title: 'Test' }
      const response = await api.post('/api/blogs').send(newBlog)
      const blogsAfter = await helper.blogsInDb()
      assert.strictEqual(response.statusCode, 400)
      assert.strictEqual(blogsAfter.length, helper.initialBlogs.length)
    })

    test('it returns 400 when deleting a malformed id', async() => {
      const id = '12345'
      const response = await api.delete('/api/blogs').send({ id: id })
      const blogsAfter = await helper.blogsInDb()
      assert.strictEqual(response.statusCode, 400)
      assert.strictEqual(blogsAfter.length, helper.initialBlogs.length)
    })
  })
})

after(async() => await mongoose.connection.close())
