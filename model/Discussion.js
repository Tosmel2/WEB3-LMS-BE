const mongoose = require('mongoose')

const discussionSchema = mongoose.Schema(
  {
    image: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    body: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      _id: mongoose.Types.ObjectId,
      fullname: String,
      email: String,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true },
)

module.exports = mongoose.model('Discussion', discussionSchema)
