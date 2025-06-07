const User = require('../user')
const mongoose = require('mongoose')

const userLists = mongoose.model('userlists', User.schema)

userLists.createCollection(
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
          blogs: { $size: '$blogs' },
        }
      }
    ]
  })

module.exports = userLists