const Joi = require('joi')

function validateInput(quiz) {
  const schema = Joi.object({
    courseId: Joi.string().required(),
    description: Joi.string().required(),
    questions: {
      body: Joi.array().items({
        question: Joi.string().required(),
        options: Joi.string().required(),
        correctOptions: Joi.number().required(),
        explanation: Joi.string().required(),
      }),
    },
  })
  return schema.validateInput(quiz)
}

export default validateInput
