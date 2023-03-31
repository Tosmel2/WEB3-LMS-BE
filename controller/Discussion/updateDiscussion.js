const Discussion = require('../../model/Discussion')
const cloudinary = require('../../utilis/cloudinary')

const updateDiscussion = require('../../validation/Discussion/updateDiscussion')

module.exports = async (req, res) => {
  const { value, error } = updateDiscussion(req.body)
  if (error) return res.status(400).send({ error: error.details[0].message })

  const post = await Discussion.findById(req.params.id)
  if (!post)
    return res.status(404).send({ message: 'Discussion post not found' })
  if (req.file) {
    await cloudinary.uploader.destroy(post.cloudinary_id)
    const {
      secure_url: image,
      public_id: cloudinary_id,
    } = await cloudinary.uploader.upload(req.file.path)
    await Discussion.updateOne(
      { _id: req.params.id },
      {
        $set: {
          image,
          cloudinary_id,
        },
      },
    )
  }

  const { title, author, body } = value
  await Discussion.updateOne(
    { _id: req.params.id },
    {
      $set: {
        title,
        author,
        body,
      },
    },
  )

  const data = await Discussion.find({ _id: req.params.id }).select(
    'image title author body',
  )
  return res.status(200).json({ message: 'Post updated', data })
}
