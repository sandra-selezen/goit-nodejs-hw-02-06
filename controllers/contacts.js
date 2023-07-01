const Contact = require('../models/contact')

const { HttpError, ctrlWrapper } = require('../helpers')
const { addSchema } = require('../schemas')

const listContacts = async (req, res) => {
  const result = await Contact.find()
  res.json(result)
}

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findById(contactId)
  if (!result) {
    throw HttpError(404, 'Not found')
  }
  res.json(result)
}

const addContact = async (req, res) => {
  const { error } = addSchema.validate(req.body)
  if (error) {
    throw HttpError(400, 'Missing fields')
  }
  const result = await Contact.create(req.body)
  res.status(201).json(result)
}

const updateContact = async (req, res) => {
  const { error } = addSchema.validate(req.body)
  if (error) {
    throw HttpError(400, 'Missing fields')
  }
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body)
  if (!result) {
    throw HttpError(404, 'Not found')
  }
  res.json(result)
}

const removeContact = async (req, res) => {
  const { contactId } = req.params
  const result = await contacts.removeContact(contactId)
  if (!result) {
    throw HttpError(404, 'Not found')
  }
  res.json({
    message: 'Contact deleted'
  })
}

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
}