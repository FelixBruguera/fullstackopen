const User = require('../user')
const mongoose = require('mongoose')

const userDetails = mongoose.model('userdetails', User.schema)

userDetails.createCollection(
  {
    viewOn: 'users',
    pipeline: [
      {   $lookup:
        {
          from: 'blogs',
          localField:'_id',
          foreignField: 'user',
          as: 'blogs'
        }
      },
      { $project:
        {
          _id: 1,
          name: 1,
          blogs: {
            $map: {
              input: '$blogs',
              as: 'blog',
              in: {
                id: '$$blog._id', title: '$$blog.title', author: '$$blog.author'
              }
            }
          }
        }
      }
    ]
  })

module.exports = userDetails