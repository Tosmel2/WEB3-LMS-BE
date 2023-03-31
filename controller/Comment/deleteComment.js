const Comment = require('../../model/Comments')

module.exports = async (req, res) => {
  await Comment.deleteOne({ _id: req.params.commentId })
  res.status(200).json({ message: 'Deleted!' })
}
