const Discussion = require('../../model/Discussion')

module.exports = async (req, res) => {
  const result = await Discussion.findById(req.params.id).populate('comments')
  return res.status(200).json(result)
}
