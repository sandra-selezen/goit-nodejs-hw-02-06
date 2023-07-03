const { Contact } = require('../../models')

const listContacts = async (req, res) => {
  const { _id: owner } = req.user
  const { page = 1, limit = 20 } = req.query
  const skip = (page - 1) * limit
  const result = await Contact.find({ owner }, "", { skip, limit: Number(limit) }).populate("owner", "email")
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    }
  })
}

module.exports = listContacts