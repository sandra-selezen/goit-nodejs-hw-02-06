const bcrypt = require('bcrypt')
const { User } = require('../../models')
const { HttpError } = require('../../helpers')

const loginUser = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    throw HttpError(401, 'Email or password is wrong')
  }

  const passwordCompare = await bcrypt.compare(password, user.password)
  
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong')
  }

  const token = ''

  res.json({
    token,
  })
}

module.exports = loginUser