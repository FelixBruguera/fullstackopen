const { test, describe } = require('node:test')
const assert = require('node:assert')
const blogs = require("./blogList")
const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
    test('when the list has only one blog, returns that author', () => {
      const result = listHelper.mostBlogs([blogs[0]])
      assert.deepStrictEqual(result, {author: blogs[0].author, blogs: 1})
    })
    test('when theres more than one blog, it returns the author with the most blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result, {author: "Robert C. Martin", blogs: 3})    
    })
  })