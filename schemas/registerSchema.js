const Joi = require('joi')

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
  avatarURL: Joi.string(),
})

module.exports = registerSchema