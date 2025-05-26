const { test, describe } = require('node:test')
const assert = require('node:assert')
const blogs = require("./blogList")
const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
    test('when the list has only one blog, returns that blog', () => {
      const result = listHelper.favoriteBlog([blogs[0]])
      assert.deepStrictEqual(result, blogs[0])
    })
    test('when theres more than one blog, it returns the one with most likes', () => {
        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, blogs[2])    
    })
  })