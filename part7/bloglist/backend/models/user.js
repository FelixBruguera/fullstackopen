const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3 },
  name: {
    type: String,
    required: true },
  passwordHash: {
    type: String,
    required: true },
})

userSchema.virtual('blogs', {
  ref: 'Blog',
  localField: '_id',
  foreignField: 'user',
  justOne: false
})

userSchema.set('toJSON', {
  virtuals: true,
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)