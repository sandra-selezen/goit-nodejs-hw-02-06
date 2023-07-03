const { Contact } = require('../../models')
const { HttpError } = require('../../helpers')
const { addSchema } = require('../../schemas')

const addContact = async (req, res) => {
  const { error } = addSchema.validate(req.body)
  if (error) {
    throw HttpError(400, 'Missing fields')
  }
  const { _id: owner } = req.user
  const result = await Contact.create({ ...req.body, owner})
  res.status(201).json(result)
}

module.exports = addContact