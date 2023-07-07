const bcrypt = require('bcrypt')
const nanoid = require('nanoid')
const { User } = require('../../models')
const { HttpError, sendEmail } = require('../../helpers')

const registerUser = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw HttpError(409, 'Email in use')
  }

  const hashPassword = await bcrypt.hash(password, 10)
  const verificationToken = nanoid()

  const newUser = await User.create({ ...req.body, password: hashPassword, verificationToken })

  const verifyEmail = {
    to: email,
    subject: 'Verify your email',
    html: ``,
  }

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  })
}

module.exports = registerUser