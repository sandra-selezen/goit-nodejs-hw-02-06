const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { SECRET_KEY } = process.env

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

  const payload = {
    id: user._id,
  }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' })

  res.json({
    token,
  })
}

module.exports = loginUser