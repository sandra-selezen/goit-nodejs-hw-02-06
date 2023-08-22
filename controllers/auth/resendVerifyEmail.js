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
    subject: 'Activate your GooseTrack account',
    html: `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #007bff;">Welcome to GooseTrack!</h2>
      <p>We're glad you're here,</p>
      <p>${email}</p>
      <p>Just confirming you're you.</p>
      <a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken} style="display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Activate Account</a>
      <p>If you didn't sign up for an account, you can safely ignore this email.</p>
      <p>Best regards,</p>
      <p>The AugooseTeam</p>
    </div>
    `,
  }

  await sendEmail(verifyEmail)

  res.status(200).json({
    message: 'Verification email sent',
  })
}

module.exports = resendVerifyEmail