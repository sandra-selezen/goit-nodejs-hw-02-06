require('dotenv').config()

const { BASE_URL } = process.env
const { HttpError, sendEmail } = require("../../helpers")
const { User } = require("../../models")

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    throw HttpError(400, 'Missing required field email')
  }

  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed')
  }

  const verifyEmail = {
    to: email,
    subject: 'Verify your email',
    html: `<p>Click <a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">verify email</a></p>`,
  }

  await sendEmail(verifyEmail)

  res.status(200).json({
    message: 'Verification email sent',
  })
}

module.exports = resendVerifyEmail