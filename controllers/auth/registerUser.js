const bcrypt = require('bcrypt')
const { nanoid } = require('nanoid')
require('dotenv').config()

const { BASE_URL } = process.env
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
    html: `<div style="font-family: inherit"><p>Click <a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">verify email</a></p></div>`,
  }

  await sendEmail(verifyEmail)

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  })
}

module.exports = registerUser