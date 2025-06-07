const supertest = require('supertest')
const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const user = require('../../models/user')
const app = require('../../app')
const api = supertest(app)
const helper = require('../helper')
const testUsers = require('../testUsers')
const jwt = require('jsonwebtoken')

beforeEach( async () => {
  await user.deleteMany({})
  for (const testUser of testUsers) {
    await new user(testUser).save()
  }
  const selectedUser = await user.findOne({ username: 'root' })
  const userForToken = { username: selectedUser.username, id: selectedUser._id }
  this.token = jwt.sign(userForToken, process.env.SECRET)
})

describe('when the request has valid data', () => {

  test('it returns all users', async() => {
    const response = await api.get('/api/users').set({ Authorization: `Bearer ${this.token}` })
    assert.strictEqual(response.body.length, 3)
    const names = response.body.map(user => user.name)
    assert(names.includes(testUsers[0].name))
  })

  test('it creates a new user', async () => {
    const userData = { username: 'testUser', name: 'Testing', password: 'securepassword' }
    const usersBefore = await helper.usersInDb()
    await api.post('/api/users').send(userData)
      .expect(201)
    const usersAfter = await helper.usersInDb()
    const usernames = usersAfter.map(user => user.username)
    assert.strictEqual(usersAfter.length, (usersBefore.length + 1))
    assert(usernames.includes(userData.username))
  })
})

describe('when the request has invalid data', () => {

  test('it returns 400 and the correct error message when the username is missing', async () => {
    const userData = { name: 'Dev', password: 'securepassword' }
    const usersBefore = await helper.usersInDb()
    const response = await api.post('/api/users').send(userData)
    assert.strictEqual(response.statusCode, 400)
    assert.strictEqual(response.text, 'User validation failed: username: Path `username` is required.')
    const usersAfter = await helper.usersInDb()
    assert.strictEqual(usersAfter.length, usersBefore.length)
  })

  test('it returns 400 and the correct error message when the username is too short', async () => {
    const userData = { username: 'a', name: 'Dev', password: 'securepassword' }
    const usersBefore = await helper.usersInDb()
    const response = await api.post('/api/users').send(userData)
    assert.strictEqual(response.statusCode, 400)
    assert(response.text.includes('username'))
    assert(response.text.includes('is shorter than the minimum allowed length (3)'))
    const usersAfter = await helper.usersInDb()
    assert.strictEqual(usersAfter.length, usersBefore.length)
  })

  test('it returns 400 and the correct error message when the password is missing', async () => {
    const userData = { name: 'Dev', username: 'Unique' }
    const usersBefore = await helper.usersInDb()
    const response = await api.post('/api/users').send(userData)
    assert.strictEqual(response.statusCode, 400)
    assert.strictEqual(response.text, '"User validation failed: username: Path `password` is required."')
    const usersAfter = await helper.usersInDb()
    assert.strictEqual(usersAfter.length, usersBefore.length)
  })

  test('it returns 400 and the proper error message when the password is too short', async () => {
    const userData = { username: 'UserTest', name: 'Dev', password: 'a' }
    const usersBefore = await helper.usersInDb()
    const response = await api.post('/api/users').send(userData)
    assert.strictEqual(response.statusCode, 400)
    assert(response.text.includes('password'))
    assert(response.text.includes('is shorter than the minimum allowed length (3)'))
    const usersAfter = await helper.usersInDb()
    assert.strictEqual(usersAfter.length, usersBefore.length)
  })

  test('it returns 400 when the username already exists', async () => {
    const seedUser = { username: 'root', name: 'Dev', password: 'securepassword' }
    await api.post('/api/users').send(seedUser)
    const usersBefore = await helper.usersInDb()
    const userData = { username: 'root', name: 'Developer', password: 'securepassword' }
    const response = await api.post('/api/users').send(userData)
    assert.strictEqual(response.statusCode, 400)
    const usersAfter = await helper.usersInDb()
    assert(response.text.includes('expected `username` to be unique'))
    assert.strictEqual(usersAfter.length, usersBefore.length)
  })
})

after(async() => await mongoose.connection.close())