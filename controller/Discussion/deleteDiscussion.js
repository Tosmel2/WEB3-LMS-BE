const Discussion = require('../../model/Discussion')

module.exports = async (req, res) => {
  await Discussion.deleteOne({ _id: req.params.id })
  res.status(200).json({ message: 'Deleted!' })
}
