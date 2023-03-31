const Discussion = require('../../model/Discussion')
const User = require('../../model/User')
const postDiscusion = require('../../validation/Discussion/postDisscussion')
const cloudinary = require('../../utilis/cloudinary')


module.exports = async (req, res) => {
  const { value, error } = postDiscusion(req.body)
  if (error) return res.status(400).send({ error: error.details[0].message })
  const { title, author, body } = value
  // const user = await User.findOne({ _id: req.user._id }).select(
  //   'fullname email -_id',
  // )

  const {
    secure_url: image,
    public_id: cloudinary_id,
  } = await cloudinary.uploader.upload(req.file.path)
  await Discussion.create({
    image,
    cloudinary_id,
    title,
    author,
    body,
    // user,
  })
  const data = {
    image,
    title,
    author,
    // user,
    body,
  }
  return res.status(200).json({ message: 'Discussion Post created', data })
}
