const Joi = require('joi')

const updateAvatarSchema = Joi.object({
  avatarURL: Joi.string().required()
})

module.exports = updateAvatarSchema