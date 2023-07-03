const { Contact } = require('../../models')

const listContacts = async (req, res) => {
  const { _id: owner } = req.user
  const { page = 1, limit = 20, favorite } = req.query
  const skip = (page - 1) * limit
  if (favorite) {
    const result = await Contact.find({ owner, favorite }, "", { skip, limit: Number(limit) }).populate("owner", "email")
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      }
    })
  } else {
    const result = await Contact.find({ owner }, "", { skip, limit: Number(limit) }).populate("owner", "email")
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      }
    })
  }
}

module.exports = listContacts