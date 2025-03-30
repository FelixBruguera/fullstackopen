const supertest = require('supertest')
const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const testUsers = require('../testUsers')
const user = require('../../models/user')
const app = require('../../app')
const api = supertest(app)


beforeEach( async () => {
  await user.deleteMany({})
  for (const testUser of testUsers) {
    await new user(testUser).save()
  }
})

describe('with valid credentials', () => {

  test('it logs in the user and returns the auth token', async () => {
    const testUser = testUsers[0]
    const response = await api.post('/api/login').send({ username: testUser.username, password: 'securepassword' })
      .expect(200)
    assert(Object.keys(response.body).includes('token'))
    const { username, name } = response.body
    assert.strictEqual(username, testUser.username)
    assert.strictEqual(name, testUser.name)
  })
})

describe('with invalid credentials', () => {

  test('it returns 401 when the username is incorrect', async () => {
    const response = await api.post('/api/login').send({ username: 'wrong', password: 'securepassword' })
      .expect(401)
    assert.strictEqual(response.error.text, 'Invalid username or password')
  })

  test('it returns 401 when the password is incorrect', async () => {
    const response = await api.post('/api/login').send({ username: 'root', password: 'wrongpass' })
      .expect(401)
    assert.strictEqual(response.error.text, 'Invalid username or password')
  })
})


after(async() => await mongoose.connection.close())