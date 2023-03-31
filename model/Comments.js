const mongoose = require('mongoose')

const commentSchema = mongoose.Schema(
  {
    text: {
      type: String,
    },
    postedBy: String,
    blogpost: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Comment', commentSchema)
