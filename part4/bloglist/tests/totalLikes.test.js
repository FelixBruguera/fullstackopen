const { test, describe } = require('node:test')
const assert = require('node:assert')
const blogs = require("./blogList")
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes([blogs[0]])
      assert.strictEqual(result, 7)
    })
    test('when theres more than one blog, it returns the correct total', () => {
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 36)
      })
    test('of an empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
    })
  })