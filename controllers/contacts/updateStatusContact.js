const { Contact } = require('../../models')
const { HttpError } = require('../../helpers')
const { updateFavoriteSchema } = require('../../schemas')

const updateStatusContact = async (req, res) => {
  const { error } = updateFavoriteSchema.validate(req.body)
  if (error) {
    throw HttpError(400, 'Missing field favorite')
  }
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
  if (!result) {
    throw HttpError(404, 'Not found')
  }
  res.json(result)
}

module.exports = updateStatusContact