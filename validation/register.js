import Joi from "joi";

export const registerValidation = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
 email: Joi.string().email().min(3).max(70).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).messages({
    "any.only": "Confirm password does not match password.",
  }),
  password: Joi.string().min(5).required(),
});

export default registerValidation;