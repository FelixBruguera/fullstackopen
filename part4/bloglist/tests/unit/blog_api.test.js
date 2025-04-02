const supertest = require('supertest')
const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const testBlogs = require('../blogList')
const helper = require('../helper')
const blog = require('../../models/blog')
const user = require('../../models/user')
const testUsers = require('../testUsers')
const app = require('../../app')
const api = supertest(app)

beforeEach(async () => {
  await user.deleteMany({})
  for (const testUser of testUsers) {
    await new user(testUser).save()
  }
  const savedUser = await user.findOne({ username: 'root' })
  await blog.deleteMany({})
  for (const testBlog of testBlogs) {
    testBlog.user = savedUser._id
    const savedBlog = await new blog(testBlog).save()
    savedUser.blogs = savedUser.blogs.concat(savedBlog._id)
    await savedUser.save()
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

  describe('with a valid authorization token', () => {
    beforeEach(async() => {
      const selectedUser = await user.findOne({ username: 'root' })
      const userForToken = { username: selectedUser.username, id: selectedUser._id }
      this.token = jwt.sign(userForToken, process.env.SECRET)
      this.id = selectedUser._id
    })
    describe('when the request has valid data', () => {

      test('it is saved to the database', async() => {
        const newBlog = { title: 'Test', author: 'Developer', url: 'test.com', likes: 0 }
        await api.post('/api/blogs').set({ Authorization: `Bearer ${this.token}` }).send(newBlog)
          .expect(201)
        const blogsAfter = await helper.blogsInDb()
        assert.strictEqual(blogsAfter.length, (helper.initialBlogs.length + 1))
      })

      test('it has the correct data', async() => {
        const newBlog = { title: 'Test', author: 'Developer', url: 'test.com', likes: 0 }
        const response = await api.post('/api/blogs').set({ Authorization: `Bearer ${this.token}` }).send(newBlog)
        const { id, user, ...responseBody } = response.body
        assert.deepStrictEqual(responseBody, newBlog)
      })

      test('it defaults to 0 when likes are missing', async () => {
        const newBlog = { title: 'Test without likes', author: 'Developer', url: 'test.com' }
        const response = await api.post('/api/blogs').set({ Authorization: `Bearer ${this.token}` }).send(newBlog)
        assert.strictEqual(response.body['likes'], 0)
      })

      test('it deletes an existing blog', async() => {
        const blogs = await blog.find({})
        const deletedBlog = blogs[0]
        const id = deletedBlog._id.toString()
        await api.delete(`/api/blogs/${id}`).set({ Authorization: `Bearer ${this.token}` })
          .expect(204)
        const blogsAfter = await helper.blogsInDb()
        const titles = blogsAfter.map(blog => blog.title)
        assert.strictEqual(blogsAfter.length, helper.initialBlogs.length - 1)
        assert(!titles.includes(deletedBlog.title))
      })

      test('it updates an existing blog', async() => {
        const blogs = await helper.blogsInDb()
        const editedBlog = { ...blogs[2], likes: 10000 }
        await api.put(`/api/blogs/${editedBlog.id}`).set({ Authorization: `Bearer ${this.token}` }).send(editedBlog)
          .expect(200)
        const blogsAfter = await helper.blogsInDb()
        const blogAfter = blogsAfter.find(blog => blog.id === editedBlog.id)
        assert.deepStrictEqual(blogAfter, editedBlog)
      })
    })

    describe('when the request has invalid data', () => {

      test('it returns 400 and doesnt save to the database when the title is missing', async () => {
        const newBlog = { author: 'Developer', likes: 100, url: 'test.com' }
        await api.post('/api/blogs').set({ Authorization: `Bearer ${this.token}` }).send(newBlog)
          .expect(400)
        const blogsAfter = await helper.blogsInDb()
        assert.strictEqual(blogsAfter.length, helper.initialBlogs.length)
      })

      test('it returns 400 and doesnt save to the database when the url is missing', async () => {
        const newBlog = { author: 'Developer', likes: 100, title: 'Test' }
        await api.post('/api/blogs').set({ Authorization: `Bearer ${this.token}` }).send(newBlog)
          .expect(400)
        const blogsAfter = await helper.blogsInDb()
        assert.strictEqual(blogsAfter.length, helper.initialBlogs.length)
      })
    })
  })

  describe('with an invalid authorization token', () => {

    test('it returns 401 Unauthorized and doesnt save to the database', async() => {
      const newBlog = { title: 'Test', author: 'Developer', url: 'test.com', likes: 0 }
      await api.post('/api/blogs').set({ Authorization: `Bearer ${this.token}test`  }).send(newBlog)
        .expect(401)
      const blogsAfter = await helper.blogsInDb()
      assert.strictEqual(blogsAfter.length, helper.initialBlogs.length)
    })

    test('it returns 401 Unauthorized and doesnt delete from the database', async() => {
      const blogs = await blog.find({})
      const deletedBlog = blogs[0]
      const id = deletedBlog._id.toString()
      await api.delete(`/api/blogs/${id}`).set({ Authorization: `Bearer ${this.token}test` })
        .expect(401)
      const blogsAfter = await helper.blogsInDb()
      assert.strictEqual(blogsAfter.length, helper.initialBlogs.length)
    })
  })

  describe('without an authorization token', () => {

    test('it returns 401 Unauthorized and does not save to the database', async() => {
      const newBlog = { title: 'Test', author: 'Developer', url: 'test.com', likes: 0 }
      await api.post('/api/blogs').send(newBlog)
        .expect(401)
      const blogsAfter = await helper.blogsInDb()
      assert.strictEqual(blogsAfter.length, helper.initialBlogs.length)
    })

    test('it returns 401 Unauthorized and does not delete from the database', async() => {
      const blogs = await blog.find({})
      const deletedBlog = blogs[0]
      const id = deletedBlog._id.toString()
      await api.delete(`/api/blogs/${id}`)
        .expect(401)
      const blogsAfter = await helper.blogsInDb()
      assert.strictEqual(blogsAfter.length, helper.initialBlogs.length)
    })
  })
})

after(async() => await mongoose.connection.close())

