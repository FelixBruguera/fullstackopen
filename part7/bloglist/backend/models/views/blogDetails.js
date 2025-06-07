const Blog = require('../blog')
const mongoose = require('mongoose')

const blogDetails = mongoose.model('blogDetails', Blog.schema)

blogDetails.createCollection(
  {
    viewOn: 'blogs',
    pipeline: [
      {   $lookup:
        {
          from: 'users',
          localField:'user',
          foreignField: '_id',
          as: 'userInfo'
        }
      },
      { $unwind:
        {
          path: '$userInfo'
        }
      },
      {   $lookup:
        {
          from: 'comments',
          localField:'_id',
          foreignField: 'blog',
          as: 'comments'
        }
      },
      {
        $set: {
          'userInfo.id': '$userInfo._id',
        }
      },
      { $project:
        {
          title: 1,
          author: 1,
          url: 1,
          likes: 1,
          id: 1,
          userInfo: { name: 1, id: 1 },
          comments: {
            $map: {
              input: '$comments',
              as: 'comment',
              in: {
                id: '$$comment._id', content: '$$comment.content'
              }
            }
          }
        }
      }
    ]
  })

module.exports = blogDetails