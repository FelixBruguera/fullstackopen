const { test, describe } = require('node:test')
const assert = require('node:assert')
const blogs = require("./blogList")
const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
    test('when the list has only one blog, returns that author', () => {
      const result = listHelper.mostLikes([blogs[0]])
      assert.deepStrictEqual(result, {author: blogs[0].author, likes: blogs[0].likes})
    })
    test('when theres more than one blog, it returns the author with the most cumulative likes', () => {
        const result = listHelper.mostLikes(blogs)
        assert.deepStrictEqual(result, {author: "Edsger W. Dijkstra", likes: 17})    
    })
  })