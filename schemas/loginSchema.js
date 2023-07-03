const Joi = require('joi')

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  token: Joi.string(),
})

module.exports = loginSchema