const Joi = require('joi')

module.exports = function validate(input) {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    body: Joi.string().required(),
  })
  return schema.validate(input)
}