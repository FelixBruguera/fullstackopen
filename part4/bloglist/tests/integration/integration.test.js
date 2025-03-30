const supertest = require('supertest')
const assert = require('node:assert')
const { test, after, before, describe } = require('node:test')
const mongoose = require('mongoose')
const helper = require('../helper')
const blog = require('../../models/blog')
const user = require('../../models/user')
const app = require('../../app')
const api = supertest(app)

describe('Blog workflow', () => {
  const testUser = { username: 'integration', name: 'test', password: 'testpass' }
  let token = null
  let userId = null
  let blogId = null

  before( async() => {
    await user.deleteMany({})
    await  blog.deleteMany({})
  })

  test('user creation', async () => {
    await api.post('/api/users').send(testUser)
      .expect(201)
    const usersAfterCreation = await helper.usersInDb()
    assert(usersAfterCreation.length === 1, 'the user should be saved in the database')
    assert.strictEqual(usersAfterCreation[0].username, 'integration', 'the user should have the correct username')
    assert.strictEqual(usersAfterCreation[0].name, 'test', 'the user should have the correct name')
    userId = usersAfterCreation[0].id
  })

  test('user login', async () => {
    const loginResponse = await api.post('/api/login').send({ username: testUser.username, password: testUser.password })
      .expect(200)
    const loginData = loginResponse.body
    assert(Object.keys(loginData).includes('token'), 'the login response should include the auth token')
    assert(loginData.token.length > 0, 'the auth token should not be empty')
    assert.strictEqual(loginData.username, testUser.username, 'the login data should return the correct username')
    token = loginData.token
  })

  test('blog creation', async () => {
    const newBlog = { title: 'test blog', url: 'testblog.com', author: 'test', likes: 1 }
    const createdBlog = await api.post('/api/blogs').set({ Authorization: `Bearer ${token}` }).send(newBlog)
      .expect(201)
    const { id, user: blogUser, ...blogWithoutId } = createdBlog.body
    assert.deepStrictEqual(blogWithoutId, newBlog, 'the saved blog should have the correct data')
    assert.strictEqual(blogUser.toString(), userId, 'the blog should link to the right user id')
    const userAfterBlogCreation = await user.findOne({ username: testUser.username })
    assert(userAfterBlogCreation.blogs.includes(id), 'the user should link to the created blog')
    blogId = id
  })

  test('blog deletion', async () => {
    await api.delete(`/api/blogs/${blogId}`).set({ Authorization: `Bearer ${token}` })
      .expect(204)
    const blogsAfterDeletetion = await helper.blogsInDb()
    assert(blogsAfterDeletetion.length === 0, 'the blog should be deleted')
    const userAfterBlogDeletion = await user.findOne({ username: testUser.username })
    assert(!userAfterBlogDeletion.blogs.includes(blogId), 'the user should not link to the deleted blog')
  })
})

after(async() => await mongoose.connection.close())