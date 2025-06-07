const supertest = require('supertest')
const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const testBlogs = require('../blogList')
const helper = require('../helper')
const blog = require('../../models/blog')
const user = require('../../models/user')
const comment = require('../../models/comment')
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
    await new blog(testBlog).save()
  }
  await comment.deleteMany({})
  const savedBlog = await blog.findOne({})
  new comment({ content: 'First comment', blog: savedBlog.id }).save()
})

describe('with some blogs in the database', () => {
  describe('with a valid authorization token', () => {
    beforeEach(async() => {
      const selectedUser = await user.findOne({ username: 'root' })
      const userForToken = { username: selectedUser.username, id: selectedUser._id }
      this.token = jwt.sign(userForToken, process.env.SECRET)
      this.id = selectedUser._id
      const secondUser = await user.findOne({ username: 'test' })
      const secondUserForToken = { username: secondUser.username, id: secondUser._id }
      this.secondToken = jwt.sign(secondUserForToken, process.env.SECRET)
    })

    test('responds with the correct status code and content-type', async () => {
      await api
        .get('/api/blogs').set({ Authorization: `Bearer ${this.token}` })
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('returns all blogs with the correct unique identifier field', async() => {
      const response = await api.get('/api/blogs').set({ Authorization: `Bearer ${this.token}` })
      const contents = response.body
      assert.strictEqual(response.body.length, helper.initialBlogs.length)
      assert(contents.every(blog => Object.keys(blog).includes('id')))
    })

    test('returns a single blog with the correct fields', async() => {
      const blogs = await blog.find({})
      const testBlog = blogs[0]
      const response = await api.get(`/api/blogs/${testBlog.id}`).set({ Authorization: `Bearer ${this.token}` })
      const { userInfo, comments, ...content } = response.body
      assert.strictEqual(content.id, testBlog.id)
      assert.strictEqual(content.title, testBlog.title)
      assert.strictEqual(content.author, testBlog.author)
      assert.strictEqual(userInfo.id, testBlog.user.toString())
      assert.strictEqual(comments[0].content, 'First comment')
    })

    describe('when the request has valid data', () => {
      test('it is saved to the database with the correct data', async() => {
        const newBlog = { title: 'Test', author: 'Developer', url: 'test.com', likes: 0 }
        const response = await api.post('/api/blogs').set({ Authorization: `Bearer ${this.token}` }).send(newBlog)
        assert.strictEqual(response.statusCode, 201)
        const blogsAfter = await helper.blogsInDb()
        assert.strictEqual(blogsAfter.length, (helper.initialBlogs.length + 1))
        const { id, userInfo, ...responseBody } = response.body
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
        const blog = blogs[2]
        await api.patch(`/api/blogs/${blog.id}`).set({ Authorization: `Bearer ${this.token}` })
          .expect(200)
        const blogsAfter = await helper.blogsInDb()
        const blogAfter = blogsAfter.find(newBlog => newBlog.id === blog.id)
        assert.strictEqual(blogAfter.likes, blog.likes + 1)
      })

      test('comments are created', async() => {
        const blogs = await helper.blogsInDb()
        const blog = blogs[1]
        await api.post(`/api/blogs/${blog.id}/comments`).set({ Authorization: `Bearer ${this.token}` })
          .send({ comment: 'Good Test' })
          .expect(201)
        const comments = await helper.commentsInDb()
        assert(comments.some(comm => comm.content === 'Good Test'))
      })
    })

    describe('when the request has invalid data', () => {

      test('the blogs/id endpoint returns 400 when the blog id is invalid', async () => {
        await api.get('/api/blogs/6my235baa475083a014fb5y9').set({ Authorization: `Bearer ${this.token}` })
          .expect(400)
      })

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

      test('it returns 400 when the patch request has an inexistent blog id', async() => {
        await api.patch('/api/blogs/683ae46efcbt032h49326319').set({ Authorization: `Bearer ${this.token}` })
          .expect(400)
      })

      test('it returns 401 when the blog id doesnt exist and doesnt delete from the database', async() => {
        await api.delete('/api/blogs/683ae46efcb5032f39325317').set({ Authorization: `Bearer ${this.token}` })
          .expect(401)
        const blogsAfter = await helper.blogsInDb()
        assert.strictEqual(blogsAfter.length, helper.initialBlogs.length)
      })

      test('it returns 400 when the comment is missing content', async() => {
        const blogs = await helper.blogsInDb()
        const blog = blogs[1]
        await api.post(`/api/blogs/${blog.id}/comments`).set({ Authorization: `Bearer ${this.token}` })
          .send({ foo: 'bar' })
          .expect(400)
        const comments = await helper.commentsInDb()
        assert.strictEqual(comments.length, 1)
      })

      test('it returns 404 when the comment request has an inexistent blog id', async() => {
        await api.post('/api/blogs/683ae46efcb5032f39325317/comments').set({ Authorization: `Bearer ${this.token}` })
          .send({ 'comment': 'Test' })
          .expect(404)
        const comments = await helper.commentsInDb()
        assert.strictEqual(comments.length, 1)
      })
    })

  })

  describe('with an invalid authorization token', () => {

    test('the blogs endpoint returns 401', async () => {
      await api
        .get('/api/blogs').set({ Authorization: `Bearer ${this.token}a` })
        .expect(401)
    })

    test('the blogs/id endpoint returns 401', async () => {
      const blogs = await blog.find({})
      const testBlog = blogs[0]
      await api.get(`/api/blogs/${testBlog.id}`).set({ Authorization: `Bearer ${this.token}b` })
        .expect(401)
    })

    test('it returns 401 Unauthorized and doesnt save to the database', async() => {
      const newBlog = { title: 'Test', author: 'Developer', url: 'test.com', likes: 0 }
      await api.post('/api/blogs').set({ Authorization: `Bearer ${this.token}test`}).send(newBlog)
        .expect(401)
      const blogsAfter = await helper.blogsInDb()
      assert.strictEqual(blogsAfter.length, helper.initialBlogs.length)
    })

    test('it returns 401 and doesnt update the blog', async() => {
      const blogs = await blog.find({})
      const deletedBlog = blogs[0]
      const id = deletedBlog._id.toString()
      await api.patch(`/api/blogs/${id}`).set({ Authorization: `Bearer ${this.token}b` })
        .expect(401)
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

    test('it returns 401 and doesnt delete a blog when the token doesnt belong to the blogs user', async () => {
      const blogs = await blog.find({})
      const deletedBlog = blogs[0]
      const id = deletedBlog._id.toString()
      await api.delete(`/api/blogs/${id}`).set({ Authorization: `Bearer ${this.secondToken}` })
        .expect(401)
      const blogsAfter = await helper.blogsInDb()
      assert.strictEqual(blogsAfter.length, helper.initialBlogs.length)
    })

    test('it returns 401 and doesnt save the comment', async() => {
      const blogs = await blog.find({})
      const selectedBlog = blogs[0]
      await api.post(`/api/blogs/${selectedBlog.id}/comments`).set({ Authorization: `Bearer ${this.token}a` })
        .send({ content: 'Test' })
        .expect(401)
      const comments = await helper.commentsInDb()
      assert.strictEqual(comments.length, 1)
    })
  })

  describe('without an authorization token', () => {

    test('the blogs endpoint returns 401', async () => {
      await api
        .get('/api/blogs')
        .expect(401)
    })

    test('the blogs/id endpoint returns 401', async () => {
      const blogs = await blog.find({})
      const testBlog = blogs[0]
      await api.get(`/api/blogs/${testBlog.id}`)
        .expect(401)
    })

    test('it returns 401 Unauthorized and does not save to the database', async() => {
      const newBlog = { title: 'Test', author: 'Developer', url: 'test.com', likes: 0 }
      await api.post('/api/blogs').send(newBlog)
        .expect(401)
      const blogsAfter = await helper.blogsInDb()
      assert.strictEqual(blogsAfter.length, helper.initialBlogs.length)
    })

    test('it returns 401 and doesnt update the blog', async() => {
      const blogs = await blog.find({})
      const deletedBlog = blogs[0]
      const id = deletedBlog._id.toString()
      await api.patch(`/api/blogs/${id}`)
        .expect(401)
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
    test('it returns 401 and doesnt save the comment', async() => {
      const blogs = await blog.find({})
      const selectedBlog = blogs[0]
      await api.post(`/api/blogs/${selectedBlog.id}/comments`)
        .send({ content: 'Test' })
        .expect(401)
      const comments = await helper.commentsInDb()
      assert.strictEqual(comments.length, 1)
    })
  })
})

after(async() => await mongoose.connection.close())

